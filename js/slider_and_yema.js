//轮播图实现
var oSlider = document.getElementById('slider');
var oPoint = document.getElementById('point');
var oA = oSlider.getElementsByTagName('a');
var oI = oPoint.getElementsByTagName('i');
var num = null;
var switchPic = function (){ 
        for(i=0;i<oI.length;i++){
            oI[i].style.background = '';
            banner_modal.startMove(oA[i], {"opacity": 0})
        }
        oI[num].style.background = '#333'
        banner_modal.startMove(oA[num], {"opacity": 100})  
    }
    for(i=0;i<oI.length;i++){
        oI[i].index = i;
        oI[i].onmouseover = function(){
            num = this.index;
            switchPic();
        }   
    }
    oSlider.onmouseover = function(){
            clearInterval(timer);
        }   
    oSlider.onmouseout = function(){
            timer = setInterval(autoPlay,5000)
    }
    var autoPlay = function(){
        if(num >= oI.length-1){
            num = 0;
        }else{
            num++;
        }
        switchPic();
    }
    var timer = setInterval(autoPlay,5000);


//轮播图逻辑实现
var banner_modal = {
  getStyle : function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj)[attr];
    }
  },
  startMove : function startMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true; //这一次运动就结束了——所有的值都到达了
        for (var attr in json) {
            //1.取当前的值
            var iCur = 0;

            if (attr == 'opacity') {
                iCur = parseInt(parseFloat(banner_modal.getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(banner_modal.getStyle(obj, attr));
            }

            //2.算速度
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            //3.检测停止
            if (iCur != json[attr]) {
                bStop = false;
            }

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }

        if (bStop) {
            clearInterval(obj.timer);

            if (fn) {
                fn();
            }
        }
    }, 30)
  }
}







//页码翻页逻辑实现

//定义模板容器
    var oDiv = document.getElementById("biancheng");
    var oBdiv = document.getElementById("okdklkd");
//页面切换时渲染页面
    var scott = document.getElementById('scott');
    var scott_item = scott.getElementsByTagName('a');
    var item_pre = document.getElementById('item_pre');
    var item_next = document.getElementById('item_next');
    var activeClass = 0;
    
    for(var i = 0;i<scott_item.length;i++){
      scott_item[i].index = i;
      scott_item[i].onclick = function(){
        for(var n=0;n<scott_item.length;n++){
          scott_item[n].className = "";
        }
        this.className = "yema-active";

        //判断在哪个课程目录里
        if (oBdiv.style.display === '') {
            xuanran.xuanran1(this.index);
        }
        else{
            xuanran.xuanran2(this.index)
        }

        return activeClass = this.index;
      }
    }
    item_pre.onclick = function() {
        if (activeClass == 0) {
          return;
        }
        activeClass -= 1;
        for(var n=0;n<scott_item.length;n++){
          scott_item[n].className = "";
          scott_item[activeClass].className = "yema-active";
         } 
         //判断在哪个课程目录里
         if (oBdiv.style.display === '') {
            xuanran.xuanran1(activeClass);
        }
        else{
            xuanran.xuanran2(activeClass)
        }
      }
    item_next.onclick = function() {
        if (activeClass == 7) {
          return;
        }
        activeClass += 1;
        for(var n=0;n<scott_item.length;n++){
          scott_item[n].className = "";
          scott_item[activeClass].className = "yema-active";
         } 
         //判断在哪个课程目录里

         if (oBdiv.style.display === '') {
            xuanran.xuanran1(activeClass);
        }
        else{
            xuanran.xuanran2(activeClass)
        }
      }




