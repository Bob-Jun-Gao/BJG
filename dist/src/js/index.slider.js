define(["jquery"],function(){
    function Slider(){

    }
    Slider.prototype = {
        constructor:Slider,
        init(selector){
            this.slider_Wrap = $(selector);
            this.slider_main = this.slider_Wrap.find(".slider");
            this.slider_prev = this.slider_Wrap.find(".slider_prev");
            this.slider_next = this.slider_Wrap.find(".slider_next");
            this.slider_box = this.slider_main.find(".slider_box");
            this.index = 0;
            this.prev = this.slider_box.length - 1;
            // console.log(this.slider_box);
            this.sliderMain()
        },
        sliderMain(){
            if(this.slider_prev.length){
                this.slider_prev.on("click.indexprev",{turn:"prev"},$.proxy(this.sliderTurn,this));
                this.slider_prev.on("click.prevMove",{move:"prevmove"},$.proxy(this.sliderMove,this));
            }else{
                return 0;
            }
            if(this.slider_next.length){
                this.slider_next.on("click.indexprev",{turn:"next"},$.proxy(this.sliderTurn,this));
                this.slider_next.on("click.nextMove",{move:"nextmove"},$.proxy(this.sliderMove,this))
            }else{
                return 0;
            }
        },
        sliderTurn:function(event){
            var turn = {
                prev:function(){
                    this.prev = this.index;
                    if(this.index == 0){
                        this.index = this.slider_box.length - 1;
                    }else{
                        this.index--;
                    }
                    console.log(this.prev);
                    console.log(this.index);
                }.bind(this),
                next:function(){
                    this.prev = this.index;
                    if(this.index == this.slider_box.length - 1){
                        this.index = 0;
                    }else{
                        this.index++;
                    }
                    console.log(this.prev);
                    console.log(this.index);
                }.bind(this)
            }
            //判断选择调用prev获next方法
            if(!(typeof turn[event.data.turn] == "function")) return 0;
            turn[event.data.turn]();
        },
        sliderMove:function(event){

            var move = {
                prevmove : function () {
                    console.log("sussprev");

                    this.slider_box.eq(this.prev).css({zIndex:10}).siblings().css({zIndex:0});
                    this.slider_box.eq(this.index)
                        .css({left:-this.slider_box.width(),zIndex:100})
                        .stop().animate({left:0})
                        .end()
                        .eq(this.prev)
                        .stop().animate({left:this.slider_box.width()})
                }.bind(this),
                nextmove : function () {
                    console.log("sussnext");
                    this.slider_box.eq(this.prev).css({zIndex:10}).siblings().css({zIndex:0});
                    this.slider_box.eq(this.index)
                        .css({left:this.slider_box.width(),zIndex:100})
                        .stop().animate({left:0})
                        .end()
                        .eq(this.prev)
                        .stop().animate({left:-this.slider_box.width()})
                }.bind(this),
            }
            //判断选择调用prev获next方法
            if(!(typeof move[event.data.move] == "function")) return 0;
            move[event.data.move]();
        }
        // sliderMove(){
        //     this.slider_box.eq(this.prev).css({zIndex:10}).siblings().css({zIndex:0});
        //     var move = {
        //         prevmove : function () {
        //             this.slider_box.eq(this.index)
        //                 .css({left:-this.slider_box.width(),zIndex:100})
        //                 .stop().animate({left:0}
        //                 .end()
        //                 .eq(this.prev)
        //                 .stop().animate({left:this.slider_box.width(),zIndex:10})
        //             );
        //             this.slider_box.eq(this.index)
        //                 .css({left:this.slider_box.width()})
        //                 .stop().animate({left:0}
        //             );
        //         }.bind(this),
        //         nextmove : function () {
        //             this.slider_box.eq(this.index)
        //                 .css({left:this.slider_box.width(),zIndex:100})
        //                 .stop().animate({left:0})
        //                 //骚操作
        //                 .end()
        //                 .eq(this.prev)
        //                 .stop().animate({left:-this.slider_box.width()})
        //
        //             // this.slider_box.eq(this.index)
        //             //     .css({left:-this.slider_box.width()})
        //             //     .stop().animate({left:0}
        //         }.bind(this),
        //     }
        // }
    }

    return new Slider();
});
