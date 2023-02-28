<template>
	<view>
		<view class="top light bg-gradual-orange">
			<view class="circlePercent">
				<circlePercent bg="#ee9f00" :percent="accuracy"></circlePercent>
			</view>
		</view>
		<view class="">
			<view class="time_score_content">
				<view class="time_part">
					<view class="cuIcon-time line-green"></view>
					<view class="time_info">{{spendTime.minute}}:{{spendTime.second}}</view>
				</view>
				<view class="current_part">
					<view class="cuIcon-roundcheck line-green"></view>
					<view class="current_info">{{count}}</view>
				</view>
				<!-- <view class="score_part">
					<view class="cuIcon-favor line-green"></view>
					<view class="score_info">{{score}}</view>
				</view> -->
			</view>
		</view>
		<!--提示窗口-->
		<view class="prompt_content" id="head">
			<view class="prompt_content_text">
				<text class="cuIcon-title text-red"></text>
				<text>点击题目查看题目解析</text>
			</view>
			<view class="prompt_content_info">
				<text class="cuIcon-square bg-green "></text>正确
				<text class="cuIcon-square bg-red"></text>错误
				<text class="cuIcon-square"></text>未做
			</view>
		</view>
		<!--答题卡-->
		<view class=" scroll_content">
			<scroll-view scroll-y="true" class="page padding" :style="{'height':scrollHeight}">
				<view v-if="quesListSum[0].sum>0">
					<text class="textQuesType">单选题</text>
					<view class="grid col-5">
						<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='D' ">
							<button class="cu-btn round" :class="items.uIsTrue===null?'': (items.uIsTrue==='0'?'bg-red':'bg-green')" @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
						</view>
					</view>
				</view>
				<view v-if="quesListSum[1].sum>0">
					<view class="textQuesType">复选题</view>
					<view class="grid col-5">
						<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='F' ">
							<button class="cu-btn round" :class="items.uIsTrue===null?'': (items.uIsTrue==='0'?'bg-red':'bg-green')" @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
						</view>
					</view>
				</view>
				<view v-if="quesListSum[2].sum>0">
					<view class="textQuesType">简答题</view>
					<view class="grid col-5">
						<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='J' ">
							<button class="cu-btn round" :class="items.uIsTrue===null?'': (items.uIsTrue==='0'?'bg-red':'bg-green')" @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
						</view>
					</view>
				</view>
				<view v-if="quesListSum[3].sum>0">
					<view class="textQuesType">判断题</view>
					<view class="grid col-5">
						<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID === 'P'">
							<button class="cu-btn round" :class="items.uIsTrue===null?'': (items.uIsTrue==='0'?'bg-red':'bg-green')" @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
						</view>
					</view>
				</view>
				<view v-if="quesListSum[4].sum>0">
					<view class="textQuesType">综合单选题</view>
					<view class="grid col-5">
						<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='Z' ">
							<button class="cu-btn round" :class="items.uIsTrue===null?'': (items.uIsTrue==='0'?'bg-red':'bg-green')" @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!--返回按钮-->
		<view class="return_content" id="foot">
			<button type="primary" class="cu-btn round btnAgain" @click="toExam">再做一次</button>
			<button type="primary" class="cu-btn round btnReturn" @click="returnIndexPage">返回首页</button>
		</view>
	</view>
</template>

