const System = require("sf-core/device/system");
const ImageView = require('sf-core/ui/imageview');
const View = require('sf-core/ui/view');
class ZoomableImageView {

    constructor(params) {
        var self = this;
        self.android = {};
        const __ios = {};

        self.imageView = new ImageView();
        self.imageView.nativeObject.yoga.isEnabled = false;
        self.imageView.nativeObject.layer.masksToBounds = false;
        self.imageView.nativeObject.layer.clipsToBounds = false;
        self.imageView.nativeObject.imageDidSet = function() {
            calculateImageViewFrame();
        };

        delete self.imageView["imageFillType"];
        Object.defineProperty(self, 'imageFillType', {
            get: function() {
                return self.imageView.nativeObject.contentMode;
            },
            set: function(value) {
                self.imageView.nativeObject.contentMode = value;
                calculateImageViewFrame();
            },
            enumerable: true
        });

        var scrollview = new __SF_UIScrollView();
        scrollview.showsHorizontalScrollIndicator = false;
        scrollview.showsVerticalScrollIndicator = false;
        scrollview.addSubview(self.imageView.nativeObject);
        scrollview.viewForZoomingCallback = self.imageView.nativeObject;
        scrollview.maximumZoomScale = 3.0; //Default
        scrollview.setValueForKey(false, "bounces"); //Default
        scrollview.setValueForKey(false, "bouncesZoom"); //Default

        if (System.OSVersion.split(".")[0] >= 11) {
            scrollview.setValueForKey(2, "contentInsetAdjustmentBehavior");
        }

        self.scrollViewJSView = new View({ nativeObject: scrollview });

        var _frame = {};
        scrollview.addFrameObserver();
        scrollview.frameObserveHandler = function(e) {
            if ((JSON.stringify(_frame) != JSON.stringify(e.frame))) {
                calculateImageViewFrame(e.frame);
            }
        };

        var calculateImageViewFrame = function(frame) {
            scrollview.zoomScale = 1;
            if (self.imageFillType === ImageView.FillType.ASPECTFILL || self.imageFillType === ImageView.FillType.STRETCH || self.imageFillType === ImageView.FillType.ASPECTFIT) {
                var innerFrame = frame || scrollview.frame;
                self.imageView.nativeObject.frame = innerFrame;
                scrollview.contentSize = { width: innerFrame.width, height: innerFrame.height };

            }
            else if (self.imageView.image && self.imageView.image.nativeObject && self.imageView.image.nativeObject.size) {
                var innerFrame = frame || scrollview.frame;
                var image = self.imageView.image;
                var width = image.width < innerFrame.width ? innerFrame.width : image.width;
                var height = image.height < innerFrame.height ? innerFrame.height : image.height;
                self.imageView.nativeObject.frame = { x: 0, y: 0, width: width, height: height };
                scrollview.contentSize = { width: width, height: height };
                scrollview.contentOffset = { x: 0, y: 0 };
            }
        };

        if (!self.nativeObject) {
            self.nativeObject = scrollview;
        }

        Object.defineProperty(self, 'minimumZoomScale', {
            get: function() {
                return scrollview.minimumZoomScale;
            },
            set: function(value) {
                scrollview.minimumZoomScale = value;
            },
            enumerable: true
        });

        Object.defineProperty(__ios, 'minimumNumberOfTouches', {
            get: function() {
                return scrollview.panGestureRecognizer.minimumNumberOfTouches;
            },
            set: function(value) {
                scrollview.panGestureRecognizer.minimumNumberOfTouches = value;
            },
            enumerable: true
        });

        Object.defineProperty(__ios, 'maximumNumberOfTouches', {
            get: function() {
                return scrollview.panGestureRecognizer.maximumNumberOfTouches;
            },
            set: function(value) {
                scrollview.panGestureRecognizer.maximumNumberOfTouches = value;
            },
            enumerable: true
        });

        Object.defineProperty(__ios, 'bounces', {
            get: function() {
                return scrollview.valueForKey("bounces");
            },
            set: function(value) {
                scrollview.setValueForKey(value, "bounces");
            },
            enumerable: true
        });

        Object.defineProperty(__ios, 'bouncesZoom', {
            get: function() {
                return scrollview.valueForKey("bouncesZoom");
            },
            set: function(value) {
                scrollview.setValueForKey(value, "bouncesZoom");
            },
            enumerable: true
        });

        Object.defineProperty(self, 'maximumZoomScale', {
            get: function() {
                return scrollview.maximumZoomScale;
            },
            set: function(value) {
                scrollview.maximumZoomScale = value;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'setZoomScale', {
            value: function(scale, animated) {
                scrollview.setZoomScaleAnimated(scale, !!animated);
            },
            enumerable: true
        });



        const proxy = new Proxy(this, {
            set: function(obj, prop, value) {
                if (self.scrollViewJSView.hasOwnProperty(prop)) {
                    self.scrollViewJSView[prop] = value;
                }
                else if (self.imageView.hasOwnProperty(prop)) {
                    self.imageView[prop] = value;
                }
                else {
                    self[prop] = value;
                }
                return true;
            },
            get: function(obj, prop) {
                if (prop === "nativeObject") {
                    return self.scrollViewJSView.nativeObject;
                }
                else if (self.scrollViewJSView.hasOwnProperty(prop)) {
                    return self.scrollViewJSView[prop];
                }
                else if (self.imageView.hasOwnProperty(prop)) {
                    return self.imageView[prop];
                }
                else {
                    return self[prop];
                }
            }
        });

        proxy.ios = new Proxy(__ios, {
            set: function(obj, prop, value) {
                __ios[prop] = value;
                return true;
            },
            get: function(obj, prop) {
                return __ios[prop];
            }
        });
        
        if (params) {
            for (var param in params) {
                proxy[param] = params[param];
            }
        }
        return proxy;
    }
}

module.exports = ZoomableImageView;
