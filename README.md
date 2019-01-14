# ZoomableImageView Extension from Smartface
[![Twitter: @Smartface_io](https://img.shields.io/badge/contact-@Smartface_io-blue.svg?style=flat)](https://twitter.com/smartface_io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/smartface/sf-extension-amce/blob/master/LICENSE)
![npm version](https://img.shields.io/npm/v/sf-extension-amce.svg?style=flat)

An extension to ImageView component with Smartface Native Framework.

## Installation
ZoomableImageView Extension can be installed via npm easily from our public npm repository. The installation is pretty easy via Smartface Cloud IDE.

- Open terminals
- `(cd ~/workspace/scripts && npm i -S sf-extension-zoomableimageview)`
- Finally require the extension as: `require("sf-extension-zoomableimageview")`

## How to use
1) Create ZoomableImageView object and add to your page layout as child view.
```javascript
const ZoomableImageView = require("sf-extension-zoomable-imageview");

let myZoomableImageView = new ZoomableImageView({
width: 250,
height: 250
});
myZoomableImageView.image = "images://smartface.png";
myZoomableImageView.minumumZoomScale = 0.5; 
myZoomableImageView.android.mediumZoomScale = 1; 
myZoomableImageView.maximumZoomScale = 1.2; 

myPage.layout.addChild(myZoomableImageView); 
```
## Android 
Android uses third party to give zooming ablity credits on [PhotoView](https://github.com/chrisbanes/PhotoView) 

## API Documentation
Full api documentation is in [api.md](./api.md)

## Need Help?
Please [submit an issue](https://github.com/smartface/sf-extension-zoomable-imageview/issues) on GitHub and provide information about your problem.

## Support & Documentation & Useful Links
- [Guides](https://developer.smartface.io)
- [API Docs](http://ref.smartface.io)
- [Smartface Cloud Dashboard](https://cloud.smartface.io)

## Code of Conduct
We are committed to making participation in this project a harassment-free experience for everyone, regardless of the level of experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.
Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## License
This project is licensed under the terms of the MIT license. See the [LICENSE](./LICENSE) file. Within the scope of this license, all modifications to the source code, regardless of the fact that it is used commercially or not, shall be committed as a contribution back to this repository.
