<!-- 试卷详情 -->
<template>
	<view>
		<view class="paper">
			<view class="paperName">{{paperName}}</view>
			<view class="paperDetail cu-list menu">
				<!-- <view class="openTime cu-item">
					<view class="openTimeTitle cu-btn round line-blue">开放时间</view>
					<view class="openTimeText">{{ startTime }}--{{ endTime }}</view>
					<view class="openTimeText pText">2020.03.12 20:20-2020.03.14 20:20</view>
				</view> -->
				<view class="questionNum cu-item">
					<view class="questionNumTitle cu-btn round line-blue">题目数量</view>
					<view class="questionNumText pText">{{ questionNum }}</view>
				</view>
				<!-- <view class="chanceNum cu-item">
					<view class="chanceNumTitle cu-btn round line-blue">剩余做题次数</view>
					<view class="chanceNumText pText">{{ chanceNum }}</view>
				</view> -->
				<view class="testTime cu-item">
					<view class="testTimeTitle cu-btn round line-blue">做题时长</view>
					<view class="testTimeText pText">{{ testTime }}分钟</view>
				</view>
				<view class="fullMarks cu-item">
					<view class="fullMarksTitle cu-btn round line-blue">满分</view>
					<view class="fullMarksText pText">{{ fullMarks }}</view>
				</view>
			</view>
			<view class="warning">
				<view class="warningText">
					<view v-if="testmodel=='L'" class="cuIcon-info text-center text-yellow">做题中途强制退出即交卷，<br />如须退出请保存做题进度</view>
					<view v-else-if="testmodel=='K'" class="cuIcon-info text-center text-yellow">考试中途请不要退出或关闭小程序，<br />如果意外退出，最多等待3分钟重新进入答题</view>
				</view>
			</view>
		</view>

		<!-- <view class="goTestBtn cu-btn shadow radius bg-orange text-white" @click="enterQues">
			开始答题
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		//传入题库的名字
		props: {
			paperName: {
				type: String,
				default: ''
			},
			// openTime: {
			// 	type: Date,
			// 	default: 0
			// },
			questionNum: {
				type: Number,
				default: 0
			},
			// chanceNum: {
			// 	type: Number,
			// 	default: 0
			// },
			testTime: {
				type: String,
				default: ""
			},
			fullMarks: {
				type: Number,
				default: 0
			},
			testmodel: {
				type: String,
				default: 'L'
			}

		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.paper {
		position: relative;
		top: 20rpx;
	}

	.paper>view {
		font-size: 35rpx;
	}

	.pText {
		font-size: 30rpx;
	}

	.paperName {
		margin-left: 50rpx;
		width: 650rpx;
		text-align: center;
	}

	.paperDetail {
		position: relative;
	}

	.goTestBtn {
		width: 300rpx;
		position: relative;
		top: 200rpx;
	}
	
	.warningText{
		font-size: 33rpx;
	}
</style>
