function getLocation(callback,unavailcallback){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(callback,unavailcallback);
  }
  else{console.log("Geolocation is not supported by this browser.");unavailcallback();}
}
