<template>
	 <view class="content">
		 <view class="bankList" v-if="showExams">
		 	<view>
		 		<text>题库列表</text>
		 	</view>
		 </view>
		 <!--这里没有拿到题库名称，所以以一个数组中文字代替，后期更换-->
		<examsList   v-if="showExams" v-for="(item,index) in arr" :key='index' :bankName='item.name' :value='index' ></examsList>
		<!--传输题库的第几套题，由点击事件传递参数-->	
		<questionsList v-if="showQues" :bankQues="questionDatas[bankNo]" :vaue="bankNo"></questionsList>
	</view>
</template>

<script>
	//引入试卷样式组件
	import examsList from '../../components/examination-paper-list.vue';
	//引入题目样式
	import questionsList from '../../components/question-options.vue';
	//引入题目数据
	import questionDatas  from './questionBanks.js';
	export default {
		data() {
			return {
				//得到的题库数据
				questionDatas:questionDatas,
				arr:[
					{name:'题库一'},
					{name:'题库二'}
				],
				bankNo:0,
				//是否展示题库页
				showExams:true,
				//是否展示答题页
				showQues:false
			}
		},
		onLoad() {
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
			this.showExams = true;
			this.showQues = false;
		},
		//组件注册
		components:{
			examsList,
			questionsList
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.bankList{
		margin-top: 10px;
		text-align: center;
		text{
			font-size: 20px;
			text-align: center;
		}
	}
</style>
