<template>
	<view class="Item">
		<view class="textMsg">
			<text :class="title.length < 15 ? 'title' : 'title2'">{{ title }}</text>
			<text class="subdate">{{ subdate }}</text>
			<block v-if="isrecord">
				<text :class="issubmit == '1' ? 'qpct':'subdate'">共{{ qsum }}题/正确{{ qcrtnum }}题</text>
			</block>
			<block v-else>
				<text :class="issubmit == '1' ? 'qpct':'subdate'">共{{ qsum }}题/错误{{ qcrtnum }}题</text>
			</block>
		</view>
		<block v-if="isrecord">
			<view class="btnMsg" v-if="issubmit == '1'">
				<view class=" cu-btn round light bg-blue text-gray btnpos1" @tap="goQDetails">查看解析</view>
				<view class="btnpos2 cu-btn round bg-orange" v-if="isrecord" @tap="goExam">重新测试</view>
			</view>
			<view class="btnMsg" v-else-if="issubmit == '0'">
				<text class="btnpos1txt text-gray">未完成</text>
				<view class="btnpos2 cu-btn round bg-green" @tap="goExamContinue">继续做题</view>
			</view>
		</block>
		<block v-else>
			<view class="btnMsg">
				<view class=" cu-btn round light bg-blue text-gray btnpos1btn" @tap="goQDetails">查看解析</view>
			</view>
		</block>
		
	</view>
</template>

<script>
	import reqAddress from '../common/reqAddress.js'
	export default {
		data() {
			return {
				paperDetails: {
					TestID: '', //试卷id，试卷唯一标识
					TestName: '', //试卷名
					Duration: '', //时长
					QCount: 0, //题目总数
					QSumScore: 0, //试卷总分
					Q_Types: '',
					Q_TypeCounts : []
					// pcnt: 1 //剩余次数
				},
			};
		},
		props: {
			testid: {
				type: String,
				default: ""
			},
			title: {
				type: String,
				default: ""
			},
			subdate: {
				type: String,
				default: ""
			},
			qsum: {
				type: String,
				default: "0"
			},
			qcrtnum: {
				type: String,
				default: "0"
			},
			issubmit: {
				type: String,
				default: "1"
			},
			isrecord: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			//查看解析
			goQDetails() {
				this.paperDetails.TestID = this.testid;
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/getTestInfo',
					method:'POST',
					data:{
						TestID: this.paperDetails.TestID,
						type: 1,
						TestModel: 'L'
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': uni.getStorageSync('sessionid')
					},
					success: (res) => {
						if (res.data.msg == '失败') {
							
						} else {				
							this.paperDetails.TestName = res.data[0].TestName;
							this.paperDetails.Duration = res.data[0].Duration;
							let qtypes = '';
							this.paperDetails.Q_TypeCounts = [];
							for (let test of res.data) {
								this.paperDetails.QCount += Number(test.QCount);
								this.paperDetails.QSumScore += Number(test.QSumScore);
								qtypes = qtypes + test.QTypeID + '_';
								
								
								let Q_TypeCount = {
									QTypeOrder : '',
									QCount : '',
									QTypeID : ''
								}
								Q_TypeCount.QTypeOrder = test.QTypeOrder;
								Q_TypeCount.QCount = test.QCount;
								Q_TypeCount.QTypeID = test.QTypeID;
								this.paperDetails.Q_TypeCounts.push(Q_TypeCount);
							}
							let qtypeslen = qtypes.length
							this.paperDetails.Q_Types = qtypes.substr(0, qtypeslen - 1);
							let firstqtype = qtypes.substr(0, 1);
							console.log(this.paperDetails);
							uni.navigateTo({
								url: "../exam/exam?TestModel=L&paperDetails=" + encodeURIComponent(JSON.stringify(this.paperDetails)) + "&showAllAnswer=" + true + '&type=' + firstqtype + '&index=' + 1,
							});
						}
					}
				})
			},
			
			
			//重新测试
			goExam() {
				console.log("click")
				this.paperDetails.TestID = this.testid;
				uni.showModal({
					title:'提醒',
					content:'重新测试将会消耗一次练习机会，是否继续？',
					success: (res) => {
						if(res.confirm){
							uni.request({ //获取试卷详情，开始测试
								url: reqAddress.DomainName + '/funcQuestion/Test/start',
								method: 'POST',
								data: {
									TestID: this.paperDetails.TestID,
									TestModel: 'L' 
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded',
									'cookie': uni.getStorageSync('sessionid')
								},
								success: (res) => {
									if (res.data.msg == '失败') {
										uni.showModal({
											title: '提示',
											content: '您的该套试卷练习次数已用完，请联系班主任通过续费购买在线练题次数',
											showCancel: false,
											success: (res) => {
												if (res.confirm) {
													console.log('不进入exam')
												}
											}
										})
									} else {
										
										this.paperDetails.TestName = res.data[0].TestName;
										this.paperDetails.Duration = res.data[0].Duration;
										let qtypes = '';
										this.paperDetails.Q_TypeCounts = [];
										for (let test of res.data) {
											this.paperDetails.QCount += Number(test.QCount);
											this.paperDetails.QSumScore += Number(test.QSumScore);
											qtypes = qtypes + test.QTypeID + '_';
											
											let Q_TypeCount = {
												QTypeOrder : '',
												QCount : '',
												QTypeID : ''
											}
											Q_TypeCount.QTypeOrder = test.QTypeOrder;
											Q_TypeCount.QCount = test.QCount;
											Q_TypeCount.QTypeID = test.QTypeID;
											this.paperDetails.Q_TypeCounts.push(Q_TypeCount);
										}
										let qtypeslen = qtypes.length
										this.paperDetails.Q_Types = qtypes.substr(0, qtypeslen - 1);
							
										console.log(this.paperDetails);
										uni.reLaunch({
											url: "../exam/exam?TestModel=L&paperDetails=" + encodeURIComponent(JSON.stringify(this.paperDetails)),
										});
									}
								}
							});
						}else if(res.cancel){
							console.log("取消重新测试")
						}
					}
				})
			},
			
			//继续测试
			goExamContinue(){
				this.paperDetails.TestID = this.testid;
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/getTestInfo',
					method:'POST',
					data:{
						TestID: this.paperDetails.TestID,
						type: 0,
						TestModel: 'L'
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': uni.getStorageSync('sessionid')
					},
					success: (res) => {
						if (res.data.msg == '失败') {
							uni.showModal({
								title: '提示',
								content: '您的该套试卷正在练习当中',
								showCancel: false,
								success: (res) => {
									if (res.confirm) {
										console.log('不进入exam')
									}
								}
							})
						} else {				
							this.paperDetails.TestName = res.data[0].TestName;
							this.paperDetails.Duration = res.data[0].Duration;
							let qtypes = '';
							this.paperDetails.Q_TypeCounts = [];
							for (let test of res.data) {
								this.paperDetails.QCount += Number(test.QCount);
								this.paperDetails.QSumScore += Number(test.QSumScore);
								qtypes = qtypes + test.QTypeID + '_';
								
								let Q_TypeCount = {
									QTypeOrder : '',
									QCount : '',
									QTypeID : ''
								}
								Q_TypeCount.QTypeOrder = test.QTypeOrder;
								Q_TypeCount.QCount = test.QCount;
								Q_TypeCount.QTypeID = test.QTypeID;
								this.paperDetails.Q_TypeCounts.push(Q_TypeCount);
							}
							let qtypeslen = qtypes.length
							this.paperDetails.Q_Types = qtypes.substr(0, qtypeslen - 1);
													
							console.log(this.paperDetails);
							uni.reLaunch({
								url: "../exam/exam?TestModel=L&paperDetails=" + encodeURIComponent(JSON.stringify(this.paperDetails)),
							});
						}
					}
				})
			}
			
		}
	}
