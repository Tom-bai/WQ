<%@ page import="com.wechat.util.WeiXin"%>
<script type="text/javascript" src="js/jweixin-1.0.0.js"></script>
<%
  WeiXin wx=(WeiXin)request.getAttribute("wx");
%>
<script type="text/javascript">
	var weiXinConfig={};
	weiXinConfig.debug=true;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	weiXinConfig.appId='<%=wx.appId%>';// 必填，公众号的唯一标识
	weiXinConfig.timestamp='<%=wx.timestamp%>';// 必填，生成签名的时间戳   （当前时间）
	weiXinConfig.nonceStr='<%=wx.nonceStr%>';// 必填，生成签名的随机串   （任意字符串）
	weiXinConfig.signature='<%=wx.signature%>';// 必填，签名，见附录1  将jsapi_ticket、noncestr、timestamp 进行sha1签名
	weiXinConfig.jsApiList=[''];// 必填，需要使用的JS接口列表，所有JS接口列表见附录2	
</script>