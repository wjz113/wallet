
  //调整页面div的大小
  //获取当前窗口的高度和宽度
    var content=document.querySelector("#content");
    var daohanglan=document.querySelector("#daohanglan");
	var r_ul=document.querySelector("#r_ul");
	var r_content=document.querySelector("#r_content");
    var list=r_content.getElementsByTagName("li");
	var winWidth = 0;
	var winHeight = 0;
	function winSize() //函数：获取尺寸
	{
	//获取窗口宽度
	if (window.innerWidth)
	{
		winWidth = window.innerWidth;
	}
	else if ((document.body) && (document.body.clientWidth))
	{
		winWidth = document.body.clientWidth;
	}
	//获取窗口高度
	if (window.innerHeight)
	{
		winHeight = window.innerHeight;
	}
	else if ((document.body) && (document.body.clientHeight))
	{
		winHeight = document.body.clientHeight;
	}
	//兼容IE7以下的浏览器
	if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth)
	{
	winHeight = document.documentElement.clientHeight;
	winWidth = document.documentElement.clientWidth;
	}
	//获取得到的宽度和高度
   
	content.style.width= winWidth*1+'px';
	r_content.style.width=winWidth*0.8+'px';
	r_ul.style.width=winWidth*0.8+'px';

	daohanglan.style.width=winWidth*0.1+'px';
	r_content.style.left=winWidth*0.1+2+'px';
    

	}
	winSize();
	//调用函数，获取数值
	window.onresize=winSize;
    
    //导航栏标签的跳转
    var daolist=daohanglan.getElementsByTagName("li");

    for(var i=0;i<daolist.length;i++)
    {  
        daolist[i].index=i;
    	daolist[i].onclick=function()
    	{
            for(var i=0;i<list.length;i++)
            {
            	list[i].style.display='none';

            }
            list[this.index].style.display="block";
    	}
    }

 
 //发送和接受数据


//注册功能

var send=document.getElementById('send');
var privateKey;

send.onclick=function(){
var password=document.getElementById('password').value;
        console.log(password);
	if(password.length<9)
	{
		
		alert('输入的密码不足9位，请继续输入！');
		return;
	}
	else
	{
		createPassword();
	}
}

