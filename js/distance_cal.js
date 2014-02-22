
function Rad(d){
       return d * Math.PI / 180.0;
    }
function GetDistance(lat1,lng1,lat2,lng2){
        var radLat1 = Rad(lat1); //mylat
        var radLat2 = Rad(lat2);
        var a = radLat1 - radLat2;
        var  b = Rad(lng1) - Rad(lng2); //mylng
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s *6378.137 ;
        s = Math.round(s * 10000) / 10000; 
		s = s * 1000; //to Meter
        //s=s.toFixed(4);
        return s;
}
function distFiller(point,station,callback) {
	var mlat=point.latitude;
	var mlng=point.longitude;
	for (var i in station){
		station[i].distance=GetDistance(mlat,mlng,station[i].lat,station[i].lng);
	}
	var station2 = bubbleSort2(station);
	callback(station2);
}