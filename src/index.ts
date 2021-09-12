import System from "@smartface/native/device/system";
import type ZoomableImageViewAndroid from './zoomableimageview-Android';
import type ZoomableImageViewIOS from './zoomableimageview-iOS';

const ZoomableImageView: typeof ZoomableImageViewAndroid & typeof ZoomableImageViewIOS = require(`./zoomableimageview-${System.OS}`);

export = ZoomableImageView;