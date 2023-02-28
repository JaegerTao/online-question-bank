<template>
	<view class="mainframe">
		
		<!-- 未登录 -->
		<view class="notLogin" v-if="!isLogin">
			<bwSwiper class='bwSwiper' :swiperList='swiperList' swiperType='true' autoplay='true' interval='3000' :w_h='screenRatio'
			 :indicatorDots='false'></bwSwiper>
			<view class="content">
				<text class="text-shadow text-lg padding solid-bottom">当前未登录,点击按钮登录</text>
			</view>
			<button class="btnLogin bg-orange" @tap="goLogin" style="width: 50%;">
				<view class="cuIcon-pullup">{{" " + "开始使用" }}</view>
			</button>
		</view>

		<!-- 已登录 -->
		<view class="hasLogin" v-if="isLogin">
			<view class="top light bg-gradual-orange">
				<view class="circlePercent">
					<circlePercent bg="#ee9f00" :percent="accuracy"></circlePercent>
				</view>
				<view class="statInfo">
					<view class="problem">
						<text class="pTitle">做题总数</text>
						<text class="pNum">{{ questionNum }}个</text>
					</view>
					<view class="paper">
						<text class="pTitle">已做题卷</text>
						<text class="pNum">{{ paperNum }}套</text>
					</view>
				</view>
			</view>
			
			<view class="indexList">
				<indexList class="listItem" title="我的题卷" :icon="iconList.paperb" iconSize='80' subHead="我购买的课程题卷" @tap='goPaperList'></indexList>
				<indexList class="listItem1" title="做题记录" :icon="iconList.papera" iconSize='90' subHead="查看我的历史做题记录" @tap='goTestRecord'></indexList>
				<indexList class="listItem2" title="我的错题" :icon="iconList.paper" iconSize='100' subHead="查看错误的题目的解析" @tap='goErrorRecord'></indexList>
				<indexList class="listItem3" title="消息中心" :icon="iconList.message" iconSize='90' subHead="查看我的消息" :messagenum='messageNum' @tap='goMsgCenter'></indexList>
			</view>
			
		</view>

	</view>
</template>

