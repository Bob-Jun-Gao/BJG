define(["jquery","jquery.cookie"],function(){
    function ShowData() {
    }
    ShowData.prototype = {
        constructor:ShowData,

        init(){
            this.urlData = window.location.search;
            this.urlToJson();
            this.ajax().then(function(res){

                this.productData = res.data;
                console.log(this.productData);
                this.loadProduct(this.productData);
                this.setCookieData();
            }.bind(this))
        this.addBag();

        },
        /*------------------------------------------------------------
         ---------------------获取浏览器传参方法(乐西没有内容接口没用)----------------------------
         --------------------------------------------------------------*/
        urlToJson(){
            this.urlData = this.urlData.substr(1).replace(/=/g,"\":\"")
            this.urlArray = this.urlData.split("&");
            for(var i = 0 ; i < this.urlArray.length ; i++){
                this.urlArray[i] = '"' +this.urlArray[i] + '"' ;
            }
            this.urlJson = this.urlArray.join(",");
            // this.urlData = "{" +this.urlData +"}";
            this.urlJson = JSON.parse("{" + this.urlJson + "}");
            console.log(this.urlJson);
        },
        /*------------------------------------------------------------
         ---------------------ajax获取模拟数据----------------------------
         --------------------------------------------------------------*/
        ajax(){
            // this.url = "http://localhost:8999/meixi/www.meici.com/sale/detail/getProDetail/";
            // this.load = {
            //     url : this.url,
            //     format:"json",
            //     type:"post",
            //     data : this.urlJson,
            //
            //     success:function(){
            //         console.log("获取成功！");
            //     },
            //     error:function(){
            //         console.log("获取失败！");
            //     }
            // };
            // return $.ajax(this.load);
            this.url = "http://localhost:8999/src/js/showjson.json";
            this.load = {
                url : this.url,
                // format:"json",
                // type:"post",
                // data : this.urlJson,
            };
            return $.ajax(this.load);
        },

        /*------------------------------------------------------------
        ---------------------拼接字符串方法--------------------------------
        --------------------------------------------------------------*/
        loadProduct(json){
            var sku = json.spu.default_sku;

            if(json.spu.skus[sku].act_price){
                var sale_a = json.spu.skus[sku].act_price
                var sale_b = "￥" + json.spu.skus[sku].price;
            }else{
                var sale_a = json.spu.skus[sku].price;
                var sale_b = "";
            }
            var product_info_head = `
                <h1><a href="javascript:void(0)">${json.spu.brand_ename}${json.spu.brand_name}</a> </h1>
                <div class="product_alt clearfix">${json.spu.name}</div>
                <div class="product_sale  clearfix">
                    <span class="now_price">￥<em>${sale_a}</em></span>
                    
                    <span class="del_price">${sale_b}</span>
                    
                </div>`
            $(".product_info_head").html(product_info_head);
            /*---------------------------------产品是否有颜色信息---------------------------------*/
            var product_color = "";
            var colors = json.spu.colors
            for(var i = 0 ; i< colors.length; i++){
                product_color +=`
                <li class="colorlist">
                    <div >${json.colors[colors[i]].value}</div>
                </li>`
            }

            $(".product_color table ul").html(product_color);
            /*---------------------------------产品是否有尺码信息-----------------------------------*/
            if(json.sizes.length){
                var product_size = `
                <table>
                        <colgroup>
                            <col width="55px">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>尺码</th>
                            <td>
                                <ul class="clearfix">
                                    <li class="" size-id="12722" style="cursor: pointer;">
                                        <a href="javascript:void(0);">S</a>
                                        <div class="size_tip" style="display: none;"><span>对应中国尺码“S”</span></div>
                                    </li>
                                    <li class="cur" size-id="12738" style="cursor: pointer;">
                                        <a href="javascript:void(0);">M</a>
                                        <div class="size_tip" style="display: none;"><span>对应中国尺码“M”</span></div>
                                    </li>
                                    <li class="" size-id="12754" style="cursor: pointer;">
                                        <a href="javascript:void(0);">L</a>
                                        <div class="size_tip" style="display: none;"><span>对应中国尺码“L”</span></div>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><span class="product_size_inform">查看尺码说明</span></td>
                        </tr>
                        </tbody>
                    </table>`

            } else{
                var product_size = ""
            }
            $(".product_size").html(product_size);
            /*---------------------------------产品图片信息加载-----------------------------------*/
            var product_img = ""
            var PI = json.spu.skus[sku].img
            for(var i = 0 ; i < PI.length ; i ++){
                product_img += `
                    <li>
                        <img src="${PI[i]}" width="485">
                    </li> `
            }
            $(".product_img ul").html(product_img)
        },
        /*---------------------------------------------------------
        ----------------------添加购物袋功能-------------------------
        ----------------------------------------------------------*/
        addBag(){
            $(".addShopBag").on("click",function(){
                /*将当前产品在购物袋中需要的展示的数据整合成对象字符创*/
                this.setCookieData();
                /*判断当前是否有对象登录*/
                if($.cookie("meixi_user")){
                    var meixiuser = $.cookie("meixi_user")
                    meixiuser = $.parseJSON(meixiuser);
                    meixiuser = meixiuser.username;
                    /*定义用户的购物袋为BagCookie加上用户名*/
                    var BagCookieName = "BagCookie" + meixiuser ;

                    /*有对象登录判断之前是否存在之前添加过的购物袋cookie*/
                    this.cookieWho(BagCookieName);
                    console.log($.cookie(BagCookieName));
                    // if($.cookie(BagCookieName)){
                    //     /*购物袋存在则判断是否有同样的产品*/
                    //     var BagCookieJson = JSON.parse($.cookie(BagCookieName))
                    //     var cookieID = Object.keys(BagCookieJson)
                    //     if(cookieID.indexOf(this.productid) == -1){
                    //         /*没有添加过该数据则拼接添加*/
                    //         BagCookieJson[this.productid] = this.productCookieJson[this.productid];
                    //         var BagCookieStr = JSON.stringify(BagCookieJson);
                    //         $.cookie(BagCookieName,BagCookieStr,{
                    //             expires: 7,
                    //             path: '/'
                    //         })
                    //     }else{
                    //         /*如果有则商品数量加一*/
                    //         BagCookieJson[this.productid].num++;
                    //         var BagCookieStr = JSON.stringify(BagCookieJson);
                    //         $.cookie(BagCookieName,BagCookieStr,{
                    //             expires: 7,
                    //             path: '/'
                    //         })
                    //     }
                    //     console.log(cookieID)
                    // }else{
                    //     console.log("2")
                    //     $.cookie("BagCookiemeixi",this.productCookieStr,{
                    //         expires: 7,
                    //         path: '/'
                    //     })
                    // }
                }else{
                    /*有对象登录判断之前是否存在之前添加过的购物袋cookie*/
                    this.cookieWho("BagCookiemeixi");
                }
            }.bind(this))
        },
        /*-----------------------------------------------------------------
        -----------将当前产品在购物袋中需要的展示的数据整合成对象字符创----------
        -------------------------------------------------------------------*/
        setCookieData(){
            // console.log(this.productData);
            //当前的产品id存为全局变量
            this.productid = this.productData.spu.default_sku;
            var num = 1;

            var brand_ename = this.productData.spu.brand_ename;
            var brand_name = this.productData.spu.brand_name;
            var img = this.productData.spu.skus[this.productid].img[0];
            var name = this.productData.spu.name;
            var color = this.productData.colors[this.productData.spu.colors].value;
            // var size = this.productData.size[this.productData.spu.size_chart].value;
            var price = this.productData.spu.skus[this.productid].price;

            this.productCookieJson = {};
            this.productCookieJson[this.productid] = {
                "num":num,
                "brand_ename": brand_ename,
                "brand_name" : brand_name,
                "img" :  img,
                "name" :name,
                "color": color,
                // "size": size,
                "price": price,
            }
            this.productCookieStr = JSON.stringify(this.productCookieJson);
            // console.log(this.productCookieStr);
        },
        cookieWho(cookie){
            if($.cookie(cookie)){
                /*购物袋存在则判断是否有同样的产品*/
                var BagCookieJson = JSON.parse($.cookie(cookie))
                var cookieID = Object.keys(BagCookieJson)
                if(cookieID.indexOf(this.productid) == -1){
                    /*没有添加过该数据则拼接添加*/
                    BagCookieJson[this.productid] = this.productCookieJson[this.productid];
                    var BagCookieStr = JSON.stringify(BagCookieJson);
                    $.cookie(cookie,BagCookieStr,{
                        expires: 7,
                        path: '/'
                    })
                }else{
                    /*如果有则商品数量加一*/
                    BagCookieJson[this.productid].num++;
                    var BagCookieStr = JSON.stringify(BagCookieJson);
                    $.cookie(cookie,BagCookieStr,{
                        expires: 7,
                        path: '/'
                    })
                }
                console.log(cookieID)
            }else{
                console.log("2")
                /*没有则创建对应的cookie*/
                $.cookie(cookie,this.productCookieStr,{
                    expires: 7,
                    path: '/'
                })
            }
        }
    }

    return new ShowData();
})
