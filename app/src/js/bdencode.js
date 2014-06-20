var bd09ll = {
	encode:function (coords) { 
		var x_pi = 3.14159265358979324 * 3000.0 / 180.0; 
		var x = coords.lng;
		var y = coords.lat; 
		var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi); 
		var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi); 
		bd_lon = z * Math.cos(theta) + 0.0065; 
		bd_lat = z * Math.sin(theta) + 0.006; 
		return {"lng":bd_lon,"lat":bd_lat};
	} ,
	decode:function (coords) { 
		var x_pi = 3.14159265358979324 * 3000.0 / 180.0; 
		var x = coords.lng - 0.0065;
		var y = coords.lat - 0.006; 
		var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi); 
		var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi); 
		gg_lon = z * Math.cos(theta); 
		gg_lat = z * Math.sin(theta); 
		return {"lng":gg_lon,"lat":gg_lat};
}};
