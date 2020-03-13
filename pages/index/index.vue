<template>
	<view class="content">
		<view class="notLogin" v-if="!isLogin">
			当前未登录
			<button type="default" @tap="goLogin">点击登录</button>
		</view>
		
		<view class="hasLogin" v-if="isLogin" >
			<button type="primary" @tap="goTest">点击考试</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin : false,
			}
		},
		
		onLoad() {
			//初始化云函数
			wx.cloud.init({
				traceUser: true,
				env: 'test-8qygl'
			})
		},
		onShow() {
			if(global.isLogin()){
				this.isLogin = true;
			}else{
				this.isLogin = false;
			}
		},
		methods: {
			goTest(){
				uni.navigateTo({
					url: '../exam/exam',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goLogin(){
				uni.navigateTo({
					url:'../login/login'
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

</style>
