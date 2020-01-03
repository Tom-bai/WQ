<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<base href="<%=basePath%>"/> 
<title>投诉</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
<meta name="format-detection" content="telephone=no"/>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript">
    function submit(obj){
    	var messVal = $(obj)[0].id;
    	$.post('<%= path%>/JumpServlet?mothed=7','messval='+messVal,function(dat){
    		if(dat==1){
    			//window.location.href="http://weixin.baomaow.com/v/JumpServlet?mothed=6";
    		}
    	});
    	window.location.href="http://weixin.baomaow.com/v/JumpServlet?mothed=6";
    }
    
    function messge(){
    	window.location.href="http://weixin.baomaow.com/v/JumpServlet?mothed=5";
    }
</script>
<style>
body, div, dl, dt, dd, ul, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td, input {margin: 0;padding: 0}
* {margin: 0;padding: 0;font-weight: normal}
body {font:14px/1.5 微软雅黑, Arial, sans-serif; color:#000;}
body, ul, li {margin: 0 auto;padding: 0;}
ul li {list-style: none;}
li {list-style-type: none;}
ol, ul, dl {list-style: none;}
a {color:#000;text-decoration: none;}
a:hover {text-decoration: none;}
a img {border: none;}
b {font-weight: bold;}
img {border: 0}
input{ border:none;}
.clear {clear: both;}

.bigdiv{ width:100%;}
.title{ width: 92%; padding: 0 4%; color: #747474; height:38px; line-height:48px; }
.conlist{ width: 92%; padding: 0 4%; background-color:#fff; font-size:17px; border-top: 1px solid #E6E6E6; border-bottom: 1px solid #E6E6E6;}
.conlist ul li{ width: 100%; height:56px; line-height: 56px; border-top: 1px solid #E6E6E6; }
.conlist ul li span{ float: right; margin-top:20px;}
.conlist ul li span img{ width:16px; height: 16px;}
.notice{ width:100%; height: 14px; line-height: 14px; z-index:9; position:fixed; bottom:50px; text-align: center;}
.notice a{ color:#586693;}

</style>

</head>

<body style=" background-color:#EDEDED;">

<div class="bigdiv">
    <div class="title">请选择投诉该网页的原因：</div>
    <div class="conlist">
        <ul>
            <li onclick="submit(this)" id="欺诈" style="border-top:none;">网页包含欺诈信息（如：假红包）<span><img src="image/video/enter.png"/></span></li>
            <li onclick="submit(this)" id="违法">网页包含违法信息<span><img src="image/video/enter.png"/></span></li>
            <li onclick="submit(this)" id="谣言">网页可能包含谣言信息<span><img src="image/video/enter.png"/></span></li>
            <li onclick="submit(this)" id="诱导">网页包含诱导分享/关注性质的内容<span><img src="image/video/enter.png"/></span></li>
            <li onclick="submit(this)" id="拼团">网页包含（虚假/抽奖性质/欺诈）拼团信息<span><img src="image/video/enter.png"/></span></li>
            <li onclick="submit(this)" id="骚扰">网页包含不适当的内容对我造成骚扰<span><img src="image/video/enter.png"/></span></li>
            <li onclick="submit(this)" id="投票">网页包含有偿投票信息<span><img src="image/video/enter.png"/></span></li>
            <li onclick="submit(this)" id="隐私">网页包含隐私泄露风险<span><img src="image/video/enter.png"/></span></li>
        </ul>
    </div>
    <div class="notice"><a href="javascript:messge()">投诉须知</a></div>
</div>
</body>
</html>
