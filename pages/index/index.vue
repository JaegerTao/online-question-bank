<template>
	<view class="mainframe">
		
		<!-- 未登录 -->
		<view class="notLogin" v-if="!isLogin">
			<bwSwiper class='bwSwiper' :swiperList='swiperList' swiperType='true' autoplay='true' interval='3000' :w_h='screenRatio'
			 :indicatorDots='false'></bwSwiper>
			<view class="content">
				<text class="text-shadow text-lg padding solid-bottom">当前未登录,点击按钮登录</text>
			</view>
			<button class="bg-blue" @tap="goLogin" style="width: 50%;">
				<text class="cuIcon-pullup"></text>
				<text>开始使用</text>
			</button>
		</view>

		<!-- 已登录 -->
		<view class="hasLogin" v-if="isLogin">
			<view class="top light">
				<view class="circlePercent">
					<circlePercent bg="#9ca1ff" :percent="accuracy"></circlePercent>
				</view>
				<view class="statInfo">
					<view class="problem">
						<text class="pTitle">做题总数</text>
						<text class="pNum">{{ problemNum }}个</text>
					</view>
					<view class="paper">
						<text class="pTitle">已做试卷</text>
						<text class="pNum">{{ paperNum }}套</text>
					</view>
				</view>
			</view>
			
			<view class="indexList">
				<indexList class="listItem" title="我的试卷" :icon="iconList.paperb" iconSize='80' @tap='goPaperList'></indexList>
				<indexList class="listItem1" title="我的错题" :icon="iconList.paper" iconSize='100' subHead="针对曾经错误的考点进行测试"></indexList>
				<indexList class="listItem2" title="做题记录" :icon="iconList.papera" iconSize='90' subHead="查看我的历史做题记录"></indexList>
				<indexList class="listItem3" title="消息中心" :icon="iconList.message" iconSize='90' subHead="查看我的消息"></indexList>
			</view>
			
			<!-- <button type="primary" @tap="goTest">点击考试</button> -->
			
		</view>

	</view>
</template>

<script>
	import bwSwiper from '../../components/bw-swiper/bw-swiper.vue'
	import circlePercent from '../../components/circle-percent/circle-percent.vue'
	import indexList from '../../components/index-list.vue'
	
	export default {
		data() {
			return {
				isLogin: false,
				screenRatio: 0.75, //可使用屏幕宽高比,默认为 0.75
				swiperList: [{//轮播图列表
						img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1134399666,668654079&fm=26&gp=0.jpg',
						text: '测试图片'
					},
					{
						img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1042476468,2568241258&fm=26&gp=0.jpg',
						text: '测试图片'
					},
					{
						img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1042476468,2568241258&fm=26&gp=0.jpg',
						text: '测试图片'
					}
				],
				
				iconList:{
					'paper':'https://7465-test-8qygl-1256811657.tcb.qcloud.la/icon/paper.png?sign=ef869141b7c0fc4b90a9972e1b7606ad&t=1584522482',
					'papera':'https://7465-test-8qygl-1256811657.tcb.qcloud.la/icon/papera.png?sign=6cf84851c6ca31580e37d007dc4be293&t=1584452210',
					'paperb':'https://7465-test-8qygl-1256811657.tcb.qcloud.la/icon/paperb.png?sign=d76b3de1c2d4c99ceec0675e79735aeb&t=1584452235',
					'paperc':'https://7465-test-8qygl-1256811657.tcb.qcloud.la/icon/paperc.png?sign=c1f3920376fa88580af5029fb0ead2ba&t=1584452257',
					'paperd':'https://7465-test-8qygl-1256811657.tcb.qcloud.la/icon/paperd.png?sign=fcccc17756301f7ab747352889c3b014&t=1584453309',
					'message':'https://7465-test-8qygl-1256811657.tcb.qcloud.la/icon/message.png?sign=58562c07fbf77ee39b486b8dd81a0d15&t=1584522254'
				},
				accuracy: '20',//正确率
				problemNum: 0,
				paperNum: 0
			}
		},
		components: {
			bwSwiper,
			circlePercent,
			indexList
		},
		onLoad() {
			//初始化云函数
			//#ifdef MP-WEIXIN
			// wx.cloud.init({//初始化微信云开发sdk实例
			// 	traceUser: true,
			// 	env: 'test-8qygl'
			// })
			//#endif
			
			//测试进度条
			var i = 0; //需要变量来转换给this.loadPercent，否则满足条件无法clearInterval。
			var timer = setInterval(() => {
				if (i >= 80) {
					clearInterval(timer);
				} else {
					i++;
					this.accuracy = String(i);
				}
			}, 10)
		},
		onShow() {
			if (global.isLogin()) {
				this.isLogin = true;
			} else {
				this.isLogin = false;
			}
		},
		methods: {
			goTest() {
				uni.navigateTo({
					url: '../exam/exam',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			goPaperList() {
				uni.navigateTo({
					url: '../paperList/paperList'
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
		background: url(https://7465-test-8qygl-1256811657.tcb.qcloud.la/icon/bgTop.png?sign=c7d305fbc26275d8b1f387add552bee7&t=1584523753) repeat fixed center;
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
