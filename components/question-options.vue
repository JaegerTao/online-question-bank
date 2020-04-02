<!-- 题目及选项组件 -->
<template>
	<view>
		<!--答题页码界面-->
		<view  id="top-box" class="content">
			<!--题目编号区域-->
			<view class="type">
				<!-- <text class="span">第{{page_index+1}}题-{{type}}</text> -->
				<text v-if="currentType===1" class="span">第{{page_index+1}}题-[判断题]</text>
				<text v-else-if="currentType===2" class="span">第{{page_index+1}}题-[单选题]</text>
				<text v-else-if="currentType===3" class="span">第{{page_index+1}}题-[多选题]</text>
				<text v-else-if="currentType===4" class="span">第{{page_index+1}}题-[填空题]</text>
				<text v-else-if="currentType===5" class="span">第{{page_index+1}}题-[综合单选题]</text>
				<view v-if="currentType===5" class="material">
					<button class="cu-btn round bg-green" @click="ShowMaterial">材料</button>
				</view>
				<text class="span">{{page_index+1}}/{{count}}</text>
			</view>
		</view>
		<!--题目界面-->
		<view>
			<!--综合题材料区域-->
			<view class="cu-modal" :class="showMaterial=='showMaterial'?'show':''" @tap="hideUpWindow">
				<view class="cu-dialog" @tap.stop>
					<view class="page padding" :style="{'height': swiperHeight}">
						<text>{{question.material}}</text>
					</view>
				</view>
			</view>
			<!--点击交卷弹窗区域-->
			<view class="cu-modal" :class="showUpWindow=='showUpWindow'?'show':''" @tap="hideUpWindow">
				<view class="cu-dialog" @tap.stop>
					<view class="page padding" :style="{'height': swiperHeight}">
						<scroll-view class="page padding" :scroll-y=true :style="{'height':swiperHeight/2}" >
							<view class="cu-bar solid-bottom">
								<view class="action">
									<text class="cuIcon-title text-red"></text>剩余答题：
								</view>					
							</view>
							<view class="grid col-5 ">
								<view class="margin-tb-sm text-center" v-for="(items,index) in questionData" :key="index" v-if="items.userAnswer.length === 0">
									<button class="cu-btn round" @click="AppointedSubject(index)" >{{index+1}}</button>
								</view>
							</view>
						</scroll-view>
						<view class="windownBtn">
							<button type="primary" class="cu-btn round bg-green leftBtn" @click="returnAnswer">
								返回答题
							</button>
							<button type="primary" class="cu-btn round bg-green rightBtn" @click="confimSend">
								提交试卷
							</button>
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
							<button class="cu-btn round" :class="items.userAnswer.length===0?'line-grey':'bg-green'" @click="AppointedSubject(index)" >{{index+1}}</button>
						</view>
					</view>
					
					</scroll-view>
				</view>
			</view>
			<!--轮播界面，即题目列表-->
			<swiper :current="page_index" class="swiper-box" @change="SwiperChange" :style="{'height':swiperHeight}">
				<swiper-item v-for="(item,index) in questionData" :key="index">
					<view scroll-y="true" class="scroll_content" >
						<!--标题栏-->
						<view class="cu-bar bg-white solid-bottom">
							<view class="action text-black">
								<text class="cuIcon-title text-red"></text>{{question.title}}
							</view>
						</view>
						<!--单选框-->
						<radio-group class="block"  @change="RadioboxChange" v-if="currentType===1|| currentType===2">
							<view class="cu-form-group" v-for="(option,index) in question.optionList" :key="index">
								<radio :value="option.id" :checked="question.userAnswer.indexOf(option.id) > -1?true:false"></radio> 
								<view class="title text-black">{{option.id}}.{{option.content}}</view>
							</view>
						</radio-group>
						<!--复选框-->
						<checkbox-group class="block"  @change="CheckboxChange" v-else-if="currentType===3">
							<view class="cu-form-group" v-for="(option,index) in question.optionList" :key="index">
								<!--check样式必须设置在App.vue中才能起效果-->
								<checkbox class="wx-checkbox-input" :value="option.id" 
								:class="question.userAnswer.indexOf(option.id) > -1?'checked':''" :checked="question.userAnswer.indexOf(option.id) > -1?true:false"></checkbox>
								<view class="title text-black">{{option.id}}.{{option.content}}</view>
							</view>
						</checkbox-group>
						<!--单行输入框-->
						<!-- <view v-else-if="currentType===4">
							<view class="cu-form-group solid-bottom">
								<view class="title  text-black">
									答：
								</view>
								<input placeholder="文本输入框" name="input" v-model="question.userAnswer" @blur="textInput" ></input>
							</view>
						</view> -->
 						<view v-else-if="currentType===4">
							<view class="cu-bar cu-bar-title bg-white margin-top">
								<view class="action  text-black">
									答：
								</view>
							</view>
							<view class="cu-form-group solid margin">
								<textarea maxlength="-1"  @blur="textInput" v-model="question.userAnswer" placeholder="多行文本输入框"></textarea>
							</view>
						</view>
						<!--综合单选题-->
						<view v-else-if="currentType===5">
							<radio-group class="block"  @change="RadioboxChange">
								<view class="cu-form-group" v-for="(option,index) in question.optionList" :key="index">
									<radio :value="option.id" :checked="question.userAnswer.indexOf(option.id) > -1?true:false"></radio> 
									<view class="title text-black">{{option.id}}.{{option.content}}</view>
								</view>
							</radio-group>
						</view>
						<!--解析展示-->
						<view v-show="showAnswer" class="margin-top solid-top ">
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
		<!--自定义tabbar界面，下层点击按钮-->
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot tabbarPos">
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
			<view class="action" v-if="isShowAnswer===false">
				<view class="cuIcon-cu-image" @click="SendPaper">
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
				isNextQues:false,//是否自动下一题
				showUpWindow:null,//显示提示窗口（未答题完）
				showMaterial:null,//显示综合题材料窗口
				isShowAnswer:false,
				Value:0,//题库的第几套题目列表
				//开始时间
				startTime:{
					hour:0,
					minute:0,
					second:0
				},
				//结束时间
				endIime:{
					hour:0,
					minute:0,
					second:0
				}
			};
		},
		onLoad() {
			
		},
		onReady() {	
			//初始清空时间列表
			this.setCurrentTime({},-1);
			//获取当前时间,并按照传参进行开始或者结束时间赋值
			var nowTime = this.getCurrentTime();
			this.setCurrentTime(nowTime,0);
			//获取scrollview的高度
			this.getScrollHeight();
			//将传递的数据用本地变量存储
			this.questionData = this.bankQues;
			//初始时是否直接加载题目解析
			this.isShowAnswer = this.showAnswer;
			//题库列表
			this.Value = this.value;
			console.log(JSON.stringify(this.questionData));
			console.log(JSON.stringify(this.isShowAnswer));
			console.log(this.Value);
			//初始的题目序号
			this.page_index = parseInt(this.index);
			this.question = this.questionData[this.page_index];
			this.count = this.questionData.length;
			this.currentType = this.question.type;
		},
		//传入题目的数据
		//页面中不能直接调取传递的变量
		props:{
			bankQues:{},
			value:0,
			showAnswer:false,
			index:0,
		},
		methods:{
			//获取当前时间戳转化为对应时间
			getCurrentTime:function(){
				let date = new Date();
				//分别获取时分秒
				let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				let	minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				let	second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				console.log(hour+':'+minute+':'+second);
				var currentTime={
					hour:hour,
					minute:minute,
					second:second
				};
				//获取当前时间戳
				// var time = (new Date()).getTime();
				// console.log('time=='+time/1000);
				//返回当前时间
				return currentTime;
			},
			setCurrentTime:function(nowTime,index){
				//index==0处理开始时间，为1处理结束时间,-1为清空
				if(index===0){
					this.startTime.hour = nowTime.hour;
					this.startTime.minute = nowTime.minute,
					this.startTime.second = nowTime.second;
				}
				else if(index===1){
					this.endIime.hour = nowTime.hour;
					this.endIime.minute = nowTime.minute;
					this.endIime.second = nowTime.second;
				}
				else if(index===-1){
					this.startTime.hour = 0;
					this.startTime.minute = 0
					this.startTime.second = 0;
					this.endIime.hour = 0;
					this.endIime.minute = 0;
					this.endIime.second = 0;
				}
			},
			//获取开始时间到交卷时间的时间间隔
			getTimelag:function(){
				var lagTime = {
					hour:0,
					minute:0,
					second:0
				};
				if(this.endIime.hour<this.startTime.hour){
					this.endIime.hour += 24;
				}
				lagTime.hour = this.endIime.hour - this.startTime.hour;
				lagTime.minute = this.endIime.minute - this.startTime.minute;
				lagTime.second = this.endIime.second - this.startTime.second;
				if(lagTime.second < 0){
					lagTime.second += 60;
					lagTime.minute -= 1;
				}
				if(lagTime.minute < 0){
					lagTime.minute += 60;
					lagTime.hour -=1;
				}
				if(lagTime.hour<0){
					console.log('time error');
				}
				return lagTime;
			},
			//动态获取scrollview的高度
			getScrollHeight:function(){
				//初始是处理屏幕的高度
				var tempHeight = 800;
				var _self = this;
				uni.getSystemInfo({
					//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
					success: function(res) {                   
						tempHeight = res.windowHeight;
						console.log("屏幕可用高度 " + JSON.stringify(res));
						//在组件内获取id，需要加in(this),此处使用—_self代替了this
						uni.createSelectorQuery().in(_self).select("#top-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							//console.log("屏幕数据 " + data);
							tempHeight -= data.height;
							//console.log("减掉顶部后的高度 " + tempHeight);
							uni.createSelectorQuery().in(_self).select("#foot-box").fields({
								size: true,
								scrollOffset: true
							}, (data) => {
								tempHeight -= data.height;
								//console.log("减掉底部后的高度 " + tempHeight);
								_self.swiperHeight = tempHeight + 'px';
								//console.log("滑屏最后高度 " + _self.swiperHeight);
							}).exec();
						}).exec();
					},
					fail() {
						
					}
				});
			},
			//自动跳转下一题
			nextQues:function(){
				if(this.isNextQues){
					setInterval(()=>{
						if(this.page_index < this.count - 1 && this.isNextQues === true){
							this.page_index++;
							this.question = this.questionData[this.page_index];
							this.currentType = this.question.type;
							this.userFavor = this.question.userFavor;
							this.isNextQues = false;
						}
					},500);
				}
			},
			//下一题
			next:function(){
				if(this.page_index < this.count-1){
					this.page_index++;
					this.question = this.questionData[this.page_index];
					this.currentType = this.question.type;
				}	
			},
			//上一题
			pre:function(){
				if(this.page_index > 0){
					this.page_index--;
					this.question = this.questionData[this.page_index];
					this.currentType = this.question.type;
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
				//获取当前时间,并按照传参进行开始或者结束时间赋值
				var nowTime = this.getCurrentTime();
				this.setCurrentTime(nowTime,1);
				var lagTime = this.getTimelag();
				var currentTime = JSON.stringify(lagTime);
				console.log('time='+JSON.stringify(lagTime));
				//跳转到答题详情界面
				var questionData = JSON.stringify(this.questionData);
				uni.navigateTo({
					url:"./questionDetails/questionDetails?questionData="+questionData+'&value='+this.Value+'&time='+currentTime,
					success:(res)=> {
						console.log('success');
					},
					fail(res) {
						console.log(res);
					},
				});
				//this.showUpWindow = null;
			},
			//隐藏交卷窗口
			hideUpWindow:function(){
				this.showUpWindow = null;
				this.showAllUpWindow = null;
				this.showMaterial = null;
			},
			//答题界面提交试卷
			SendPaper:function(){
				var sum=0;
				for (var i = 0; i < this.questionData.length; i++) {
					console.log(this.questionData[i].userAnswer);
					if(this.questionData[i].userAnswer.length === 0){
						sum=1;
						break;
					}
				}
				if(sum!==0){
					this.showUpWindow = "showUpWindow";
				}
				else{
					//获取当前时间,并按照传参进行开始或者结束时间赋值
					var nowTime = this.getCurrentTime();
					this.setCurrentTime(nowTime,1);
					var lagTime = this.getTimelag();
					var currentTime = JSON.stringify(lagTime);
					var questionData = JSON.stringify(this.questionData);
					uni.navigateTo({
						url:"./questionDetails/questionDetails?questionData="+questionData+'&value='+this.Value+'&time='+currentTime,
						success:(res)=> {
							console.log('success');
						},
					})
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
				}	
			},
			//单选选中
			RadioboxChange : function(e) { 
			
				var items = this.questionData[this.page_index].optionList;
				var values = e.detail.value;
				//将答案记录下来
				this.questionData[this.page_index].userAnswer = values;
				console.log(values);
				this.questionData[this.page_index].userFavor = true;
				this.isNextQues = true;
				this.nextQues();
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
				this.questionData[this.page_index].userFavor = true;
			},
			//填空题
			textInput : function(e) { 
				this.questionData[this.page_index].userAnswer = e.detail.value;
				this.questionData[this.page_index].userFavor = true;
			},
			//在题目列表中题目跳转
			AppointedSubject:function(index){
				this.page_index = index;
				this.question = this.questionData[this.page_index];
				this.currentType = this.question.type;
				this.userFavor = this.question.userFavor;
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
			},
			//展示综合题材料
			ShowMaterial:function(){
				this.showMaterial = "showMaterial";
			}
		}
	}
</script>

<style lang="scss">
	@import url("../colorui/animation.css");
	.windownBtn {
		display: flex;
		position: fixed;
		width: 85%;
		justify-content: center;
		//border: 2upx solid red;
		bottom: 10%;
		.leftBtn{
			margin: auto 60upx;
			// float: left;
			// left: 40upx;
		}
		.rightBtn{
			margin: auto 60upx;
			// float: right;
			// right: 40upx;
		}
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
		.material{
			margin: 20upx 20upx;
			display: inline;
		}
	    .span{
	      &:last-child {
	        float: right;
	        right: 0upx;
	      }
	    }
	  }
	 }
	 .tabbarPos{
		 margin-bottom: 10upx;
	 }
	 .btnPos {
		 .btnChild{
			//border: 2px solid red;
			width:160upx;
			height: 80upx;
			bottom:calc(env(safe-area-inset-bottom) / 2);
			//bottom: calc(100upx + env(safe-area-inset-bottom) / 2);
			display: flex;
			justify-content: center;
			align-items: center;
		 }
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
