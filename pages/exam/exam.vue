<template>
	 <view class="content">
		 <view class="paperDetail" v-if="showExams">
		 	<text class="text-blue">试卷详情</text>
			<paperDetail ></paperDetail>
		 </view>
		
		<!--传输题库的第几套题，由点击事件传递参数-->	
		<questionsList v-if="showQues" :bankQues="questionDatas[bankNo]" :value="bankNo" :showAnswer='showAnswer' :index='questionIndex'></questionsList>
	</view>
</template>

<script>
	//引入试卷样式组件
	import paperDetail from '../../components/paper-detail.vue';
	//引入题目样式
	import questionsList from '../../components/question-options.vue';
	//引入题目数据
	import questionDatas  from './questionBanks.js';
	export default {
		data() {
			return {
				//得到的题库数据
				questionDatas:questionDatas,
				paperDetails:{
					name : '试卷名',
					qNum : 0,
					
				},
				bankNo:0,
				//是否展示题库页
				showExams:true,
				//是否展示答题页
				showQues:false,
				showAnswer:false,
				questionIndex:0,//初始展示题目的序号
			}
		},
		onLoad(data) {
			console.log(data);
			 if(data.showAnswer||data.value >= 0){
				console.log('jonin')
				this.showAnswer = data.showAnswer;
				this.showExams = false;
				this.showQues = true;
				this.bankNo = data.value;
				this.questionIndex = data.index;
			}
			uni.$on("enterExam",(res)=>{
				console.log(res);
				//题库界面隐藏
				this.showExams = !this.showExams;
				//题目界面显示
				this.showQues = !this.showQues;
				this.bankNo = res.num;
				console.log(this.questionDatas);
			});
			uni.$on('returnData',(res)=>{
				console.log(res);
				//题库界面隐藏
				this.showExams = !this.showExams;
				//题目界面显示
				this.showQues = !this.showQues;
			})
		},
		//页面跳转刷新
		onShow() {
			// this.showExams = true;
			// this.showQues = false;
		},
		onBackPress() {
			console.log("click")
			//this.showUpWindow = "showUpWindow";
			//才表示不执行默认的返回，自行处理此时的业务逻辑
			return true;
		},
		//组件注册
		components:{
			paperDetail,
			questionsList
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.paperDetail{
		margin-top: 10rpx;
		text-align: center;
		text{
			font-size: 50rpx;
			text-align: center;
		}
	}
</style>
