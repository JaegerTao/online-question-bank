<template>
	<view class="msgitem">
		<view class="icon">
			<image src="../static/logo-b.png" mode="aspectFit"></image>
		</view>
		<view class="msgtitle">
			<view class="msgtitletype">
				{{ msgtitletype }}
			</view>
			<view class="delthis cuIcon-roundclose" @tap="delthis"></view>
		</view>
		<view class="msgmain">
			<view class="msgcontent">
				{{ msgcontent }}
			</view>
			<view class="noticetime">
				{{ noticetime }}
			</view>
		</view>
		<view class="btns">
			<view class=""></view>
		</view>
		<view class="clear"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			idno:"",
			msgcontent:"",
			msgtitletype:"",
			noticetime:"",
			isread:""
		},
		methods:{
			delthis(){
				uni.showModal({
					title:'提示',
					content:'将要删除的此条消息，是否继续?',
					success: (res) => {
						if(res.confirm){
							let idno = this.idno;
							this.$emit('delthis', idno);
						}else if(res.confirm){
							console.log('取消删除消息');
						}
					}
				})
			},
			readthis(){
				let idno = this.idno;
				this.$emit('readthis', idno);
			}
		}
	}
</script>

<style>
	.msgitem{
		position: relative;
		width: 750rpx;
		background-color: #ffffff;
		border-bottom: 1rpx solid #c8c8c8;
	}
	.icon{
		
	}
	.icon > image{
		margin-left: 20rpx;
		margin-top: 20rpx;
		width: 100rpx;
		height: 100rpx;
	}
	.msgtitle{
		position: relative;
		top: -100rpx;
		left: 130rpx;
	}
	.msgtitletype{
		position: relative;
		font-size: 30rpx;
	}
	.delthis{
		position: absolute;
		font-size: 30rpx;
		top: -5rpx;
		left: 540rpx;
	}
	.msgmain{
		position: relative;
		top: -80rpx;
		left: 130rpx;
		width: 600rpx;
	}
	.msgcontent{
		position: relative;
		width: 600rpx;
		font-size: 30rpx;
	}
	.noticetime{
		position: relative;
		top: 30rpx;
		font-size: 25rpx;
	}
	.clear{
		clear: both;
	}
</style>
