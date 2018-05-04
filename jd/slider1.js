
function Slider(select){
    this.sliderContainer = $(select);
    this.slider_Top_Wrap = this.sliderContainer.querySelector(".slider_top_wrap");
    this.slider_item = this.slider_Top_Wrap.querySelectorAll(".slider_item");
    this.slider_Radio = this.sliderContainer.querySelector(".slider_radio");
    this.Radio_i = this.slider_Radio.getElementsByTagName("i");
    this.slider_Wrap = this.slider_Top_Wrap.querySelector(".slider_wrap");
    //定义要用到的参数
    this.sliderNum = this.slider_Wrap.children.length;
    this.index = 0;
    this.SliderEver();

    console.log(this.slider_Top_Wrap);
    console.log(this.slider_Wrap);
    console.log(this.slider_Radio);
    console.log(this.sliderNum);
    console.log(this.Radio_i );
    console.log(this.slider_item);
    // this.slider_top_wrap = this.SliderTopWrap(this.sliderEleList);
}
Slider.prototype.SliderEver =function(){
    this.Radio_i[0].style.background = "#FF0000";
    for (let i = 0; i< this.Radio_i.length; i++){

        console.log(i);
        this.Radio_i[i].onmouseover = function(event){
            if(i!= this.index){
                this.index = i;
                var e = event || window.event;
                console.log(this.Radio_i[i])
                for (let j = 0; j< this.Radio_i.length; j++){
                    this.Radio_i[j].style.background = "#FFF";
                }
                this.Radio_i[i].style.background = "red";
                this.Radio_i[i].style.borderColor = "red"
                let y = this.slider_item[i].offsetLeft;
                console.log(y);
                move(
                    this.slider_Wrap,
                    {
                        left : -y
                    }
                )
            }else{
                return 0;
            }
        }.bind(this)
    }
}



function $(select) {
    return document.querySelector(select);
}
console.log(new Slider(".tab_body_item"));
console.log(new Slider(".tab_body_item3"));

function Slider_2(){
    Slider.apply(this,arguments);
    this.Turnbuttom();

}
Slider_2.prototype = new Slider(".tab_body_item4");

Slider_2.prototype.Turnbuttom = function(){
     this.sliderLeft = this.sliderContainer.querySelector(".slider_left");
     this.sliderRight = this.sliderContainer.querySelector(".slider_right");
     this.sliderRight.onclick = function(event){
         if(this.index < this.slider_item.length-1){
             console.log(this.index)
            this.index++ ;
             console.log(this.index)
             for (let j = 0; j< this.Radio_i.length; j++){
                 this.Radio_i[j].style.background = "#FFF";
             }
             this.Radio_i[this.index].style.background = "red";
             console.log(this.slider_item[0].offsetWidth);
             move(
                 this.slider_Wrap,
                 {
                     left:this.slider_Wrap.offsetLeft - this.slider_item[0].offsetWidth
                 }
             )
         }
     }.bind(this)
    this.sliderLeft.onclick = function(event){
        if( 0 < this.index ){
            console.log(this.index)
            this.Radio_i[this.index].style.background = "#FFF"
            this.index--;
            console.log(this.index)
            for (let j = 0; j< this.Radio_i.length; j++){
                this.Radio_i[j].style.background = "#FFF";
            }
            this.Radio_i[this.index].style.background = "red"
            move(
                this.slider_Wrap,
                {
                    left:this.slider_Wrap.offsetLeft +this.slider_item[0].offsetWidth
                }
            )
        }
    }.bind(this)
}

console.log(new Slider_2(".tab_body_item4"));