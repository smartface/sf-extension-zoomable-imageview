import System from "@smartface/native/device/system";
import ImageView from "@smartface/native/ui/imageview";
import View from "@smartface/native/ui/view";



export default class ZoomableImageView {
    android: Object;
    private __ios: Record<string, any>;
    imageView: ImageView;
    scrollViewJSView: View;
    nativeObject: any;
    constructor(params: Partial<typeof ImageView>) {
        this.android = {};
        this.__ios = {};
        this.imageView = new ImageView();
        //@ts-ignore
        this.imageView.nativeObject.yoga.isEnabled = false;
        //@ts-ignore
        this.imageView.nativeObject.layer.masksToBounds = false;
        //@ts-ignore
        this.imageView.nativeObject.layer.clipsToBounds = false;
        //@ts-ignore
        this.imageView.nativeObject.imageDidSet = function() {
            calculateImageViewFrame();
        };
        //@ts-ignore
        delete this.imageView["imageFillType"];
        Object.defineProperty(this, "imageFillType", {
            get: () => {
                //@ts-ignore
                return this.imageView.nativeObject.contentMode;
            },
            set: (value) => {
                //@ts-ignore
                this.imageView.nativeObject.contentMode = value;
                calculateImageViewFrame();
            },
            enumerable: true
        });

        //@ts-ignore
        const scrollview = new __SF_UIScrollView();
        scrollview.showsHorizontalScrollIndicator = false;
        scrollview.showsVerticalScrollIndicator = false;
        //@ts-ignore
        scrollview.addSubview(this.imageView.nativeObject);
        //@ts-ignore
        scrollview.viewForZoomingCallback = this.imageView.nativeObject;
        scrollview.maximumZoomScale = 3.0; //Default
        scrollview.setValueForKey(false, "bounces"); //Default
        scrollview.setValueForKey(false, "bouncesZoom"); //Default
        if (parseInt(System.OSVersion.split(".")[0]) >= 11) {
            scrollview.setValueForKey(2, "contentInsetAdjustmentBehavior");
        }
        this.scrollViewJSView = new View({ nativeObject: scrollview });

        let _frame = {};
        scrollview.addFrameObserver();
        //@ts-ignore
        scrollview.frameObserveHandler = (e) => {
            if ((JSON.stringify(_frame) != JSON.stringify(e.frame))) {
                calculateImageViewFrame(e.frame);
            }
        };

        const calculateImageViewFrame = (frame?: any) => {
            scrollview.zoomScale = 1;
            //@ts-ignore
            if (this.imageFillType === ImageView.FillType.ASPECTFILL || this.imageFillType === ImageView.FillType.STRETCH || this.imageFillType === ImageView.FillType.ASPECTFIT) {
                var innerFrame = frame || scrollview.frame;
                //@ts-ignore
                this.imageView.nativeObject.frame = innerFrame;
                scrollview.contentSize = { width: innerFrame.width, height: innerFrame.height };

            }
            //@ts-ignore
            else if (this.imageView.image && this.imageView.image.nativeObject && this.imageView.image.nativeObject.size) {
                let innerFrame = frame || scrollview.frame;
                let image = this.imageView.image;
                //@ts-ignore
                let width = image.width < innerFrame.width ? innerFrame.width : image.width;
                //@ts-ignore
                let height = image.height < innerFrame.height ? innerFrame.height : image.height;
                //@ts-ignore
                this.imageView.nativeObject.frame = { x: 0, y: 0, width: width, height: height };
                scrollview.contentSize = { width: width, height: height };
                scrollview.contentOffset = { x: 0, y: 0 };
            }
        };

        if(!this.nativeObject) {
            this.nativeObject = scrollview;
        }

        Object.defineProperty(this, 'minimumZoomScale', {
            get: () => {
                return scrollview.minimumZoomScale;
            },
            set: (value) => {
                scrollview.minimumZoomScale = value;
            },
            enumerable: true
        });

        Object.defineProperty(this, 'maximumZoomScale', {
            get: () => {
                return scrollview.maximumZoomScale;
            },
            set: (value) => {
                scrollview.maximumZoomScale = value;
            },
            enumerable: true
        });

        Object.defineProperty(this, 'setZoomScale', {
            //@ts-ignore
            value: (scale, animated) => {
                scrollview.setZoomScaleAnimated(scale, !!animated);
            },
            enumerable: true
        });

        Object.defineProperty(this.__ios, 'minimumNumberOfTouches', {
            get: () => {
                return scrollview.panGestureRecognizer.minimumNumberOfTouches;
            },
            set: (value) => {
                scrollview.panGestureRecognizer.minimumNumberOfTouches = value;
            },
            enumerable: true
        });

        Object.defineProperty(this.__ios, 'maximumNumberOfTouches', {
            get: () => {
                return scrollview.panGestureRecognizer.maximumNumberOfTouches;
            },
            set: (value) => {
                scrollview.panGestureRecognizer.maximumNumberOfTouches = value;
            },
            enumerable: true
        });

        Object.defineProperty(this.__ios, 'bounces', {
            get: () => {
                return scrollview.valueForKey("bounces");
            },
            set: (value) => {
                scrollview.setValueForKey(value, "bounces");
            },
            enumerable: true
        });

        Object.defineProperty(this.__ios, 'bouncesZoom', {
            get: () => {
                return scrollview.valueForKey("bouncesZoom");
            },
            set: (value) => {
                scrollview.setValueForKey(value, "bouncesZoom");
            },
            enumerable: true
        });

        const proxy = new Proxy(this, {
            set: (obj, prop, value) => {
                if (this.scrollViewJSView.hasOwnProperty(prop)) {
                    //@ts-ignore
                    this.scrollViewJSView[prop] = value;
                }
                else if (this.imageView.hasOwnProperty(prop)) {
                    //@ts-ignore
                    this.imageView[prop] = value;
                }
                else {
                    //@ts-ignore
                    this[prop] = value;
                }
                return true;
            },
            get: (obj, prop) => {
                if (prop === "nativeObject") {
                    //@ts-ignore
                    return this.scrollViewJSView.nativeObject;
                }
                else if (this.scrollViewJSView.hasOwnProperty(prop)) {
                    //@ts-ignore
                    return this.scrollViewJSView[prop];
                }
                else if (this.imageView.hasOwnProperty(prop)) {
                    //@ts-ignore
                    return this.imageView[prop];
                }
                else {
                    //@ts-ignore
                    return this[prop];
                }
            }
        });

        proxy.__ios = new Proxy(this.__ios, {
            set: (obj, prop, value) => {
                //@ts-ignore
                this.__ios[prop] = value;
                return true;
            },
            get: (obj, prop) => {
                //@ts-ignore
                return this.__ios[prop];
            }
        });
        
        if (params) {
            for (var param in params) {
                //@ts-ignore
                proxy[param] = params[param];
            }
        }
        return proxy;

     }

     
}