define(["jquery"],function(){
    function formTo(){
        this.url = "http://localhost:8999/meixi/127.0.0.1/0516/user.php";
    }
    formTo.prototype = {
        constructor:formTo,
        sendForm(){
            // console.log("1");
            $("#register").on("click",function(){
                // console.log("1");
            var username = $("#us input").val();
                // console.log(username);
            //var phone = $("ph").val;
            var password = $("#pw input").val();
            // var repassword = $("rpw").val;
            var opt = {
                url:"http://localhost:80/0516/user.php",
                type:"POST",
                success:function (res) {
                    console.log(res);
                    console.log("register发送成功！")
                },
                data:{username:username,password:password,type:"register"}
            }
            $.ajax(opt).then(function(res){
                console.log(res);
            })
          })
        }

    }
    return new formTo();
})

