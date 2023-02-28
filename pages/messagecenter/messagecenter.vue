<template>
	<view>
		<view class="top">
			<view class="topText">共{{ messageCount }}条</view>
			<view class="DelAll" @tap="MessageDel">全部清除</view>
		</view>
		<view class="middle">
			<block v-for="(item, index) in messageList" :key="index">
				<messageListItem :idno="item.IdNo" :isread="item.IsRead" :msgcontent="item.Content" :msgtitletype="item.Type"
				 :noticetime="item.NoticeTime" @delthis="DelThis" @readthis="ReadThis"></messageListItem>
			</block>
			<view class="nomessage" v-if="!nomessage && (messageList.length % 12 == 0)" @tap="getMoreMessage">
				查看更多消息...
			</view>
			<view class="nomessage" v-else-if="messageList.length > 0">
				暂无更多消息
			</view>
		</view>
		<view class="nomessage" v-if="nomessage">
			暂无消息记录
		</view>
	</view>
</template>

<script>
	import reqAddress from '../../common/reqAddress.js'
	import messageListItem from '../../components/message-list-item.vue'
	
	export default {
		data() {
			return {
				nomessage: false,
				messageList: [],
				currenrPage: 1,
				messageCount: 0,
				messageNotread: 0,
				
				cookie: ''
			}
		},
		components: {
			messageListItem
		},
		onLoad() {
			this.cookie = uni.getStorageSync('sessionid');
			
			this.getInfos();
			this.AllRead();
		},
		onShow() {

		},
		methods: {
			//获取消息列表
			getInfos() {
				// uni.request({
				// 	url: reqAddress.DomainName + '/MessageCenter/message',
				// 	method:'GET',
				// 	header: {
				// 		'content-type': 'application/x-www-form-urlencoded',
				// 		'cookie': uni.getStorageSync('sessionid')
				// 	},
				// 	success: (res) => {
				// 		if(res.data.errcode == 1){
				// 			this.messageCount = res.data.data[0].ReadNum;
				// 		}
				// 	}
				// })
				uni.showLoading({
					title:"加载中..."
				})
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/TestMessage/getInfos',
					method: 'POST',
					data: {
						page: this.currenrPage,
						PageSize: 12
					},
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						console.log(res);
						if (res.data.data.length > 0) {
							this.messageCount += res.data.data.length;
							for (let mes of res.data.data) {
								this.messageList.unshift(mes);
								if (mes.IsRead == "0") {
									this.messageNotread += 1;
								}
							}
							console.log(this.messageList)
						} else {
							if (this.currenrPage == 1) {
								this.nomessage = true;
							}else{
								let cutpage = this.currenrPage;
								this.currenrPage = cutpage - 1;
								uni.showToast({
									title: '暂无更多消息',
									icon:'none'
								});
							}
						}
					},
					fail: () => {
						uni.showToast({
							title:"请检查网络",
							icon:"none"
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},

			//删除全部消息
			MessageDel() {
				uni.showModal({
					title: '提示',
					content: '将要清除系统中的全部消息，是否继续？',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: reqAddress.DomainName + '/funcQuestion/TestMessage/MessageDel',
								header: {
									'cookie': this.cookie
								},
								success: (res) => {
									if (res.data.msg == '成功') {
										uni.showToast({
											title: '清除成功'
										})
										this.messageList = [];
										this.messageCount = 0;
										this.nomessage = true;
									} else {
										uni.showToast({
											title: '清除失败',
											icon:'none'
										})
									}
								}
							})
						} else if (res.cancel) {
							console.log("取消清除全部消息")
						}
					}
				})
			},

			//全部标记为已读
			AllRead() {
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/TestMessage/AllRead',
					header: {
						'cookie': this.cookie
					},
					success: (res) => {
						console.log(res.data);
					}
				})
			},

			//删除当前消息
			DelThis(idno) {
				console.log('delthis');
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/TestMessage/DelThis',
					header: {
						'cookie': this.cookie
					},
					data:{
						delId: idno
					},
					success: (res) => {
						// console.log(res.data);
						if(res.data.msg == "成功"){
							console.log("refmsglist")
							for(let i = 0; i < this.messageList.length; i ++){
								if(this.messageList[i].IdNo == idno){
									this.messageList.splice(i, 1);
									this.messageCount -= 1;
								}
							}
							if(this.messageCount == 0){
								this.nomessage = true;
							}
							uni.showToast({
								title:"删除成功"
							})
						}else{
							uni.showToast({
								title:"删除失败"
							})
						}
					}
				})
			},

			//阅读当前消息
			ReadThis() {
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/TestMessage/ReadThis',
					header: {
						'cookie': this.cookie
					},
					data:{
						IdNo: idno
					},
					success: (res) => {
						// console.log(res.data);
						if(res.data.msg == "成功"){
							this.messageNotread -= 1;
						}else{
							
						}
					}
				})
			},

			//获取更多消息
			getMoreMessage() {
				let cupage = this.currenrPage;
				this.currenrPage = cupage + 1;
				this.getInfos();
			}
		}
	}
</script>

<style>
	.top {
		margin-left: 15rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 720rpx;
		height: 80rpx;
		text-align: center;
		border-radius: 15rpx 15rpx 15rpx 15rpx;
		box-shadow: 10rpx 10rpx 5rpx #e2e2e2;
	}

	.top>view {
		font-size: 30rpx;
		color: #a4acb6;
	}

	.topText {
		position: absolute;
		left: 160rpx;
		top: 30rpx;
	}

	.DelAll {
		position: absolute;
		left: 500rpx;
		top: 30rpx;
	}
	
	.nomessage {
		margin-top: 30rpx;
		width: 750rpx;
		text-align: center;
	}
</style>
