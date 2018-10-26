// 请求
var ip = "http://test.eduijifen.com";
function getData(link, type, data, cb) {
    $.ajax({
        type: type,
        url: ip + link,
        data: data,
        success: function (s) {
            s=JSON.parse(s);
            cb(s)
        }
    })
}
//截取url数据方法
var getParam = function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};
//判断用户是否登录
function judgingLogon() {
    var user = localStorage.getItem("user");
    if(user==null){
        location.href="login.html"
    }
};
var userMessage = JSON.parse(localStorage.getItem("user"));

//发送验证码
var countdown = 60;
function sendemail(){
    var obj = $("button");
    settime(obj);

}
function settime(obj) { //发送验证码倒计时
    if (countdown == 0) {
        obj.attr('disabled',false);
        obj.html("重新获取");
        countdown = 60;
        return;
    } else {
        obj.attr('disabled',true);
        obj.html(countdown+"s");
        countdown--;
    }
    setTimeout(function() {
            settime(obj) }
        ,1000)
}
function sendCode(phone,type) {
    getData("/ajax/sms.ashx","post",{action:"getsmscode",accountid:phone,smstype:type},function (res) {
        if(res.success){
            sendemail()
            // alert("验证码发送成功");
        }else {
            alert(res.msg)
        }
    })
}
var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
