define(["jquery","jquery.cookie"],function(){
    function formTo(){
        this.url = "http://localhost:8999/meixi/127.0.0.1/0516/user.php";
    }
    formTo.prototype = {
        constructor:formTo,
        sendForm(){
            $("#register").on("click",function(){
                var username = $("#us input").val();
                var password = $("#pw input").val();
                var opt = {
                    url:"http://localhost:80/0516/user.php",
                    type:"POST",
                    success:function (res) {
                        console.log("register发送成功！");
                    },
                    data:{username:username,password:password,type:"register"}
                }
                $.ajax(opt).then(function(res){
                    console.log(res);
                })
            })
            $("#login").on("click",function(){
                var username = $("#us input").val();
                var password = $("#pw input").val();
                var opt = {
                    url:"http://localhost:80/0516/user.php",
                    type:"POST",
                    success:function (res) {
                        console.log("login发送成功！");
                    },
                    data:{username:username,password:password,type:"login"}
                }
                $.ajax(opt).then(function(res){
                    var status = $.parseJSON(res);
                    console.log(status.st);
                    if(status.st == 1){
                        console.log(status.select_res);
                        // this.login_succ(status)
                        alert("欢迎回来"+status.select_res.username);
                        var userinfromation = JSON.stringify(status.select_res)
                        $.cookie('meixi_user',
                            userinfromation,
                            {
                                expires: 7,
                                path: '/'
                            }
                        )
                        // console.log($.cookie('meixi_user'));
                        location.href="index.html";
                    }else{

                        console.log(status.select_err);
                        alert(status.select_err);
                    }
                })
            })
        },

    // login_succ(status){
    //         var hide_div =  $("<div ><p></p><button></button></div>");
    //         hide_div.addClass("hide_div")
    //             .find("p")
    //             .text("欢迎回来" + status.select_res.username)
    //             .appendTo("body");
    //
    //
    //     },
    }
    return new formTo();
})

function init(){

}