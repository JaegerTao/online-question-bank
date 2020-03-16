<template>
	<view class="mainframe">
		<view class="notLogin" v-if="!isLogin">
			<bwSwiper class='bwSwiper' :swiperList='swiperList' swiperType='true' autoplay='true' interval='3000' :w_h='screenRatio'
			 :indicatorDots='false'></bwSwiper>
			<view class="content">
				<text class="text-shadow text-lg padding solid-bottom">当前未登录,点击按钮登录</text>
			</view>
			<button type="primary" @tap="goLogin" style="width: 50%;">
				<text class="cuIcon-pullup"></text>
				<text>开始使用</text>
			</button>
		</view>


		<view class="hasLogin" v-if="isLogin">
			<view class="top light bg-blue">
				<view class="circlePercent">
					<circlePercent bg="#9ca1ff" :percent="accuracy"></circlePercent>
				</view>
				
			</view>
			
			
			<button type="primary" @tap="goTest">点击考试</button>
		</view>

	</view>
</template>

<script>
	import bwSwiper from '../../components/bw-swiper/bw-swiper.vue'
	import circlePercent from '../../components/circle-percent/circle-percent.vue'

	export default {
		data() {
			return {
				isLogin: false,
				screenRatio: 0.75, //可使用屏幕宽高比,默认为 0.75
				swiperList: [{
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
				accuracy: 0,
			}
		},
		components: {
			bwSwiper,
			circlePercent
		},
		onLoad() {
			//初始化云函数
			// wx.cloud.init({
			// 	traceUser: true,
			// 	env: 'test-8qygl'
			// })

			//测试进度条
			var i = 0; //需要变量来转换给this.loadPercent，否则满足条件无法clearInterval。
			var timer = setInterval(() => {
				if (i >= 80) {
					clearInterval(timer);
				} else {
					i++;
					this.accuracy = i;
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
		margin-top: 20rpx;
	}

	.top{
		height: 310rpx;
		border-radius: 20rpx;
	}

	.circlePercent {
		position: absolute;
		top: 30rpx;
		left: 260rpx;
	}
</style>
