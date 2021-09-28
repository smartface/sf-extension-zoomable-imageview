import System from "@smartface/native/device/system";
import ImageView from "@smartface/native/ui/imageview";
import View from "@smartface/native/ui/view";
import { IIOS, IZoomable } from "./types/IZoomable";
import Image from "@smartface/native/ui/image";

export default class ZoomableImageView extends ImageView{
    android: any;
    imageView: ImageView;
    scrollViewJSView: View;
    nativeObject: any;
    //@ts-ignore
    scrollView: any;
    __ios: View["ios"] & IIOS;

    //@ts-ignore
    constructor(params?: Partial<ImageView> & IZoomable) {
        //@ts-ignore
        this.scrollView = new __SF_UIScrollView();
        super(params);
        this.android = {};
        //@ts-ignore
        this.__ios = {};
        this.imageView = new ImageView();
        //@ts-ignore
        this.imageView.nativeObject.yoga.isEnabled = false;
        //@ts-ignore
        this.imageView.nativeObject.layer.masksToBounds = false;
        //@ts-ignore
        this.imageView.nativeObject.layer.clipsToBounds = false;
        //@ts-ignore
        this.imageView.nativeObject.imageDidSet = () => this.calculateImageViewFrame();
        this.scrollView.showsHorizontalScrollIndicator = false;
        this.scrollView.showsVerticalScrollIndicator = false;
        //@ts-ignore
        this.scrollView.addSubview(this.imageView.nativeObject);
        //@ts-ignore
        this.scrollView.viewForZoomingCallback = this.imageView.nativeObject;
        this.scrollView.maximumZoomScale = 3.0; //Default
        this.scrollView.setValueForKey(false, "bounces"); //Default
        this.scrollView.setValueForKey(false, "bouncesZoom"); //Default
        if (parseInt(System.OSVersion.split(".")[0]) >= 11) {
            this.scrollView.setValueForKey(2, "contentInsetAdjustmentBehavior");
        }

        this.scrollViewJSView = new View({ nativeObject: this.scrollView });
        let _frame = {};
        this.scrollView.addFrameObserver();
        //@ts-ignore
        this.scrollView.frameObserveHandler = (e) => {
            if ((JSON.stringify(_frame) != JSON.stringify(e.frame))) {
                this.calculateImageViewFrame(e.frame);
            }
        };
        if (!this.nativeObject) {
            this.nativeObject = this.scrollView;
        }
        Object.defineProperty(this.__ios, 'minimumNumberOfTouches', {
            get: () => {
                return this.scrollView.panGestureRecognizer.minimumNumberOfTouches;
            },
            set: (value) => {
                this.scrollView.panGestureRecognizer.minimumNumberOfTouches = value;
            },
            enumerable: true
        });

        Object.defineProperty(this.__ios, 'maximumNumberOfTouches', {
            get: () => {
                return this.scrollView.panGestureRecognizer.maximumNumberOfTouches;
            },
            set: (value) => {
                this.scrollView.panGestureRecognizer.maximumNumberOfTouches = value;
            },
            enumerable: true
        });

        Object.defineProperty(this.__ios, 'bounces', {
            get: () => {
                return this.scrollView.valueForKey("bounces");
            },
            set: (value) => {
                this.scrollView.setValueForKey(value, "bounces");
            },
            enumerable: true
        });

        Object.defineProperty(this.__ios, 'bouncesZoom', {
            get: () => {
                return this.scrollView.valueForKey("bouncesZoom");
            },
            set: (value) => {
                this.scrollView.setValueForKey(value, "bouncesZoom");
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
            for (let param in params) {
                //@ts-ignore
                proxy[param] = params[param];
            }
        }

        return proxy;
    }

    //@ts-ignore
    get imageFillType() {
        //@ts-ignore
        return this.imageView.nativeObject.contentMode;
    }

    set imageFillType(value) {
        //@ts-ignore
        this.imageView.nativeObject.contentMode = value;
        this.calculateImageViewFrame();
    }

    get minimumZoomScale(): number {
        return this.scrollView.minimumZoomScale;
    }

    set minimumZoomScale(value: number) {
        this.scrollView.minimumZoomScale = value;
    }

    get maximumZoomScale(): number {
        return this.scrollView.maximumZoomScale;
    }

    set maximumZoomScale(value: number) {
        this.scrollView.maximumZoomScale = value;
    }

    setZoomScale = (scale: any, animated: any) => {
        this.scrollView.setZoomScaleAnimated(scale, !!animated);
    }

    calculateImageViewFrame = (frame?: any) => {
        this.scrollView.zoomScale = 1;
        if (this.imageFillType === ImageView.FillType.ASPECTFILL || this.imageFillType === ImageView.FillType.STRETCH || this.imageFillType === ImageView.FillType.ASPECTFIT) {
            let innerFrame = frame || this.scrollView.frame;
            //@ts-ignore
            this.imageView.nativeObject.frame = innerFrame;
            this.scrollView.contentSize = { width: innerFrame.width, height: innerFrame.height };

        }
        //@ts-ignore
        else if (this.imageView.image && this.imageView.image.nativeObject && this.imageView.image.nativeObject.size) {
            let innerFrame = frame || this.scrollView.frame;
            let image = this.imageView.image as Image;
            let width = image.width < innerFrame.width ? innerFrame.width : image.width;
            let height = image.height < innerFrame.height ? innerFrame.height : image.height;
            //@ts-ignore
            this.imageView.nativeObject.frame = { x: 0, y: 0, width: width, height: height };
            this.scrollView.contentSize = { width: width, height: height };
            this.scrollView.contentOffset = { x: 0, y: 0 };
        }
    };
}
