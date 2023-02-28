<script>
	import reqAddress from 'common/reqAddress.js'
	global.isLogin = function() {
		try {
			let LoginId = uni.getStorageSync('LoginId');
			let Pname = uni.getStorageSync('Pname');
		} catch (e) {
			//TODO handle the exception
		}
		if (LoginId === '' || Pname === '') {
			return false;
		} else {
			return {
				LoginId,
				Pname
			}
		}
	};
	export default {
		globalData: {
			token: '', //全局变量，用于记录登录状态
		},
		data:{
			hidelogout : null
		},
		onLaunch: function() {
			console.log('1.1.4');
			
			// #ifdef MP-WEIXIN
			// wx.setEnableDebug({//打开调试
			// 	enableDebug: true
			// })
			//3. 获取token
			const token = uni.getStorageSync('TOKEN');
			//4. 验证是否得到token
			if (token && token.length !== 0) {
				//5. 验证是否过期,如果过期了要重新登录
				this.checkToken(token)
			} else {
				//没有token，执行登录操作
				this.login()
			}
			// #endif


			this.getSession();
			this.refreshSession();
		},
		onShow: function() {
			console.log('App Show')
			if(this.hidelogout){
				clearInterval(this.hidelogout);
			}
		},
		onHide: function() {
			console.log('App Hide')
			let that = this;
			let csession = uni.getStorageSync('sessionid');
			//小程序切后台5分钟未切前台就自动退出登录
			if (csession != '' && csession != null) {
				this.hidelogout = setTimeout(that.logout , 5 * 60 * 1000);
			}
		},
		methods: {
			//检查登录状态
			checkToken(token) {
				console.log('执行验证token操作')
				wx.request({
					url: reqAddress.DomainName + '/funcQuestion/WeChatLogIn/VerifyToken',
					method: 'get',
					header: {
						token
					},
					success: (res) => {
						//6. 验证token过期代码，过期则重新登入，不过期则保存到全局变量
						if (res.data.tokenCheck == false) {
							this.login()
						} else {
							if (res.data.isOnLine == true) {
								console.log("checklogin用户在线")
								//用户在线，无需登录，直接看题
								//后台传回的当前用户LoginId
								const loginId = res.data.loginId
							} else {
								//用户不在线，需要重新登录
								try{
									uni.clearStorageSync();
								}catch(e){
									//TODO handle the exception
								}
								console.log("checklogin用户不在线")
							}
							console.log('得到token并储存到全局变量')
							this.globalData.token = token;
						}
					}
				})
			},
			login() {
				//1. 登入小程序
				console.log('执行登入操作');
				wx.login({
					success: (res) => {
						const code = res.code
						wx.request({
							url: reqAddress.DomainName + '/funcQuestion/WeChatLogIn/WCLogIn',
							method: 'get',
							data: {
								code
							},
							success: (res) => {
								//2. 进行保存token
								const token = res.data.token
								this.globalData.token = token;
								uni.setStorageSync('TOKEN', token);
								//判断是否登录
								if (res.data.isOnLine == true) {
									console.log("login用户在线");
									//用户在线，无需登录，直接看题
									//后台传回的当前用户LoginId
									const loginId = res.data.loginId

								} else {
									//用户不在线，需要重新登录
									console.log("login用户不在线");
								}
							},
							fail: (err) => {
								console.log(err)
							}
						})
					}
				})
			},

			//退出手机账号登录
			logout() {
				let csessionid = uni.getStorageSync('sessionid');
				// console.log(csessionid);
				uni.request({
					url: reqAddress.DomainName + '/loginVerify/exit',
					dataType: 'json',
					header: {
						'cookie': csessionid
					},
					success: (res) => {
						console.log(res);
						if (res.data.errcode == 1) {
							this.afterlogin(1, uni.getStorageSync('LoginId'));
							uni.clearStorage();
							// uni.setStorageSync('sessionid', '');
							// uni.setStorageSync('LoginId', '');
							// uni.setStorageSync('Pname', '');
							// uni.setStorageSync('RoleFlag', '');
							// uni.setStorageSync('TOKEN', '');
							uni.switchTab({
								url: '../index/index'
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

			afterlogin(type, loginId) {
				//账号密码登录成功，type为0
				//账号密码退出成功，type为1
				uni.login({
					provider: 'weixin',
					success: (res) => {
						const code = res.code;
						uni.request({
							url: reqAddress.DomainName + '/funcQuestion/WeChatLogIn/AfterLoginAndOut',
							method: 'GET',
							data: {
								code,
								type,
								loginId
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

			//更新session
			getSession() {
				let oldSession = uni.getStorageSync('sessionid');
				if (oldSession != '' && oldSession != null) {
					uni.request({
						url: reqAddress.DomainName + '/funcQuestion/WeChatLogIn/getSession',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'cookie': oldSession
						},
						success: (res) => {
							console.log(res);
							if (res.data != true) {
								let sessionid = res.header['Set-Cookie'].substr(0, 44);
								uni.setStorageSync('sessionid', sessionid);
								console.log('更新session');
							}
						},
						fail: (res) =>{
							uni.clearStorage();
						}
					})
				}
			},

			//定时刷新session
			refreshSession() {
				let that = this;
				setInterval(that.getSession, 20 * 60 * 1000);
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/uni.css");
	@import url("./colorui/main.css");
	@import url("./colorui/icon.css");

	page {
		background-color: #FFFFFF;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}

	checkbox .wx-checkbox-input {
		/* border-radius: 50%; */
	}
</style>
