import View from "@smartface/native/ui/view";

export interface IAndroid {
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

export interface IIOS {
  /**
   * Gets/sets the minimumNumberOfTouches of the ZoomableImageView.
   * iOS specific property.
   * @property {number}  minimumNumberOfTouches
   * @since 1.0
   * @default
   * @return {number}
   */
  minimumNumberOfTouches?: number;

  /**
   * Gets/sets the maximumNumberOfTouches of the ZoomableImageView.
   * iOS specific property.
   * @property {number}  maximumNumberOfTouches
   * @since 1.0
   * @default
   * @return {number}
   */
  maximumNumberOfTouches?: number;

  /**
   * Gets/sets the bounces of the ZoomableImageView.
   * iOS specific property.
   * @property {boolean}  bounces
   * @since 1.0
   * @default
   * @return {boolean}
   */
  bounces?: boolean;

  /**
   * Gets/sets the bouncesZoom of the ZoomableImageView.
   * iOS specific property.
   * @property {boolean}  bouncesZoom
   * @since 1.0
   * @default
   * @return {boolean}
   */
  bouncesZoom?: boolean;
}

export interface IZoomable {
  /**
   * Gets/sets the maximumZoomScale of the ZoomableImageView. Pinching to zoom in the image is not allowed beyond of given float number.
   * @property {number}  maximumZoomScale
   * @since 1.0
   * @default
   * @return {number}
   */
  maximumZoomScale: number;

  /**
   * Gets/sets the minumumZoomScale of the ZoomableImageView. Pinching to zoom out the image is not allowed beyond of given float number.
   * @property {number}  minumumZoomScale
   * @since 1.0
   * @default
   * @return {number}
   */
  minimumZoomScale: number;

  /**
   * Gets/sets the scale to zoom. If it exceeds the minimum/maximum scale, minimum/maximum are set.
   * @property {number}  zoomScale
   * @since 4.0
   * @default
   * @return {number}
   */
  zoomScale: number;

  /**
   * Gets/sets animation while zooming
   * @property {boolean}  animated
   * @since 4.0
   * @default
   * @return {boolean}
   */
  animated: boolean;

  android: View["android"] & IAndroid;
  ios: View["ios"] & IIOS;
}
