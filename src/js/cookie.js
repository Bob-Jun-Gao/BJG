define(["jquery","jquery.cookie"],function(){
    function CookieMX(){
    }
    CookieMX.prototype = {
        construct:CookieMX,
        init(){
            this.setcookie();
            this.getBagcookie();
        },
        /*判断是不是存在指定的cookie模拟登录状态*/
        setcookie(){
            if($.cookie("meixi_user")){
                var meixiuser = $.cookie("meixi_user");
                    meixiuser = $.parseJSON(meixiuser);
                this.username = meixiuser.username;
                console.log(this.username);
                /*有则记录登录状态显示用户名*/
                $(".user").css({display:"none"});
                $(".user_login").css({display:"block"});
                $(".user_login").text(this.username);

            }else{
                this.username = "";
                /*没登录时购物袋显示登录提示*/
                $(".bagNtip").css({display:"block"});
                $(".bag_login").css({display:"inline-block"});
                return 0;
            }
        },
        // 获取显示购物袋有几个商品类型
        getBagcookie(){
            if(this.username){
                var BagCookieName = "BagCookie" + this.username;
                if($.cookie(BagCookieName)){
                    this.BagNum = Object.keys(JSON.parse($.cookie(BagCookieName))).length;
                    console.log(this.BagNum);
                    this.BagNum == 0 ? $("#ShopBag").html("购物袋") :
                        $("#ShopBag").html("购物袋" + "<span>"+"("+"<i>"+ this.BagNum +"</i>"+")"+"</i>");
                }else{
                    return 0;
                }
            }else if($.cookie("BagCookiemeixi")){
                var MeixiBagNum = Object.keys(JSON.parse($.cookie("BagCookiemeixi"))).length;
                MeixiBagNum == 0 ? $("#ShopBag").html("购物袋") :
                    $("#ShopBag").html("购物袋" + "<span>"+"("+"<i>"+ this.BagNum +"</i>"+")"+"</i>");
            }
            // if
            // $("#ShopBag").html("购物袋"+this.BagNum);
        },
        shopbag(){
            if (this.BagNum){
                $(".bag_none").hide();
                $(".bag_product").show();
            }else{
                $(".bag_none").show();
                $(".bag_product").hide();
            }
        }
    }
    return new CookieMX();
});
