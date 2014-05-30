function getLocation(callback,unavailcallback){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		$.getJSON("http://api.map.baidu.com/ag/coord/convert?from=0&to=2&x="+lng+"&y="+lat+"&callback=?",function(data){
			var newlng=window.atob(data.x);
			var newlat=window.atob(data.y);
			callback({"position":{"coords":{"latitude":newlat,"longitude":newlng}}});
			});
		}
	,unavailcallback);
  }
  else{console.log("Geolocation is not supported by this browser.");unavailcallback();}
}
