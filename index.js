if (Device.deviceOS === "iOS") {
  module.exports = require('./zoomableimageview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./zoomableimageview-Android');
}