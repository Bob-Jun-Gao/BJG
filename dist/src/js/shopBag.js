define(["jquery","jquery.cookie"],function () {
    function shopBag(){

    }
    shopBag.prototype = {
        constructor:shopBag,
        init(){
            this.deteCookie()
            this.LoadBag();
        },
        deteCookie(){
            /*cookie.js判断了是不是有购物袋的数据而显不显视购物袋模块*/
            var display =$('.this.BagNum').css('display');
            if(display == "none") return 0;
            /*判断使用那条cookie*/
            if( $.cookie("meixi_user")){
                var meixiuser = $.cookie("meixi_user")
                meixiuser = $.parseJSON(meixiuser);
                meixiuser = meixiuser.username;
                /*定义用户的购物袋为BagCookie加上用户名*/
                this.CookieName = "BagCookie" + meixiuser ;
            }else{
                this.CookieName = "BagCookiemeixi";
            }
        },
        //数据化购物袋页面
        LoadBag(){
            if($.cookie(this.CookieName)==""){
                $(".bag_none").show();
                $(".bag_product").hide();
                console.log($.cookie(this.CookieName))
            }else{
            this.BagJson = JSON.parse($.cookie(this.CookieName));
            console.log(this.BagJson)
            this.BagJsonIndex = Object.keys(this.BagJson);
            var html = ``;
            for (var i = 0 ; i < this.BagJsonIndex.length; i++){
                    html += `<tr>
                    <td class="commodity">
                        <input type="checkbox"/>
                        <div class="commodity_img float_l">
                            <a target="_blank">
                                <img src="${this.BagJson[this.BagJsonIndex[i]].img}" height="90">
                            </a>
                        </div>
                        <div class="commodity_info float_l">
                            <div class="commodity_title">
                                <a>${this.BagJson[this.BagJsonIndex[i]].brand_ename}
                                    ${this.BagJson[this.BagJsonIndex[i]].brand_name}
                                    <br>${this.BagJson[this.BagJsonIndex[i]].name}
                                </a>
                            </div>
                            <div class="commodity_content float_l">
                                <div class="">
                                    <span class="size_color">颜色：${this.BagJson[this.BagJsonIndex[i]].color}</span>
                                 
                                </div>
                            </div>
                        </div>
                    </td>
                    <td align="center" class="sale">${this.BagJson[this.BagJsonIndex[i]].price}</td>
                    <td align="center" class="num">
                        <div class="cart_num">
                            <div class="cart_num_m">
                                <a class="cart_jian" href="javascript:void(0);" ng-click="cal_minus()">-</a>
                                    <input data-id = "${this.BagJsonIndex[i]}" class ="shopNum" type="text" value="${this.BagJson[this.BagJsonIndex[i]].num}" />
                                <a class="cart_jia" href="javascript:void(0);">+</a>
                            </div>
                        </div>
                    </td>
                    <td align="center" class="allsale">${this.BagJson[this.BagJsonIndex[i]].num * this.BagJson[this.BagJsonIndex[i]].price}.00</td>
                    <td align="center">
                        <div class="cp_btn">
                            <a class="cp_fav" href="javascript:void(0);" title="加入收藏" ng-click="add_favorite()">加入收藏</a><br>
                            <a class="cp_del" href="javascript:void(0);" ng-click="del_one()" title="删除">删除</a>
                        </div>
                    </td>

                </tr>`
                }
            $("tbody").html(html);
            }
        },
        //添加修改数量以及删除商品
        shopAddSub() {
            $(".cart_jia").on("click",function(event){
                var shopNumEle = $(event.target).parents("tr").find(".shopNum");
                var saleEle = $(event.target).parents("tr").find(".sale");
                var allSaleEle = $(event.target).parents("tr").find(".allsale");
                var shopnum = shopNumEle.val();
                var id = shopNumEle.attr("data-id");
                    shopNumEle.val(++shopnum);
                var allsale = saleEle.text()*shopnum;
                    allSaleEle.text(allsale+".00");
                this.setBagCookieNum(id,shopnum)
            }.bind(this));

            $(".cart_jian").on("click",function(){
                var shopNumEle = $(event.target).parents("tr").find(".shopNum");
                var saleEle = $(event.target).parents("tr").find(".sale");
                var allSaleEle = $(event.target).parents("tr").find(".allsale");
                var shopnum = shopNumEle.val();
                var id = shopNumEle.attr("data-id");
                    shopnum == 1 ? shopnum : --shopnum;
                    shopNumEle.val(shopnum);
                var allsale = saleEle.text()*shopnum;
                    allSaleEle.text(allsale+".00");
                this.setBagCookieNum(id,shopnum)
            }.bind(this));

            $(".cp_del").on("click",function(event){
                var shopNumEle = $(event.target).parents("tr").find(".shopNum");
                var id = shopNumEle.attr("data-id");
                this.delBagCookieId(id);
            }.bind(this));

            $(".shopNum").on("change",function(event){
                var shopnum = $(event.target).val();
                var id = $(event.target).attr("data-id");
                var saleEle = $(event.target).parents("tr").find(".sale");
                var allSaleEle = $(event.target).parents("tr").find(".allsale");
                var allsale = saleEle.text()*shopnum;
                allSaleEle.text(allsale+".00");
                this.setBagCookieNum(id,shopnum);
            }.bind(this))

        },
        //修改数量
        setBagCookieNum(id,num){
            this.BagJson[id].num = num;
            var str = JSON.stringify(this.BagJson);
            $.cookie(this.CookieName,str,{
                expires: 7,
                path: '/'
            })
            console.log($.cookie(this.CookieName))
        },
        delBagCookieId(id){
            delete this.BagJson[id]
            var str = JSON.stringify(this.BagJson);
            $.cookie(this.CookieName,str,{
                expires: 7,
                path: '/'
            })
            console.log($.cookie(this.CookieName))
        }
    }
    return new shopBag();
})
