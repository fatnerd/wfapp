var mylat=0;
var mylng=0;
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
function getLocation(){
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(defPosition);
    }
  }
function defPosition(position)
  {
  mylat = position.coords.latitude;
  mylng = position.coords.longitude;
  }
  getLocation();