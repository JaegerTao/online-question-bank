<template>
	<view>
		<view class="cu-bar bg-blue solid-bottom shadow">
			<view class="content">企业人力资源管理师一级</view>
		</view>
		<view class="cu-list menu card-menu margin-top">
			<view class="cu-item" v-for="(item, index) in paperItemList" :key='index'>
				<view class="cuIcon-circlefill text-gray"></view>
				<view class="paperName">{{ item.paperName }}</view>
				<view class="cu-btn bg-orange round shadow" @tap="goExam">开始做题</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paperItemList:[
					{
						paperName: '2020年5月企业人力资源管理师一级理论模拟题(一)',
						paperID: '001'
					},
					{
						paperName: '2020年5月企业人力资源管理师一级理论模拟题(二)',
						paperID: '002'
					},
					{
						paperName: '2020年5月企业人力资源管理师一级理论模拟题(三)',
						paperID: '002'
					},
					{
						paperName: '2020年5月企业人力资源管理师一级理论模拟题(四)',
						paperID: '002'
					}
				]
			}
		},
		methods: {
			goExam(){
				uni.navigateTo({
					url: '../exam/exam',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>
	.paperName{
		margin-left: 20rpx;
	}
	.cu-btn{
		width: 250rpx;
	}
</style>
