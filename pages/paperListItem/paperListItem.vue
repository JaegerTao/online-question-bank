<template>
	<view>
		<view class="cu-bar bg-gradual-orange solid-bottom shadow">
			<view class="content">{{ paperItemName }}</view>
		</view>

		<view class="flex text-center nav">
			<view class="cu-item flex-sub" :class="TestModel=='L'?'text-orange cur':''" @tap="showPaper(0)" data-id="0">练习</view>
			<view class="cu-item flex-sub" :class="TestModel=='K'?'text-orange cur':''" @tap="showPaper(1)" data-id="1">考试</view>
		</view>

		<view class="cu-bar">
			<view class="search-form round">
				<view class="cuIcon-search"></view>
				<input type="text" value="试卷名" v-model="keyWord" />
			</view>
			<view class="action" @tap="searchPaper">
				<view class="cu-btn bg-orange shadow-blur round">
					搜索
				</view>
			</view>
		</view>

		<view class="cu-list menu card-menu margin-top">
			<block v-if="TestModel == 'L'">
				<view class="cu-item" v-for="(item, index) in paperItemList" :key='index'>
					<view class="cuIcon-circlefill text-gray"></view>
					<view class="paperName">{{ item.TestName }}</view>
					<view class="goExamBtn cu-btn bg-blue round shadow" @tap="goExam(item.TestID, item.pcnt, item.dcnt)">
						<text class="goExamText">开始练习</text>
					</view>
				</view>
			</block>
			<block v-else-if="TestModel == 'K'">
				<view class="cu-item examItem" v-for="(item, index) in paperItemList" :key='index'>
					<examlistitem :testid="item.TestID" :title="item.TestName" :startTime="item.TStartTime" :endTime="item.TEndTime" :isrecord="false"></examlistitem>
				</view>
			</block>
		</view>

		<view class="checkmore" v-if="!isnodata &&(paperItemList.length % 12 == 0)" @tap="getMorePaper">
			查看更多...
		</view>
		<view class="checkmore" v-else-if="paperItemList.length > 0">
			暂无更多
		</view>
		<view v-if="isnodata" class="nodata"> 抱歉，暂无试卷 </view>
	</view>
</template>

