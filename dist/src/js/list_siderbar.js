define(["jquery"],function(){
    function Siderbar(){
    }
    Siderbar.prototype = {
        constructor:Siderbar,
        init(){
            this.siderOpen = $(".sideritem_open")
            this.siderOpen.on("click.open",this.sideropen);
        },
        sideropen(event){
            var item = $(event.target).parent().siblings(".sider_item_body")
            if( item.is(":hidden")){
                $(event.target).text("-");
                item.show(500);
                $(event.target).parents(".sidebar_item").siblings().find(".sider_item_body").hide(500);
                $(event.target).parents(".sidebar_item").siblings().find(".sideritem_open").text("+");
            }else{
                $(event.target).text("+");
                item.hide(500);
            }
        },

    }
    return new Siderbar();
});
