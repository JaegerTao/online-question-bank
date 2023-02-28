<template>
	<view>
		<view class="title">公司简介</view>
		<view class="intro">
			<view>\t 成都人才管理培训学校简称【成都人才培训】，成立于1999年12月1日，多年来致力于人才培训领域，为数百家企业提供培训、管理咨询等人才服务。\n</view>
			<!-- <view>服务宗旨：xxx</view>
			<view>企业愿景：xxx</view> -->
		</view>
		
		<view class="title">服务内容</view>
		<view class="intro">
			√ 认证类培训         √ 人才测评
			√ 公开课培训         √ 考务承接
			√ 公益沙龙/讲座    √ 成都人才特色培训
			√ 企业内训
			√ 商务考察
		</view>
		
		<view class="title">联系方式</view>
		<view class="imgaddress">
			<image src="../../../static/imgs/address.png" mode="aspectFit"></image>
		</view>
		<view class="infoaddress">
			<view> 电话： 028-60811172/73/74/75/77/80/92 </view>
			<view> 地址： 成都市宁夏街136号人才大厦4楼 </view>
			<view>邮箱： cdrcpx@rc114.com </view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.title{
		width: 750rpx;
		text-align: center;
		font-size: 40rpx;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}
	.imgaddress{
		width: 500rpx;
		margin-left: 125rpx;
	}
	.intro{
		width: 650rpx;
		margin-left: 50rpx;
		border-radius: 0rpx 0rpx 15rpx 15rpx;
		box-shadow: 10rpx 10rpx 5rpx #e2e2e2;
	}
	.infoaddress{
		width: 500rpx;
		margin-left: 125rpx;
	}
</style>
