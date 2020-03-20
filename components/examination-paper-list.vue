<template>
	<view>
		<view class="content">
			<view  @click="enterQues">
				<view class="bankName">{{bankName}}</view>
			</view>
		</view>
		<view class="distance">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		//传入题库的名字
		props:{
			bankName:'',
			value:0
		},
		methods:{
			enterQues:function(){
				uni.$emit('enterExam',{
					num:this.value,
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 30px;
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.bankName{
			font-size: 20px;
		}
	}
	.distance{
		height: 1px;
	}
</style>