<script>
	import reqAddress from 'common/reqAddress.js'
	import examlistitem from '../../components/exam-list-item.vue'

	export default {
		data() {
			return {
				paperVipNo: 0,
				paperItemName: '',
				paperItemList: [],
				paperDetails: {
					TestID: '', //试卷id，试卷唯一标识
					TestName: '', //试卷名
					Duration: '', //时长
					QCount: 0, //题目总数
					QSumScore: 0, //试卷总分
					Q_Types: '',
					Q_TypeCounts: []
				},
				currentPage: 1,
				isnodata: false,
				TestModel: 'L',
				keyWord: '',

				cookie: ''
			}
		},
		components: {
			examlistitem
		},
		onLoad(e) {
			this.cookie = uni.getStorageSync('sessionid');

			const paperitem = JSON.parse(decodeURIComponent(e.paperitem));
			this.paperVipNo = paperitem.vipNo;
			this.paperItemName = paperitem.paperItemName;
			// console.log(paperitem);
			this.getTestList(this.TestModel);
		},
		methods: {
			getTestList(TestModel, keyWord) {
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/TestList/getTestList',
					method: 'POST',
					data: {
						page: this.currentPage,
						VipNo: this.paperVipNo,
						PageSize: 12,
						TestModel: TestModel,
						keyWord: keyWord ? keyWord : ''
					},
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						console.log(res.data);
						this.isnodata = false;
						if (res.data.data.length > 0) {
							for (let item of res.data.data) {
								this.paperItemList.push(item);
							}
							// this.paperItemList = res.data;
						} else {
							if (this.currentPage > 1) {
								this.currentPage -= 1;
								uni.showToast({
									title: "暂无更多试卷",
									icon: 'none'
								})
							} else {
								this.isnodata = true;
							}
						}
						// console.log(this.paperItemList);
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},

			getMorePaper() {
				this.currentPage += 1;
				this.getTestList(this.TestModel);
			},

			//切换练习试卷与考试卷
			showPaper(dataid) {
				if (dataid == 0) {
					this.TestModel = 'L';
					this.currentPage = 1;
					this.paperItemList = [];
					this.getTestList('L');
				} else if (dataid == 1) {
					this.TestModel = 'K';
					this.currentPage = 1;
					this.paperItemList = [];
					this.getTestList('K');
				}
			},

			//搜索
			searchPaper() {
				if (this.keyWord == '') {
					uni.showToast({
						title: '请输入搜索词',
						icon: 'none'
					});
				} else {
					this.currentPage = 1;
					this.paperItemList = [];
					this.getTestList(this.TestModel, this.keyWord);
				}
			},


			goExam(TestID, pcnt, dcnt) {
				this.paperDetails.TestID = TestID;
				if (this.TestModel == 'L') {
					if (Number(pcnt) > 0 || pcnt === null) {
						let currentcnt = pcnt;
						if (pcnt === null) {
							currentcnt = dcnt;
						}
						uni.showModal({
							title: '提示',
							content: '您的练习机会还有' + currentcnt + '次，开始练习将会消耗一次，是否继续？',
							success: (res) => {
								if (res.confirm) {
									console.log('进入exam');
									uni.request({ //获取试卷详情
										url: reqAddress.DomainName + '/funcQuestion/Test/start',
										method: 'POST',
										data: {
											TestID: this.paperDetails.TestID,
											TestModel: 'L' 
										},
										header: {
											'content-type': 'application/x-www-form-urlencoded',
											'cookie': this.cookie
										},
										success: (res) => {
											if (res.data.msg == '失败') {
												uni.showModal({
													title: '提示',
													content: '您的该套试卷练习次数已用完，请联系班主任通过续费购买在线练题次数',
													showCancel: false,
													success: (res) => {
														if (res.confirm) {
															console.log('不进入exam')
														}
													}
												})
											} else {

												this.paperDetails.TestName = res.data[0].TestName;
												this.paperDetails.Duration = res.data[0].Duration;
												let qtypes = '';
												for (let test of res.data) {
													this.paperDetails.QCount += Number(test.QCount);
													this.paperDetails.QSumScore += Number(test.QSumScore);
													qtypes = qtypes + test.QTypeID + '_';

													let Q_TypeCount = {
														QTypeOrder: '',
														QCount: '',
														QTypeID: ''
													}
													Q_TypeCount.QTypeOrder = test.QTypeOrder;
													Q_TypeCount.QCount = test.QCount;
													Q_TypeCount.QTypeID = test.QTypeID;
													this.paperDetails.Q_TypeCounts.push(Q_TypeCount);
												}
												let qtypeslen = qtypes.length
												this.paperDetails.Q_Types = qtypes.substr(0, qtypeslen - 1);

												console.log(this.paperDetails);
												uni.reLaunch({
													url: "../exam/exam?TestModel=L&paperDetails=" + encodeURIComponent(JSON.stringify(this.paperDetails)),
												});
											}
										}
									})

								} else if (res.cancel) {
									console.log('不进入');
								}
							}
						})

					} else {
						uni.showModal({
							title: '提示',
							content: '您的该套试卷练习次数已用完，请联系班主任通过续费购买在线练题次数',
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									console.log('不进入exam')
								}
							}
						})
					}
				}


			},
		}
	}
</script>

<style>
	.paperName {
		margin-left: 20rpx;
	}

	.goExamBtn {
		margin-left: 20rpx;
		height: 50rpx;
		width: 180rpx;
		text-align: center;
	}

	.goExamText {
		height: 30rpx;
		width: 200rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.examItem{
		margin-left: -30rpx;
	}

	.nodata {
		width: 750rpx;
		margin-top: 100rpx;
		text-align: center;
	}

	.checkmore {
		width: 750rpx;
		text-align: center;
		margin-top: 20rpx;
	}
</style>
