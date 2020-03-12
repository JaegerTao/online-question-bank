<template>
	<view>
		<view class="">
			<view class="">
				<input type="number" maxlength="11" v-model="loginForm.phoneNumber" placeholder="请输入手机号" class="" data-val="phone" />
			</view>
			<view class="">
				<input v-model="loginForm.password" placeholder="请输入登录密码" class=""  @input="bindInput" data-val="password"/>
			</view>
			<view class="">
				<button :loading="loading" @tap="handleLogin"> {{ loading ? "登录中...":"登 录"}} </button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginForm:{
					phoneNumber: '',
					password: '',
				},
				loading: false,
			};
		},
		onLoad(){
			
		},
		methods: {
			//处理登录
			handleLogin(){
				this.loading = true;
				
				//发送请求
				// console.log(JSON.stringify(this.loginForm));
				// uni.request({
				// 	url: '',
				// 	data: this.loginForm,
				// 	method: 'POST',
				// 	header: {
				// 		'content-type': 'application/json'
				// 	},
				// 	success: (res) => {
				// 		this.loading = false;
						
				// 		var suid = 1;
				// 		var srand = 1;
				// 		getApp().globalData.isLogin = [suid, srand];
				// 	},
				// 	fail: (res) => {
				// 		this.loading = false;
				// 	}
				// })
				
				//直接登录成功入口
				this.loading = false;
				var suid = 1;
				var srand = 1;
				getApp().globalData.isLogin = [suid, srand];
				uni.navigateBack({
					animationType:'zoom-fade-in',
					animationDuration: 1000,
				})
			},
			
			bindInput:function(e){
				var dataval = e.currentTarget.dataset.val;
				this.loginForm[dataval] = e.detail.value; 
			},
		}
	}
</script>

<style>

</style>
