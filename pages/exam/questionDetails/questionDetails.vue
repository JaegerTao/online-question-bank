<template>
	<view>
		<view class="top light">
			<view class="circlePercent">
				<circlePercent bg="#9ca1ff" :percent="accuracy"></circlePercent>
			</view>
		</view>
		<view class="">
			<view class="time_score_content">
				<view class="time_part">
					<view class="cuIcon-time line-green"></view>
					<view class="time_info">{{spendTime.hour}}:{{spendTime.minute}}:{{spendTime.second}}</view>
				</view>
				<view class="current_part">
					<view class="cuIcon-roundcheck line-green"></view>
					<view class="current_info">{{count}}</view>
				</view>
				<view class="score_part">
					<view class="cuIcon-favor line-green"></view>
					<view class="score_info">{{score}}</view>
				</view>
			</view>
		</view>	
		<!--提示窗口-->
		<view class="prompt_content" id="head">
			<view class="prompt_content_text">
				<text class="cuIcon-title text-red"></text>
				<text>点击题目查看题目解析</text>
			</view>
			<view class="prompt_content_info">
				<text class="cuIcon-square bg-green "></text>正确
				<text class="cuIcon-square bg-red"></text>错误
			</view>	
		</view>
		<view class=" scroll_content">
			<scroll-view scroll-y="true" class="page padding" :style="{'height':scrollHeight}">
				<view class="grid col-5 ">
					<view class="margin-tb-sm text-center" v-for="(items,index) in questionData" :key="index">
						<button class="cu-btn round" :class="questionData[index].userAnswer===questionData[index].answer?'bg-green':'bg-red'" @click="AppointedSubject(index)" >{{index+1}}</button>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="return_content" id="foot">
			<button type="primary" class="cu-btn round bg-green btns" @click="returnIndexPage">返回首页</button>
		</view>
	</view>
</template>

<script>
	import circlePercent from '../../../components/circle-percent/circle-percent.vue';
	
	export default {
		data() {
			return {
				accuracy:'20',//题目正确率,
				score:0,//题目得分,
				count:0,//答对题目数
				questionData:{},
				bankNo:0,//题库列表
				scrollHeight:'150px',
				//答题消耗时间
				spendTime:{
					hour:0,
					minute:0,
					second:0
				}
			};
		},
		components:{
			circlePercent
		},
		onLoad(res) {
			//初始清空时间列表
			this.spendTime.hour = 0;
			this.spendTime.minute = 0;
			this.spendTime.second = 0;
			
			//console.log(JSON.parse(res.questionData));
			//获取题目信息
			this.questionData =JSON.parse(res.questionData);
			this.bankNo = res.value;
			
			var time = JSON.parse(res.time);
			this.spendTime.hour = time.hour;
			this.spendTime.minute = time.minute;
			this.spendTime.second = time.second;
			
			console.log(this.spendTime);
			//获取正确率函数
			this.getAccuracy();
		},
		onReady() {
			var tempHeight = 300;
			var _self = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {                   
					tempHeight = res.windowHeight;
					console.log("屏幕可用高度 " + JSON.stringify(res));
					//在组件内获取id，需要加in(this),此处使用—_self代替了this
					uni.createSelectorQuery().select("#head").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						//console.log("屏幕数据 " + data);
						tempHeight -= data.height;
						//console.log("减掉顶部后的高度 " + tempHeight);
						uni.createSelectorQuery().select("#foot").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							//console.log("减掉底部后的高度 " + tempHeight);
							_self.swiperHeight = tempHeight + 'px';
							//console.log("滑屏最后高度 " + _self.swiperHeight);
						}).exec();
					}).exec();
				},
				fail() {
					
				}
			});
		},
		methods:{
			//获取题目的正确率
			getAccuracy:function(){
				//定义局部变量，答对的题目数，以及获得的分数
				var questionRight = 0;
				var questionScore = 0;
				for(let i=0;i<this.questionData.length;i++){
					console.log(JSON.stringify(this.questionData[i]));
					if(this.questionData[i].userAnswer === this.questionData[i].answer){
						//console.log('getscore');
						questionRight++;
						questionScore+=this.questionData[i].score;
					}
				}
				//console.log(questionRight+","+questionScore);
				///console.log((((questionRight/this.questionData.length)*100).toFixed(2)).toString())
				//小数取两位小数
				this.accuracy = (((questionRight/this.questionData.length)*100).toFixed(2)).toString();
				this.score = questionScore;
				this.count = questionRight;
			},
			AppointedSubject:function(index){
				// uni.reLaunch({
				// 	url:"../exam?showAnswer="+true+'&value='+this.bankNo+'&index='+index,
				// 	success() {
				// 		console.log('not autoBackButton')
				// 	}
				// });
				uni.navigateTo({
					url:"../exam?showAnswer="+true+'&value='+this.bankNo+'&index='+index,
					success() {
						console.log('have autoBackButton')
					}
				})
			},
			returnIndexPage:function(){
				uni.navigateTo({
					url:"../../paperList/paperList",
					success() {
						console.log('success');
					},
					fail(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.top{
	height: 320upx;
	border-radius: 30upx 30upx 0upx 0upx;
	position: absolute;
	background: url(https://7465-test-8qygl-1256811657.tcb.qcloud.la/icon/bgTop.png?sign=c7d305fbc26275d8b1f387add552bee7&t=1584523753) repeat fixed center;
	}
.circlePercent{
	position: absolute;
	top: 30upx;
	left: 250upx;
	//border-bottom: 1upx solid black;
}
.time_score_content{
	display: flex;
	position: relative;
	top: 300upx;
	padding: 10upx 0;
	justify-content: space-between;
	height: 180upx;
	.time_part{
		width: 33.33%;
		//background-color: yellow;
		border-right: 1upx solid #C0C0C0;
		text-align: center;
		view{
			&:first-child{
				font-size: 60upx;
			}
		}
		.time_info{
			padding: 20upx auto;
		}
	}
	.current_part{
		width: 33.33%;
		//background-color: yellow;
		border-right: 0.3upx solid #C0C0C0;
		text-align: center;
		view{
			&:first-child{
				font-size: 60upx;
			}
		}
		
	}
	.score_part{
		width: 33.33%;
		//background-color: yellow;
		text-align: center;
		view{
			&:first-child{
				font-size: 60upx;
			}
		}
	}
}
.prompt_content{
	//border: 2px solid red;
	position: relative;
	top:360upx;
	padding: 0 40upx;
	.prompt_content_text{
		display: inline;
	}
	.prompt_content_info{
		display: inline;
		padding: 0 40upx;
		text{
			margin: 0 20upx;
		}
	}
}
.scroll_content{
	//border: 2px solid red;
	border-top: 0.3upx solid #C0C0C0;
	position: relative;
	width: 90%;
	left:5%;
	text-align: center;
	 justify-content: center;
	top:400upx;
}
.return_content{
	position: relative;
	top: 540upx;
	//border: 2upx solid red;
	border-top: 0.3upx solid #C0C0C0;
	.btns{
		position: fixed;
		width: 30%;
		bottom: 10upx;
		left: 270upx;
	}
}
</style>