//创建密码时提交的数据
function createPassword()
{
	 //兼容代码
      if(window.XMLHttpRequest)
      {
      	  var xhr= new  XMLHttpRequest();
      }
      else
      {
      	  //IE6
      	  var xhr= new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.open("GET","user.json?password="+password,true);   //第二个参数是与后台对接的地址
      xhr.send();     //向后台传输所创建的password

      //接受成功，并执行下一步
      xhr.onreadystatechange=function(data){
      	if(xhr.readyState==4&&xhr.status==200)
      	{
               var newLi='<h1 class="baocun">保存你的Keystore或者私钥。不要忘记你的密码。</h1><div id="download">下载 Keystore File (UTC/JSON)</div><span style="opacity:0.8;margin-top:60px;">**不要失去它！**如果你失去它就无法恢复。</span><span  style="opacity:0.8">**不要分享！**如果您在恶意/网络钓鱼网站上使用此文件，您的资金将被盗。</span><span  style="opacity:0.8">**做一个备份！**确保它有可能有一天价值数百万美元。</span><div id="continued">下一步</div>';  
              list[0].innerHTML=newLi;
              document.getElementById('download').addEventListener('click',downloadFile);
              window.continued=document.getElementById("continued");
              
      	}
      }
}


//下载文件时提交的数据
function downloadFile(){
	//兼容代码
      if(window.XMLHttpRequest)
      {
      	  var xhr= new  XMLHttpRequest();
      }
      else
      {
      	  //IE6
      	  var xhr= new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open("GET","user.json",true);   //第二个参数是与后台对接的地址
      xhr.send();
      xhr.onreadystatechange=function(data){
      	if(xhr.readyState==4&&xhr.status==200)
      	{
               continued.style.opacity='1';
               privateKey=data.key;      //接受后台返回的privateKey
               // window.open("");          //此处接受后台下载文件的地址
               document.getElementById('continued').addEventListener('click',nextStep);
      	}
      }
}

//点击下一步时提交的数据
function nextStep()
{
	//兼容代码
      if(window.XMLHttpRequest)
      {
      	  var xhr= new  XMLHttpRequest();
      }
      else
      {
      	  //IE6
      	  var xhr= new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open("GET","user.json",true);   //第二个参数是与后台对接的地址
      xhr.send();
      xhr.onreadystatechange=function(data){
      	if(xhr.readyState==4&&xhr.status==200)
      	{

              privateKey=JSON.parse(xhr.responseText);
              //展示privateKey,并提醒保存
              var newLi=`<h1 style="text-align:center;margin-top:90px;">Save Your <span style="width:215px;background: skyblue;">Private Key.</span></h1><div id="pKey"></div><span style="opacity:0.8;margin-top:30px;">**不要失去它！**如果你失去它就无法恢复。</span><span  style="opacity:0.8">**不要分享！**如果您在恶意/网络钓鱼网站上使用此文件，您的资金将被盗。</span><span  style="opacity:0.8">**做一个备份！**确保它有可能有一天价值数百万美元。</span>`;
              var pKey=document.getElementById('pKey');
              // pKey.innerHTML=privateKey;    //将private key 显示出来
              list[0].innerHTML=newLi;
      	}
      }
}
 

//查询功能

//监听转账和查询余额点击事件，进行交互
 document.getElementById('balance').addEventListener('click',balanced);
 var address;
 var address1;  
 var timer;
 var address2;
 var checkPage;
function balanced()
{
	///清空li里面的节点
    var accounts=document.getElementById('accounts');
    this.parentNode.parentNode.removeChild(accounts);
    //添加新的节点进入li中
    var newLi=`<div style="text-align:center;" id="checkPage"><span style="font-size:25px;font-weight:bold;margin-top:90px;">粘贴/输入您的地址进行查询余额</span><textarea cols='60' rows='7' style="resize:none;margin-top:20px;" id="address" ></textarea></div><div id="check">查看</div>`;
    list[1].innerHTML=newLi;
    
    //监听textarea的粘贴/输入事件，进行判断粘贴/输入的是否为地址
    document.getElementById('address').addEventListener('keyup',enterAddress);
    document.getElementById('address').addEventListener('paste',enterAddress);
  
    
    address=document.getElementById('address');
    checkPage=document.getElementById('checkPage');

}

//输入地址时执行提交的数据
function enterAddress()
{   
    //更新用户输入的地址，方便后面进行判断
	timer=setInterval(function(){
         address1=address.value;
         // console.log(address1);
     },500)
 
	//兼容代码
      if(window.XMLHttpRequest)
      {
      	  var xhr= new  XMLHttpRequest();
      }
      else
      {
      	  //IE6
      	  var xhr= new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open("GET","user.json?address="+address1,true);   //第二个参数是与后台对接的地址
      xhr.send();
      xhr.onreadystatechange=function(data){
      	if(xhr.readyState==4&&xhr.status==200)
      	{ 
      		//接受后台返回的地址
      		 address2=JSON.parse(xhr.responseText);
             //如果后台中有这个地址，就进行查询，并返回前端,并关闭计时器
            if(address2==address1)
            {
            	//关闭定时器
                clearInterval(timer);
                //如果正确显示查看按钮
                check.style.display="block";
           
                //创建查看的点击事件
                document.getElementById('check').addEventListener('click',checked);
                window.check=document.getElementById("check");
            }
            else
            {
            	alert("输入的地址有误，请重新输入");
            }
      	}
      }
 
}

//查看余额点击事件

function checked(){
     
      //记录节点
      var that=this;
      //兼容代码
       
      if(window.XMLHttpRequest)
      {
      	  var xhr= new  XMLHttpRequest();
      }
      else
      {
      	  //IE6
      	  var xhr= new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open("GET","user.json",true);   //第二个参数是与后台对接的地址
      xhr.send();
      xhr.onreadystatechange=function(data){
      	if(xhr.readyState==4&&xhr.status==200)
      	{ 
      		//接受后台返回的余额
      		 address3=JSON.parse(xhr.responseText);
             that.parentNode.removeChild(checkPage);
             that.parentNode.removeChild(check);
             //将余额显示在页面中
             var newLi=`<div id="balancePage"><h3>账户地址:${address2}<h3><font class="font">${address3}</font></div>`;
             list[1].innerHTML=newLi;
      	}
      }
}


//转账功能

var transfer=document.getElementById('transfer');
transfer.addEventListener('click',transferred);
var private;
var unlock;
var transferPage;
//点击转账按钮执行的函数
function transferred ()
{ 
       this.parentNode.removeChild(transfer);
       var newLi=`<div style="text-align:center;" id="transferPage"><span style="font-size:25px;font-weight:bold;margin-top:90px;">粘贴/输入您的私钥进行转账</span><textarea cols='60' rows='7' style="resize:none;margin-top:20px;" id="private" ></textarea></div><div id="unlock">解锁</div>`;
       list[2].innerHTML=newLi;

       //创建监听粘贴/输入的事件
       private=document.getElementById('private');
       private.addEventListener('keyup',enterPrivateKey);
       private.addEventListener('paste',enterPrivateKey);     
       transferPage=document.getElementById('transferPage');
       unlock=document.getElementById('unlock');

}


var privateKey1;
var privateKey2;
var timer1;
//粘贴/输入时事件执行的函数
function enterPrivateKey()
{
     
    //更新用户输入的地址，方便后面进行判断
	timer1=setInterval(function(){
         privateKey1=private.value;
         console.log(privateKey1);
     },500)

	//兼容代码
      if(window.XMLHttpRequest)
      {
      	  var xhr= new  XMLHttpRequest();
      }
      else
      {
      	  //IE6
      	  var xhr= new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open("GET","user.json",true);   //第二个参数是与后台对接的地址
      xhr.send();
      xhr.onreadystatechange=function(data){
      	if(xhr.readyState==4&&xhr.status==200)
      	{ 
      		//接受后台返回的密钥
      		 privateKey2=JSON.parse(xhr.responseText);
             //如果后台中有这个密钥，就进行查询，并返回前端,并关闭计时器
            if(privateKey2==privateKey1)
            {
            	//关闭定时器
                clearInterval(timer1);
                //如果正确显示解锁按钮
                unlock.style.display="block";
           


                
                 //创建解锁点击事件
                 unlock.addEventListener('click',unlockPage);



            }
            else
            {
            	alert("输入的地址有误，请重新输入");
            }
      	}
      }

}


var transaction;
var otherAddress;
var otherAddress1;
var amount;
var amount1;
var gasLimit;
var gasLimit1;
var data0;
var data1;
var timer2;
//点击解锁事件执行的函数
function unlockPage()
{
	//记录节点
	var that=this;
	// console.log(this.parentNode);
	//清空节点
	this.parentNode.removeChild(transferPage);
	this.parentNode.removeChild(unlock);
    //创建新的节点
    var newLi=`<div id="table0"><table><tbody><tr><td><span>发送至地址:</span><br><input type="text" id="otherAddress"></td></tr><tr><td><span>转账数额:</span><br><input type="text" id="amount"></td></tr><tr><td><span>气体限制:</span><br><input type="text" id="gasLimit"></td></tr><tr><td><span>数据:</span><br><input type="text" id="data0"></td></tr><tr><td><span id="transaction">生成交易</span></td></tr></tbody></table></div>`;
    list[2].innerHTML=newLi;
   

    //获取转账页面的标签
    transaction=document.getElementById('transaction');

    otherAddress=document.getElementById('otherAddress');
    amount=document.getElementById('amount');
    gasLimit=document.getElementById('gasLimit');
    data0=document.getElementById('data0');

    //给每一个登录框加上粘贴/输入事件
	otherAddress.addEventListener('keyup',getDatas);
	otherAddress.addEventListener('paste',getDatas);

	amount.addEventListener('keyup',getDatas);
	amount.addEventListener('paste',getDatas);

	gasLimit.addEventListener('keyup',getDatas);
	gasLimit.addEventListener('paste',getDatas);

	data0.addEventListener('keyup',getDatas);
	data0.addEventListener('paste',getDatas);
    

    //给生成交易注册点击事件
    transaction.addEventListener('click',startTransaction)

}


//获取转账输入框里的数据的函数
function getDatas()
{

    timer2=setInterval(function(){
         otherAddress1=otherAddress.value;
         amount1=amount.value;
         gasLimit1=gasLimit.value;
         data1=data0.value;
         
    },500);
}


function startTransaction ()
{
	// console.log(1);
	//兼容代码
      if(window.XMLHttpRequest)
      {
      	  var xhr= new  XMLHttpRequest();
      }
      else
      {
      	  //IE6
      	  var xhr= new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open("GET","user.json?otherAddress1="+otherAddress1+"&amount1="+amount1+"&gasLimit1="+gasLimit1+"&data1="+data1,true);   //第二个参数是与后台对接的地址,?后为传向后台的数据
      xhr.send();
      xhr.onreadystatechange=function(data){
      	if(xhr.readyState==4&&xhr.status==200)
      	{ 
            var dataTrue=JSON.parse(xhr.responseText);
      		if (dataTrue) 
      		{
               //关闭计时器
               clearInterval(timer2);
               showForm();
      		}
      		else
      		{
      			alert('请检查您的余额或输入的地址有误！');
      		}
      	   
           
      	}
      
      }
}

var login=document.getElementById('login');
var login_title=document.getElementById('login_title');
var login_content=document.getElementById('login_content');
var login_button=document.getElementById('login_button');
var login_bg=document.getElementById('login_bg');

//展示继续交易时的界面，执行的函数
function showForm()
{
	//显示界面
   login.style.display='block';
   login_bg.style.display='block';
   //为界面关闭按钮注册点击事件
   login_title.addEventListener('click',closeShow);
   //为继续交易注册事件
   login_button.addEventListener('click',successTransaction);
   
}

//关闭按钮执行的函数
function closeShow ()
{
   //隐藏界面
   login.style.display='none';
   login_bg.style.display='none';

}

//继续交易执行的函数
function successTransaction()
{
	//记录节点
	var that=this;
     if(window.XMLHttpRequest)
      {
      	  var xhr= new  XMLHttpRequest();
      }
      else
      {
      	  //IE6
      	  var xhr= new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open("GET","user.json",true);   //第二个参数是与后台对接的地址,?后为传向后台的数据
      xhr.send();
      xhr.onreadystatechange=function(data){
      	if(xhr.readyState==4&&xhr.status==200)
      	{ 
      		var dataTrue=JSON.parse(xhr.responseText);
      		// that.parentNode.removeChild(login_content);
      		// that.parentNode.removeChild(login_button);
        //     var newContent='<div id="success1">交易成功</div>';
        //     that.parentNode.appendChild(newContent);
        alert('交易成功');
        //刷新界面
        history.go(0);
      	}
      
      }
}