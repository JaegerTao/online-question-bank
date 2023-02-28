<template>
	<view class="">
		<view class="center">
			<view class="logo" v-if="!isLogin" @click="goLogin" :hover-class="!isLogin ? 'logo-hover' : ''">
				<image class="logo-img" :src="isLogin ? userinfo.avatarUrl :avatarUrl"></image>
				<view class="logo-title">
					<text class="uer-name">登录题库</text>
				</view>
			</view>
			<view class="logo" v-else-if="isLogin" :hover-class="!isLogin ? 'logo-hover' : ''">
				<image class="logo-img" :src="isLogin ? userinfo.avatarUrl :avatarUrl"></image>
				<view class="logo-title">
					<text class="uer-name">{{ "&nbsp;&nbsp;" + userinfo.name + "&nbsp;&nbsp;"}}
						<text class="Vipflag cu-btn text-white bg-green">会员</text>
					</text>
				</view>
			</view>
			
			<view class="center-list">
				<!-- <view class="center-list-item border-bottom" v-if="isLogin" @tap="goAccountMng">
					<text class="list-icon cuIcon-vip"></text>
					<text class="list-text">帐号管理</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view> -->
				<view class="center-list-item border-bottom" @tap="goHelpCenter">
					<text class="list-icon cuIcon-question"></text>
					<text class="list-text">关于我们</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</view>
			
			<view class="rclogo">
				<image src="../../static/logo-b.png" mode="aspectFit" lazy-load="true"></image>
				<text class="rctitle">成都人才网</text>
				<text class="rcadr">www.rc114.com</text>
			</view>
			
			<view class="btnLogout">
				<view class="cu-btn bg-orange round shadow" v-if="isLogin" @tap="logout">退出登录</view>
			</view>
		</view>
			
		
	</view>	
	
</template>

<script>
	import reqAddress from 'common/reqAddress.js'
	export default {
		data() {
			return {
				isLogin: null,
				avatarUrl: "../../static/hm-sms-list-card/images/img_25832_0_2.png",
				userinfo: {
					name: '',
					avatarUrl: ''//'../../static/logo-b.png'
				},
				
				cookie: '',
				LoginId: ''
			}
		},
		onLoad() {
			uni.showLoading({
				title:'加载中...',
				mask: true
			});
			this.LoginId = uni.getStorageSync('LoginId');
			if(this.LoginId != ''){
				this.cookie = uni.getStorageSync('sessionid');
				this.isLogin = true;
			}else{
				this.isLogin = false;
			}
		},
		onShow() {
			this.LoginId = uni.getStorageSync('LoginId');
			if(this.LoginId != ''){
				this.isLogin = true;
			}else{
				this.isLogin = false;
			}
			if(this.isLogin){
				this.userinfo.name = uni.getStorageSync('Pname');
				this.getMessage();
			}
			uni.hideLoading();
		},
		methods: {
			goLogin() {
				if (!this.login) {
					uni.navigateTo({
						url: '../login/login',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			
			//退出登录
			logout(){
				uni.request({
					url: reqAddress.DomainName + '/loginVerify/exit',
					dataType:'json',
					header:{
						'cookie': this.cookie
					},
					success: (res) => {
						console.log(res);
						if(res.data.errcode == 1){
							this.afterlogin(1, this.LoginId);
							
							uni.clearStorage();
							// uni.setStorageSync('sessionid', '');
							// uni.setStorageSync('LoginId', '');
							// uni.setStorageSync('Pname', '');
							// uni.setStorageSync('RoleFlag', '');
							// uni.setStorageSync('TOKEN', '');
							uni.reLaunch({
								url:'../index/index'
							})
						}
					}
				})
				// uni.setStorageSync('LoginId', '');
				// uni.setStorageSync('Pname', '');
				// uni.setStorageSync('RoleFlag', '');
				// uni.switchTab({
				// 	url:'../index/index'
				// })
			},
			
			//跳转到帮助中心页面
			goHelpCenter(){
				uni.navigateTo({
					url:'helpCenter/helpCenter'
				})
			},
			
			//跳转到账号管理页面
			goAccountMng(){
				uni.showToast({
					title:'暂未开放',
					icon:'none'
				})
				// uni.navigateTo({
				// 	url:'accountManage/accountManage'
				// })
			},
			
			afterlogin(type, loginId){
				//账号密码登录成功，type为0
				//账号密码退出成功，type为1
				uni.login({
					provider:'weixin',
					success: (res) => {
						const code = res.code;
						uni.request({
							url:reqAddress.DomainName + '/funcQuestion/WeChatLogIn/AfterLoginAndOut',
							method:'GET',
							data:{
								code, type, loginId
							},
							success: (res) => {
								console.log(res);	
							},
							fail: (err) => {
								console.log(err);
							}
						})
					}
				})
			},
			
			getMessage(){
				uni.request({
					url: reqAddress.DomainName + '/person/getMessage',
					method: 'GET',
					data:{
						LoginId : this.LoginId
					},
					header:{
						'cookie': this.cookie
					},
					success: (res) => {
						// console.log(res.data);
						if(res.data.errcode == 1){
							this.userinfo.avatarUrl = res.data.data.photoPath;
						}
					}
				})
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('../../static/font_ali.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		
		width: 720rpx;
		margin-left: 15rpx;
		height: 240upx;
		padding: 20upx;
		padding-left: 50rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 0rpx 0rpx 15rpx 15rpx;
		box-shadow: 10rpx 10rpx 5rpx #e2e2e2;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 120upx;
		height: 120upx;
		border-radius: 150upx;
		border: 1rpx solid #dddddd;
		border-style: double;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #000000;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #ffaa00;
		text-align: center;
		/* font-family: texticons; */
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
	
	.rclogo{
		position: relative;
		left: 225rpx;
	}
	.rclogo > image{
		width: 300rpx;
		height: 300rpx;
	}
	.rctitle{
		position: absolute;
		top: 270rpx;
		font-size: 40rpx;
		font-weight: 1000;
		width: 300rpx;
		text-align: center;
	}
	.rcadr{
		position: absolute;
		top: 335rpx;
		font-size: 30rpx;
		width: 300rpx;
		text-align: center;
	}
	.btnLogout{
		position: relative;
		top: 250rpx;
		width: 350rpx;
		left: 200rpx;
		text-align: center;
	}
	.btnLogout > view{
		width: 350rpx;
		/* color: #09BB07; */
	}
	.Vipflag{
		height: 40rpx;
		font-size: 30rpx;
		border-radius: 5rpx;
	}
</style>