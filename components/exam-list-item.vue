<template>
	<view class="Item">
		<view class="textMsg">
			<text :class="title.length < 15 ? 'title' : 'title2'">{{ title }}</text>
			<block v-if="!isrecord">
				<text class="examtime">考试时间：{{" " + startTime + " "}}至{{" " + endTime }}</text>
			</block>
			<block v-else>
				<text class="subdate" v-show="issubmit == '1'">{{ subdate }}</text>
				<text :class="issubmit == '1' ? 'qpct':'subdate'">共{{ qsum }}题</text>
			</block>
		</view>
		<block v-if="isrecord">
			<view class="btnMsg" v-if="issubmit == '1'">
				<view class=" cu-btn round light bg-blue text-gray btnpos1" @tap="goResult">查看结果</view>
			</view>
			<view class="btnMsg" v-else-if="issubmit == '0'">
				<text class="btnpos1txt text-gray">未提交</text>
			</view>
		</block>
		<block v-else>
			<view class="btnMsg">
				<view class=" cu-btn bg-blue round shadow btnpos2" @tap="goExam">开始考试</view>
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
				cookie: ''
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
			startTime: {
				type: String,
				default: ""
			},
			endTime: {
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
		created() {
			this.paperDetails.TestID = this.testid;
			this.cookie = uni.getStorageSync('sessionid');
		},
		methods: {
			//开始考试
			goExam() {
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/iskcStartTest',
					method:'POST',
					data:{
						StartTime: this.startTime,
						EndTime: this.endTime
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						if(res.data == 'OK'){
							uni.showModal({
								title: '提示',
								content: '系统将开启考试模式，中途请不要关闭小程序（如果意外关闭，最多等待3分钟方可重新进入考试），您确认继续吗？',
								success: (res) => {
									if(res.confirm){
										this.startExam();
									}else if(res.cancel){
										
									}
								}
							})
						}else{
							uni.showModal({
								title:'提示',
								content: res.data,
								showCancel: false
							})
						}
					}
				})
			},
			
			startExam(){
				this.paperDetails.TestID = this.testid;
				uni.request({ //获取试卷详情，开始测试
					url: reqAddress.DomainName + '/funcQuestion/Test/kcstart',
					method: 'POST',
					data: {
						TestID: this.paperDetails.TestID,
						TestModel: 'K'
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						if (res.data.msg == '失败') {
							uni.showModal({
								title: '提示',
								content: res.data.data,
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
							let time = {
								StartTime: this.startTime,
								EndTime: this.endTime
							} 
							uni.reLaunch({
								url: "../exam/exam?TestModel=K&time=" + encodeURIComponent(JSON.stringify(time)) + "&paperDetails=" + encodeURIComponent(JSON.stringify(this.paperDetails)),
							});
						}
					}
				});
			},
			
			//查看结果
			goResult(){
				uni.navigateTo({
					url:'../exam/testResult/testResult?TestID=' + this.testid + '&TestName=' + this.title
				})
			}
			
		}
	}
</script>

<style>
	.Item {
		margin-top: 20rpx;
		position: relative;
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
		top: 25rpx;
		left: 30rpx;
	}
	.title2 {
		position: absolute;
		font-size: 25rpx;
		width: 450rpx;
		top: 10rpx;
		left: 30rpx;
	}
	.examtime{
		position: absolute;
		font-size: 27rpx;
		top: 90rpx;
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
		top: 36rpx;
	}

	.btnpos1txt {
		position: absolute;
		height: 56rpx;
		left: 40rpx;
		font-size: 30rpx;
		text-align: center;
		top: 36rpx;
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
		top: 16rpx;
	}
</style>
