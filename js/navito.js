    var sUserAgent = navigator.userAgent.toLowerCase();   
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";     
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";    
    var bIsAndroid = sUserAgent.match(/android/i) == "android";     
function Navitodetail(){
	var lat=document.getElementById('detaillat').value;
	var lng=document.getElementById('detaillng').value;
		if (bIsIpad || bIsIphoneOs){
			var uri="iosamap://path?sourceApplication=safari&backScheme=safari&dlat="+lat+"&dlon="+lng+"&dev=0&m=2&t=4";
			window.open(uri);
		}
		else if (bIsAndroid) {
			var uri="androidamap://route?sourceApplication=browser&dlat="+lat+"&dlon="+lng+"&dev=0&m=2&t=4&showType=1"
			var intent = new Intent("android.intent.action.VIEW",android.net.Uri.parse(uri));  
            intent.setPackage("com.autonavi.minimap");  
            startActivity(intent);  
		}
		else {
			var uri="http://mo.amap.com/?&to="+lat+","+lng+"(目标站点)&type=0&opt=2&dev=0"
			window.open(uri);
		}
}