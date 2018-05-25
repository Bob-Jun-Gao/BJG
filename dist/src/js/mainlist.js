define([
    "js/cookie",
    "js/nav",
    "js/list_siderbar",
    "js/list_ajax"
],function(CookieMX,Nav,Siderbar,ListData){
    CookieMX.init();
    Nav.show();
    Nav.Nav_show();
    Siderbar.init();
    ListData.init();
});
// define(["js/slider"],function(Slider){
//
// });