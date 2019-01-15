const AndroidConfig = require("sf-core/util/Android/androidconfig.js");
const NativePhotoViewer = requireClass("com.github.chrisbanes.photoview.PhotoView");
const ImageView = require("sf-core/ui/imageview");
const extend = require("js-base/core/extend");

const ZoomableImageView = extend(ImageView)(
    function(_super, params) {
        params = params || {};
        if (!this.nativeObject)
            this.nativeObject = new NativePhotoViewer(AndroidConfig.activity);
        this.android = {};

        _super(this);

        const self = this;
        Object.defineProperties(this, {
            'maximumZoomScale': {
                get: function() {
                    return this.nativeObject.getMaximumScale();
                },
                set: function(maxScale) {
                    checkZoomLevels(this.minumumZoomScale, maxScale, this.android.mediumZoomScale);
                    this.nativeObject.setMaximumScale(float(maxScale));
                },
                enumerable: true
            },
            'minumumZoomScale': {
                get: function() {
                    return this.nativeObject.getMinimumScale();
                },
                set: function(minScale) {
                    checkZoomLevels(minScale, this.maximumZoomScale, this.android.mediumZoomScale);
                    this.nativeObject.setMinimumScale(float(minScale));
                },
                enumerable: true
            },
            'setZoomScale': {
                value: function(zoomScale, animation = false) {
                    this.nativeObject.setScale(zoomScale, animation);
                },
                enumerable: true
            }
        });

        Object.defineProperties(self.android, {
            'mediumZoomScale': {
                get: function() {
                    return self.nativeObject.getMediumScale();
                },
                set: function(medScale) {
                    checkZoomLevels(self.minumumZoomScale, self.maximumZoomScale, medScale);
                    self.nativeObject.setMediumScale(float(medScale));
                },
                enumerable: true
            },
            'zoomEnabled': {
                get: function() {
                    return self.nativeObject.isZoomEnabled();
                },
                set: function(value) {
                    self.nativeObject.setZoomable(value);
                },
                enumerable: true
            }
        });

        function checkZoomLevels(minZoom, maxZoom, midZoom) {
            if (minZoom >= midZoom) {
                throw new Error(
                    "Minimum zoom has to be less than Medium zoom. Assign appropriate value to  minumumZoomScale property ");
            }
            else if (midZoom >= maxZoom) {
                throw new Error(
                    "Medium zoom has to be less than Maximum zoom. Assign appropriate value to  maximumZoomScale property");
            }
        }

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);
module.exports = ZoomableImageView;
