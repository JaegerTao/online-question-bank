<template>
	<view>
		<van-collapse class='collapse' :value="activeNames" @change="onChange" accordion>
			<block v-for="levOne in paperListData" :key="levOne.vipnos[0]">
				<!-- 包含两级分类 -->
				<block v-if="levOne.name3 == null">
					<van-collapse-item :name="levOne.vipnos[0]">
						<view slot="title">
							<view class="cuIcon-list" :class="levOne.name2.length > 0 ? 'text-black' : 'text-gray' ">
								<text>{{ ' ' + levOne.name1 + ' ' }}</text>
							</view>
						</view>
						<block v-if="levOne.name2.length < 1">
							<view class="">暂无题卷</view>
						</block>
						<block v-else>
							<view v-for="(name2,index) in levOne.name2" :key="index" class="cu-btn round shadow" :class="classChange[levOne.vipnos[index] % 4]"
							 @tap="goPaperListItem(levOne.vipnos[index], levOne.name1, name2)">
								{{ name2 }}
							</view>
						</block>
					</van-collapse-item>
				</block>
				<block v-else-if="levOne.name3.length > 0">
					<van-collapse-item :name="levOne.vipnos[0]">
						<view slot="title">
							<view class="cuIcon-list" :class="levOne.name3.length > 0 ? 'text-black' : 'text-gray' ">
								{{' ' + levOne.name1 }}<text class="cuIcon-right">{{ ' ' + levOne.name2 + ' ' }}</text>
							</view>
						</view>
						<block v-if="levOne.name3.length < 1">
							<view class="">暂无题卷</view>
						</block>
						<block v-else>
							<view v-for="(name3,index) in levOne.name3" :key="index" class="cu-btn round shadow" :class="classChange[levOne.vipnos[index] % 4]"
							 @tap="goPaperListItem(levOne.vipnos[index], levOne.name1, levOne.name2, name3)">
								{{ name3 }}
							</view>
						</block>
					</van-collapse-item>
				</block>
			</block>
		</van-collapse>
		<view v-if="isnodata" class="nodata"> 抱歉，暂无试卷，请先购买课程哦 </view>
	</view>
</template>

<script>
	import reqAddress from '../../common/reqAddress.js'
	export default {
		data() {
			return {
				activeNames: '',
				paperListData: [],
				classChange: ['bg-orange', 'bg-green', 'bg-red', 'bg-blue'],
				paperItemTransInfo: {},
				isnodata: false,
				
				cookie: ''
			}
		},
		components: {},
		onLoad() {
			this.cookie = uni.getStorageSync('sessionid');
			uni.showLoading({
				title: '加载中...'
			});
			uni.request({
				url: reqAddress.DomainName + '/funcQuestion/TestType/getUserType',
				header: {
					'cookie': this.cookie
				},
				success: (res) => {
					if (res.data.length > 0) {
						this.activeNames = res.data[0].vipnos[0];
						this.paperListData = res.data;
					} else {
						this.isnodata = true;
					}
				},
				fail: (err) => {
					console.log(err);
					this.isnodata = true;
				},
				complete: (res) => {
					// console.log(res);
					uni.hideLoading();
				}
			});
		},
		methods: {
			

			onChange(e) {
				this.activeNames = e.detail;
			},

			goPaperListItem(vipNo, namefir, namesec, namethir) {
				this.paperItemTransInfo.vipNo = vipNo;
				if (namethir == null) {
					let name = namefir + "·" + namesec;
					this.paperItemTransInfo.paperItemName = name.trim();
				} else {
					let name = namefir + "·" + namesec + "·" + namethir;
					this.paperItemTransInfo.paperItemName = name.trim();
				}
				uni.navigateTo({
					url: '../paperListItem/paperListItem?paperitem=' + encodeURIComponent(JSON.stringify(this.paperItemTransInfo))
				});
			}
		}
	}
</script>

<style>
	view{
		font-size: 35rpx;
	}
	.cu-btn {
		margin-right: 15rpx;
		margin-top: 10rpx;
	}

	.nodata {
		width: 750rpx;
		margin-top: 50rpx;
		text-align: center;
	}
</style>
