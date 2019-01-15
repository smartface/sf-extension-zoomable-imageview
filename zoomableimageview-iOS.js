const extend = require('js-base/core/extend');
const ImageView = require('sf-core/ui/imageview');
const View = require('sf-core/ui/view');

class ZoomableImageView {

    constructor(params) {
        var self = this;

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
                return self.nativeObject.minimumZoomScale;
            },
            set: function(value) {
                self.nativeObject.minimumZoomScale = value;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'maximumZoomScale', {
            get: function() {
                return self.nativeObject.maximumZoomScale;
            },
            set: function(value) {
                self.nativeObject.maximumZoomScale = value;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'setZoomScale', {
            value: function(scale,animated) {
                self.nativeObject.setZoomScaleAnimated(scale,!!animated);
            },
            enumerable: true
        });

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }

        return new Proxy(this, {
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
    }
}

module.exports = ZoomableImageView;
