

$(function () {
	window.gotoTop = function(options) {
		var defaults = {
			bottom: '100px'
		}
		var param = $.extend({},defaults,options)

	//准备结构
	var $gotoTopHtml = $(' <div class="backToTop"><img src="${options.imgUrl}" alt=""></div> ');

$gotoTopHtml.css({
	width: '30px',
    height: '50px',
    position: 'fixed',
    bottom: options.bottom,
    left: '610px',
    marginLeft: '50%',
    display: 'none',
})
/*返回顶部*/
//绑定滚动事件
$(document).scroll(function (){ 
    //获取距离顶部的位置
    var topDistance = $('html, body').scrollTop();
    //判断
    if (topDistance > 500) {
        $('.backToTop').fadeIn();
    }else{
        $('.backToTop').fadeOut();
    }
})
//返回顶部功能
$('.body').on('click','backToTop',function () {
    $('html, body').animate({
        scrollTop: 0
    }, 300)
})
$('body').append($gotoTopHtml)
}
})