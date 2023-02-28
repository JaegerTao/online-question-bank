<template>
	<view class="">
		<view class="topMsg">
			<iconTextItem class="errorNum" title="错题量" icon="cuIcon-edit" :num="errorNum"></iconTextItem>
			<iconTextItem class="percent" title="错误率" icon="cuIcon-roundclose" :num="percent + '%'"></iconTextItem>
			<iconTextItem class="paperCount" title="试卷数" icon="cuIcon-read" :num="pCount"></iconTextItem>
		</view>
		<view class="recordList">
			<block v-if="paperlist.length > 0">
				<block v-for="(item, index) in paperlist" :key='index'>
					<recordItem :testid="item.TestID" :title="item.TestName" :subdate="item.SubmitTime" :qsum="item.Scount" :qcrtnum="item.tECount"
					 :issubmit="item.IsSubmit" :isrecord="false"> </recordItem>
				</block>
				<view class="checkmore" v-if="hasmore&&  (paperlist.length % 12 == 0)"  @tap="getMoreRecord">
					查看更多记录...
				</view>
			</block>
			<block v-else>
				<view class="nopaper">暂无错题记录</view>
			</block>
		</view>
	</view>
</template>

<script>
	import iconTextItem from '../../components/icon-text-item.vue'
	import recordItem from '../../components/record-item.vue'
	import reqAddress from '../../common/reqAddress.js'

	export default {
		data() {
			return {
				questionNum: 0, //题目总数
				tTCount: 0, //正确题目数
				errorNum: 0, //错误题目数
				percent: 0, //错误率
				pCount: 0, //试卷数
				paperlist: [] ,//含有错题的试卷列表
				hasmore: true,
				currentPage: 1,
				TestModel: 'L',
				
				cookie: ''
			}
		},
		components: {
			iconTextItem,
			recordItem
		},
		onLoad() {
			this.cookie = uni.getStorageSync('sessionid');
			
			this.Statistics();
			this.getErrTest();
		},
		methods: {
			//小数转换为百分数
			toPercent(point) {
				let percent = Number(point * 100).toFixed(1);
				return percent;
			},
			
			Statistics(){
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/Statistics',
					dataType: 'json',
					header: {
						'cookie': this.cookie
					},
					data:{
						TestModel: 'L'
					},
					success: (res) => {
						// console.log(res);
						this.pCount = Number(res.data[0].pcount);
						this.questionNum = Number(res.data[0].tCount);
						this.tTCount = Number(res.data[0].tTCount);
						if (this.questionNum == 0) {
							this.errorNum = 0;
							this.percent = 0;
						} else {
							this.errorNum = this.questionNum - this.tTCount;
							this.percent = this.toPercent((this.errorNum / this.questionNum));
						}
					}
				});
			},
			
			getErrTest(){
				uni.showLoading({
					title: "加载中..."
				});
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/getErrTest',
					method: 'POST',
					data: {
						page: this.currentPage,
						PageSize: 12,
						TestModel : this.TestModel
						
					},
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						// console.log(res.data);
						if(res.data.data.length > 0){
							for(let err of res.data.data ){
								this.paperlist.push(err);
							}
						}else{
							if(this.currentPage > 1){
								let cutpage = this.currentPage;
								this.currentPage = cutpage - 1;
								this.hasmore = false;
								uni.showToast({
									title:"暂无更多记录",
									icon:'none'
								})
							}
						}
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},
			
			//查看更多记录
			getMoreRecord(){
				let cutpage = this.currentPage;
				this.currentPage = cutpage + 1;
				this.getErrTest();
				uni.showLoading({
					title: "加载中..."
				});
			}
		}
	}
</script>

<style>
	.topMsg {
		position: relative;
		width: 730rpx;
		left: 10rpx;
		height: 230rpx;
		border-radius: 15rpx 15rpx 15rpx 15rpx;
		box-shadow: 10rpx 10rpx 5rpx #e2e2e2;
	}

	.errorNum {
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
	
	.nopaper {
		width: 750rpx;
		text-align: center;
		margin-top: 25rpx;
	}
	
	.checkmore{
		width: 750rpx;
		text-align: center;
		margin-top: 20rpx;
	}
</style>
