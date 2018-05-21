define([
    "js/cookie",
    "js/nav",
    "js/index.slider",
    "js/index_sroll_swiper",

    ],
    function(CookieMX,Nav,Slider,indexSwiperScoll){
        Nav.show();
        Nav.Nav_show();
        Slider.init(".slider_wrap");
        CookieMX.setcookie();
});
