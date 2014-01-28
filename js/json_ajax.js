$.ajaxSetup({cache:true,async:true});
function fillDetail(stationID) {
	showload("detload"); 
	detnow=stationID;
	$.getScript("http://218.93.33.59:85/map/wfmap/ibikeinterface.asp?id=" + stationID,function() {
	   var detdist = document.getElementById('detaildistance').innerHTML;
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
	getLocation();
	$.getScript("http://218.93.33.59:85/map/wfmap/ibikestation.asp",function() {
		if (navigator.geolocation || (!mylat && !mylng)) {
		for (var i in ibike.station) {
			ibike.station[i].distance=GetDistance(mylat,mylng,ibike.station[i].lat,ibike.station[i].lng);
		}
		ibike.station = bubbleSort2(ibike.station)
		for (var i in ibike.station) {
			//TODO: Output
			var li = document.createElement("li");
			var a = document.createElement("a");
			a.setAttribute("href", "#detail");
			a.id="stat" + i
			a.onclick = fillDetail(ibike.station[i].id);
			a.innerHTML = ibike.station[i].id + ". " + ibike.station[i].name + "&nbsp;&nbsp;&nbsp;";
			li.appendChild(a);
			document.getElementById('mainlist').appendChild(li);
		}
		} else {
		ibike.station = bubbleSort(ibike.station);
		for (var i in ibike.station) {
			//TODO: Output
			var li = document.createElement("li");
			li.id = "mainli"+ibike.station[i].id;
			var a = document.createElement("a");
			a.setAttribute("href", "#detail");
			a.id="stat" + i
			a.onclick = fillDetail(ibike.station[i].id);
			a.innerHTML = ibike.station[i].id + ". " + ibike.station[i].name + "&nbsp;&nbsp;&nbsp;";
			li.appendChild(a);
			document.getElementById('mainlist').appendChild(li);
		}}
		//TODO get 5 amount.
		for (var j=0;j<5;j++) {
			var idbike = document.getElementById('stat'+i).parentNode.id
			idbike.replace(/mainli/,"");
			var uri="http://218.93.33.59:85/map/wfmap/ibikeinterface.asp?id=" + idbike;
			$.getScript(uri, function(){
				document.getElementById('stat'+i).innerHTML += "剩" + isinglebike.station[0].availBike + "&nbsp;空" + (isinglebike.station[0].capacity - isinglebike.station[0].availBike);
			});
		}
		});
}