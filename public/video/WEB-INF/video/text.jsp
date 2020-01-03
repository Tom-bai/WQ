<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<base href="<%=basePath%>"/> 
<title>投诉须知</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
<meta name="format-detection" content="telephone=no"/>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript">

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
.title{ width: 100%; text-align: center; line-height: 60px; font-size:18px; margin-top: 5px;}
.con{ width:90%; padding: 0 5%; line-height:24px; font-size: 15px;}
</style>

</head>

<body>

<div class="bigdiv">
    <div class="title">投诉须知</div>
    <div class="con">你应保证你的投诉行为基于善意，并代表你本人真实意思。腾讯作为中立的平台服务者，收到你投诉后，会尽快按照相关法律法规的规定独立判断并进行处理。腾讯将会采取合理的措施保护你的个人信息；除法律法规规定的情形外，未经用户许可腾讯不会向第三方公开、透露你的个人信息。</div>
</div>
</body>
</html>
