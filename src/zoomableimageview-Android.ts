import AndroidConfig from "@smartface/native/util/Android/androidconfig.js";
//@ts-ignore
const NativePhotoViewer = requireClass(
  "com.github.chrisbanes.photoview.PhotoView"
);
import ImageView from "@smartface/native/ui/imageview";
import View from "@smartface/native/ui/view";
import { IAndroid, IZoomable } from "./types/IZoomable";

export default class ZoomableImageView extends ImageView {
  nativeObject: any;
  __ios: any = {};
  scrollView: any;
  __animated = false;
  //@ts-ignore
  constructor(args?: Partial<ImageView> & IZoomable) {
    //@ts-ignore
    this.nativeObject = new NativePhotoViewer(AndroidConfig.activity);
    super(args || {});
    //@ts-ignore
    this.android = {};
    //@ts-ignore
    this.ios = {};
    if (args?.animated) {
      this.__animated = args.animated;
    }
    if (args?.zoomScale) {
      this.zoomScale = args.zoomScale;
    }

    Object.defineProperties(this.android, {
      mediumZoomScale: {
        get: () => {
          return this.nativeObject.getMediumScale();
        },
        set: (medScale) => {
          checkZoomLevels(
            this.minimumZoomScale,
            this.maximumZoomScale,
            medScale
          );
          //@ts-ignore
          this.nativeObject.setMediumScale(float(medScale));
        },
        enumerable: true,
      },
      zoomEnabled: {
        get: () => {
          return this.nativeObject.isZoomEnabled();
        },
        set: (value) => {
          this.nativeObject.setZoomable(value);
        },
        enumerable: true,
      },
    });
  }
  android: IAndroid & ImageView["android"];
  imageView = new ImageView();
  scrollViewJSView = new View();

  get maximumZoomScale(): number {
    return this.nativeObject.getMaximumScale();
  }
  set maximumZoomScale(maxScale: number) {
    checkZoomLevels(
      this.minimumZoomScale,
      maxScale,
      this.android.mediumZoomScale
    );
    //@ts-ignore
    this.nativeObject.setMaximumScale(float(maxScale));
  }
  get minimumZoomScale(): number {
    return this.nativeObject.getMinimumScale();
  }
  set minimumZoomScale(minScale: number) {
    checkZoomLevels(
      minScale,
      this.maximumZoomScale,
      this.android.mediumZoomScale
    );
    //@ts-ignore
    this.nativeObject.setMinimumScale(float(minScale));
  }
  get animated(): boolean {
    return this.__animated;
  }
  set animated(value: boolean) {
    this.__animated = value;
  }
  get zoomScale(): number {
    return this.nativeObject.getScale();
  }
  set zoomScale(value: number) {
    if (value > this.maximumZoomScale) {
      this.nativeObject.setScale(this.maximumZoomScale, this.animated);
    } else if (value < this.minimumZoomScale) {
      this.nativeObject.setScale(this.minimumZoomScale, this.animated);
    } else {
      this.nativeObject.setScale(value, this.animated);
    }
  }
  calculateImageViewFrame(frame?: any) {}
}

function checkZoomLevels(minZoom: number, maxZoom: number, midZoom: number) {
  if (minZoom >= midZoom) {
    throw new Error(
      "Minimum zoom has to be less than Medium zoom. Assign appropriate value to  minimumZoomScale property "
    );
  } else if (midZoom >= maxZoom) {
    throw new Error(
      "Medium zoom has to be less than Maximum zoom. Assign appropriate value to  maximumZoomScale property"
    );
  }
}
