(function($,document,window){
	var lastload=document.getElementById("lastload");
	var loadstats=document.getElementById("loadstats");
	var currcity=document.getElementById("currcity");
	var totalcap=document.getElementById("totalcap");
	var totalavil=document.getElementById("totalavil");
	var cachetime=document.getElementById("cachetimer");
	var cachetimeemts;
	var cachetimesec=0;
	function updateCache(){
		$.getScript(loc_interface)
		.done(function( script, textStatus ) {
    		console.log(textStatus);
			loadstats.innerHTML=textStatus;
			var totalc=0;
			for (i in ibike.station){
				totalc+=ibike.station[i].capacity;
			}
			totalcap.innerHTML=ibike.station.length;
			totalavil.innerHTML=totalc;
			var date=new Date();
			var h=date.getHours();
			var m=date.getMinutes();
			var s=date.getSeconds();
			lastload.innerHTML=h+":"+m+":"+s;
			timerSet();
  		})
		.fail(function( jqxhr, settings, exception ) {
    		console.log(jqxhr.status);
			console.log(exception);
			loadstats.innerHTML="Error " + jqxhr.status;
			var errpack={
				status:jqxhr.status,
				url:settings.url,
				exception:exception
				};
			
		});
		
	}
	function timerSet(){
		cachetimesec=300;
		cachetimeemts=setInterval(timerCount,1000);
	}
	function timerCount(){
		if (cachetimesec>0){
			cachetimesec-=1;
			var minute=parseInt(cachetimesec/60);
			var second=cachetimesec % 60;
			cachetime.innerHTML=minute+":"+second;	
		} else {
			clearInterval(cachetimeemts);
			cachetimesec=0;
			if (localStorage["autoUpdateCache"]) {
				updateCache();
			} else {
				alert("缓存已过期！");
			}
		}
	}
	function timerEnd(){
		clearInterval(cachetimeemts);
		cachetimesec=0;
		cachetime.innerHTML="00:00";
	}
	//Expose
	window.cacheCtrl={};
	window.cacheCtrl.updateCache=updateCache;
	window.cacheCtrl.timerEnd=timerEnd;
})(jQuery,document,window);