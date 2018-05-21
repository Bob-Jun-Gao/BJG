define(["jquery","pagination"],function(){
    function ListData(){
    }
    ListData.prototype = {
        constructor:ListData,
        init(){
            this.url = "http://localhost:8999/meixi/www.meici.com/sale/index/lists";
            this.order = "newDesc";
            this.activity = "man";
            this.pagenum = 1;
            this.ajaxdata={
                o : this.order,
                p : this.pagenum,
                acty : this.activity,
                fp : 20,
            }
            this.requestData(this.ajaxdata).then(function (res) {
                this.dataInit = res.data;
                this.total = this.dataInit.pagenation.total;
                this.pagesize = this.dataInit.pagenation.pagesize;
                this.productdataProcessing(this.dataInit);
                this.pageList(this.dataInit.pagenation);
                console.log(this.dataInit )
            }.bind(this));
        },
        /*-----------------------------------
        --------------ajax获取数据------------
        -----------------------------------*/
        requestData(ajaxdata){
            this.load = {
                url:this.url,
                dataType:"json",
                data:ajaxdata,
                statusCode: {
                    404: function() {
                        alert('page not found');
                    },
                    403: function() {
                        alert('获取不到数据');
                    }
                },
                beforeSend:function () {
                    $("#Loading").css({display:"block"})
                },
                success:function(){
                    $("#Loading").css({display:"none"})
                },
                complete:function(){
                    $("#Loading").css({display:"none"})
                },
                error:function(){
                    $("#Loading").css({display:"none"})
                }
            };
           return $.ajax(this.load);
        },
        /*----------------------------------
        --------------产品html加载-------------
        ----------------------------------*/
        productdataProcessing(productdata){
            var datahtml = "";
            var P_Lst = productdata.productLst
            var Lst = Object.keys(P_Lst);
            var Img = Object.keys(productdata.productImgs);
            // console.log(Lst);
            // console.log(Img);
            var product = [];
            for(var i = 0 ; i < this.pagesize ; i++  ){
                // console.log(P_Lst[Lst[i]].spu + "_" + Lst[i].color_id);
                // console.log(Img[i] + "&nbsp" + Lst[i]);
                var brand_id = productdata.productLst[Lst[i]].brand_id;
                datahtml +=`<li>
                        <a class="product_img_link">
                            <img src="${productdata.productImgs[Img[i]].url}"/>
                        </a>
                        <div class="product-tips"></div>
                        <a class="product_tit_link">
                            <span>${productdata.search.brand[brand_id].name}</span>
                            <br/>${productdata.productLst[Lst[i]].name}
                        </a>
                        <div class="product_sale">
                            <span>${productdata.productLst[Lst[i]].price}</span>
                        </div>
                    </li>`
            }
            $(".product_list").html(datahtml);
        },
        /*------------------------------------
         ----------------分页插件---------------
         ------------------------------------*/
        pageList(ajaxdata){
            $('.pagiation').pagination({
                totalData: ajaxdata.total,
                showData: ajaxdata.pagesize,
                current: ajaxdata.page,
                coping: true,
                callback:function(api){
                    this.pageturn(api);
                    this.pageCon(api.getCurrent());
                    console.log(api.getCurrent());
                }.bind(this)
            });
        },
        pageturn(api){
            this.pagenum = api.getCurrent();
            this.ajaxdata={
                o : this.order,
                p : this.pagenum,
                acty : this.activity,
                fp : 20,
            }
            this.requestData(this.ajaxdata).then(function (res) {
                this.dataInit = res.data;
                this.productdataProcessing(this.dataInit);
            }.bind(this))
        },

        pageCon(curr){
            var other = $(".pagiation").not($(event.target).parent());
            other.pagination({
                totalData: this.total,
                showData: this.pagesize,
                coping: true,
                current: curr,
                callback:function(api){
                    this.pageturn(api);
                    this.pageCon(api.getCurrent());
                }.bind(this)
            })
        }
    }
    return new ListData();
})


