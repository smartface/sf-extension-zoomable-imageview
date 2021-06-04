const AndroidConfig = require("sf-core/util/Android/androidconfig.js");
const NativePhotoViewer = requireClass(
  "com.github.chrisbanes.photoview.PhotoView"
);
const ImageView = require("sf-core/ui/imageview");

function ZoomableImageView() {
  if (!this.nativeObject) {
    this.nativeObject = new NativePhotoViewer(AndroidConfig.activity);
  }
  ImageView.apply(this, arguments);
}

ZoomableImageView.prototype = Object.create(ImageView.prototype);
ZoomableImageView.prototype.constructor = ZoomableImageView;

module.exports = ZoomableImageView;

Object.defineProperties(ZoomableImageView.prototype, {
  maximumZoomScale: {
    get: function () {
      return this.nativeObject.getMaximumScale();
    },
    set: function (maxScale) {
      checkZoomLevels(
        this.minimumZoomScale,
        maxScale,
        this.android.mediumZoomScale
      );
      this.nativeObject.setMaximumScale(float(maxScale));
    },
    enumerable: true,
  },
  minimumZoomScale: {
    get: function () {
      return this.nativeObject.getMinimumScale();
    },
    set: function (minScale) {
      checkZoomLevels(
        minScale,
        this.maximumZoomScale,
        this.android.mediumZoomScale
      );
      this.nativeObject.setMinimumScale(float(minScale));
    },
    enumerable: true,
  },
  setZoomScale: {
    value: function (zoomScale, animation = false) {
      this.nativeObject.setScale(zoomScale, animation);
    },
    enumerable: true,
  },
});

Object.defineProperties(ZoomableImageView.prototype.android, {
  mediumZoomScale: {
    get: function () {
      return self.nativeObject.getMediumScale();
    },
    set: function (medScale) {
      checkZoomLevels(self.minimumZoomScale, self.maximumZoomScale, medScale);
      self.nativeObject.setMediumScale(float(medScale));
    },
    enumerable: true,
  },
  zoomEnabled: {
    get: function () {
      return self.nativeObject.isZoomEnabled();
    },
    set: function (value) {
      self.nativeObject.setZoomable(value);
    },
    enumerable: true,
  },
});

function checkZoomLevels(minZoom, maxZoom, midZoom) {
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
