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
	}
}