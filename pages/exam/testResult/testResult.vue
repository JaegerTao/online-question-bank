<template>
	<view>
		<view class="title text-center bg-gradual-orange">
			<view class="TestName">{{ TestName }}</view>
			<view class="SubmitTime">提交时间：{{' ' + SubmitTime }}</view>
		</view>
		<view class="paperdetail">
			<view class="resultGrid text-center">
				<text class="cuIcon-edit text-blue">试卷分数</text>
				<view class="grid col-2 text-center">
					<view class="">
						<block v-for="(item, index) in TestResult" :key="index">
							<view class="">{{ qtypeToString(item.QTypeID) }}</view>
						</block>
						<view class="text-orange">试卷总分</view>
					</view>
					<view class="">
						<block v-for="(item, index) in TestResult" :key="index">
							<view class="">{{ item.QSumScore }}</view>
						</block>
						<view class="">{{ paperSumScore }}</view>
					</view>
				</view>
			</view>
			
			<view class="resultGrid text-center">
				<text class="cuIcon-form text-blue">我的分数</text>
				<view class="grid col-2 text-center">
					<view class="">
						<view class="" v-if="TestResult[0].DScore!=null">单选题</view>
						<view class="" v-if="TestResult[0].FScore!=null">多选题</view>
						<view class="" v-if="TestResult[0].PScore!=null">判断题</view>
						<view class="" v-if="TestResult[0].ZScore!=null">综合单选题</view>
						<view class="text-orange">我的总分</view>
					</view>
					<view class="">
						<view class="" v-if="TestResult[0].DScore!=null">{{ TestResult[0].DScore }}</view>
						<view class="" v-if="TestResult[0].FScore!=null">{{ TestResult[0].FScore }}</view>
						<view class="" v-if="TestResult[0].PScore!=null">{{ TestResult[0].PScore }}</view>
						<view class="" v-if="TestResult[0].ZScore!=null">{{ TestResult[0].ZScore }}</view>
						<view class="">{{ mySumScore }}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="Btns grid col-2 text-center">
			<view class="">
				<button class="cu-btn bg-orange shadow" @tap="NavBack">返回考试记录</button>
			</view>
			<view class="">
				<button class="cu-btn bg-orange shadow" @tap="NavBackHome">返回首页</button>
			</view>
		</view>
	</view>
</template>

<script>
	import reqAddress from '../../../common/reqAddress.js'
	
	export default {
		data() {
			return {
				TestName: '',
				TestID: '',
				SubmitTime: '',
				
				TestResult: [],//考试结果
				paperSumScore: 0,
				mySumScore: 0,
				
				cookie: ''
			}
		},
		onLoad(data) {
			this.TestName = data.TestName;
			this.TestID = data.TestID;
			this.cookie = uni.getStorageSync('sessionid');
			
			this.kcResult();
		},
		methods: {
			
			//获取考试结果
			kcResult(){
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/kcResult',
					method:'POST',
					data:{
						TestID: this.TestID
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						if(res.data.length > 0){
							this.SubmitTime = res.data[0].SubmitTime;
							this.TestResult = res.data;
							this.mySumScore = Number(res.data[0].Score);
							for(let item of res.data){
								this.paperSumScore += Number(item.QSumScore);
							}
						}
					}
				})
			},
			
			//根据type转换为中文
			qtypeToString(QTypeID){
				let qtypeString = ''; 
				switch(QTypeID){
					case 'D':
						qtypeString = "单选题";
						break;
					case 'F':
						qtypeString = "多选题";
						break;
					case 'P':
						qtypeString = "判断题";
						break;
					case 'Z':
						qtypeString = "综合单选题";
						break;
				}
				return qtypeString;
			},
			
			NavBack(){
				uni.navigateBack({
					delta:1
				})
			},
			
			NavBackHome(){
				uni.navigateBack({
					delta:2
				})
			}
		}
	}
</script>

<style>
	.title{
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 15rpx 15rpx 15rpx 15rpx;
		box-shadow: 10rpx 10rpx 5rpx #e2e2e2;
	}
	.TestName{
		font-size: 32rpx;
		margin-top: 20rpx;
	}
	.SubmitTime{
		margin: 20rpx;
	}
	
	.paperdetail{
		font-size: 32rpx;
	}
	.resultGrid{
		margin: 10rpx;
		margin-bottom: 20rpx;
		padding: 20rpx;
		box-shadow: 10rpx 10rpx 5rpx #e2e2e2;
	}
	
	.Btns{
		margin-top: 30rpx;
	}
</style>
