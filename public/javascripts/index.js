  // 百度地图API功能
/*var map = new BMap.Map("container");

var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
  if(this.getStatus() == BMAP_STATUS_SUCCESS){
    var mk = new BMap.Marker(r.point);
    map.addOverlay(mk);
    map.panTo(r.point);
    var point = new BMap.Point(r.point.lng,r.point.lat);
    map.centerAndZoom(point,25);    
  }else{
    alert('failed'+this.getStatus());
  }        
},{enableHighAccuracy: true})

  map.addEventListener("click",function(e){
    console.log(e);
  });
*/








// // 百度地图API功能
//     var map = new BMap.Map('container');
//     // var poi = new BMap.Point(116.307852,40.057031);
//     var h = 22.884473;
//     var w = 113.219156
//     var poi = new BMap.Point(w,h);
//     map.centerAndZoom(poi, 16);
//     map.enableScrollWheelZoom();

//     var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
//                     '<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
//                     '地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。' +
//                   '</div>';

//     //创建检索信息窗口对象
//     var searchInfoWindow = null;
//   searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
//       title  : "百度大厦",      //标题
//       width  : 290,             //宽度
//       height : 105,              //高度
//       panel  : "panel",         //检索结果面板
//       enableAutoPan : true,     //自动平移
//       searchTypes   :[
//         BMAPLIB_TAB_SEARCH,   //周边检索
//         BMAPLIB_TAB_TO_HERE,  //到这里去
//         BMAPLIB_TAB_FROM_HERE //从这里出发
//       ]
//     });
//     var marker = new BMap.Marker(poi); //创建marker对象
//     marker.enableDragging(); //marker可拖拽
//     marker.addEventListener("click", function(e){
//       searchInfoWindow.open(marker);
//     })
//     map.addOverlay(marker); //在地图中添加marker
//   //样式1
//   var searchInfoWindow1 = new BMapLib.SearchInfoWindow(map, "信息框1内容", {
//     title: "信息框1", //标题
//     panel : "panel", //检索结果面板
//     enableAutoPan : true, //自动平移
//     searchTypes :[
//       BMAPLIB_TAB_FROM_HERE, //从这里出发
//       BMAPLIB_TAB_SEARCH   //周边检索
//     ]
//   });
//   function openInfoWindow1() {
//     searchInfoWindow1.open(new BMap.Point(w,h));
//   }
//   openInfoWindow1();
//   //样式2
//   var searchInfoWindow2 = new BMapLib.SearchInfoWindow(map, "信息框2内容", {
//     title: "信息框2", //标题
//     panel : "panel", //检索结果面板
//     enableAutoPan : true, //自动平移
//     searchTypes :[
//       BMAPLIB_TAB_SEARCH   //周边检索
//     ]
//   });
//   function openInfoWindow2() {
//     searchInfoWindow2.open(new BMap.Point(w,h));
//   }
//   //样式3
//   var searchInfoWindow3 = new BMapLib.SearchInfoWindow(map, "信息框3内容", {
//     title: "信息框3", //标题
//     width: 290, //宽度
//     height: 40, //高度
//     panel : "panel", //检索结果面板
//     enableAutoPan : true, //自动平移
//     searchTypes :[
//     ]
//   });
//   function openInfoWindow3() {
//     searchInfoWindow3.open(new BMap.Point(w,h)); 
//   }









var mOption = {
    poiRadius : 1000,           //半径为1000米内的POI,默认100米
    numPois : 500                //列举出50个POI,默认10个
};


var map = new BMap.Map("container" , {enableMapClick:false});
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
  //movestart
  if(this.getStatus() == BMAP_STATUS_SUCCESS){
    var point = new BMap.Point(r.point.lng,r.point.lat);
    map.centerAndZoom(point,18);   
    map.enableScrollWheelZoom();        //启用滚轮缩放'
    displayPOI(point);
  }else{
    alert('failed'+this.getStatus());
  }        
},{enableHighAccuracy: true});

map.addEventListener("moveend",function(type, target){
  console.log(type);
  var res = map.clearOverlays();
  console.log(res);
  var point = new BMap.Point(type.currentTarget.ef.lng,type.currentTarget.ef.lat);
  displayPOI(point);
  // console.log(target);
});



//var mPoint = new BMap.Point(116.404, 39.915);
//map.centerAndZoom(mPoint, 16);

/*map.addEventListener("click",function(e){
    console.log(e);
  });
*/

function displayPOI(mPoint){
  // console.log(mOption);
var myGeo = new BMap.Geocoder();        //创建地址解析实例
   // map.addOverlay(new BMap.Circle(mPoint,500));        //添加一个圆形覆盖物
    myGeo.getLocation(mPoint,
        function mCallback(rs){
          // console.log(rs);
            var allPois = rs.surroundingPois;       //获取全部POI
            // console.log(allPois);
            for(var i=0;i<allPois.length;++i){
                addMark(allPois[i]);
            }
            //console.log(html);
        },mOption
    );
}

function addMark(allPois){
   var html = '';
    // html += "<p style='font-size:12px;'>" + (i+1) + "、" + allPois.title + ",地址:" + allPois.address + "</p>";
    //console.log(allPois[i]);
    var marker = new BMap.Marker(allPois.point);
    var sContent = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+allPois['title']+'</h4>';
    var infoWindow = new BMap.InfoWindow(sContent);
    marker.addEventListener("click", function(type, target){
         //请求服务器查询节点是否已经注册
         $.ajax({
          url:'/chat/info',
          data:"",
          type:"POST",
          dateType:"json",
          success:function(res){
            console.log(res);
          }

         });
         this.openInfoWindow(infoWindow);
         // //图片加载完毕重绘infowindow
         // document.getElementById('imgDemo').onload = function (){
         //   infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
         // }
      });
    map.addOverlay(marker); 
}
