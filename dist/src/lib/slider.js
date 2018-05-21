;+
    function($){
    //局部方法
        $.fn.Slider = function(sliderContainer){
            new Slider(sliderContainer,this);
        }
        function Slider(sliderContainer){
            this.index = 0;
            this.init(sliderContainer);

            console.log(this.sliderElement);
            console.log(this.sliderBoxList);
        }
        Slider.prototype = {
            construct:Slider,
            init:function(sliderContainer){
                this.sliderElement = $(sliderContainer).find(".slider")
                this.sliderBoxList = this.sliderElement.find(".slider_box")
                this.sliderBoxList
            },
        }
    }(jQuery)
