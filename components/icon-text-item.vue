<template>
	<view class="Item">
		<view class="Icon text-orange" :class="icon"></view>
		<text class="Num">{{ num }}</text>
		<text class="Title">{{ title }}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			title:{
				type: String,
				default: "做题量"
			},
			icon:{
				type: String,
				default: "cuIcon-rank"
			},
			num:{
				type: String,
				default: "0"
			}
		}
	}
</script>

<style>
	.Item{
		position: relative;
		width: 150rpx;
	}
	.Icon{
		position: absolute;
		width: 100rpx;
		height: 160rpx;
		font-size: 100rpx;
		top: -10rpx;
	}
	.Num{
		position: absolute;
		font-size: 30rpx;
		text-align: center;
		top: 125rpx;
		width: 100rpx;
	}
	.Title{
		position: absolute;
		top: 170rpx;
		font-size: 30rpx;
		text-align: center;
		width: 100rpx;
	}
</style>
