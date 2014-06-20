if (localStorage.isDebug===undefined){var isDebug=false;} else {var isDebug=localStorage["isDebug"];}
$(document).ready(function(){
	if (isDebug) {
		$(":mobile-pagecontainer").on("pagecontainerbeforetransition",function(){console.time("Transition");}).on("pagecontainertransition",function(){console.timeEnd("Transition");}); //page transition debugee
	}
});