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
    var sUserAgent = navigator.userAgent.toLowerCase();   
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";     
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";    
    var bIsAndroid = sUserAgent.match(/android/i) == "android";     
function Navitodetail(){
	var lat=document.getElementById('detaillat').value;
	var lng=document.getElementById('detaillng').value;
		if (bIsIpad || bIsIphoneOs){
			var uri="iosamap://navi?sourceApplication=safari&backScheme=safari&dlat="+lat+"&dlon="+lng+"&dev=0&m=2&t=4";
			window.open(uri);
		}
		else if (bIsAndroid) {
			var uri="androidamap://route?sourceApplication=browser&dlat="+lat+"&dlon="+lng+"&dev=0&m=2&t=4&showType=1"
			window.open(uri); 
		}
		else {
			var uri="http://mo.amap.com/?&to="+lat+","+lng+"(目标站点)&type=0&opt=2&dev=0"
			window.open(uri);
		}
}