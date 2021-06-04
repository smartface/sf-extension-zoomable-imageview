import ImageView from 'sf-core/ui/imageview';
import View from 'sf-core/ui/view';
/**
 * @class ZoomableImageView
 * @param {object} params - init object
 * @param {number} params.maximumZoomScale - defines maximum zoom scale
 * @param {number} params.minumumZoomScale - defines minumum zoom scale
 * @param {boolean} params.setZoomable - defines either view is zoomable or not
 * @since 1.0
 * @see http://ref.smartface.io/#!/api/UI.ImageView
 *
 * ZoomableImageView is extention of {@link http://ref.smartface.io/#!/api/UI.ImageView ImageView}. This view component 
 * provides zooming ability based on gestures.
 * 
 * Note: There are some restirict which should be considered while implementing such as; 
 * - Maximum zoom scale number should be bigger than min & medium
 * - Minumum zoom scale number should be smaller than max & medium
 * - Medium zoom scale number should be middle of min & max as name is indicated.
 *
 * @example
 * let myZoomableImageView = new ZoomableImageView({
 *     width: 250,
 *     height: 250
 * });
 * myZoomableImageView.image = "images://smartface.png";
 * myZoomableImageView.minumumZoomScale = 0.5; 
 * myZoomableImageView.android.mediumZoomScale = 1; 
 * myZoomableImageView.maximumZoomScale = 1.2; 
 *
 * myPage.layout.addChild(myZoomableImageView); 
 */
export default class ZoomableImageView extends ImageView {
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
   * Sets the scale to zoom.
   * @method
   * @param {number} zoomScale - Scale number to zoom
   * @param {boolean} animation - Enable/Disable animation while zooming
   * @since 1.0
   * @default
   */
  setZoomScale: (zoomScale: number, animation?: boolean) => void;

  android: View['Android'] & {
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

  ios: View['ios'] & {
    /**
     * Gets/sets the minimumNumberOfTouches of the ZoomableImageView.
     * iOS specific property.
     * @property {number}  minimumNumberOfTouches
     * @since 1.0
     * @default
     * @return {number}
     */
    minimumNumberOfTouches: number;

    /**
     * Gets/sets the maximumNumberOfTouches of the ZoomableImageView.
     * iOS specific property.
     * @property {number}  maximumNumberOfTouches
     * @since 1.0
     * @default
     * @return {number}
     */
    maximumNumberOfTouches: number;

    /**
     * Gets/sets the bounces of the ZoomableImageView.
     * iOS specific property.
     * @property {boolean}  bounces
     * @since 1.0
     * @default
     * @return {boolean}
     */
    bounces: boolean;

    /**
     * Gets/sets the bouncesZoom of the ZoomableImageView.
     * iOS specific property.
     * @property {boolean}  bouncesZoom
     * @since 1.0
     * @default
     * @return {boolean}
     */
    bouncesZoom: boolean;
  }
}

