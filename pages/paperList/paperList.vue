<template>
	<view>
		<van-collapse class='collapse' :value="activeNames" @change="onChange" accordion>
			<block v-for="levOne in paperListData" :key='levOne.Code'>
				<!-- 包含两级分类 -->
				<block v-if="levOne.levSec[0].levThird.length == 0">
					<van-collapse-item :name ='levOne.Code'>
						<view slot="title">
							<view class="cuIcon-list">{{ levOne.Name }}</view>
						</view>
						<view @tap="goPaperListItem(levSec.VipNo)" class="cu-btn bg-blue round shadow" v-for="levSec in levOne.levSec" :key='levSec.Code'>
							{{ levSec.Name }}
						</view>
					</van-collapse-item>
				</block>
				<!-- 包含三级分类 -->
				<block v-else-if="levOne.levSec[0].levThird.length > 0">
					<block v-for="levSec in levOne.levSec" :key='levSec.Code'>
						<van-collapse-item :name='levSec.Code'>
							<view slot="title">
								<view class="cuIcon-list">
									{{ levOne.Name }} <text class="cuIcon-right"> {{levSec.Name}} </text>
								</view>
							</view>
							<view @tap="goPaperListItem(levThird.VipNo)" class="cu-btn bg-blue round shadow" v-for="levThird in levSec.levThird" :key='levThird.Code'>
								{{ levThird.Name }}
							</view>
						</van-collapse-item>
					</block>
				</block>
			</block>

			<!-- <van-collapse-item name='1'>
				<view slot="title"><view class="cuIcon-list">企业人力资源管理师</view></view>
				<view @tap="goPaperListItem" class="cu-btn bg-blue round shadow">一级</view>
				<view class="cu-btn bg-brown round shadow">二级</view>
				<view class="cu-btn bg-cyan round shadow">三级</view>
				<view class="cu-btn bg-red round shadow">四级</view>
			</van-collapse-item> -->
		</van-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeNames: [1],
				paperListData: [],
			}
		},
		components: {},
		methods: {
			onLoad() {
				uni.request({
					url: 'http://localhost:8084/funcQuestion/TestType/getUserType',
					success: (res) => {
						console.log(res.data);
						for (let row of res.data.rows) {
							if (row.vlevel == "1" && row.IsDirectory == "1") {
								this.paperListData.push(row);
								row.levSec = [];
							}
							if (row.vlevel == "2") {
								row.levThird = [];
								for (let levOne of this.paperListData) {
									if (row.Code.includes(levOne.Code.substr(0, 1))) {
										levOne.levSec.push(row);
									}
								}
							}
							if (row.vlevel == "3") {
								for (let levOne of this.paperListData) {
									if (row.Code.includes(levOne.Code.substr(0, 1))) {
										for (let levSec of levOne.levSec) {
											if (row.Code.includes(levSec.Code.substr(0, 2))) {
												levSec.levThird.push(row);
											}
										}
									}
								}
							}
						}
						console.log(this.paperListData);
					}
				})

			},

			onChange(e) {
				// console.log(e.detail);
				this.activeNames = e.detail;
			},

			goPaperListItem(e) {
				// console.log(e);
				uni.navigateTo({
					url: '../paperListItem/paperListItem?VipNo='+ e
				});
			}
		}
	}
</script>

<style>
	.cu-btn {
		margin-right: 15rpx;
		margin-top: 10rpx;
	}
</style>
