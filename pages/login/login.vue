<template>
	<view>
		<view class="rclogo">
			<image src="../../static/logo-b.png" mode="aspectFit" lazy-load="true"></image>
			<text class="rctitle">成都人才网</text>
		</view>
		<view class="btns">
			<view class="btnPNumLogin cu-btn bg-orange text-white round" @tap="goLoginUP">手机号登录</view>
			<!-- <view class="btnWeLogin cu-btn bg-orange text-white light round" @tap="goLoginWx">微信登录</view> -->
		</view>
		<view class="warn"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中',
				mask: true
			})
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			//手机号登录页面
			goLoginUP(){
				uni.navigateTo({
					url:'loginUserPwd/loginUserPwd'
				})
			},
			
			goLoginWx(){
				uni.showToast({
					title:'暂未开放',
					icon:'none'
				})
			}
		}
	}
</script>

<style>
	.rclogo{
		position: relative;
		width: 300rpx;
		left: 275rpx;
		top: 200rpx;
	}
	.rclogo > image{
		position: absolute;
		width: 200rpx;
		height: 200rpx;
	}
	.rctitle{
		position: absolute;
		width: 200rpx;
		top: 200rpx;
		text-align: center;
	}
	.btns{
		position: relative;
		width: 750rpx;
		top: 700rpx;
	}
	.btnPNumLogin{
		position: absolute;
		width: 450rpx;
		left: 150rpx;
	}
	.btnWeLogin{
		position: absolute;
		top: 100rpx;
		width: 300rpx;
		left: 225rpx;
	}
</style>
