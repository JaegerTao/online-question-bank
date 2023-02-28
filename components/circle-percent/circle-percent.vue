<template>
	<view class="box">
		<view class="boxContent" :style="{ height:(boxSize) + 'rpx', width:(boxSize) + 'rpx' }">
			<view class="boxContent2">
				<view class="before" :style="{top: (100-percent)+'%'}"></view>
				<view class="jd" :style="{background: bg}"></view>
				<view class="after" :style="{top: (100-percent)+'%'}"></view>
			</view>
			<view class="percent">{{percent}}%</view>
			<view class="titleOne">{{titleOne}}</view>
		</view>
		<view class="atitle" :style="{width: (boxSize)+'rpx'}">{{titleTwo}}</view>
	</view>
</template>

<script>
	export default {
		name: "circle-percent",
		props: {
			titleOne: {
				type: String,
				default: '正确率'
			},
			titleTwo: {
				type: String,
				default: ''
			},
			bg: {
				type: String,
				default: 'red'
			},
			percent: {
				type: String,
				default: '80'
			},
			boxSize: {
				type: String,
				default: '230'
			}
		},
		computed: {},
		data() {
			return {

			}
		},
		methods: {}
	}
</script>

<style lang="scss">
	.box {
		box-sizing: border-box;
		width: 50%;
		text-align: center;
		margin: 20upx 0;

		.boxContent {
			position: relative;
			width: 230rpx;
			height: 230rpx;
			border-radius: 50%;
			margin: 0 auto;
			border: 10rpx solid #ffffff;
			overflow: hidden;

			.boxContent2 {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				border: 4upx solid #fff;
				box-sizing: border-box;
				overflow: hidden;

				.before,
				.after {
					content: "";
					position: absolute;
					width: 200%;
					height: 200%;
					top: 0;
					left: 50%;
					background-color: rgba(255, 255, 255, .4);
					border-radius: 45%;
					transform: translate(-50%, -100%) rotate(0);
					animation: rotate 6s linear infinite;
					z-index: 10;
				}

				.after {
					border-radius: 44%;
					background-color: rgba(255, 255, 255, .9);
					transform: translate(-50%, -100%) rotate(0);
					animation: rotate 10s linear -5s infinite;
					z-index: 20;
				}

				@keyframes rotate {
					50% {
						transform: translate(-50%, -103%) rotate(180deg);
					}

					100% {
						transform: translate(-50%, -100%) rotate(360deg);
					}
				}

				.jd {
					width: 100%;
					height: 100%;
					bottom: 0;
				}
			}

			.percent {
				font-size: 36upx;
				font-weight: bold;
				position: absolute;
				top: 52upx;
				width: 100%;
				text-align: center;
				z-index: 90;
				color: #000000;
			}

			.titleOne {
				font-size: 30upx;
				position: absolute;
				top: 110upx;
				width: 100%;
				text-align: center;
				z-index: 90;
				color: #000000;
			}

		}

		.atitle {
			margin-top: 0upx;
			font-size: 20upx;
			color: $uni-text-color-grey;
			font-size: $uni-font-size-base;
			text-align: center;
		}
	}
</style>
