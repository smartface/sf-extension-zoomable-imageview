import AndroidConfig from "@smartface/native/util/Android/androidconfig.js";
//@ts-ignore
const NativePhotoViewer = requireClass(
    "com.github.chrisbanes.photoview.PhotoView"
);
import ImageView from "@smartface/native/ui/imageview"
import View from "@smartface/native/ui/view";

interface IAndroid {
    /**
     * Gets/sets the mediumZoomScale of the ZoomableImageView. This property defines how to zoom in while tapping double times.
     * Android specific property.
     *
     * @property {number}  mediumZoomScale
     * @since 1.0
     * @default
    */
     mediumZoomScale: number;
     /**
      * Gets/sets the zoomEnabled of the ZoomableImageView. Enables/Disables  zooming ability of the ZoomableImageView
      * Android specific property.
      * @property {boolean}  zoomEnabled
      * @since 1.0
      * @default
      * @return {boolean}
      */
     zoomEnabled: boolean;
}

export default class ZoomableImageView extends ImageView {
    nativeObject: any;
    __ios: Record<string, any> = {};
    constructor(args?: Partial<ImageView>) {
        super(args || {});
        this.nativeObject = new NativePhotoViewer(AndroidConfig.activity);
        //@ts-ignore
        this.android = {};
        //@ts-ignore
        this.ios = {};

        Object.defineProperties(this.android, {
            mediumZoomScale: {
              get:  () => {
                return this.nativeObject.getMediumScale();
              },
              set:  (medScale) => {
                checkZoomLevels(this.minimumZoomScale, this.maximumZoomScale, medScale);
                //@ts-ignore
                this.nativeObject.setMediumScale(float(medScale));
              },
              enumerable: true,
            },
            zoomEnabled: {
              get:  () => {
                return this.nativeObject.isZoomEnabled();
              },
              set:  (value) => {
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
    setZoomScale(zoomScale: number, animation: boolean = false) {
        this.nativeObject.setScale(zoomScale, animation)
    }
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
  