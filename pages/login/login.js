import api from '@/common/vmeitime-http/'

	const WxAuth = require('@/common/wxAuth');

	export default {
		data() {
			return {
				process: {
					step: 1, //1:需要微信授权，2:需要手机号授权
					user: 0, //微信授权 0:未授权，1:已授权
					phone: 0, //手机号授权 0：未授权，1:已授权
				},
			}
		},

		onLoad() {
			WxAuth.onLogin();
		},

		methods: {
			//微信授权 uni.getUserInfo
			handleGetUserInfo(e) {
				console.log(e)
				let {
					errMsg, //用户点击取消或授权的信息回调。
					iv, //加密算法的初始向量（如果用户没有同意授权则为undefined）
					encryptedData //用户信息的加密数据（如果用户没有同意授权同样返回undefined）
				} = e.detail;
				let frUserId = uni.getStorageSync('fr_user_id') || '', // 从哪个用户分享过来的
					taskId = uni.getStorageSync('task_id') || 1,
					inviteType = uni.getStorageSync('invite_type') || ''; // 邀请的用户类型
				if (errMsg == 'getUserInfo:ok') { //同意授权
					uni.hideLoading()
					//检查登录态是否过期。
					WxAuth.checkSession().then(code => {
						//code, iv, encryptedData传给服务器解析，得到用户信息
						let data = {
							code,
							iv,
							encryptedData,
							frUserId,
							tackId,
							inviteType: inviteType,
							loginType: 'WXMA',
						}
						return api.login(data)
					}).then(result => {
						//result: userinfo token
						if (result.data.statusCode == 200) {
							if (result.data.code == 200) {
								//临时登录凭证code只能使用一次故刷新code
								WxAuth.onLogin();
								//更新用户信息
								let token = result.data.data.token;
								let userInfo = result.data.data;
								let memberDays = userInfo.user.memberDays;
								let is_vip = memberDays ? (new Date(memberDays.replace(/-/g, "\/")) - new Date() > 0 ? true : false) : false;
								let userInfoNew = { ...userInfo.user,
									is_vip
								};
								uni.setStorageSync('token', token);
								uni.setStorageSync('userInfo', userInfoNew);
								uni.showToast({
									title: '授权成功！'
								});
								if (userInfo.user.mobile) {
									this.process.user = 1;
									this.process.step = 1;
									uni.hideLoading()
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										});
									}, 1000);
								} else {
									this.process.user = 1;
									this.process.step = 2;
									uni.hideLoading()
								}
							} else {
								console.log("老用户");
							}
						} else {
							console.log('获取用户信息失败');
						}
					}) //.catch(console.log)
				} else {
					//拒绝授权
					uni.showToast({
						title: '授权失败',
						icon: 'none'
					});
				}
			},

			// 手机号授权
			// @param {*} e
			getPhoneNumber(e) {
				let {
					errMsg,
					iv,
					encryptedData
				} = e.detail;
				let token = uni.getStorageSync('token') || '';
				if (errMsg == "getPhoneNumber:ok") { // 同意授权
					uni.hideLoading()
					// 检查登录态是否过期。
					WxAuth.checkSession().then(code => {
						//code, iv, encryptedData 传给服务器解析，得到手机号信息
						const data = {
							code,
							iv,
							encryptedData
						};
						// token
						api.wxmobile(data)
							.then(res => {
								uni.showToast({
									title: '授权成功！'
								});
								this.process.phone = 1;
								uni.hideLoading();
								setTimeout(function() {
									uni.navigateBack({
										delta: 1 //上一级页面
									});
								}, 1000);
							}).catch(err => {
								console.log(err)
							});
					}).catch(console.log)
				} else {
					// 拒绝手机号授权
					uni.showToast({
						title: '手机号授权失败！',
						icon: 'none'
					});
				}
			},
			//暂不登录
			handNotLogin() {
				uni.navigateBack({
					animationDuration: 1000
				})
			}
		}
	}
