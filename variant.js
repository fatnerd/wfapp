//Data Variant Set For ibike668 System.
var loc_interface = "http://218.93.33.59:85/map/wfmap/ibikeinterface.asp" //ibikeinterface location
function qroption(text,size){
	return {
 
	// render method: `'canvas'`, `'image'` or `'div'`
	render: 'canvas',
	// error correction level: `'L'`, `'M'`, `'Q'` or `'H'`
	ecLevel: 'Q',
	size: size,
	// content
	text: text,
	// quiet zone in modules
	quiet: 3,
	// modes
	// 0: normal
	// 1: label strip
	// 2: label box
	// 3: image strip
	// 4: image box
	mode: 4,
 
	mSize: 0.1,
	mPosX: 0.5,
	mPosY: 0.5,
	image: null ，
	fill: '#008000',
	background: null
	};
}