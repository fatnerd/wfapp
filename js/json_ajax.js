function fillDetail(stationID) {
	req = new XMLHttpRequest();
	req.open("GET", "http://218.93.33.59:85/map/wfmap/ibikeinterface.asp?id=" + stationID, /*async*/true);
	req.onreadystatechange = detailHandler;
	req.send(/*no params*/null);
	showload("detload");
}
function detailHandler(){
	if (req.readyState == 4 /*complete*/) {
       var detid = document.getElementById('detailid').innerHTML;
	   var detname = document.getElementById('detailname').innerHTML;
	   var detaddr = document.getElementById('detailadd').innerHTML;
	   var detcapa = document.getElementById('detailcapacity').innerHTML;
	   var detdist = document.getElementById('detaildistance').innerHTML;
	   var detcoloravail = document.getElementById('detailli1');
	   var detcolorleft = document.getElementById('detailli2');
	   var detavail = document.getElementById('detailavail').innerHTML;
	   var detleft = document.getElementById('detailleft').innerHTML;
	   var detlat = document.getElementById('detaillat').value;
	   var detlng = document.getElementById('detaillng').value;
       var singlebike = eval('(' + removeHeader(req.responseText) + ')');
       detid = singlebike.station[0].id;
	   detname = singlebike.station[0].name;
	   detlat = singlebike.station[0].lat;
	   detlng = singlebike.station[0].lng;
	   detcapa = singlebike.station[0].capacity;
	   detaddr = singlebike.station[0].address;
	   //Bike Number Process Begin
	   detavail = singlebike.station.availBike;
	   detleft = detcapa - detavail;
	   if (detavail <= 2) {detcoloravail.setAttribute("data-theme", "c");}
	   else if ((detavail <= 5) && (detavail > 2)) {detcoloravail.setAttribute("data-theme", "f");}
	   else { detcoloravail.setAttribute("data-theme", "d");} 
	   if (detleft <= 2) {detcolorleft.setAttribute("data-theme", "c");}
	   else if ((detleft <= 5) && (detleft > 2)) {detcolorleft.setAttribute("data-theme", "f");} 
	   else { detcolorleft.setAttribute("data-theme", "d");}
	   hideload("detload"); 
   }
}