<!-- 题目及选项组件 -->
<template>
	<view>
		<!--答题主界面-->
		<view class="content">
			<!--题目编号区域-->
			<view class="type">
				<!-- <text class="span">第{{page_index+1}}题-{{type}}</text> -->
				<text v-if="currentType===1" class="span">第{{page_index+1}}题-[判断题]</text>
				<text v-else-if="currentType===2" class="span">第{{page_index+1}}题-[单选题]</text>
				<text v-else-if="currentType===3" class="span">第{{page_index+1}}题-[多选题]</text>
				<text v-else-if="currentType===4" class="span">第{{page_index+1}}题-[填空题]</text>
				<text v-else-if="currentType===5" class="span">第{{page_index+1}}题-[问答题]</text>
				<text class="span">{{page_index+1}}/{{count}}</text>
			</view>
			<!--得分区域-->
			<view class="cu-modal" :class="showAllUpWindow=='showAllUpWindow'?'show':''" @tap="hideUpWindow">
				<view class="cu-dialog" @tap.stop>
					<view class="page padding" :style="{'height': swiperHeight}">
						<view class="scoreText1">
							<text>得分：{{score}}</text>
						</view>
						<view class="scoreText2">
							<text v-if="score < 60">不及格</text>
							<text v-else-if=" score >= 60 && score < 70">及格</text>
							<text v-else-if=" score >= 70 && score < 80">良好</text>
							<text v-else-if=" score >= 80 && score < 90">优秀</text>
							<text v-else-if=" score >= 90 && score <= 100">Prefect</text>
						</view>
						<view class="scoreBtn">
							<button type="primary" class="againBtn" @click="againAnswer">再做一次</button>
						</view>
					</view>
				</view>
			</view>
			<!--点击交卷弹窗区域-->
			<view class="cu-modal" :class="showUpWindow=='showUpWindow'?'show':''" @tap="hideUpWindow">
				<view class="cu-dialog" @tap.stop>
					<view class="page padding" :style="{'height': swiperHeight}">
						<scroll-view class="page padding" :scroll-y=true :style="{'height':swiperHeight/4}" >
							<view class="cu-bar solid-bottom">
								<view class="action">
									<text class="cuIcon-title text-red"></text>剩余答题：
								</view>					
							</view>
							<view class="grid col-5 ">
								<view class="margin-tb-sm text-center" v-for="(items,index) in questionData" :key="index" v-if="items.userFavor == false">
									<button class="cu-btn round" @click="AppointedSubject(index)" >{{index+1}}</button>
								</view>
							</view>
						</scroll-view>
						<view class="windownBtn">
							<button type="primary" class="leftBtn" @click="returnAnswer">返回答题</button>
							<button type="primary" class="rightBtn" @click="confimSend">提交试卷</button>
						</view>	
					</view>
				</view>
			</view>
			<!--答题卡区域-->
			<view class="cu-modal" :class="modalCard=='modalCard'?'show':''" @tap="hideCardModal">
				<view class="cu-dialog" @tap.stop>
					
					<scroll-view class="page padding" :scroll-y=true :style="{'height':swiperHeight}" >				
					<view class="cu-bar solid-bottom">
						<view class="action">
							<text class="cuIcon-title text-red"></text>答题卡
						</view>					
					</view>
					<view class="grid col-5 ">
						<view class="margin-tb-sm text-center" v-for="(items,index) in questionData" :key="index" >
							<button class="cu-btn round" :class="items.userAnswer.length===0?'line-grey':'bg-red'" @click="AppointedSubject(index)" >{{index+1}}</button>
						</view>
					</view>
					
					</scroll-view>
				</view>
			</view>
			<!--轮播界面，即题目列表-->
			<swiper :current="page_index" class="swiper-box" @change="SwiperChange" :style="{'height':swiperHeight}">
				<swiper-item v-for="(item,index) in questionData" :key="index">
					<view class="" >
						<!--标题栏-->
						<view class="cu-bar bg-white solid-bottom">
							<view class="action text-black">
								<text class="cuIcon-title text-red"></text>{{question.title}}
							</view>
						</view>
						<!--单选框-->
						<radio-group class="block"  @change="RadioboxChange" v-if="currentType===1|| currentType===2">
							<view class="cu-form-group" v-for="(option,index) in question.optionList" :key="index">
								<radio :value="option.id" :checked="question.userAnswer.indexOf(option.id) > -1?true:false" 
								:class="showAnswer!==true ? '':(option.id === question.answer ? 'green':(question.userAnswer === option.id)?'red':'') "></radio> 
								<view class="title text-black">{{option.id}}.{{option.content}}</view>
							</view>
						</radio-group>
						<!--复选框-->
						<checkbox-group class="block"  @change="CheckboxChange" v-else-if="currentType===3">
							<view class="cu-form-group" v-for="(option,index) in question.optionList" :key="index">
								<!--check样式必须设置在App.vue中才能起效果-->
								<checkbox class="wx-checkbox-inpu" :value="option.id" 
								:class="showAnswer === false? (question.userAnswer.indexOf(option.id) > -1 ?'checked':''):(question.userAnswer.indexOf(option.id) > -1 && question.answer.indexOf(option.id) ==-1 ?'red':'green')"
								:checked="showAnswer === false? (question.userAnswer.indexOf(option.id) > -1?true:false):(question.answer.indexOf(option.id) > -1 || question.userAnswer.indexOf(option.id) > -1?true:false)"></checkbox>
								<view class="title text-black">{{option.id}}.{{option.content}}</view>
							</view>
						</checkbox-group>
						<!--单行输入框-->
						<view v-else-if="currentType===4">
							<view class="cu-form-group solid-bottom">
								<view class="title  text-black">
									答：
								</view>
								<input placeholder="文本输入框" name="input" v-model="question.userAnswer" @blur="textInput" ></input>
							</view>
						</view>
						<!--多行文本输入框-->
						<view v-else-if="currentType===5">
							<view class="cu-bar cu-bar-title bg-white margin-top">
								<view class="action  text-black">
									答：
								</view>
							</view>
							<view class="cu-form-group solid margin">
								<textarea maxlength="-1"  @blur="textInput" v-model="question.userAnswer" placeholder="多行文本输入框"></textarea>
							</view>
						</view>
						<!--解析展示-->
						<view v-show="showAnswer" class="margin-top solid-top">
							<view class="cu-bar">
								<view class="action  text-grey">
									<text>正确答案：</text>
									<text class="solid-bottom  padding-left text-green">{{question.answer}}</text>
								</view>
							</view>
							<view class="cu-bar cu-bar-title">
								<view class="action  text-grey">
									<text>解析：</text>
								</view>
							</view>
							<view class="text-content padding  text-grey">
								{{question.explain}}
							</view>
						</view>
						
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!--按钮操作界面-->
		<!--答题确定按钮-->
		<view class="btnPos">
				<button type="primary" @click="confim" class="btnChild">
					<text>确定</text>
				</button>
		</view>
		<!--自定义tabbar界面，下层点击按钮-->
		<view class="cu-bar tabbar bg-white shadow foot tabbarPos">
			<view @click="pre" class="action" >
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-back text-gray"></text>
				</view>
				<view class="text-gray">上一题</view>
			</view>
			<view  @click="next" class="action" >
				<view class="cuIcon-cu-image">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
				<view class="text-gray">下一题</view>
			</view>
			<view class="action" >
				<view class="cuIcon-cu-image" @click="sendPaper">
					<text class="lg text-gray cuIcon-upload"></text>
				</view>
				<view class="text-gray">交卷</view>
			</view>
			<view class="action" @click="showCardModal" data-target="modalCard">
				<view class="cuIcon-cu-image">
					<text class="lg text-gray cuIcon-rounddown"></text>
				</view>
				<view class="text-gray">答题卡</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				question:{},
				questionData:{},
				score:0,//玩家的得分
				page_index:0,//当前题号
				count:0,//题目数量
				currentType:0,//代表样式的数字
				modalCard:null,//显示答题卡
				swiperHeight:'460px',//答题卡界面高度,以及弹窗高度
				showAnswer:false,//是否显示解析
				showUpWindow:null,//显示提示窗口（未答题完）
				showAllUpWindow:null,//显示提示窗口，（已经答完）
			};
		},
		onLoad() {
			
		},
		onReady() {	
			//将传递的数据用本地变量存储
			this.questionData = this.bankQues;
			console.log(JSON.stringify(this.questionData));
			this.question = this.questionData[this.page_index];
			this.count = this.questionData.length;
			this.currentType = this.question.type;
		},
		//传入题目的数据
		//页面中不能直接调取传递的变量
		props:{
			bankQues:{},
			vaue:0
		},
		methods:{
			//答题确认
			confim:function(){
				//当前题目还未作答，并且此时题目的答案与作答的一致，总分数递增
				if(!this.question.userFavor&&this.question.answer === this.question.userAnswer){
					this.score += this.question.score;
					console.log(this.score);
				}
				if(!this.showAnswer){
					this.showAnswer = true;
					//点击确认表示此题已经作答
					this.questionData[this.page_index].userFavor = true;
						//自动跳转到下一题
						// setInterval(()=>{
						// 		if(this.page_index < this.count - 1 && this.showAnswer == true){
						// 			this.page_index++;
						// 			this.question = this.questionData[this.page_index];
						// 			this.currentType = this.question.type;
						// 			this.userFavor = this.question.userFavor;
						// 			this.showAnswer = false;
						// 		}	
						// 	},1500);
					}
			},
			//下一题
			next:function(){
				if(this.page_index < this.count-1){
					this.page_index++;
					this.question = this.questionData[this.page_index];
					this.currentType = this.question.type;
					this.showAnswer = false;
				}	
			},
			//上一题
			pre:function(){
				if(this.page_index > 0){
					this.page_index--;
					this.question = this.questionData[this.page_index];
					this.currentType = this.question.type;
					this.showAnswer = false;
				}	
			},
			//显示答题卡
			showCardModal: function(e) {
				this.modalCard = e.currentTarget.dataset.target;
			},
			//隐藏答题卡
			hideCardModal:function(){
				this.modalCard = null;
			},
			//返回答题
			returnAnswer:function(){
				this.showUpWindow = null;
			},
			//在弹出窗口的确认交卷
			confimSend:function(){
				//显示得分区域
				this.showAllUpWindow = "showAllUpWindow";
				this.showUpWindow = null;
			},
			//隐藏交卷窗口
			hideUpWindow:function(){
				this.showUpWindow = null;
				this.showAllUpWindow = null;
			},
			//答题界面提交试卷
			sendPaper:function(){
				var sum=0;
				for (var i = 0; i < this.questionData.length; i++) {
					console.log(this.questionData[i].userFavor);
					if(this.questionData[i].userFavor === false){
						sum=1;
						break;
					}
				}
				if(sum!==0){
					this.showUpWindow = "showUpWindow";
				}
				else{
					this.showAllUpWindow = "showAllUpWindow";
				}
			},
			//滑动屏幕事件
			SwiperChange:function(el){
				//获取滑动当前的current属性
				var index = el.target.current;
				if (index != undefined) {
					this.page_index = index;
					this.question = this.questionData[this.page_index];
					this.currentType = this.question.type;
					this.userFavor = this.question.userFavor;	
					this.showAnswer = false;
				}	
			},
			//单选选中
			RadioboxChange : function(e) { 
			
				var items = this.questionData[this.page_index].optionList;
				var values = e.detail.value;
				//将答案记录下来
				this.questionData[this.page_index].userAnswer = values;
				
			},
			//复选选中
			CheckboxChange: function(e) { 
			
				var items = this.questionData[this.page_index].optionList;
				var values = e.detail.value;
				this.questionData[this.page_index].userAnswer = "";
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						//某一个选项被选中
						if (items[i].id == values[j]) {
							this.questionData[this.page_index].userAnswer += items[i].id;
							break
						}
					}
				}
			},
			//填空题
			textInput : function(e) { 
				this.questionData[this.page_index].userAnswer = e.detail.value;
			},
			//在题目列表中题目跳转
			AppointedSubject:function(index){
				this.page_index = index;
				this.question = this.questionData[this.page_index];
				this.currentType = this.question.type;
				this.userFavor = this.question.userFavor;
				this.showAnswer = false;//不再显示解析
				this.modalCard = null;//不展示答题卡
				this.showUpWindow = null;//不展示交卷界面
			},
			//再次答题
			againAnswer:function(){
				this.showAllUpWindow = null;
				this.page_index = 0;
				this.question = this.questionData[this.page_index];
				this.currentType = this.question.type;
				for(var i=0;i<this.questionData.length;i++){
					this.questionData[i].userFavor = false;
					this.questionData[i].userAnswer = "";
				}
			}
		}
	}
