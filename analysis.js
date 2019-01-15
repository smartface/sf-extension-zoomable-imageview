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
const ZoomableImageView = function() {};


/**
 * Gets/sets the maximumZoomScale of the ZoomableImageView. Pinching to zoom in the image is not allowed beyond of given float number.
 * @property {number}  maximumZoomScale
 * @since 1.0
 * @default
 * @return {number}
 */
ZoomableImageView.prototype.maximumZoomScale = 3.0;


/**
 * Gets/sets the minumumZoomScale of the ZoomableImageView. Pinching to zoom out the image is not allowed beyond of given float number.
 * @property {number}  minumumZoomScale
 * @since 1.0
 * @default
 * @return {number}
 */
ZoomableImageView.prototype.minumumZoomScale = 1;



/**
 * Sets the scale to zoom.
 * @method
 * @param {number} zoomScale - Scale number to zoom
 * @param {boolean} animation - Enable/Disable animation while zooming
 * @since 1.0
 * @default
 */
ZoomableImageView.prototype.setZoomScale = function(zoomScale , animation = false) {};



/**
 * @namespace
 * @property {object}  android    - Used for android specific properties.
 * @property {number}  android.mediumZoomScale 
 * @property {boolean}  android.setZoomable
 */
ZoomableImageView.prototype.android = {}

/**
 * Gets/sets the mediumZoomScale of the ZoomableImageView. This property defines how to zoom in while tapping double times.
 * Android specific property.
 *
 * @property {boolean}  mediumZoomScale
 * @since 1.0
 * @default
 * @return {boolean}
 */
ZoomableImageView.prototype.android.mediumZoomScale = 1.75;


/**
 * Gets/sets the zoomEnabled of the ZoomableImageView. Enables/Disables  zooming ability of the ZoomableImageView
 * Android specific property.
 * @property {boolean}  zoomEnabled
 * @since 1.0
 * @default
 * @return {boolean}
 */
ZoomableImageView.prototype.android.zoomEnabled = true;
