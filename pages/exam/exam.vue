<template>
	<view class="content">
		<view class="paperDetail" v-if="showExams">
			<text class="text-blue">试卷详情</text>
			<paperDetail :testmodel="TestModel" :paperName="paperDetails.TestName" :questionNum="paperDetails.QCount" :testTime="testTime" :fullMarks="paperDetails.QSumScore"></paperDetail>
			<view class="btnTestBtn cu-btn shadow radius bg-orange text-white" @tap="enterQues">开始答题</view>
		</view>

		<!--传输题库的第几套题，由点击事件传递参数-->
		<questionsList v-if="showQues" :testmodel='TestModel' :testid='paperDetails.TestID' :tduration="paperDetails.Duration"
		 :tqtypes="paperDetails.Q_Types" :qtypecounts='paperDetails.Q_TypeCounts' :showAllAnswer='showAllAnswer' :index='questionIndex'
		 :firsttype="questionType" :continueAnswer="continueAnswer" :pstartTime="StartTime" :pendTime="EndTime"></questionsList>
	</view>
</template>

<script>
	//引入试卷样式组件
	import paperDetail from '../../components/paper-detail.vue';
	//引入题目样式
	import questionsList from '../../components/question-options.vue';
	//引入题目数据
	// import questionDatas from './questionBanks.js';
	import reqAddress from 'common/reqAddress.js'
	
	let checkOnlineTimer;
	
	export default {
		data() {
			return {
				//得到的题库数据
				//questionDatas: questionDatas,

				//试卷详情
				paperDetails: {
					TestID: '', //试卷id，试卷唯一标识
					TestName: '', //试卷名
					Duration: '', //时长
					QCount: 0, //题目总数
					QSumScore: 0, //试卷总分
					Q_Types: '',
					Q_TypeCounts: []
					// pcnt: 1 //剩余次数
				},
				testTime: "",
				TestModel: "",
				StartTime: "",
				EndTime: "",

				//是否展示题库页
				showExams: true,
				//是否展示答题页
				showQues: false,
				showAllAnswer: false,
				//初始展示题目的序号
				questionIndex: 1,
				questionType: "",
				continueAnswer: false,
				
				cookie: ''
			}
		},
		onLoad(data) {
			//data接收TestID
			// console.log(data)
			this.TestModel = data.TestModel;
			if (data.time != null) {
				let time = JSON.parse(decodeURIComponent(data.time));
				// console.log(time);
				this.StartTime = time.StartTime;
				this.EndTime = time.EndTime;
			}
			if (data.showAllAnswer != null) {
				this.showAllAnswer = data.showAllAnswer;
				this.showExams = false;
				this.showQues = true;
				this.questionIndex = data.index;
				this.questionType = data.type;
			}

			if (data.paperDetails != null) {
				this.paperDetails = JSON.parse(decodeURIComponent(data.paperDetails));
				// console.log(this.paperDetails.Duration);
				if (!this.showAllAnswer) {
					this.questionType = this.paperDetails.Q_TypeCounts[0].QTypeID;
				}
				if (this.paperDetails.Duration.includes("_")) {
					this.testTime = this.paperDetails.Duration.match("^([^\\_\\-\\s]+)[\\_\\-\\s].*$")[1];
				} else {
					this.testTime = this.paperDetails.Duration
				}
				// console.log(this.testTime);
				
			}

			this.cookie = uni.getStorageSync('sessionid');
			
			if(this.TestModel == 'K'){
				this.checkUserOnline();
			}

			uni.$on('returnData', (res) => {
				console.log(res);
				//题库界面隐藏
				this.showExams = !this.showExams;
				//题目界面显示
				this.showQues = !this.showQues;
			})
		},
		//页面跳转刷新
		onShow() {
			//非首页隐藏返回默认按钮
			wx.hideHomeButton();

		},
		onUnload() {
			clearTimeout(checkOnlineTimer);
		},
		//组件注册
		components: {
			paperDetail,
			questionsList
		},
		methods: {
			//点击开始做题
			enterQues() {
				this.showExams = false;
				this.showQues = true;

			},
			//返回首页
			btnBackHome() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			
			//添加计时器，检测用户是否在考试模式
			checkUserOnline(){
				uni.request({
					url: reqAddress.DomainName + "/funcQuestion/Test/checkUserOnline",
					method: 'GET',
					data:{
						TestID : this.paperDetails.TestID
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						checkOnlineTimer = setTimeout(this.checkUserOnline, 2 * 60 * 1000);
					},
					fail: () => {
						
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.paperDetail {
		margin-top: 10rpx;
		text-align: center;

		text {
			font-size: 50rpx;
			text-align: center;
		}

		.btnTestBtn {
			width: 200rpx;
			position: relative;
			top: 200rpx;
			// left: 100rpx;
		}

		.btnBackHome {
			width: 200rpx;
			position: relative;
			top: 330rpx;
			right: 100rpx;
		}
	}
</style>
