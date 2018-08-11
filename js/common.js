/*rem*/
(function () {
    var t;

    function initHtmlFont() {
        var maxWidth = 750;
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        windowWidth = html.clientWidth > maxWidth ? maxWidth : html.clientWidth;
        html.style.fontSize = (windowWidth / 375) * 100 + 'px';
    }
    window.onresize = function () {
        clearTimeout(t);
        t = setTimeout(initHtmlFont, 250);
    }
    initHtmlFont();
})();

var ip = 'http://192.168.9.9';

function getURl(links, data, type, cb) {
    var id = checkStorage();
    var domImg = '';
    domImg += '<div class="loadimg">';
    domImg += '<img src="img/loading.gif" />';
    domImg += '</div>';
    $('body').append(domImg);
    $.ajax({
        type: type,
        url: ip + links,
        async: true,
        data: data,
        headers: {
            userid: id,
            type: 'web',
            platform: 6
        },
        success: function (s) {
            if (typeof (s) == 'object') {
                cb(s);
            } else {
                s = JSON.parse(s);
                cb(s);
            };
        },
        complete: function () {
            setTimeout(function () {
                $('.loadimg').remove();
            }, 500);
        },
        error: function (xhr, status) {
            if (xhr.status == 0) {
                setTimeout(function () {
                    location.reload();
                }, 300);
            }
        }
    });
}

function getData(links, data, cb) {
    getURl(links, data, 'get', function (s) {
        cb(s);
    });
};

function postData(links, data, cb) {
    getURl(links, data, 'post', function (s) {
        cb(s);
    });
};
//截取url数据方法
var getParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
