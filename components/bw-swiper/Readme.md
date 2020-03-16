参数说明

 {
    fullScreen:{ // 是否全屏 不支持卡牌
        type:Boolean,
        default:false
    },
    swiperList:{ // 滑块视图容器数据 
    // 数据格式 :imageKey="xx" :textKey="yy" [{xx: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',yy:'加油'}] 提示文字可要可不要
    // 或者 [{img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',text:'加油'}] 提示文字可要可不要
        type:Array,
        default:function(){
            return []
        }
    },
    swiperType:{  // false => 全屏限高轮播图 true => 卡塔式轮播图
        type:Boolean,
        default:false
    },
    videoAutoplay:{ // true =>自动播放
        type:Boolean,
        default:false
    },
    videoKey:{  // 视频映射的键
        type:String,
        default:'src'
    },
    imageKey:{ //  图片映射的键
        type:String,
        default:'img'
    },
    textKey:{ //   文字说明映射的键
        type:String,
        default:'text'
    },
    textTip:{ // 图片文字说明 false => 隐藏
        type:Boolean,
        default:false
    },
    textStyleSize:{ // 图片文字大小
        type:Number,
        default:24
    },
    textStyleBottom:{ // 图片文字位置
        type:Number,
        default:5
    },
    textStyleRight:{ // 图片文字位置
        type:Number,
        default:5
    },
    textStyleColor:{ // 图片文字颜色
        type:String,
        default:'#ffffff'
    },
    textStyleBgcolor:{ // 图片文字背景色
        type:String,
        default:'transparent'
    },
    w_h:{  //宽高比 推荐 w/h => 2
        type:Number,
        default:2
    },
    skipHiddenItemLayout:{ //是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息 
        type:Boolean,
        default:false
    },
    displayMultipleItems:{ //同时显示的滑块数量
        type:Number,
        default:1
    },
    nextMargin:{ // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值 头条小程序不支持
        type:String,
        default:'0px'
    },
    previousMargin:{//前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值头条小程序不支持
        type:String,
        default:'0px'
    },
    vertical:{ //滑动方向是否为纵向 卡牌  不支持纵向以及同时显示的2块以上滑块数量
        type:Boolean,
        default:false
    },
    circular:{ // 是否采用衔接滑动
        type:Boolean,
        default:true
    },
    duration:{ // 滑动动画时长
        type:Number,
        default:400
    },
    interval:{ // 自动切换时间间隔
        type:Number,
        default:2500
    },
    current:{ // 当前所在滑块的 index
        type:Number,
        default:0
    },
    autoplay:{ // 是否自动切换
        type:Boolean,
        default:true
    },
    indicatorColor:{ // 指示点颜色
        type:String,
        default:'#CCCCCC'
    },
    indicatorActiveColor: { // 当前选中的指示点颜色
        type: String,
        default: '#ffffff'
    },
    indicatorDots: { // 是否显示面板指示点
        type: Boolean,
        default: true
    }
    ```