<script>
	import bwSwiper from '../../components/bw-swiper/bw-swiper.vue'
	import circlePercent from '../../components/circle-percent/circle-percent.vue'
	import indexList from '../../components/index-list.vue'
	import reqAddress from 'common/reqAddress.js'
	
	export default {
		data() {
			return {
				isLogin: null,
				screenRatio: 2/3, //可使用屏幕宽高比,默认为 0.75
				swiperList: [{//轮播图列表
						img: '../../static/imgs/rcintro_01.jpg',
						text: '测试图片'
					},
					{
						img: '../../static/imgs/rcintro_02.jpg',
						text: '测试图片'
					},
					{
						//img: 'https://7465-test-8qygl-1256811657.tcb.qcloud.la/rcintro/rcintro.png?sign=04ac25a1359481547e7502658a7d719f&t=1586330805',
						img: '../../static/imgs/rcintro_03.jpg',
						text: '测试图片'
					}
				],
				
				iconList:{
					'paper' : '../../../static/icon/paper.png',
					'papera' : '../../../static/icon/papera.png',
					'paperb' : '../../../static/icon/paperb.png',
					'message' : '../../../static/icon/message.png'
				},
				
				accuracy: '0',//正确率文本
				percent: 0,//正确率
				questionNum: 0,//已做题目总数
				rightQNum: 0,//正确题目总数
				paperNum: 0,//已做试卷套数
				
				messageNum: 0 //消息数量
			}
		},
		components: {
			bwSwiper,
			circlePercent,
			indexList
		},
		onLoad() {
			uni.showLoading({
				title:'加载中...',
				mask: true
			})
			
			// try{
			// 	let sysinfo = uni.getSystemInfoSync();
			// 	console.log(sysinfo.pixelRatio);
			// 	console.log(sysinfo.screenHeight);
			// 	if(sysinfo.pixelRatio > 3){
			// 		this.screenRatio = 2/sysinfo.pixelRatio;
			// 	}else{
			// 		this.screenRatio = 1.5 / sysinfo.pixelRatio;
			// 	}
			// }catch(e){
			// 	//TODO handle the exception
				
			// }
			
			if (uni.getStorageSync('LoginId') != '') {
				this.isLogin = true;
			} else {
				this.isLogin = false;
			}	
		},
		onShow() {
			
			if (uni.getStorageSync('LoginId') != '') {
				this.isLogin = true;
			} else {
				this.isLogin = false;
			}	
			if(this.isLogin){
				this.Statistics();
				this.getMessage();
			}else{
				
			}
			uni.hideLoading();
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			
			goPaperList() {
				uni.navigateTo({
					url: '../paperList/paperList'
				})
			},
			
			goTestRecord(){
				uni.navigateTo({
					url: '../testRecord/testRecord'
				})
			},
			goErrorRecord(){
				uni.navigateTo({
					url: '../errorRecord/errorRecord'
				})
			},
			goMsgCenter(){
				uni.navigateTo({
					url:'../messagecenter/messagecenter'
				})
			},
			
			//小数转换为百分数
			toPercent(point){
				let percent = Number(point * 100).toFixed(1);
				return percent;
			},
			//进度条变化
			updateAccuracy(percent){
				//测试进度条
				// var i = 0;
				// var timer = setInterval(() => {
				// 	if (i >= percent) {
				// 		clearInterval(timer);
				// 	} else {
				// 		i++;
				// 		this.accuracy = String(i);
				// 	}
				// }, 10)
				this.accuracy = percent;
			},
			
			Statistics(){
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/Statistics',
					dataType:'json',
					header:{
						'cookie': uni.getStorageSync('sessionid')
					},
					data:{
						TestModel: 'L'
					},
					success: (res) => {
						// console.log(res);
						if(res.data.length > 0){
							this.paperNum = res.data[0].pcount;
							this.questionNum = Number(res.data[0].tCount);
							this.rightQNum = Number(res.data[0].tTCount);
							if(this.questionNum == 0){
								this.percent = 0;
							}else{
								this.percent = this.toPercent((this.rightQNum / this.questionNum));
							}
							this.updateAccuracy(this.percent);
						}else{
							this.paperNum = 0;
							this.questionNum = 0;
							this.percent = 0;
						}
					}
				})
				
			},
			
			getMessage(){
				uni.request({
					url: reqAddress.DomainName + '/person/getMessage',
					method: 'GET',
					data:{
						LoginId : uni.getStorageSync('LoginId')
					},
					header:{
						'cookie': uni.getStorageSync('sessionid')
					},
					success: (res) => {
						// console.log(res.data);
						if(res.data.errcode == 1){
							this.messageNum = res.data.data.MessageNum;
						}
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.notLogin {
	}

	.top{
		height: 320rpx;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		position: relative;
		/* background: url(https://7465-test-8qygl-1256811657.tcb.qcloud.la/icon/bgTop.png?sign=c7d305fbc26275d8b1f387add552bee7&t=1584523753) repeat fixed center; */
	}

	.circlePercent {
		position: absolute;
		top: 20rpx;
		left: 260rpx;
	}
	.statInfo{
		position: relative;
		font-weight: 100;
		color: #FFFFFF;
	}
	.problem{
		position: relative;
		top: 60rpx;
		left: 50rpx;
		font-size: 35rpx;
	}
	.paper{
		position: relative;
		top: 60rpx;
		left: 550rpx;
		font-size: 35rpx;
	}
	.pTitle{
		position: absolute;
	}
	.pNum{
		position: absolute;
		top: 80rpx;
		left: 50rpx;
	}
	
	.indexList{
		position: relative;
		flex: display;
		flex-direction: column;
	}
	.listItem{
		position: absolute;
	}
	.listItem1{
		position: absolute;
		top: 190rpx;
	}
	.listItem2{
		position: absolute;
		top: 380rpx;
	}
	.listItem3{
		position: absolute;
		top: 570rpx;
	}
	
</style>