</script>

<style>
	.Item {
		margin-top: 20rpx;
		position: relative;
		left: 15rpx;
		width: 720rpx;
		height: 170rpx;
		border-bottom: 1rpx solid #b8bbbb;
	}

	.textMsg {
		position: relative;
	}

	.title {
		position: absolute;
		font-size: 30rpx;
		width: 480rpx;
		top: 30rpx;
		left: 30rpx;
	}
	.title2 {
		position: absolute;
		font-size: 25rpx;
		width: 450rpx;
		top: 10rpx;
		left: 30rpx;
	}
	.subdate {
		position: absolute;
		font-size: 30rpx;
		top: 90rpx;
		left: 30rpx;
	}

	.qpct {
		position: absolute;
		font-size: 30rpx;
		top: 90rpx;
		left: 200rpx;
	}

	.btnMsg {
		position: relative;
		left: 500rpx;
	}

	.btnpos1 {
		position: absolute;
		height: 56rpx;
		left: 2rpx;
		font-size: 28rpx;
		top: 16rpx;
	}

	.btnpos1txt {
		position: absolute;
		height: 56rpx;
		left: 40rpx;
		font-size: 30rpx;
		text-align: center;
		top: 16rpx;
	}

	.btnpos1btn {
		position: absolute;
		height: 56rpx;
		left: 40rpx;
		font-size: 30rpx;
		text-align: center;
		top: 46rpx;
	}

	.btnpos2 {
		position: absolute;
		height: 60rpx;
		font-size: 30rpx;
		top: 90rpx;
	}
</style>
