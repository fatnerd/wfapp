function bubbleSort(theArray)
{
  var i, j;
  for (i = theArray.length - 1; i >= 0; i--)
  {
    for (j = 0; j <= i; j++)
    {
      if (theArray[j+1] < theArray[j])
      {
        var temp = theArray[j];
        theArray[j] = theArray[j+1];
        theArray[j+1] = temp;
      }
    }
  }
  return theArray;
}
function bubbleSort2(theArray)
{
  var i, j;
  for (i = theArray.length - 1; i >= 0; i--)
  {
    for (j = 0; j <= i; j++)
    {
      if (theArray[j+1].distance < theArray[j].distance)
      {
        var temp = theArray[j];
        theArray[j] = theArray[j+1];
        theArray[j+1] = temp;
      }
    }
  }
  return theArray;
}

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
function distFiller(mlat,mlng,station,callback) {
	for (var i in station){
		station[i].distance=GetDistance(mlat,mlng,station[i].lat,station[i].lng);
	}
	var station2 = bubbleSort2(station);
	callback(station2);
}/*  WFiBike_app: Weifang Public Bicycle HTML5(Cross-Platform) App
    Copyright (C) 2014  js,w

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    Contact: l.lllkj@163.com  with a header contains "[pj_WFiBike_APP]"
*/
function Navitodetail(){
	var lat=document.getElementById('detaillat').value;
	var lng=document.getElementById('detaillng').value;
	var name=document.getElementById("detailname").innerHTML;
	if (useBMap){
    	window.open("baidumap://map/marker?location="+lat+","+lng+"&title=目标站点&content="+name+"&coord_type=gcj02&src=jsw|wfibikeapp");
	} else if (useAMap){
		window.open("iosamap://navi?sourceApplication=safari&backScheme=http&dlat="+lat+"&dlon="+lng+"&dname="+name+"&dev=0&t=4");
	} else {
		alert("您没有设置导航应用！");
		alert("debug comment:\nType to URL to set AMap: javascript:useAMap=true; \n likely on BMap \n Need Application");
	}
}
function getLocation(callback,unavailcallback){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(callback,unavailcallback);
  }
  else{console.log("Geolocation is not supported by this browser.");unavailcallback();}
}
/*  WFiBike_app: Weifang Public Bicycle HTML5(Cross-Platform) App
    Copyright (C) 2014  js,w

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    Contact: l.lllkj@163.com  with a header contains "[pj_WFiBike_APP]"
*/
$.ajaxSetup({cache:true,async:true});
function fillDetail(stationID) {
	showload("detload"); 
	detnow=stationID;
	$.getScript(loc_interface+"?id="+stationID,function() {
	   if (sessionStorage.withGPS=="true"){
		   	var mlat=sessionStorage.GPSlat;
			var mlng=sessionStorage.GPSlng;
			document.getElementById('detaildistance').innerHTML=GetDistance(mlat,mlng,isinglebike.station[0].lat,isinglebike.station[0].lng);
	   }else{document.getElementById('detaildistance').innerHTML="Unavailible";}
	   //Loading Static Map First
	   
	   $.getJSON("http://api.map.baidu.com/ag/coord/convert?from=2&to=4&x="+isinglebike.station[0].lng+"&y="+isinglebike.station[0].lat+"&callback=?",
		   function(data){
			   var newlng=window.atob(data.x);
			   var newlat=window.atob(data.y);
			   document.getElementById("detailstatmap").src="http://api.map.baidu.com/staticimage?center="+newlng+","+newlat+"&markers="+newlng+","+newlat+"&width=270&height=216&zoom=17&dpitype=ph";
			   }
		   );
	   
	   
	   //Static Map Finish
       document.getElementById('detailid').innerHTML = isinglebike.station[0].id;
	   document.getElementById('detailname').innerHTML = isinglebike.station[0].name;
	   document.getElementById('detaillat').value = isinglebike.station[0].lat;
	   document.getElementById('detaillng').value = isinglebike.station[0].lng;
	   document.getElementById('detailcapacity').innerHTML = isinglebike.station[0].capacity;
	   document.getElementById('detailadd').innerHTML = isinglebike.station[0].address;
	   //Bike Number Process Begin
	   document.getElementById('detailavail').innerHTML = isinglebike.station[0].availBike;
	   var bikeleft = isinglebike.station[0].capacity - isinglebike.station[0].availBike
	   document.getElementById('detailleft').innerHTML = bikeleft;
	   document.getElementById('detailli1').removeAttribute("class");
	   document.getElementById('detailli2').removeAttribute("class");
	   if (isinglebike.station[0].availBike <= 3) {
		   document.getElementById('detailli1').setAttribute("data-theme", "c");
		   }
	   else if ((isinglebike.station[0].availBike <= 6) && (isinglebike.station[0].availBike > 3)) {
		   document.getElementById('detailli1').setAttribute("data-theme", "e");
		   }
	   else { 
	   document.getElementById('detailli1').setAttribute("data-theme", "d");
	   } 
	   if (bikeleft <= 3) {
		   document.getElementById('detailli2').setAttribute("data-theme", "c");
		   }
	   else if ((bikeleft <= 6) && (bikeleft > 3)) {
		   document.getElementById('detailli2').setAttribute("data-theme", "e");
		   } 
	   else { document.getElementById('detailli2').setAttribute("data-theme", "d");}
	   $('#detailnumlist').listview('refresh');
	   hideload("detload");
   });
}
function refreshDetail(){
	fillDetail(detnow);
}