// 页面渲染功能定义
var xuanran = {
  xuanran1 : function xuanran1(valueNum){
    oBdiv.innerHTML = '';
    ajax({
      method : 'get',
      url : 'http://study.163.com/webDev/couresByCategory.htm',
      data : {
        'pageNo':valueNum,
        'psize':'20',
        'type':'10'
      },
      success : function (data) {
        var _data= JSON.parse(data);
        for(i=0;i<_data.list.length;i++){
          var oContent = document.createElement("div");
          oContent.setAttribute('class','s-content');
          oBdiv.appendChild(oContent);
          
          var _img = document.createElement("img");
          var _name = document.createElement("h2");
          var _categoryName = document.createElement("p");
          var _div = document.createElement("div");
          var _div_img = document.createElement("img");
          var _people = document.createElement("p");
          var _price = document.createElement("p");
        
          _img.setAttribute("src", _data.list[i].bigPhotoUrl);
          _div.setAttribute("class","howmanyPeople");
          _div_img.setAttribute("src","images/people.png");
          _people.innerHTML = _data.list[i].learnerCount;
          _price.setAttribute("class","money");
          _name.innerHTML=_data.list[i].name;
          _categoryName.innerHTML = _data.list[i].provider;
          _price.innerHTML="￥"+_data.list[i].price;

      
                    //hover dom添加
          var hover_div = document.createElement("div");
          hover_div.setAttribute("class","hoverdesign");
          var hover_img = document.createElement("img");
          hover_img.setAttribute("src", _data.list[i].bigPhotoUrl);
          var hover_div_manu = document.createElement("div");
          hover_div_manu.setAttribute("class","manu");
          var div_manu_h1 = document.createElement("h1");
          div_manu_h1.innerHTML = _data.list[i].name;
          var div_manu_div = document.createElement("div");
          div_manu_div.setAttribute("class","hover_div_top");
          var div_manu_div_img = document.createElement("img");
          div_manu_div_img.setAttribute("src","images/people.png");
          var manu_p1 = document.createElement("p");
          manu_p1.innerHTML = _data.list[i].learnerCount + "人在学";
          var p2 = document.createElement("p");
          p2.innerHTML = "发布者："+ _data.list[i].provider;
          var p3 = document.createElement("p");
          p3.innerHTML = "分类："+_data.list[i].categoryName;
          var des_div = document.createElement("div");
          des_div.setAttribute("class","description");
          var des_div_h3 = document.createElement("h3");
          des_div_h3.innerHTML = _data.list[i].description;

          hover_div_manu.appendChild(div_manu_h1);
          hover_div_manu.appendChild(div_manu_div);
          hover_div_manu.appendChild(p2);
          hover_div_manu.appendChild(p3);
          des_div.appendChild(des_div_h3);

          div_manu_div.appendChild(div_manu_div_img);
          div_manu_div.appendChild(manu_p1);
          
          hover_div.appendChild(hover_img);
          hover_div.appendChild(hover_div_manu);
          hover_div.appendChild(des_div);



               
          _div.appendChild(_div_img);
          _div.appendChild(_people);
          
          oContent.appendChild(_img);
          oContent.appendChild(_name);
          oContent.appendChild(_categoryName);
          oContent.appendChild(_div);
          oContent.appendChild(_price);
          oContent.appendChild(hover_div);
        }
      },
      async : true
    });
  },
  
  xuanran2 : function xuanran2(valueNum) {
    oDiv.innerHTML = '';
    ajax({
      method : 'get',
      url : 'http://study.163.com/webDev/couresByCategory.htm',
      data : {
        'pageNo':valueNum,
        'psize':'20',
        'type':'20'
      },
      success : function (data) {
        var _data= JSON.parse(data);
        for(i=0;i<_data.list.length;i++){
          var oContent = document.createElement("div");
          oContent.setAttribute('class','s-content');
          oDiv.appendChild(oContent);
          
          var _img = document.createElement("img");
          var _name = document.createElement("h2");
          var _categoryName = document.createElement("p");
          var _div = document.createElement("div");
          var _div_img = document.createElement("img");
          var _people = document.createElement("p");
          var _price = document.createElement("p");
        
          _img.setAttribute("src", _data.list[i].bigPhotoUrl);
          _div.setAttribute("class","howmanyPeople");
          _div_img.setAttribute("src","images/people.png");
          _people.innerHTML = _data.list[i].learnerCount;
          _price.setAttribute("class","money");
          _name.innerHTML=_data.list[i].name;
          _categoryName.innerHTML = _data.list[i].provider;
          _price.innerHTML="￥"+_data.list[i].price;


          //hover dom添加
          var hover_div = document.createElement("div");
          hover_div.setAttribute("class","hoverdesign");
          var hover_img = document.createElement("img");
          hover_img.setAttribute("src", _data.list[i].bigPhotoUrl);
          var hover_div_manu = document.createElement("div");
          hover_div_manu.setAttribute("class","manu");
          var div_manu_h1 = document.createElement("h1");
          div_manu_h1.innerHTML = _data.list[i].name;
          var div_manu_div = document.createElement("div");
          div_manu_div.setAttribute("class","hover_div_top");
          var div_manu_div_img = document.createElement("img");
          div_manu_div_img.setAttribute("src","images/people.png");
          var manu_p1 = document.createElement("p");
          manu_p1.innerHTML = _data.list[i].learnerCount + "人在学";
          var p2 = document.createElement("p");
          p2.innerHTML = "发布者："+ _data.list[i].provider;
          var p3 = document.createElement("p");
          p3.innerHTML = "分类："+_data.list[i].categoryName;
          var des_div = document.createElement("div");
          des_div.setAttribute("class","description");
          var des_div_h3 = document.createElement("h3");
          des_div_h3.innerHTML = _data.list[i].description;

          hover_div_manu.appendChild(div_manu_h1);
          hover_div_manu.appendChild(div_manu_div);
          hover_div_manu.appendChild(p2);
          hover_div_manu.appendChild(p3);
          des_div.appendChild(des_div_h3);

          div_manu_div.appendChild(div_manu_div_img);
          div_manu_div.appendChild(manu_p1);
          
          hover_div.appendChild(hover_img);
          hover_div.appendChild(hover_div_manu);
          hover_div.appendChild(des_div);


           
          _div.appendChild(_div_img);
          _div.appendChild(_people);
          
          oContent.appendChild(_img);
          oContent.appendChild(_name);
          oContent.appendChild(_categoryName);
          oContent.appendChild(_div);
          oContent.appendChild(_price);
          oContent.appendChild(hover_div);
        }
      },
      async : true
    });
  }
}