</script>

<style lang="scss">
	@import url("../colorui/animation.css");
	.scoreText1{
		font-size: 25px;
		text-align: center;
		margin-top: 50px;
	}
	.scoreText2{
		font-size: 25px;
		margin-top: 20px;
		text-align: center;
	}
	.scoreBtn .againBtn{
		display: block;
		text-align: center;
		width: 100px;
		height: 40px;
		margin-top: 220px;
		scale: 0.9;
	}
	.red{
		color: #fff;
		background-color: #FF3333;
		border-radius: 50%;
	}
	.green{
		color: #fff;
		background-color: #1AAD19;
		border-radius: 50%;
	}
	.windownBtn .leftBtn{
		float: left;
		left: 40px;
		top: 260px;
		scale: 0.7;
	}
	.windownBtn .rightBtn{
		float: right;
		right: 40px;
		top: 260px;
		scale: 0.7;
	}
	.content {
	//border: 2px solid black;
	  position: relative;
	  height: 100%;
	  margin: 0 35upx;
	  font-size: 32upx;
	  .type {
	    margin: 20upx 0;
	    font-size: 32upx;
	    .span{
	      &:last-child {
	        float: right;
	        right: 0upx;
	      }
	    }
	  }
	 }
	 .tabbarPos{
		 margin-bottom: 10px;
	 }
	 .btnPos {
		position: absolute;
		bottom: 80px;
		left: 45%;
	 }
	 page {
	 	background-color: #FFFFFF;
	 }
	 
	 .cu-form-group {
	 	justify-content: flex-start
	 }
	 
	 .cu-form-group .title {
	 	padding-left: 30upx;
	 	padding-right: 0upx;
	 }
	 
	 .cu-form-group+.cu-form-group {
	 	border-top: none;
	 }
	 
	 .cu-bar-title {
	 	min-height: 50upx;
	 }
	 
	 .cu-list.menu>.cu-item-error{justify-content: flex-start;}
</style>
