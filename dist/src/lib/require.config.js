require.config({
    baseUrl: 'src',
    paths:{
        "jquery":"lib/jquery-3.3.1",
        "jquery.cookie":"lib/jquery.cookie",
        "pagination":"lib/jquery.pagination",
        "swiper":"lib/swiper.min"
        // "unslider":"lib/unslider"
    },
    // shim: {
    //     'swiper': ['jquery'],
    // }
    shim: {
        "jquery.cookie":{
            deps:["jquery"]
        },
        "swiper":{
            deps:["jquery"]
        }
    }
})
require(['jquery','swiper'], function (jquery,swiper){
    console.log(swiper);
});