window.onload = function(){
  var oBtn = document.getElementById('login');
  var oVideo = document.getElementById('getVideo');
  var oCommand = document.getElementById('no_command');
  var topMessage = document.getElementById('topMessage');
  var local_command = localStorage.getItem('command');
  if (local_command  == null) {
     topMessage.style.display='';
  }else {
     topMessage.style.display='none';
  }
  oCommand.onclick=function(){  
     topMessage.style.display='none';
     localStorage.setItem('command','yes');
  }
  oBtn.onclick=function(){
     mask.openmask();
      }
  oVideo.onclick=function(){
     mask.openVideo();
  }; 





//读取cookie
  var res = document.cookie.substring(5);
  var beforeLogin = document.getElementById('login');
  var afterLogin = document.getElementById('afterlogin');
  if (res === 'followSuc') {
     
     beforeLogin.style.display = 'none';
     afterLogin.style.display = '';
  }
  else{
     beforeLogin.style.display = '';
     afterLogin.style.display = 'none';
  }




// ajax信息渲染

//1.课程列表渲染
ajax({
  method : 'get',
  url : 'http://study.163.com/webDev/couresByCategory.htm',
  data : {
    'pageNo':'1',
    'psize':'20',
    'type':'10'
  },
  success : function (data) {
    var _data= JSON.parse(data);

    var oDiv = document.getElementById("okdklkd");

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

//右侧最热排行渲染

ajax({
  method : 'get',
  url : 'http://study.163.com/webDev/hotcouresByCategory.htm',
  data : {
    'pageNo': '',
    'psize':'',
    'type':''
  },
  success : function (data) {
    var _data= JSON.parse(data);

    var oDiv = document.getElementById("right_class");

    for(i=0;i<10;i++){
      var remenNum = Math.round(Math.random()*10)+Math.floor(Math.random()*10);
      var oUl = document.createElement("li");
      var _img = document.createElement("img");
      var _div = document.createElement("div");
      var _div_des = document.createElement("p");
      var _div_div = document.createElement("div");
      var _div_div_img = document.createElement("img");
      var _div_div_p = document.createElement("p");

      _img.setAttribute("src", _data[remenNum].smallPhotoUrl);
      _img.setAttribute("class","right-img");
      _div.setAttribute("class","jieshao");
      _div_des.innerHTML = _data[remenNum].name;
      _div_div_img.setAttribute("src","images/people.png");
      _div_div_p.innerHTML = _data[remenNum].learnerCount;
 
      _div_div.appendChild(_div_div_img);
      _div_div.appendChild(_div_div_p);

      _div.appendChild(_div_des);
      _div.appendChild(_div_div);
      oUl.appendChild(_img);
      oUl.appendChild(_div);
      oDiv.appendChild(oUl);
    }
  },
  async : true
});




// 编程语言、产品设计 - 切换逻辑
var _code = document.getElementById('codeLang');
var _productDesign = document.getElementById('productDesign');


//编程语言--onclick
_code.onclick = function(){
    var oDiv = document.getElementById("biancheng");
    var oBdiv = document.getElementById("okdklkd");
    oBdiv.style.display = 'none';
    oDiv.style.display = '';
    oDiv.innerHTML = '';
    _code.style.background = '#39a030';
    _productDesign.style.background = '#fff';
    ajax({
      method : 'get',
      url : 'http://study.163.com/webDev/couresByCategory.htm',
      data : {
        'pageNo':'1',
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


//产品设计 -- onclick
_productDesign.onclick = function(){
    var oDiv = document.getElementById("biancheng");
    var oBdiv = document.getElementById("okdklkd");
    oDiv.style.display = 'none';
    oBdiv.style.display = '';
    oBdiv.innerHTML = '';
    _code.style.background = '#fff';
    _productDesign.style.background = '#39a030';
    ajax({
      method : 'get',
      url : 'http://study.163.com/webDev/couresByCategory.htm',
      data : {
        'pageNo':'1',
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
}



}//window.onload  over





//不再提醒
function setLocalStorage(key,val){
  return localStorage.setItem(key,val);
}


//遮罩组件
var mask = {
  //登录遮罩
  openmask : function openmask(){
        var sHeight=document.body.scrollHeight,
            sWidth=document.body.scrollWidth;
        var wHeight=document.documentElement.clientHeight;

        var oMask=document.createElement("div");
            oMask.id="g-mask";
            oMask.style.height=sHeight+"px";
            oMask.style.width=sWidth+"px";
            document.body.appendChild(oMask);
        var mImg=document.createElement("div");
            mImg.id="g-mask-img" ;
            mImg.innerHTML=("<div id='loginForm'><div><span id='closeLogin'></span></div><legend>登录网易云课堂</legend><fieldset><label><input id='userName' name='userName' type='text' placeholder='账号'></label><label><input id='password' type='password' name='password' placeholder='密码'></label><button id='login_in'>登录</button></fieldset></div>") ;
            document.body.appendChild(mImg);
        
        var oLogin=document.getElementById('closeLogin')
        var mHeight=mImg.offsetHeight;
        var mWidth=mImg.offsetWidth;
        mImg.style.left=sWidth/2-mWidth/2+"px"; 
        mImg.style.top=wHeight/2-mHeight/2+"px"; 

        oLogin.onclick=function(){
        document.body.removeChild(oMask);
        document.body.removeChild(mImg);
        }

        var _login = document.getElementById('login_in');
        _login.onclick = function() {
          ajax({
            method : 'get',
            url : 'http://study.163.com/webDev/login.htm',
            data : {
                'userName': document.getElementById('userName').value,
                'password': MD5(document.getElementById('password').value)
            },
            success : function (data) {
            console.log(data.responseHeader)
            document.body.removeChild(oMask);
            document.body.removeChild(mImg);

            var beforeLogin = document.getElementById('login');
            var afterLogin = document.getElementById('afterlogin');
            beforeLogin.style.display = 'none';
            afterLogin.style.display = '';



            //添加cookie
            var oDate = new Date();
            oDate.setDate(oDate.getDate()+7);
            document.cookie = "name=followSuc;expires="+oDate;

            },
            async : true
          });
        }
      },
  //视频遮罩   
  openVideo : function openVideo(){
        var sHeight=document.body.scrollHeight,
            sWidth=document.body.scrollWidth;
        var wHeight=document.documentElement.clientHeight;
        
        var oMask=document.createElement("div");
            oMask.id="g-mask";
            oMask.style.height=sHeight+"px";
            oMask.style.width=sWidth+"px";
            document.body.appendChild(oMask);
        var mVideo=document.createElement("div");
            mVideo.id="g-mask-img" ;
            mVideo.innerHTML=("<div class='mask-video'><div><span id='closeVideo'></span></div><h3>请观看下面的视频</h3><video id='video' src='http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4' width='890' controls preload='auto'></video></div>") ;
            document.body.appendChild(mVideo);

            
        var closeVideo=document.getElementById('closeVideo');
        var mHeight=mVideo.offsetHeight;
        var mWidth=mVideo.offsetWidth;
        mVideo.style.left=sWidth/2-mWidth/2+"px"; 
        mVideo.style.top=wHeight/2-mHeight/2+"px"; 

         closeVideo.onclick=oMask.onclick=function(){
          document.body.removeChild(oMask);
          document.body.removeChild(mVideo);
         }
      }
}













//MD5
var MD5 = function (string) {
  
    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
  
    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
  
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
  
    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };
  
    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };
  
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    };
  
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
  
    string = Utf8Encode(string);
  
    x = ConvertToWordArray(string);
  
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  
    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }
  
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
  
    return temp.toLowerCase();
}

