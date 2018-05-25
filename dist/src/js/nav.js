define(["jquery"],function(){
    function Nav(){
        this.show();
        this.Nav_show();
    }
    Nav.prototype = {
        constructor : Nav,
        init(){
            /* this.Nav_show();*/
        },
        /*header图标hover效果*/
        show(){
            $(".jqshow_icon").mouseover(function () {
                $(".jqhidde_icon").css({display:"block"});
            }.bind(this));
            $(".header_center").mouseenter(function () {
                $(".jqhidde_icon").css({display:"none"});
            })
            $(".header_top").not(".header_bar_left").mouseenter(function () {
                $(".jqhidde_icon").css({display:"none"});
            })
            $(".jqshow_icon").parent().mouseleave(function () {
                $(".jqhidde_icon").css({display:"none"});
            })
        },
        /*导航菜单效果*/
        Nav_show(){
            this.nav_element = $(".header_nav ul li");
            this.nav_second_element = $(".secondary_nav_items");
            this.nav_elemwnt_warp = $(".header_center");
            for( var i=0 ; i < this.nav_element.length; i ++){
                +function (i) {
                    this.nav_element.eq(i).mouseover(function(){
                        this.nav_second_element.eq(i).show();
                        this.nav_second_element.eq(i).siblings().hide();
                    }.bind(this));
                    this.nav_second_element.eq(i).mouseleave(function(){
                        this.nav_second_element.eq(i).hide();
                    }.bind(this));
                    this.nav_elemwnt_warp.mouseover(function(){
                        this.nav_second_element.eq(i).hide();
                    }.bind(this));
                }.bind(this)(i)
            }
        }
    }
    return new Nav();
});
