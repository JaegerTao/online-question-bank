<template>
	<view class="flex flex-row list-item radius shadow shadow-lg margin-top light">
		<view class="icon">
			<image :src="icon" mode="aspectFill" :style="{ height:(iconSize) + 'rpx',width: (iconSize)+ 'rpx'}"></image>
		</view>
		<view class="title">
			<text :style="{ fontSize : (listSize / 2.5)+ 'rpx'}">{{title}}</text>
		</view>
		<view class="subHead">
			<text :style="{ fontSize : '30rpx' }">{{ subHead }}</text>
		</view>
		<view class="messagenum cu-btn bg-blue text-white round" v-if="messagenum > 0">{{ messagenum }}</view>
		<view class="goBtn">
			<text class="cuIcon-right" :style="{ fontSize : (listSize / 2)+ 'rpx'}"></text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'index-list',
		props: {
			icon: {
				type: String,
				default: '../static/imgs/home.png'
			},
			title: {
				type: String,
				default: '我的试卷'
			},
			subHead: {
				type: String,
				default: '我购买的课程试题'
			},
			listSize: {
				type: Number,
				default: 100
			},
			iconSize: {
				type: String,
				default: '100'
			},
			messagenum:{
				type: Number,
				default: 0
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.flex {
		display: flex;
	}

	.flex-row {
		flex-direction: row;
	}

	.list-item {
		width: 730rpx;
		height: 150rpx;
		position: absolute;
		left: 10rpx;
	}

	.icon {
		position: relative;
		left: 20rpx;
		top: 20rpx;
	}

	.title {
		position: absolute;
		left: 170rpx;
		top: 10rpx;
		color: #0D3349;
	}
	.subHead{
		position: absolute;
		left: 170rpx;
		top: 80rpx;
		color: #639494;
	}
	.messagenum{
		position: absolute;
		left: 580rpx;
		top: 40rpx;
		font-size: 25rpx;
	}
	.goBtn {
		position: absolute;
		left: 670rpx;
		top: 30rpx;
		color: #0D3349;
	}
</style>
