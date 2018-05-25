define(['jquery','swiper'], function (jquery,swiper){
    var swiper = new swiper('.swiper_sroll_index', {
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true
        },
        speed:300,                            //设置滑动开始到结束的时间默认300
        slidesPerView: 'auto',                //容器能够同时显示的slides数量默认1
        loop:'ture',

        navigation: {
            nextEl: '.sale_next',
            prevEl: '.sale_prev',
        },
    });

});