function fillList(){
	$('#mainload').text("从服务器上拉取数据......");
	document.getElementById("searchform").reset();
	$.getScript(loc_interface,function() {
		if (sessionStorage.withGPS=="true"){
			distFiller(sessionStorage.GPSlat, sessionStorage.GPSlng, ibike.station, fillListwPos);}
		else{fillListwoPos();}
	});
}
function fillListwPos(station){
        $('#mainload').text("正在呈现到列表上......");
		setTimeout(function(){
			var all1 = document.createDocumentFragment();
			for (var i in station) {
				var itemli = document.createElement("li");
				var itema = document.createElement("a");
				itema.setAttribute("href","#detail");
				itema.id="stat"+(station[i].id-1);
				itema.setAttribute("distance",station[i].distance);
				itema.setAttribute("ontouchstart",("fillDetail("+station[i].id+");"));
				itema.setAttribute("arrayid", (station[i].id-1));
				itema.innerHTML = station[i].id+". "+station[i].name+"&nbsp;&nbsp;&nbsp;&nbsp;"+"剩 "+station[i].availBike+" / "+(station[i].capacity-station[i].availBike)+" 空"
				itemli.appendChild(itema);
				all1.appendChild(itemli);
			}		
			document.getElementById('mainlist').innerHTML="";
			document.getElementById('mainlist').appendChild(all1);
			$("#mainlist").listview("refresh");
					hideload("mainload");},5);
}
function fillListwoPos(){

        $('#mainload').text("正在呈现到列表上......");
		setTimeout(function(){
			var all1 = document.createDocumentFragment();
			for (var i in ibike.station) {
				var itemli = document.createElement("li");
				var itema = document.createElement("a");
				itema.setAttribute("href","#detail");
				itema.id="stat"+(ibike.station[i].id-1);
				itema.setAttribute("ontouchstart",("fillDetail("+ibike.station[i].id+");"));
				itema.setAttribute("arrayid", (ibike.station[i].id-1));
				itema.innerHTML = ibike.station[i].id+". "+ibike.station[i].name+"&nbsp;&nbsp;&nbsp;&nbsp;"+"剩 "+ibike.station[i].availBike+" / "+(ibike.station[i].capacity-ibike.station[i].availBike)+" 空"
				itemli.appendChild(itema);
				all1.appendChild(itemli);
			}
			document.getElementById('mainlist').innerHTML="";
			document.getElementById('mainlist').appendChild(all1);
			$("#mainlist").listview("refresh");
			hideload("mainload");
		}, 5);
}
