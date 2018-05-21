define(["jquery","jquery.cookie"],function(){
    function CookieMX(){
    }
    CookieMX.prototype = {
        construct:CookieMX,
        init(){
        },
        setcookie(){
            if($.cookie("meixi_user")){
                var meixiuser = $.cookie("meixi_user");
                    meixiuser = $.parseJSON(meixiuser);
                var nsername = meixiuser.username;
                console.log(nsername);
                $(".user").css({display:"none"});
                $(".user_login").css({display:"block"});
                $(".user_login").text(nsername);
            }else{
                return 0;
            }
        },
        // cookie_verification(cookie){
        //     var username = cookie.username;
        //
        //     var password = cookie.password;
        //     console.log(password);
        //     console.log(username);
        //     var opt = {
        //         url:"http://localhost:80/0516/user.php",
        //         type:"POST",
        //         success:function (res) {
        //             console.log("login发送成功！");
        //         },
        //         data:{username:username,password:password,type:"token"}
        //     }
        //     $.ajax(opt).then(function(res) {
        //         var status = $.parseJSON(res);
        //         console.log(status.st);
        //         if (status.st == 1) {
        //             console.log(status.select_res);
        //             $(".user").css({display:"none"});
        //             $(".user_login").css({display:"block"});
        //         } else {
        //             return 0;
        //         }
        //     })
        // }

    }
    return new CookieMX();
});
