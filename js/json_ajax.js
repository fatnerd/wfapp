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
	$.getScript("http://218.93.33.59:85/map/wfmap/ibikeinterface.asp?id=" + stationID,function() {
	   if (withGPS){
		   getLocation(function(position){
		   	var mlat=position.coords.latitude;
			var mlng=position.coords.longitude;
			document.getElementById('detaildistance').innerHTML=GetDistance(mlat,mlng,isinglebike.station[0].lat,isinglebike.station[0].lng);
		   },function(){
			   document.getElementById('detaildistance').innerHTML="Unavailible";
		   })
	   }else{document.getElementById('detaildistance').innerHTML="Unavailible";}
	   //Loading Static Map First
	   
	   $.getJSON("http://api.map.baidu.com/ag/coord/convert?from=2&to=4&x="+isinglebike.station[0].lng+"&y="+isinglebike.station[0].lat+"&callback=?",
		   function(data){
			   //var newdata=eval("("+data+")");
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
		   document.getElementById('detailli1').setAttribute("data-theme", "f");
		   }
	   else { 
	   document.getElementById('detailli1').setAttribute("data-theme", "d");
	   } 
	   if (bikeleft <= 3) {
		   document.getElementById('detailli2').setAttribute("data-theme", "c");
		   }
	   else if ((bikeleft <= 6) && (bikeleft > 3)) {
		   document.getElementById('detailli2').setAttribute("data-theme", "f");
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
	$('#mainload').text("Pending data from remote server......");
	document.getElementById('mainlist').innerHTML="";
	//getLocation();
	$.getScript("http://218.93.33.59:85/map/wfmap/ibikeinterface.asp",function() {
		getLocation(function(position){
			distFiller(position.coords, ibike.station, fillListwPos);
		},fillListwoPos);
	});
}
function fillListwPos(station){
        $('#mainload').text("Parsing to list(15s), wait patient......");
	    //some location stuff
		withGPS=true;
			for (var i in station) {
				var itemli = document.createElement("li");
				var itema = document.createElement("a");
				itema.setAttribute("href", "#detail");
				itema.id="stat"+(station[i].id-1);
				itema.setAttribute("distance",station[i].distance);
				itema.setAttribute("onclick",("fillDetail("+station[i].id+");"));
				itema.setAttribute("arrayid", (station[i].id-1));
				itema.innerHTML = station[i].id+". "+station[i].name+"&nbsp;&nbsp;&nbsp;&nbsp;"+"剩 "+station[i].availBike+" / "+(station[i].capacity-station[i].availBike)+" 空"
				itemli.appendChild(itema);
				document.getElementById('mainlist').appendChild(itemli);
				$("#mainlist").listview("refresh");
			}				hideload("mainload");
}
function fillListwoPos(){

        $('#mainload').text("Parsing to list(15s), wait patient......");
	    //some location stuff
		withGPS=false;
		setTimeout(function(){
			for (var i in ibike.station) {
				var itemli = document.createElement("li");
				var itema = document.createElement("a");
				itema.setAttribute("href", "#detail");
				itema.id="stat"+(ibike.station[i].id-1);
				itema.setAttribute("onclick",("fillDetail("+ibike.station[i].id+");"));
				itema.setAttribute("arrayid", (ibike.station[i].id-1));
				itema.innerHTML = ibike.station[i].id+". "+ibike.station[i].name+"&nbsp;&nbsp;&nbsp;&nbsp;"+"剩 "+ibike.station[i].availBike+" / "+(ibike.station[i].capacity-ibike.station[i].availBike)+" 空"
				itemli.appendChild(itema);
				document.getElementById('mainlist').appendChild(itemli);
				$("#mainlist").listview("refresh");
			}				hideload("mainload");
		}, 100);
}
