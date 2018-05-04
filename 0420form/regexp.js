    var jsonForm = {
        "username" : {
            "element": "userName",
            "reg": /^[\u4E00-\u9FA5a-zA-Z0-9_-]{4,16}$/,
            "hashtag": "false"
        },
        "password" : {
            "element": "password",
            "reg": /^[0-9a-zA-Z-_*]{8,18}$/,
            "hashtag": "false",
            "rang": "low"
        },
        "repassword" : {
            "element": "repassword",
            "reg": /^[0-9a-zA-Z-_*]{8,18}$/,
            "hashtag": "false"
        },
        "idcard" : {
            "element": "IdCard",
            "reg": /^[0-9]\d{5}[1,2][9][0-9]{2}[0-1][0-9][0-3][0-9][0-9]{3}[0-9|X|x]$/,
            "hashtag": "false"
        },
        "phone" : {
            "element": "phone",
            "reg": /^1[3-9][0-9]{9}$/,
            "hashtag": "false"
        },
        "email" : {
            "element": "inputEmail",
            "reg": /^[a-zA-Z0-9][a-zA-Z0-9_-]{5,10}(@[a-zA-Z0-9]{2,16})(\.[cn|com|net|china|edu|co])/,
            "hashtag": "false"
        }
    };


    console.log(jsonForm);
    console.log(jsonForm.length);
    console.log(jsonForm[0]);//查看json测试数据


    //执行主函数
    onchangeForm(jsonForm);


    //给个信息输入框绑定onchange事件
    function onchangeForm(json){
        for(var attr in json){
            (function(attr){
                console.log(attr);
                console.log(jsonForm[attr].element);
                var ele = $(jsonForm[attr].element);
                console.log(ele);
                var reg = jsonForm[attr].reg;
                var hash = jsonForm[attr];
                ele.onchange = RegexpFrom(ele,reg,hash,attr);
            }(attr))
        }
    }


    //事件绑定和判断执行其他函数
    function RegexpFrom(vid,reg,hash,attr){
        return function(e){
            if((reg.test(vid.value))){
                console.log(reg.test(vid.value));
                //判断是不是到重复输入密码
                if(jsonForm[attr].element == "repassword"){
                    console.log("测试rePassword调用");
                    rePassword(vid,attr);
                    return 0;
                }
                vid.classList.add("input-boxtrue");
                vid.classList.remove("input-boxerror");
                hash.hashtag = "ture";
                console.log(jsonForm);
                console.log("正确");
                //判断密码强度
                if(jsonForm[attr].element == "password"){
                    console.log("password111");
                    passwordStrength(vid);
                }
            }else{
                vid.classList.remove("input-boxtrue");
                vid.classList.add("input-boxerror");
                hash.hashtag = "false";
                console.log(jsonForm);
                console.log("错误");
            }

        }
    }


    //判断密码强度
    function passwordStrength(pvid){
        console.log("调用密码强度判断");
        var range = 0;
        console.log(pvid.value);
        if(/\d/g.test(pvid.value)){
            range ++;
            console.log(range);
            console.log(pvid.value);
        }
        if(/[a-zA-Z]/g.test(pvid.value)){
            range ++;
            console.log(range);
            console.log(pvid.value);
        }
        if(/[\u0021-\u002f]/g.test(pvid.value)){
            range ++;
            console.log(range);
            console.log(pvid.value);
        }
        switch (range){
            case 1 :
                $("tagpassword").innerHTML = "安全强度低";
                $("tagpassword").style.color = "#FF9900";
                break;
            case 2 :
                $("tagpassword").innerHTML = "安全强度中";
                $("tagpassword").style.color = "#33FF22";
                break;
            case 3 :
                $("tagpassword").innerHTML = "安全强度高";
                $("tagpassword").style.color = "#0066FF";
                break;
        }
    }


    function rePassword(repw,attr){
        var  pw = $("password");
        var tagrpw = $("tagrepassword");

        if(repw.value == pw.value){
            repw.classList.add("input-boxtrue");
            repw.classList.remove("input-boxerror");
            jsonForm[attr].hashtag = "ture";
            tagrpw.innerHTML ="输入一致";
            tagrpw.style.color = "#0066FF";
        }else{
            repw.classList.remove("input-boxtrue");
            repw.classList.add("input-boxerror");
            jsonForm[attr].hashtag = "false";
            tagrpw.innerHTML ="输入不一致！";
            tagrpw.style.color = "#FF9900";
        }
        console.log(repw.value);
        console.log(pw.value);
    }

    var btnSubmit = $("btn");

    btnSubmit.onclick = function(e){
        var evt = e || window.e;
        if(!$("password").value == $("repassword").value){
            evt.preventDefault();
            console.log("阻止提交");

        }else{
            for(var attr in jsonForm){

                if(!jsonForm[attr].reg.test($(jsonForm[attr].element).value)){
                    //不让提交;
                    evt.preventDefault();
                    console.log("阻止提交");
                    break;
                } else{
                    console.log("提交成功");
                }
            }
        }
    }
    //简写功能函数
     function $(id){
         return document.getElementById(id);
     }


    // var jsonForm = [
    //     username = {
    //        "element" : "userName",
    //        "reg" : /^[\u4E00-\u9FA5a-zA-Z0-9_-]{4,16}$/,
    //        "hashtag" : "false"
    //     },
    //     password = {
    //        "element" : "password",
    //         "reg" : /^[0-9a-zA-Z-_*]{8,16}$/,
    //         "hashtag" : "false",
    //         "rang" : "low"
    //     },
    //     repassword = {
    //         "element" : "repassword",
    //         "reg" : /^[0-9a-zA-Z-_*]{8,16}$/,
    //         "hashtag" : "false"
    //     },
    //     idcard ={
    //         "element" : "IdCard",
    //         "reg" : /^[0-9]\d{5}[1,2][9][0-9]{2}[0-1][0-9][0-3][0-9][0-9]{3}[0-9|X|x]$/,
    //         "hashtag" : "false"
    //     },
    //     phone ={
    //         "element" : "phone",
    //         "reg" : /^1[3-9][0-9]{9}$/,
    //         "hashtag" : "false"
    //     },
    //     email = {
    //         "element" : "inputEmail",
    //         "reg" :  /^[a-zA-Z0-9][a-zA-Z0-9_-]{5,10}(@[a-zA-Z0-9]{2,16})(\.[cn|com|net|china|edu|co])/,
    //         "hashtag" : "false"
    //     }
    // ];

 // var jsonForm = {
 // "username" :{
 //        "element" : $("userName"),
 //        "reg" : /^[\u4E00-\u9FA5a-zA-Z0-9_-]{4,16}$/,
 //        "hashtag" : "false"
 //    },
 //     "password" : {
 //        "element" : $("password"),
 //         "reg" : /^[0-9a-zA-Z-_*]{8,16}$/,
 //         "hashtag" : "false",
 //         "rang" : "low"
 //     },
 //     "idcard" :{
 //         "element" : $("Idcard"),
 //         "reg" : /^[0-9]\d{5}[1,2][9][0-9]{2}[0-1][0-9][0-3][0-9][0-9]{3}[0-9|X|x]$/,
 //         "hashtag" : "false"
 //     },
 //     "username" :{
 //         "element" : $("userName"),
 //         "reg" : /^[\u4E00-\u9FA5a-zA-Z0-9_-]{4,16}$/,
 //         "hashtag" : "false"
 //     }
 // }


    //
    // function onchangeForm(json){
    //
    //     for(var i = 0; i < jsonForm.length; i++) {
    //         (function(i){
    //             console.log(i);
    //             console.log(jsonForm[i].element);
    //             var ele = $(jsonForm[i].element);
    //             console.log(ele);
    //             var reg = jsonForm[i].reg;
    //             var hash = jsonForm[i];
    //             ele.onchange = RegexpFrom(ele,reg,hash);
    //             if(jsonForm[i]){
    //             }
    //         }(i))
    //
    //     }
    // }

 // var es = $("userName");
 // console.log(es);
    // var userName = $("userName");
    // var IdCard = $("IdCard");
    // var phone = $("phone");
    // var email = $("inputEmail");

    // var userNameRegExb = ; //6到16个数字字母下划线
    // var IdCardRegexb = /^[0-9]\d{5}[1,2][9][0-9]{2}[0-1][0-9][0-3][0-9][0-9]{3}[0-9|X|x]$/;
    // var emailRegexb = /^[a-zA-Z0-9][a-zA-Z0-9_-]{5,10}(@[a-zA-Z0-9]{2,16})(\.[cn|com|net|china|edu|co])/
    // userName.onchange = RegexpFrom(userName,userNameRegExb);
    // IdCard.onchange = RegexpFrom(IdCard,IdCardRegexb);
    // email.onchange = RegexpFrom(email,emailRegexb);
    // email.onblur = RegexpFrom(email,emailRegexb);

    // IdCard.onblur = RegexpFrom(IdCard,IdCardRegexb);


// var formHorizontal = document.querySelector(".form-horizontal");
//
// var formInput = formHorizontal.getElementsByTagName("input");
//
// formHorizontal.onchange = eventDegration(formInput,formRegexp);
//
// function formRegexp(){
//     this.
// }

// function eventDegration(eventElement,callBack){
//     var eEle = [].slice.call(eventElement);
//     return function(e){
//         var event = event || window.event;
//         var arget = event.target || event.srcElement;
//         if(eEle.indexOf(target) != -1){
//             callBack.call(target,e);
//         }
//     }
// }