<script>
	import circlePercent from '../../../components/circle-percent/circle-percent.vue';
	// import banks from '../questionBanks.js';
	import reqAddress from '../../../common/reqAddress.js'
	export default {
		data() {
			return {
				accuracy: '0', //题目正确率,
				score: 0, //题目得分,
				count: 0, //答对题目数
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
				scrollHeight: '400rpx',
				//答题消耗时间
				spendTime: {
					hour: 0,
					minute: 0,
					second: 0
				},
				allQuestions: [],
				//题库中各种题的数量
				quesListSum: [{
						type: 'D',
						sum: 0
					}, //单选
					{
						type: 'F',
						sum: 0
					}, //复选
					{
						type: 'J',
						sum: 0
					}, //简答
					{
						type: 'P',
						sum: 0
					}, //判断
					{
						type: 'Z',
						sum: 0
					}, //综合
				],
			};
		},
		components: {
			circlePercent
		},
		onLoad(res) {
			//初始清空时间列表
			let time = JSON.parse(res.time);
			this.score = res.score;
			this.paperDetails.TestID = res.TestID;
			let tallQuestions = JSON.parse(decodeURIComponent(res.allQuestions));
			this.allQuestions = tallQuestions;
			// console.log(this.allQuestions);
			this.setSpendTime(time);
			//获取题目信息
			this.getQuesListFromServer();
			//获取正确率函数
			this.getAccuracy();
			try{
				let sysinfo = uni.getSystemInfoSync();
				console.log(sysinfo.pixelRatio);
				console.log(sysinfo.screenHeight);
				if(sysinfo.screenHeight > 800){
					this.scrollHeight = '690rpx'
				}else if(sysinfo.screenHeight > 500){
					this.scrollHeight = '400rpx'
				}
			}catch(e){
				//TODO handle the exception
				
			}
		},
		onReady() {
			var tempHeight = 300;
			var _self = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {
					tempHeight = res.windowHeight;
					//console.log("屏幕可用高度 " + JSON.stringify(res));
					//在组件内获取id，需要加in(this),此处使用—_self代替了this
					uni.createSelectorQuery().select("#head").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						//console.log("屏幕数据 " + data);
						tempHeight -= data.height;
						//console.log("减掉顶部后的高度 " + tempHeight);
						uni.createSelectorQuery().select("#foot").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							//console.log("减掉底部后的高度 " + tempHeight);
							_self.swiperHeight = tempHeight + 'px';
							//console.log("滑屏最后高度 " + _self.swiperHeight);
						}).exec();
					}).exec();
				},
				fail() {

				}
			});
		},
		onShow() {
			if (wx.hideHomeButton) {
				wx.hideHomeButton();
			}
		},
		methods: {
			//从服务器获取题目列表
			getQuesListFromServer: function() {
				console.log('getqueslistfromserver')
				//接口获取题目列表数据
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
						// console.log(res);
						if (res.data.msg == '失败') {
							
						} else {				
							this.paperDetails.TestName = res.data[0].TestName;
							this.paperDetails.Duration = res.data[0].Duration;
							let qtypes = '';
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
						}
					}
				})

			},
			//设置显示时间
			setSpendTime: function(time) {
				this.spendTime.hour = 0;
				this.spendTime.minute = 0;
				this.spendTime.second = 0;
				this.spendTime.hour = time.hour;
				this.spendTime.minute = time.minute;
				this.spendTime.second = time.second;
				// console.log(this.spendTime);
			},
			//获取题目的正确率以及答题时间
			getAccuracy: function() {
				//定义局部变量，答对的题目数，以及获得的分数
				var questionRight = 0;
				for (let i = 0; i < this.allQuestions.length; i++) {
					//console.log(this.allQuestions[i].uIsTrue);
					if (this.allQuestions[i].uIsTrue === "1") {
						questionRight++;
					}
					for (var j = 0; j < this.quesListSum.length; j++) {
						if (this.allQuestions[i].QTypeID === this.quesListSum[j].type) {
							this.quesListSum[j].sum++;
							break;
						}
					}
				}

				//小数取两位小数
				if (questionRight === 0) {
					this.accuracy = "0.00";
				} else {
					this.accuracy = (((questionRight / this.allQuestions.length) * 100).toFixed(2)).toString();
				}
				this.count = questionRight;
			},
			//点击跳转到对应的题目
			AppointedSubject: function(index, type) {
				console.log(index + " " + type);
				uni.navigateTo({
					url: '../exam?TestModel=L&paperDetails=' + encodeURIComponent(JSON.stringify(this.paperDetails)) + "&showAllAnswer=" + true + '&type=' + type + '&index=' + index,
				});
			},
			//返回首页
			returnIndexPage: function() {
				uni.switchTab({
					url: "../../index/index"
				})
			},
			//在测试一次
			toExam: function() {
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
										for (let test of res.data) {
											this.paperDetails.QCount += Number(test.QCount);
											this.paperDetails.QSumScore += Number(test.QSumScore);
											qtypes = qtypes + test.QTypeID + '_';
										}
										let qtypeslen = qtypes.length
										this.paperDetails.Q_Types = qtypes.substr(0, qtypeslen - 1);
							
										console.log(this.paperDetails);
										uni.redirectTo({
											url: '../exam?TestModel=L&paperDetails=' + encodeURIComponent(JSON.stringify(this.paperDetails)),
										});
									}
								}
							});
						}else if(res.cancel){
							console.log("取消重新测试")
						}
					}
				})
				// uni.reLaunch({
				// 	url: "../exam",
				// 	success: (res) => {
				// 		console.log(res);
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss">
	.top {
		height: 320upx;
		border-radius: 30upx 30upx 0upx 0upx;
		//position: relative;
	}

	.circlePercent {
		position: absolute;
		top: 30upx;
		left: 250upx;
		//border-bottom: 1upx solid black;
	}

	.textQuesType {
		display: flex;
		left: 10rpx;
		font-weight: 600;
		margin-bottom: 20rpx 0;
	}

	.time_score_content {
		display: flex;
		position: relative;
		top: 40upx;
		padding: 10upx 0;
		justify-content: space-between;
		height: 180upx;

		.time_part {
			width: 50%;
			//background-color: yellow;
			border-right: 1upx solid #C0C0C0;
			text-align: center;

			view {
				&:first-child {
					font-size: 60upx;
				}
			}

			.time_info {
				padding: 20upx auto;
			}
		}

		.current_part {
			width: 50%;
			//background-color: yellow;
			border-right: 0.3upx solid #C0C0C0;
			text-align: center;

			view {
				&:first-child {
					font-size: 60upx;
				}
			}

		}

		.score_part {
			width: 33.33%;
			//background-color: yellow;
			text-align: center;

			view {
				&:first-child {
					font-size: 60upx;
				}
			}
		}
	}

	.prompt_content {
		//border: 2px solid red;
		position: relative;
		top: 90upx;
		padding: 0 40upx;

		.prompt_content_text {
			display: inline;
		}

		.prompt_content_info {
			display: inline;
			padding-left: 16upx;

			text {
				margin: 0 15upx;
			}
		}
	}

	.scroll_content {
		//border: 2px solid red;
		border-top: 0.3upx solid #C0C0C0;
		position: relative;
		width: 90%;
		left: 5%;
		text-align: center;
		justify-content: center;
		top: 150upx;
	}

	.return_content {
		//border: 2px solid red;
		display: flex;
		position: fixed;
		width: 100%;
		justify-content: center;
		bottom: 30rpx;
		margin: 0 auto;

		.btnAgain {
			background-color: #F17E3F;
			margin: auto 60rpx;
		}

		.btnReturn {
			background-color: #F17E3F;
			margin: auto 60rpx;
		}
	}
</style>
