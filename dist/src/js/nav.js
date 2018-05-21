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
            this.show_icon = $(".jqshow_icon");
            this.hidde_icon = $(".jqhidde_icon");
            for( var i = 0 ; i < this.show_icon.length; i ++){
                +function(i){
                    $(this.show_icon[i]).mouseover(function () {
                        $(this.hidde_icon[i]).show();
                    }.bind(this));
                    $(this.show_icon[i]).mouseout(function () {
                        $(this.hidde_icon[i]).hide();
                    }.bind(this));
                }.bind(this)(i)
                /* 一定要记着每一层绑定bind血泪的教训*/
            }
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
