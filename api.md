<a name="ZoomableImageView"></a>

## ZoomableImageView
**Kind**: global class  
**See**: http://ref.smartface.io/#!/api/UI.ImageView

ZoomableImageView is extention of [ImageView](http://ref.smartface.io/#!/api/UI.ImageView). This view component 
provides zooming ability based on gestures.

Note: There are some restirict which should be considered while implementing such as; 
- Maximum zoom scale number should be bigger than min & medium
- Minumum zoom scale number should be smaller than max & medium
- Medium zoom scale number should be middle of min & max as name is indicated.  
**Since**: 1.0  

* [ZoomableImageView](#ZoomableImageView)
    * [new ZoomableImageView(params)](#new_ZoomableImageView_new)
    * [.maximumZoomScale](#ZoomableImageView+maximumZoomScale) ⇒ <code>number</code>
    * [.minumumZoomScale](#ZoomableImageView+minumumZoomScale) ⇒ <code>number</code>
    * [.android](#ZoomableImageView+android) : <code>object</code>
        * [.mediumZoomScale](#ZoomableImageView+android.mediumZoomScale) ⇒ <code>boolean</code>
        * [.zoomEnabled](#ZoomableImageView+android.zoomEnabled) ⇒ <code>boolean</code>
    * [.setZoomScale(zoomScale, animation)](#ZoomableImageView+setZoomScale)

<a name="new_ZoomableImageView_new"></a>

### new ZoomableImageView(params)

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | init object |
| params.maximumZoomScale | <code>number</code> | defines maximum zoom scale |
| params.minumumZoomScale | <code>number</code> | defines minumum zoom scale |
| params.setZoomable | <code>boolean</code> | defines either view is zoomable or not |

**Example**  
```js
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
<a name="ZoomableImageView+maximumZoomScale"></a>

### zoomableImageView.maximumZoomScale ⇒ <code>number</code>
Gets/sets the maximumZoomScale of the ZoomableImageView. Pinching to zoom in the image is not allowed beyond of given float number.

**Kind**: instance property of [<code>ZoomableImageView</code>](#ZoomableImageView)  
**Default**: <code>3</code>  
**Since**: 1.0  
**Properties**

| Name | Type |
| --- | --- |
| maximumZoomScale | <code>number</code> | 

<a name="ZoomableImageView+minumumZoomScale"></a>

### zoomableImageView.minumumZoomScale ⇒ <code>number</code>
Gets/sets the minumumZoomScale of the ZoomableImageView. Pinching to zoom out the image is not allowed beyond of given float number.

**Kind**: instance property of [<code>ZoomableImageView</code>](#ZoomableImageView)  
**Default**: <code>1</code>  
**Since**: 1.0  
**Properties**

| Name | Type |
| --- | --- |
| minumumZoomScale | <code>number</code> | 

<a name="ZoomableImageView+android"></a>

### zoomableImageView.android : <code>object</code>
**Kind**: instance namespace of [<code>ZoomableImageView</code>](#ZoomableImageView)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| android | <code>object</code> | Used for android specific properties. |
| android.mediumZoomScale | <code>number</code> |  |
| android.setZoomable | <code>boolean</code> |  |


* [.android](#ZoomableImageView+android) : <code>object</code>
    * [.mediumZoomScale](#ZoomableImageView+android.mediumZoomScale) ⇒ <code>boolean</code>
    * [.zoomEnabled](#ZoomableImageView+android.zoomEnabled) ⇒ <code>boolean</code>

<a name="ZoomableImageView+android.mediumZoomScale"></a>

#### android.mediumZoomScale ⇒ <code>boolean</code>
Gets/sets the mediumZoomScale of the ZoomableImageView. This property defines how to zoom in while tapping double times.
Android specific property.

**Kind**: static property of [<code>android</code>](#ZoomableImageView+android)  
**Default**: <code>1.75</code>  
**Since**: 1.0  
**Properties**

| Name | Type |
| --- | --- |
| mediumZoomScale | <code>boolean</code> | 

<a name="ZoomableImageView+android.zoomEnabled"></a>

#### android.zoomEnabled ⇒ <code>boolean</code>
Gets/sets the zoomEnabled of the ZoomableImageView. Enables/Disables  zooming ability of the ZoomableImageView
Android specific property.

**Kind**: static property of [<code>android</code>](#ZoomableImageView+android)  
**Default**: <code>true</code>  
**Since**: 1.0  
**Properties**

| Name | Type |
| --- | --- |
| zoomEnabled | <code>boolean</code> | 

<a name="ZoomableImageView+setZoomScale"></a>

### zoomableImageView.setZoomScale(zoomScale, animation)
Sets the scale to zoom.

**Kind**: instance method of [<code>ZoomableImageView</code>](#ZoomableImageView)  
**Since**: 1.0  

| Param | Type | Description |
| --- | --- | --- |
| zoomScale | <code>number</code> | Scale number to zoom |
| animation | <code>boolean</code> | Enable/Disable animation while zooming |

