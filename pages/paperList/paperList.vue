<template>
	<view>
		<van-collapse class='collapse' :value="activeNames" @change="onChange" accordion>
			<van-collapse-item name='1'>
				<view slot="title"><view class="cuIcon-list">企业人力资源管理师</view></view>
				
				<view @tap="goPaperListItem" class="cu-btn bg-blue round shadow">一级</view>
				<view class="cu-btn bg-brown round shadow">二级</view>
				<view class="cu-btn bg-cyan round shadow">三级</view>
				<view class="cu-btn bg-red round shadow">四级</view>
			</van-collapse-item>
			<van-collapse-item name='2'>
				<view slot="title"><view class="cuIcon-list">劳动关系协调师</view></view>
				<view class="cu-btn round shadow">一级</view>
				<view class="cu-btn round shadow">二级</view>
				<view class="cu-btn round shadow">三级</view>
				<view class="cu-btn round shadow">四级</view>
			</van-collapse-item>
			<van-collapse-item title="机关公考" name='3'>
				<view class="cu-btn round shadow">行政岗位工</view>
				<view class="cu-btn round shadow">水处理</view>
				<view class="cu-btn round shadow">林木种苗</view>
				<view class="cu-btn round shadow">园林绿化</view>
				<view class="cu-btn round shadow">护理</view>
				<view class="cu-btn round shadow">勘探</view>
				<view class="cu-btn round shadow">计算机录入</view>
				<view class="cu-btn round shadow">医技</view>
			</van-collapse-item>
			<van-collapse-item title="xxxxxx" name='4'>
				<view class="cu-btn round shadow">xxxxxx</view>
				<view class="cu-btn round shadow">xxxxxx</view>
				<view class="cu-btn round shadow">xxxxxx</view>
				<view class="cu-btn round shadow">xxxxxx</view>
			</van-collapse-item>
		</van-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeNames:'1',
			}
		},
		components:{
		},
		methods: {
			onChange(e){
				this.activeNames = e.detail;
			},
			
			goPaperListItem(){
				uni.navigateTo({
					url: '../paperListItem/paperListItem',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.cu-btn{
		margin-right: 15rpx;
		margin-top: 10rpx;
	}
</style>
