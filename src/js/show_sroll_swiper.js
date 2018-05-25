require(['jquery','swiper'], function (jquery,swiper){
    var swiperhot = new swiper('.product_hot_content', {
        speed:300,                            //设置滑动开始到结束的时间默认300
        slidesPerView: 4,                //容器能够同时显示的slides数量默认1
        slidesPerGroup : 4,                   //slider分组
        loop:'ture',

        navigation: {
            nextEl: '.hot_btn_next',
            prevEl: '.hot_btn_prev',
        },
    });

    var swiperlike = new swiper('.product_like_content', {
        speed:300,                            //设置滑动开始到结束的时间默认300
        slidesPerView: 4,                //容器能够同时显示的slides数量默认1
        slidesPerGroup : 4,                   //slider分组
        loop:'ture',

        navigation: {
            nextEl: '.like_btn_next',
            prevEl: '.like_btn_prev',
        },
    });

});

