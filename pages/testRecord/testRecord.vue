<template>
	<view class="">
		<view class="topMsg">
			<iconTextItem class="questionNum" title="做题量" icon="cuIcon-rank" :num="questionNum"></iconTextItem>
			<iconTextItem class="percent" title="正确率" icon="cuIcon-squarecheck" :num="percent + '%'"></iconTextItem>
			<iconTextItem class="paperCount" title="试卷数" icon="cuIcon-read" :num="paperCount"></iconTextItem>
			<iconTextItem class="tTCount" title="平均分" icon="cuIcon-activity" :num="averageScore"></iconTextItem>
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

		<view class="recordList">
			<block v-if="paperlist.length > 0">
				<block v-if="TestModel == 'L'">
					<block v-for="(item, index) in paperlist" :key='index'>
						<recordItem :testid="item.TestID" :title="item.TestName" :subdate="item.SubmitTime" :qsum="item.Scount" :qcrtnum="item.tTCount"
						 :issubmit="item.IsSubmit" :isrecord="true"></recordItem>
					</block>
				</block>
				<block v-else-if="TestModel == 'K'">
					<block v-for="(item, index) in paperlist" :key='index'>
						<view class="examlistitem">
							<examlistitem :testid="item.TestID" :title="item.TestName" :subdate="item.SubmitTime" :qsum="item.Scount"
							 :issubmit="item.IsSubmit" :isrecord="true"></examlistitem>
						</view>
					</block>
				</block>
				<view class="checkmore" v-if="hasmore && (paperlist.length % 12 == 0) " @tap="getMoreRecord">
					查看更多记录...
				</view>
			</block>
			<block v-else>
				<view class="nopaper">暂无做题记录</view>
			</block>
		</view>

	</view>

</template>

<script>
	import iconTextItem from '../../components/icon-text-item.vue'
	import recordItem from '../../components/record-item.vue'
	import examlistitem from '../../components/exam-list-item.vue'

	import reqAddress from '../../common/reqAddress.js'

	export default {
		components: {
			iconTextItem,
			recordItem,
			examlistitem
		},
		data() {
			return {
				questionNum: 0,
				percent: 0,
				paperCount: 0,
				tTcount: 0,
				averageScore: 0,
				paperlist: [],
				hasmore: true,
				currentPage: 1,
				TestModel: 'L',
				keyWord: '',

				cookie: ''
			}
		},
		onLoad() {
			this.cookie = uni.getStorageSync('sessionid')
			uni.showLoading({
				title: "加载中..."
			});
			this.Statistics();
			this.getALLTest('L');
		},
		computed: {},
		methods: {

			Statistics() {
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/Statistics',
					dataType: 'json',
					header: {
						'cookie': this.cookie
					},
					data: {
						TestModel: 'L'
					},
					success: (res) => {
						console.log(res);
						this.paperCount = res.data[0].pcount;
						this.questionNum = Number(res.data[0].tCount);
						this.tTcount = Number(res.data[0].tTCount);
						if (this.questionNum == 0) {
							this.percent = 0;
						} else {
							this.percent = this.toPercent((this.tTcount / this.questionNum));
						}
						if (this.paperCount == 0) {
							this.averageScore = 0;
						} else {
							this.averageScore = Number(res.data[0].SubmitScore / this.paperCount).toFixed(2);
						}
					}
				});
			},

			getALLTest(TestModel, keyWord) {
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/getALLTest',
					method: 'POST',
					data: {
						page: this.currentPage,
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
						// console.log(res);
						if (res.data.data.length > 0) {
							for (let record of res.data.data) {
								this.paperlist.push(record);
							}
						} else {
							if (this.currentPage > 1) {
								let cutpage = this.currentPage;
								this.currentPage = cutpage - 1;
								this.hasmore = false;
								uni.showToast({
									title: "暂无更多记录",
									icon: 'none'
								})
							}
						}

					}
				});
				uni.hideLoading();
			},

			getMoreRecord() {
				uni.showLoading({
					title: "加载中..."
				});
				let cutpage = this.currentPage;
				this.currentPage = cutpage + 1;
				this.getALLTest(this.TestModel);

			},

			//切换练习试卷与考试卷
			showPaper(dataid) {
				if (dataid == 0) {
					this.TestModel = 'L';
					this.currentPage = 1;
					this.paperlist = [];
					this.getALLTest('L');
				} else if (dataid == 1) {
					this.TestModel = 'K';
					this.currentPage = 1;
					this.paperlist = [];
					this.getALLTest('K');
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
					this.paperlist = [];
					this.getALLTest(this.TestModel, this.keyWord);
				}
			},

			//小数转换为百分数
			toPercent(point) {
				let percent = Number(point * 100).toFixed(1);
				return percent;
			},
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: $uni-bg-color;
	}

	.topMsg {
		position: relative;
		width: 730rpx;
		left: 10rpx;
		height: 230rpx;
		border-radius: 15rpx 15rpx 15rpx 15rpx;
		box-shadow: 10rpx 10rpx 5rpx #e2e2e2;
	}

	.questionNum {
		position: absolute;
		left: 60rpx;
	}

	.percent {
		position: absolute;
		left: 240rpx;
	}

	.paperCount {
		position: absolute;
		left: 420rpx;
	}

	.tTCount {
		position: absolute;
		left: 600rpx;
	}

	.recordList {}
	.examlistitem{
		margin-left: 15rpx;
	}
	.nopaper {
		width: 750rpx;
		text-align: center;
		margin-top: 50rpx;
	}

	.checkmore {
		width: 750rpx;
		text-align: center;
		margin-top: 20rpx;
	}
</style>
