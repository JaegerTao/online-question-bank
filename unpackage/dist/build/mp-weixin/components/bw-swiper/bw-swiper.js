(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/bw-swiper/bw-swiper"],{"3cd9":function(t,e,n){},"834d":function(t,e,n){"use strict";var i=n("3cd9"),u=n.n(i);u.a},"9b83":function(t,e,n){"use strict";var i,u=function(){var t=this,e=t.$createElement,n=(t._self._c,t.upxtopx(t.textStyleSize));t.$mp.data=Object.assign({},{$root:{m0:n}})},a=[];n.d(e,"b",function(){return u}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return i})},a636:function(t,e,n){"use strict";n.r(e);var i=n("9b83"),u=n("e54a");for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);n("834d");var r,l=n("f0c5"),f=Object(l["a"])(u["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=f.exports},e54a:function(t,e,n){"use strict";n.r(e);var i=n("fc55"),u=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=u.a},fc55:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"bw-swiper",created:function(){var e=this;this.fullScreen&&t.getSystemInfo({success:function(t){e.swiperHeight=t.screenHeight-44}})},mounted:function(){var e=this;if(!this.fullScreen){var n=t.createSelectorQuery().in(this);n.select(".swiper-item").boundingClientRect(function(t){t&&(e.swiperHeight=t.width/e.w_h)}).exec()}},props:{fullScreen:{type:Boolean,default:!1},swiperList:{type:Array,required:!0,default:function(){return[]}},swiperType:{type:Boolean,default:!1},videoAutoplay:{type:Boolean,default:!1},videoKey:{type:String,default:"src"},imageKey:{type:String,default:"img"},textKey:{type:String,default:"text"},textTip:{type:Boolean,default:!1},textStyleSize:{type:Number,default:24},textStyleBottom:{type:Number,default:5},textStyleRight:{type:Number,default:5},textStyleColor:{type:String,default:"#ffffff"},textStyleBgcolor:{type:String,default:"transparent"},w_h:{type:Number,default:2},skipHiddenItemLayout:{type:Boolean,default:!1},displayMultipleItems:{type:Number,default:1},nextMargin:{type:String,default:"0px"},previousMargin:{type:String,default:"0px"},vertical:{type:Boolean,default:!1},circular:{type:Boolean,default:!0},duration:{type:Number,default:400},interval:{type:Number,default:2500},current:{type:Number,default:0},autoplay:{type:Boolean,default:!1},indicatorColor:{type:String,default:"#CCCCCC"},indicatorActiveColor:{type:String,default:"#ffffff"},indicatorDots:{type:Boolean,default:!0}},data:function(){return{flag:!0,cardCur:0,swiperHeight:300}},computed:{},methods:{upxtopx:function(e){return t.upx2px(e)+"px"},play:function(){this.flag=!1},pause:function(){this.flag=!0},clickItem:function(t){this.swiperList.length>0&&this.$emit("clickItem",this.swiperList[t])},change:function(t){this.$emit("change",t)},animationfinish:function(t){this.cardCur=t.detail.current,this.$emit("animationfinish",t)}}};e.default=n}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/bw-swiper/bw-swiper-create-component',
    {
        'components/bw-swiper/bw-swiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("a636"))
        })
    },
    [['components/bw-swiper/bw-swiper-create-component']]
]);
