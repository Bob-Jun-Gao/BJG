define([
    "js/cookie",
    "js/nav",
    // "js/show_ajax",
    "js/shopBag",
    "js/show_sroll_swiper",

],function(CookieMX,Nav,shopBag){
    CookieMX.init();
    CookieMX.shopbag();
    Nav.show();
    Nav.Nav_show();
    shopBag.init();
    shopBag.shopAddSub();
    // ShowData.init();
});