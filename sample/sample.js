const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const ZoomableImageView = require("sf-extension-zoomable-imageview");

module.exports = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                this.statusBar.visible = true;
                this.headerBar.visible = true;
            },
            onLoad: function() {

                let myZoomableImageView = new ZoomableImageView({
                    image: "images://smartface.png",
                    width: 250,
                    height: 250
                });

                myZoomableImageView.minumumZoomScale = 0.5;
                myZoomableImageView.android.mediumZoomScale = 1;
                myZoomableImageView.maximumZoomScale = 1.2;

                this.layout.addChild(myZoomableImageView);
            }
        });
    }
);
