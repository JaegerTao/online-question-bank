<!-- 题目及选项组件 -->
<template>
	<view>
		<view id="top-box" class="content">
			<!--倒计时页面-->
			<view class="type" v-show="!showAllAnswer">
				<view class="answer_title">答题倒计时</view>
				<view class="time">{{restTime.minute}}:{{restTime.second}}</view>
			</view>
		</view>
		<!--题目界面-->
		<view class="problem">
			<!--暂停时间提示窗口-->
			<view class="cu-modal" :class="showHoldTimeWindow=='showHoldWindow'?'show':''" @tap="hideWindow">
				<view class="cu-dialog" @tap.stop>
					<view class="page padding" :style="{'height': modeCardHeight}">
						<view class="reamainTime_content">
							<view class="reaminTime_info">{{restTime.minute}}:{{restTime.second}}</view>
						</view>
						<view class="reaminTime_text">
							<text class="reaminTime_text_info">答题剩余时间</text>
						</view>
						<view class="windownBtn">
							<button type="primary" class="cu-btn round leftBtn" @click="returnAnswer">
								继续答题
							</button>
							<button type="primary" class="cu-btn round rightBtn" @click="returnExam">
								保存并退出
							</button>
						</view>
					</view>
				</view>
			</view>
			<!--点击交卷弹窗区域-->
			<view class="cu-modal" :class="showUpWindow=='showUpWindow'?'show':''" @tap="hideWindow">
				<view class="cu-dialog" @tap.stop>
					<view class="page padding" :style="{'height': modeCardHeight}">
						<view class="cu-bar solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-red"></text>未答题目序号:
							</view>
						</view>
						<scroll-view class="page padding" :scroll-y=true :style="{'height':scrollHeight}">
							<view v-if="quesListSum[0].sum>0">
								<text class="textQuesType">单选题</text>
								<view class="grid col-5">
									<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='D' && items.uIsTrue === null">
										<button class="cu-btn round" :class="items.uIsTrue===null?'': 'bg-green'" @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
									</view>
								</view>
							</view>
							<view v-if="quesListSum[1].sum>0">
								<view class="textQuesType">多选题</view>
								<view class="grid col-5">
									<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='F' && items.uIsTrue === null">
										<button class="cu-btn round" :class="items.uIsTrue===null?'': 'bg-green'" @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
									</view>
								</view>
							</view>
							<view v-if="quesListSum[2].sum>0">
								<view class="textQuesType">简答题</view>
								<view class="grid col-5">
									<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='J' && items.uIsTrue === null">
										<button class="cu-btn round" :class="items.uIsTrue===null?'': 'bg-green'" @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
									</view>
								</view>
							</view>
							<view v-if="quesListSum[3].sum>0">
								<view class="textQuesType">判断题</view>
								<view class="grid col-5">
									<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='P' && items.uIsTrue === null">
										<button class="cu-btn round" :class="items.uIsTrue===null?'': 'bg-green'" @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
									</view>
								</view>
							</view>
							<view v-if="quesListSum[4].sum>0">
								<view class="textQuesType">综合单选题</view>
								<view class="grid col-5">
									<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='Z' && items.uIsTrue === null">
										<button class="cu-btn round" :class="items.uIsTrue===null?'': 'bg-green'" @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
									</view>
								</view>
							</view>
						</scroll-view>
						<view class="windownBtn">
							<button type="primary" class="cu-btn round leftBtn" @click="returnAnswer">
								返回答题
							</button>
							<button type="primary" class="cu-btn round rightBtn" @click="confimSend">
								提交试卷
							</button>
						</view>
					</view>
				</view>
			</view>
			<!--答题卡区域-->
			<view class="cu-modal" :class="modalCard=='modalCard'?'show':''" @tap="hideWindow">
				<view class="cu-dialog" @tap.stop>
					<view class="page padding" :style="{'height': modeCardHeight}">
						<view class="cu-bar solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-red"></text>答题卡
							</view>
						</view>
						<scroll-view class="page padding" :scroll-y=true :style="{'height':scrollHeight}">
							<view v-if="quesListSum[0].sum>0">
								<text class="textQuesType">单选题</text>
								<view class="grid col-5">
									<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='D' ">
										<button class="cu-btn round" :class="testmodel=='K'?(items.uIsTrue == null?'':'bg-green'):(items.uIsTrue == null?'': (items.uIsTrue == '0'?'bg-red':'bg-green'))"
										 @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
									</view>
								</view>
							</view>
							<view v-if="quesListSum[1].sum>0">
								<view class="textQuesType">多选题</view>
								<view class="grid col-5">
									<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='F' ">
										<button class="cu-btn round" :class="testmodel=='K'?(items.uIsTrue == null?'':'bg-green'):(items.uIsTrue == null?'': (items.uIsTrue == '0'?'bg-red':'bg-green'))"
										 @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
									</view>
								</view>
							</view>
							<view v-if="quesListSum[2].sum>0">
								<view class="textQuesType">简答题</view>
								<view class="grid col-5">
									<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='J' ">
										<button class="cu-btn round" :class="items.uIsTrue == null?'': (items.uIsTrue == '0'?'bg-green':'bg-green')"
										 @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
									</view>
								</view>
							</view>
							<view v-if="quesListSum[3].sum>0">
								<view class="textQuesType">判断题</view>
								<view class="grid col-5">
									<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID === 'P'">
										<button class="cu-btn round" :class="testmodel=='K'?(items.uIsTrue== null?'':'bg-green'):(items.uIsTrue == null?'': (items.uIsTrue == '0'?'bg-red':'bg-green'))"
										 @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
									</view>
								</view>
							</view>
							<view v-if="quesListSum[4].sum>0">
								<view class="textQuesType">综合单选题</view>
								<view class="grid col-5">
									<view class="margin-tb-sm text-center" v-for="(items,index) in allQuestions" :key="index" v-if="items.QTypeID ==='Z' ">
										<button class="cu-btn round" :class="testmodel=='K'?(items.uIsTrue== null?'':'bg-green'):(items.uIsTrue == null?'': (items.uIsTrue == '0'?'bg-red':'bg-green'))"
										 @click="AppointedSubject(items.QuestionOrder,items.QTypeID)">{{items.QuestionOrder}}</button>
									</view>
								</view>
							</view>
						</scroll-view>
						<view class="quesSituation">
							<!-- <view class="right">
								<text class="cuIcon-square bg-green iconShow"></text>
								<text class="textShow">正确:{{quesSituation.rightQues}}</text>
							</view>
							<view class="wrong">
								<text class="cuIcon-square bg-red iconShow"></text>
								<text class="textShow">错误:{{quesSituation.wrongQues}}</text>
							</view> -->
							<view class="right">
								<text class="cuIcon-square bg-green iconShow"></text>
								<text class="textShow">已做:{{quesSituation.hasAnsQues}}</text>
							</view>
							<view class="notAns">
								<text class="cuIcon-square iconShow"></text>
								<text class="textShow">未做:{{quesSituation.notAnsQues}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--轮播界面，即题目列表-->
			<swiper :current="page_index" class="swiper-box" @change="SwiperChange" :style="{'height':swiperHeight}">
				<swiper-item v-for="(item,index) in allQuestions" :key="index">
					<scroll-view scroll-y="true" class="scroll_content" :style="{'height':swiperHeight}" :scroll-top="scrollTop">
						<!--标题栏-->
						<view class="bg-white solid-bottom quesTitle" id="title-box" v-if="question.QuestionOrder">
							<view class="action text-black">
								<text class="textType" v-if="currentType === 1">[单选题] {{question.QuestionOrder}}、</text>
								<text class="textType" v-else-if="currentType === 2">[判断题] {{question.QuestionOrder}}、</text>
								<text class="textType" v-else-if="currentType === 3">[多选题] {{question.QuestionOrder}}、</text>
								<text class="textType" v-else-if="currentType === 4">[简答题] {{question.QuestionOrder}}、</text>
								<text class="textType" v-else-if="currentType === 5">[综合单选题] {{question.QuestionOrder}}、</text>
	
								<text class="textQues" v-if="question.Question">{{question.Question}} ({{question.Score}}')</text>
								<view class="textSubQues" v-if="currentType === 5">{{question.SubOrder}}.{{question.SubQuestion}} ({{question.SubScore}}')</view>
							</view>
						</view>
						<!--答题区域-->
						<view v-show="question.AddNo || question.AnsText || question.uAnsText || testmodel == 'K'">
							<!--单选题-->
							<view v-if="currentType == 1" id="question-box">
								<!--禁止点击button-->
								<!-- <view v-if="(question.uIsDone==='1'||isShowAllAnswer) && coverSyn" class="hideBtn_content" :style="{'top':topHeight}">
									<button class="hideBtn" :style="{'height':hideBtnHeight}"></button>
								</view> -->
								<radio-group class="block" @change="RadioboxChange">
									<view class="cuform">
										<radio :value="'A'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('A')"
										 :class="(uAnsText.indexOf('A')>-1 && testmodel == 'L')?(AnsText.indexOf('A')>-1?'':'red'):''"></radio>
										<view class="title text-black"><text>A.{{question.QText1}}</text></view>
									</view>
									<view class="cuform">
										<radio :value="'B'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('B')"
										 :class="(uAnsText.indexOf('B')>-1 && testmodel == 'L')?(AnsText.indexOf('B')>-1?'':'red'):''"></radio>
										<view class="title text-black"><text>B.{{question.QText2}}</text></view>
									</view>
									<view class="cuform">
										<radio :value="'C'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('C')"
										 :class="(uAnsText.indexOf('C')>-1 && testmodel == 'L')?(AnsText.indexOf('C')>-1?'':'red'):''"></radio>
										<view class="title text-black"><text>C.{{question.QText3}}</text></view>
									</view>
									<view class="cuform">
										<radio :value="'D'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('D')"
										 :class="(uAnsText.indexOf('D')>-1 && testmodel == 'L')?(AnsText.indexOf('D')>-1?'':'red'):''"></radio>
										<view class="title text-black"><text>D.{{question.QText4}}</text></view>
									</view>
								</radio-group>
							</view>
							<!--判断题-->
							<view v-else-if="currentType==2" id="question-box">
								<!--禁止点击button-->
								<!-- <view v-if="question.uIsDone==='1'||isShowAllAnswer" class="hideBtn_content" :style="{'top':topHeight}">
									<button class="hideBtn" :style="{'height':hideBtnHeight}"></button>
								</view> -->
								<radio-group class="block" @change="RadioboxChange">
									<view class="cuform">
										<radio :value="'T'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('T')"
										 :class="(uAnsText.indexOf('T')>-1 && testmodel == 'L')?(AnsText.indexOf('T')>-1?'':'red'):''"></radio>
										<view class="title text-black">正确</view>
									</view>
									<view class="cuform">
										<radio :value="'F'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('F')"
										 :class="(uAnsText.indexOf('F')>-1 && testmodel == 'L')?(AnsText.indexOf('F')>-1?'':'red'):''"></radio>
										<view class="title text-black">错误</view>
									</view>
								</radio-group>
							</view>
							<!--复选框-->
							<view v-else-if="currentType==3" id="question-box">
								<!--禁止点击button-->
								<!-- <view v-if="question.uIsDone==='1'||isShowAllAnswer" class="hideBtn_content" :style="{'top':topHeight}">
									<button class="hideBtn" :style="{'height':hideBtnHeight}"></button>
								</view> -->
								<checkbox-group class="block" @change="CheckboxChange">
									<view class="cuform">
										<checkbox :value="'A'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('A')"
										 :class="(uAnsText.indexOf('A')>-1 && testmodel == 'L')&&(question.uIsDone==='1'||showAllAnswer)?(AnsText.indexOf('A')>-1?'':'red'):''"></checkbox>
										<view class="title text-black"><text>A.{{question.QText1}}</text></view>
									</view>
									<view class="cuform">
										<checkbox :value="'B'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('B')"
										 :class="(uAnsText.indexOf('B')>-1 && testmodel == 'L')&&(question.uIsDone==='1'||showAllAnswer)?(AnsText.indexOf('B')>-1?'':'red'):''"></checkbox>
										<view class="title text-black"><text>B.{{question.QText2}}</text></view>
									</view>
									<view class="cuform">
										<checkbox :value="'C'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('C')"
										 :class="(uAnsText.indexOf('C')>-1 && testmodel == 'L')&&(question.uIsDone==='1'||showAllAnswer)?(AnsText.indexOf('C')>-1?'':'red'):''"></checkbox>
										<view class="title text-black"><text>C.{{question.QText3}}</text></view>
									</view>
									<view class="cuform">
										<checkbox :value="'D'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('D')"
										 :class="(uAnsText.indexOf('D')>-1 && testmodel == 'L')&&(question.uIsDone==='1'||showAllAnswer)?(AnsText.indexOf('D')>-1?'':'red'):''"></checkbox>
										<view class="title text-black"><text>D.{{question.QText4}}</text></view>
									</view>
									<view class="cuform" v-if="question.QText5!=null">
										<checkbox :value="'E'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('E')"
										 :class="(uAnsText.indexOf('E')>-1 && testmodel == 'L')&&(question.uIsDone==='1'||showAllAnswer)?(AnsText.indexOf('E')>-1?'':'red'):''"></checkbox>
										<view class="title text-black"><text>E.{{question.QText5}}</text></view>
									</view>
									<view class="btn">
										<view class="confirmAns cu-btn shadow radius bg-orange text-white" @click="confimAnswer('F')">确定</view>
									</view>
								</checkbox-group>
							</view>
							<!--简答题-->
							<view v-else-if="currentType==4" id="question-box">
								<!--禁止点击button-->
								<!-- <view v-if="question.uIsDone==='1'||isShowAllAnswer" class="hideBtn_content" :style="{'top':topHeight}">
									<button class="hideBtn" :style="{'height':hideBtnHeight}"></button>
								</view> -->
								<view class="cu-bar cu-bar-title bg-white margin-top">
									<view class="action  text-black">
										答：
									</view>
								</view>
								<view class="cuform solid margin">
									<textarea v-if="modalCard==null&&showCardModal==null&&showHoldTimeWindow==null" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'"
									 maxlength="-1" @blur="textInput" v-model="question.uAnsText" placeholder="在此作答"></textarea>
									<text v-else>{{ question.uAnsText?question.uAnsText : " " }}</text>
								</view>
								<view class="btn">
									<view class="confirmAns cu-btn shadow radius bg-orange text-white" @click="confimAnswer('J')">确定</view>
								</view>
							</view>
							<!--综合单选题-->
							<view v-else-if="currentType==5" id="question-box">
								<!--禁止点击button-->
								<!-- <view v-if="question.uIsDone==='1'||isShowAllAnswer" class="hideBtn_content" :style="{'top':topHeight}">
									<button class="hideBtn" :style="{'height':hideBtnHeight}"></button>
								</view> -->
								<radio-group class="block" @change="RadioboxChange">
									<view class="cuform">
										<radio :value="'A'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('A')"
										 :class="(uAnsText.indexOf('A')>-1 && testmodel == 'L')?(AnsText.indexOf('A')>-1?'':'red'):''"></radio>
										<view class="title text-black"><text>A.{{question.QText1}}</text></view>
									</view>
									<view class="cuform">
										<radio :value="'B'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('B')"
										 :class="(uAnsText.indexOf('B')>-1 && testmodel == 'L')?(AnsText.indexOf('B')>-1?'':'red'):''"></radio>
										<view class="title text-black"><text>B.{{question.QText2}}</text></view>
									</view>
									<view class="cuform">
										<radio :value="'C'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('C')"
										 :class="(uAnsText.indexOf('C')>-1 && testmodel == 'L')?(AnsText.indexOf('C')>-1?'':'red'):''"></radio>
										<view class="title text-black"><text>C.{{question.QText3}}</text></view>
									</view>
									<view class="cuform">
										<radio :value="'D'" :disabled="(question.uIsDone==='1'||showAllAnswer)&&testmodel=='L'" :checked="isChecked('D')"
										 :class="(uAnsText.indexOf('D')>-1 && testmodel == 'L')?(AnsText.indexOf('D')>-1?'':'red'):''"></radio>
										<view class="title text-black"><text>D.{{question.QText4}}</text></view>
									</view>
								</radio-group>
							</view>
							<!--解析展示-->
							<view v-if="testmodel == 'K'&&question.uAnsText" class="margin-top solid-top rdisable">
								<view class="cu-bar">
									<view class="action text-gray">
										<text>我的答案：</text>
										<text class="solid-bottom  padding-left text-red">{{question.uAnsText}}</text>
									</view>
								</view>
							</view>
							<view v-if="(question.uIsDone!=null||showAllAnswer)&&testmodel=='L'" class="margin-top solid-top rdisable">
								<view class="cu-bar" v-if=" currentType != 4 && question.AnsText">
									<view class="action  text-grey">
										<text>正确答案：</text>
										<text class="solid-bottom  padding-left text-red">{{question.AnsText}}</text>
										<text class="padding">我的答案：</text>
										<text class="solid-bottom  padding-left text-red" v-if="question.uAnsText != null && uAnsText.trim()!=''">{{question.uAnsText}}</text>
										<text class="solid-bottom  padding-left text-gray" v-else>未作答</text>
									</view>
								</view>
								<view class="cu-bar cu-bar-title">
									<view class="action  text-grey">
										<text>解析：</text>
									</view>
								</view>
								<view class="text-content padding  text-grey">
									{{question.AnsParsing}}
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!--自定义tabbar界面，下层点击按钮-->
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot tabbarPos">
			<view @click="pre" class="action">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-back text-gray"></text>
				</view>
				<view class="text-gray">上一题</view>
			</view>
			<view @click="next" class="action">
				<view class="cuIcon-cu-image">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
				<view class="text-gray">下一题</view>
			</view>
			<view class="action" v-if="!showAllAnswer">
				<view class="cuIcon-cu-image" @click="SendPaper">
					<text class="lg text-gray cuIcon-upload"></text>
				</view>
				<view class="text-gray">交卷</view>
			</view>
			<view class="action" v-if="!showAllAnswer && testmodel=='L'">
				<view class="cuIcon-cu-image" @click="holdTime">
					<text class="lg text-gray cuIcon-similar"></text>
				</view>
				<view class="text-gray">暂停</view>
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
	import reqAddress from '../common/reqAddress.js'
	import banks from '../pages/exam/questionBanks.js';
	export default {
		data() {
			return {
				allQuestions: [],
				question: {}, //当前题目
				uAnsText: '', //储存当前题目的答案
				AnsText: '', //储存正确答案
				checkedTrue: false,
				
				// questionData: banks[1], //题目列表,后期不再需要
				page_index: 0, //当前题号,初始如果为1,则逻辑需要更改
				count: 0, //题目数量
				score: 0, //答题分数
				currentType: 0, //代表样式的数字
				modalCard: null, //显示答题卡
				swiperHeight: '1070rpx', //轮播图展示高度
				modeCardHeight: '360px', //弹窗高度
				scrollHeight: '300px', //答题卡scroll高度
				showUpWindow: null, //显示提示窗口（未答题完）
				showHoldTimeWindow: null, //显示暂停时间窗口
				isShowAnswer: false, //是否展示单个题目
				isShowAllAnswer: false, //是否展示全部题目
				scrollTop: -1, //默认scroll的高度
				topHeight: '200px',
				hideBtnHeight: '200px',
				dis: 0,
				//开始时间
				startTime: {
					hour: 0,
					minute: 0,
					second: 0
				},
				//结束时间
				endIime: {
					hour: 0,
					minute: 0,
					second: 0
				},
				//剩余答题时间
				restTime: {
					minute: 0,
					second: 0,
				},
				//题库中各种题的数量
				quesListSum: [{
						type: 'D',
						sum: 0
					}, //单选
					{
						type: 'F',
						sum: 0
					}, //复选
					{
						type: 'J',
						sum: 0
					}, //简答
					{
						type: 'P',
						sum: 0
					}, //判断
					{
						type: 'Z',
						sum: 0
					}, //综合
				],
				//题目现在情况，答对，答错，未答
				quesSituation: {
					rightQues: 0,
					wrongQues: 0,
					hasAnsQues: 0,
					notAnsQues: 0
				},
				//题目回答的规定时间
				AnswerTime: 20000,
				isAnswerTimeFull: false,
				isContinueAnswer: false,
				//试卷包含的所有题目类型
				T_Qtypes: '',
				//监听试卷时间的interval，在手动交卷时取消
				pInterval: null,
				//同步获取题目与点击按钮
				clickSyn: false,
				//同步题目蒙层
				coverSyn: false,
				//同步题目列表获取
				getquesSyn: true,
				
				cookie: ''
			};
		},
		onReady() {
			//变量转换
			this.isShowAllAnswer = this.showAllAnswer;
			//初始清空时间列表
			this.setCurrentTime({}, -1);
			//获取当前时间,并按照传参进行开始或者结束时间赋值
			var nowTime = this.getCurrentTime();
			this.setCurrentTime(nowTime, 0);
			//获取scrollview的高度
			this.getScrollHeight();

		},
		//组件加载完成执行
		mounted() {
			this.cookie = uni.getStorageSync('sessionid');
			//获取题库,并得到题目数量
			//this.getQuesListFromServer();
			//this.count = this.allQuestions.length;
			// this.isShowAllAnswer = this.showAllAnswer;
			this.getRemainTime();
			//时间监听
			if (!this.showAllAnswer) {
				this.listenUpdateTime();
			}
			try {
				let sysinfo = uni.getSystemInfoSync();
				console.log(sysinfo.pixelRatio);
				console.log(sysinfo.screenHeight);
				// if (sysinfo.screenHeight > 800) {
				// 	this.swiperHeight = '1250rpx';
				// }
				if(this.showAllAnswer){
					this.swiperHeight = sysinfo.screenHeight * 0.8 + "px";
				}else{
					this.swiperHeight = sysinfo.screenHeight * 0.75 + "px";
				}
				console.log(this.swiperHeight);
			} catch (e) {
				//TODO handle the exception

			}
			//初始时是否直接加载题目解析
			// this.isShowAllAnswer = this.showAllAnswer;
			this.isContinueAnswer = this.continueAnswer;
			//console.log(JSON.stringify(this.questionData));
			//初始的题目序号
			//this.getQuesFromServer(this.index, this.firsttype);
			//this.getHideBtnTopHeight();
			///读取本地数据
			if (this.isContinueAnswer) {
				this.readScore();
			}
			this.listenHide();
			this.getHideBtnTopHeight();
		},
		//页面中不能直接调取传递的变量
		props: {
			//是否展示全部题目
			showAllAnswer: {
				type: Boolean,
				default: false
			},
			//题目号与样式
			index: 0,
			firsttype: "",
			continueAnswer: false,
			testid: {
				type: String,
				default: ""
			},
			tduration: {
				type: String,
				default: ""
			},
			tqtypes: {
				type: String,
				default: ""
			},
			qtypecounts: {},
			testmodel: {
				type: String,
				default: ""
			},
			pstartTime: "",
			pendTime: ""
		},
		methods: {
			//从服务器获取剩余时间
			getRemainTime: function() {
				//h获取时间，此处用静态时间表示
				//获取方法书写,用remainTime赋值
				let remainTime = this.tduration;
				if (remainTime.includes('_')) {
					let currentTime = remainTime.split("_");
					this.AnswerTime = parseInt(currentTime[0]) * 60 * 1000 + parseInt(currentTime[1]) * 1000;
				} else {
					this.AnswerTime = parseInt(remainTime) * 60 * 1000;
				}
				// console.log(this.AnswerTime);
				//设置试卷包含题型
				this.T_Qtypes = this.tqtypes;

				this.getQuesListFromServer();

				// var remainTime = "30_00";
				// var currentTime = remainTime.split("_");
				// this.AnswerTime = parseInt(currentTime[0])*60*1000+parseInt(currentTime[1])*1000;
				//console.log(this.AnswerTime);

			},
			//保存进度,向服务器发送剩余时间
			postReaminTime: function() {
				let remainTime = (this.restTime.minute).toString() + '_' + (this.restTime.second).toString();
				console.log(remainTime);
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/saveTestTmp',
					method: 'POST',
					data: {
						TestID: this.testid,
						timecost: remainTime,
						TestModel: this.testmodel
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						if (res.data == 1 && this.testmodel == 'L') {
							uni.showToast({
								title: '保存成功',
								duration: 2000
							})
						}
					}
				})
				//发送方法，发用参数为remainTime
			},
			//监听隐藏APP事件，保存时间
			listenHide(){
				let that = this
				if(this.testmodel != 'K') return
				wx.onAppHide(function(){
					console.log("listenhide")
					that.postReaminTime();
				})
			},
			//关闭隐藏APP事件
			offlistenHide(){
				console.log("offlistenhide")
				if(this.testmodel != 'K') return
				wx.offAppHide();
			},
			//从服务器获取题目列表
			getQuesListFromServer: function() {
				//获取全部题号和题目类型数据
				this.allQuestions = [];
				// console.log(this.allQuestions);
				console.log(this.qtypecounts);
				for (let qtypecount of this.qtypecounts) {
					for (let i = 1; i <= Number(qtypecount.QCount); i++) {
						let allquestion = {
							uIsTrue: null,
							QTypeID: '',
							QuestionOrder: ''
						}
						allquestion.QTypeID = qtypecount.QTypeID;
						allquestion.QuestionOrder = String(i);
						this.allQuestions.push(allquestion);
					}
				}
				this.count = this.allQuestions.length;
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/getOrderTF',
					method: 'POST',
					data: {
						TestID: this.testid,
						T_Qtypes: this.T_Qtypes,
						TestModel: this.testmodel
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						//更新题目列表
						for (let upques of res.data) {
							for (let allquestion of this.allQuestions) {
								if (upques.QTypeID == allquestion.QTypeID && upques.QuestionOrder == allquestion.QuestionOrder) {
									allquestion.uIsTrue = upques.uIsTrue;
								}
							}
						}
						//每一次获取清空之前的数据
						this.quesSituation.notAnsQues = 0;
						this.quesSituation.wrongQues = 0;
						this.quesSituation.rightQues = 0;
						for (var i = 0; i < this.quesListSum.length; i++) {
							this.quesListSum[i].sum = 0;
						}
						//每一次更新				
						for (var i = 0; i < this.allQuestions.length; i++) {
							//记录下正确错误未做的题目数量
							if (this.allQuestions[i].uIsTrue === null) {
								this.quesSituation.notAnsQues++;
							} else{
								this.quesSituation.hasAnsQues++;
							}
							// else if (this.allQuestions[i].uIsTrue === "0") {
							// 	this.quesSituation.wrongQues++;
							// } else if (this.allQuestions[i].uIsTrue === "1") {
							// 	this.quesSituation.rightQues++;
							// }
							for (var j = 0; j < this.quesListSum.length; j++) {
								if (this.allQuestions[i].QTypeID == this.quesListSum[j].type) {
									this.quesListSum[j].sum++;
									break;
								}
							}
						}
						if (this.getquesSyn) {
							// console.log(this.index + " " + this.firsttype);
							this.getQuesFromServer(this.index, this.firsttype);
							this.getquesSyn = false;
						}
					}
				})
			},
			//从服务器获取题目
			getQuesFromServer(index, type) {
				//获取当前题目时，屏蔽翻页
				this.clickSyn = false;
				this.coverSyn = false;
				this.question = null;
				//目前为在静态题库中模拟获取题
				//type:题目类型，index为当前题类型下的第几个
				this.page_index = this.setPageIndex(index, type);
				//请求得到的题目数据直接赋给question变量
				// this.question = this.questionData[this.page_index];
				uni.showLoading({
					title:"加载中..."
				});
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/getTest',
					method: 'POST',
					data: {
						TestID: this.testid,
						NQtype: type,
						NQOrder: index,
						TestModel: this.testmodel
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						// console.log(res.data);
						let cquestion = res.data[0];
						this.isShowAnswer = (cquestion.uIsDone != null) ? true : false;
						for (let prop in cquestion) {
							if (cquestion[prop] != null) {
								cquestion[prop] = decodeURIComponent(cquestion[prop]);
							}
						}
						this.question = cquestion;
						this.uAnsText = cquestion.uAnsText?cquestion.uAnsText:'';
						this.AnsText = cquestion.AnsText?cquestion.AnsText:'';
						//题目类型的转换
						this.setQuesType();
						//获取题目完成前不允许翻页
						this.getHideBtnTopHeight();
					},
					complete: (res) => {
						uni.hideLoading();
					}
				})
			},
			
			//向服务器发送当前题目信息
			postQuesToServer: function() {
				//提交当前题目
				if (this.question.uIsDone == '1' && this.question.uIsTrue == '1') {
					this.question.uScore = this.question.Score;
				} else {
					this.question.uScore = 0;
				}
				console.log(this.page_index);
				if(this.testmodel == 'L'){
					this.allQuestions[this.page_index].uIsTrue = this.question.uIsTrue;
				}else if(this.testmodel == 'K'){
					this.allQuestions[this.page_index].uIsTrue = "1";
				}
				console.log(this.allQuestions[this.page_index]);
				let cquestion = JSON.parse(JSON.stringify(this.question));
				for (let prop in cquestion) {
					if (cquestion[prop] != null) {
						cquestion[prop] = encodeURIComponent(cquestion[prop]);
					}
				}
				this.AnsText = this.question.AnsText?this.question.AnsText:''
				this.uAnsText = this.question.uAnsText?this.question.uAnsText:''
				let questionjson = JSON.stringify(cquestion);
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/saveTest',
					method: 'POST',
					data: {
						TestID: this.testid,
						data: questionjson,
						TestModel: this.testmodel
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						// console.log(res.data.msg);
						
						// 更新已做未做题目
						this.quesSituation.hasAnsQues += 1
						this.quesSituation.notAnsQues -= 1
						
						if(this.testmodel == 'K'){
							this.next();
						}
					}
				})

			},

			//判断是否可以交卷
			submitTest() {
				// console.log(this.pstartTime + " " + this.pendTime);
				if(this.testmodel == 'L'){
					this.doSubmitTest();
				}else if(this.testmodel == 'K'){
					uni.request({
						url: reqAddress.DomainName + "/funcQuestion/Test/kcIsCanSubmit",
						method:'POST',
						data:{
							TestID : this.testid,
							TestModel : this.testmodel,
							StartTime : this.pstartTime,
							EndTime: this.pendTime
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'cookie': this.cookie
						},
						success: (res) => {
							if(res.data == 'OK'){
								this.offlistenHide();
								this.doSubmitTest();
							}else{
								uni.showModal({
									title: '提示',
									content: res.data,
									showCancel: false
								});
							}
						}
						
					})
				}
				
			},
			//执行交卷操作
			doSubmitTest(){
				let remainTime = (this.restTime.minute).toString() + '_' + (this.restTime.second).toString();
				uni.request({
					url: reqAddress.DomainName + '/funcQuestion/Test/submitTest',
					method: 'POST',
					data: {
						TestID: this.testid,
						T_Qtypes: this.T_Qtypes,
						timecost: remainTime,
						TestModel: this.testmodel
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'cookie': this.cookie
					},
					success: (res) => {
						// console.log(res);
						uni.showToast({
							title: "已提交",
							duration: 2000
						})
						
						let nowTime = this.getCurrentTime();
						this.setCurrentTime(nowTime, 1);
						let lagTime = this.getTimelag();
						let currentTime = JSON.stringify(lagTime);
						clearInterval(this.pInterval); //停止监听试卷时间
						// console.log('time=' + JSON.stringify(lagTime));
						let tallQuestions = JSON.stringify(this.allQuestions);
						
						if(this.testmodel == 'L'){
							uni.redirectTo({
								url: "./questionDetails/questionDetails?allQuestions= " + encodeURIComponent(tallQuestions) + "&TestID=" +
									this.testid + '&time=' + currentTime + '&score=' + this.score,
								success: (res) => {
									// console.log('success');
									this.isAnswerTimeFull = true;
									this.removeScore();
								}
							});
						}else if(this.testmodel == 'K'){
							uni.showToast({
								title:'提交成功',
								icon:'success'
							})
							uni.switchTab({
								url:'../../pages/index/index'
							})
						}
						
					}
				})
			},
			
			
			//设置当前题目的类型
			setQuesType: function() {
				if (this.question.QTypeID === 'D') { //单选
					this.currentType = 1;
				} else if (this.question.QTypeID === 'P') { //判断
					this.currentType = 2;
				} else if (this.question.QTypeID === 'F') { //复选
					this.currentType = 3;
				} else if (this.question.QTypeID === 'J') { //简答
					this.currentType = 4;
				} else if (this.question.QTypeID === 'Z') {
					this.currentType = 5;
				}
			},
			//监听剩余答题时间
			listenUpdateTime: function() {
				if (this.isShowAllAnswer) {
					return;
				}
				let speedTime = 0;
				this.pInterval = setInterval((res) => {
					if (!this.isAnswerTimeFull && this.showHoldTimeWindow == null) {
						if (speedTime < parseInt(this.AnswerTime)) {
							//console.log(speedTime)
							speedTime += 1000;
							this.restTime.minute = parseInt((this.AnswerTime - speedTime) / 1000 / 60);
							this.restTime.second = parseInt((this.AnswerTime - this.restTime.minute * 1000 * 60 - speedTime) / 1000);
							//console.log(JSON.stringify((this.restTime)))
						} else {
							let time = {
								hour: 0,
								minute: 0,
								second: 0
							}
							time.hour = parseInt(speedTime / 1000 / 3600);
							time.minute = parseInt((speedTime - time.hour * 3600 * 1000) / 1000 / 60);
							time.second = parseInt((speedTime - time.hour * 3600 * 1000 - time.minute * 60 * 1000) / 1000);
							//console.log(time);
							let currentTime = JSON.stringify(time);
							//跳转到答题详情界面
							//let questionData = JSON.stringify(this.questionData);
							this.submitTest();

							//跳转到答题详情界面
							// let tallQuestions = JSON.stringify(this.allQuestions);
							// uni.reLaunch({
							// 	url: "./questionDetails/questionDetails?allQuestions= " + encodeURIComponent(tallQuestions) + "&TestID=" +
							// 		this.testid + '&time=' + currentTime + '&score=' + this.score,
							// 	success: (res) => {
							// 		// console.log('success');
							// 		this.isAnswerTimeFull = true;
							// 		this.removeScore();
							// 	}
							// });
						}
					}
				}, 1000);
			},
			//获取当前时间戳转化为对应时间
			getCurrentTime: function() {
				let date = new Date();
				//分别获取时分秒
				let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				console.log(hour + ':' + minute + ':' + second);
				var currentTime = {
					hour: hour,
					minute: minute,
					second: second
				};
				//获取当前时间戳
				// var time = (new Date()).getTime();
				// console.log('time=='+time/1000);
				//返回当前时间
				return currentTime;
			},
			setCurrentTime: function(nowTime, index) {
				//index==0处理开始时间，为1处理结束时间,-1为清空
				if (index === 0) {
					this.startTime.hour = nowTime.hour;
					this.startTime.minute = nowTime.minute,
						this.startTime.second = nowTime.second;
				} else if (index === 1) {
					this.endIime.hour = nowTime.hour;
					this.endIime.minute = nowTime.minute;
					this.endIime.second = nowTime.second;
				} else if (index === -1) {
					this.startTime.hour = 0;
					this.startTime.minute = 0
					this.startTime.second = 0;
					this.endIime.hour = 0;
					this.endIime.minute = 0;
					this.endIime.second = 0;
				}
			},
			//获取开始时间到交卷时间的时间间隔
			getTimelag: function() {
				var lagTime = {
					hour: 0,
					minute: 0,
					second: 0
				};
				if (this.endIime.hour < this.startTime.hour) {
					this.endIime.hour += 24;
				}
				lagTime.hour = this.endIime.hour - this.startTime.hour;
				lagTime.minute = this.endIime.minute - this.startTime.minute;
				lagTime.second = this.endIime.second - this.startTime.second;
				if (lagTime.second < 0) {
					lagTime.second += 60;
					lagTime.minute -= 1;
				}
				if (lagTime.minute < 0) {
					lagTime.minute += 60;
					lagTime.hour -= 1;
				}
				if (lagTime.hour < 0) {
					console.log('time error');
				}
				var LagTime = {
					minute: 0,
					second: 0,
				}
				LagTime.minute = lagTime.hour * 60 + lagTime.minute;
				LagTime.second = lagTime.second;
				return LagTime;
			},
			//动态获取scrollview的高度
			getScrollHeight: function() {
				//初始是处理屏幕的高度
				let tempHeight = 800;
				let _self = this;
				uni.getSystemInfo({
					//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
					success: function(res) {
						tempHeight = res.windowHeight;
						//console.log("屏幕可用高度 " + JSON.stringify(res));
						//在组件内获取id，需要加in(this),此处使用—_self代替了this
						uni.createSelectorQuery().in(_self).select("#top-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							// console.log("屏幕数据 " + data);
							tempHeight -= data.height;
							// console.log("减掉顶部后的高度 " + tempHeight);
							uni.createSelectorQuery().in(_self).select("#foot-box").fields({
								size: true,
								scrollOffset: true
							}, (data) => {
								tempHeight -= data.height;
								//console.log("减掉底部后的高度 " + tempHeight);
								_self.modeCardHeight = tempHeight * 0.8 + 'px';
								_self.scrollHeight = tempHeight * 0.6 + 'px'
								//console.log("滑屏最后高度 " + _self.swiperHeight);
							}).exec();
						}).exec();
					},
					fail() {

					}
				});
			},
			//动态获取禁止点击的区域距离上边距高度
			getHideBtnTopHeight: function() {
				//初始处理屏幕的高度
				var tempHeight = 0;
				var _self = this;
				uni.getSystemInfo({
					//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
					success: function(res) {
						//在组件内获取id，需要加in(this),此处使用—_self代替了this
						//设置距离顶部高度
						uni.createSelectorQuery().in(_self).select("#top-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							// console.log("屏幕数据 " + data.height);
							tempHeight += data.height;
							if (_self.isShowAllAnswer && data.height != 0) {
								_self.dis = data.height;
							}
							if (data.height === 0) {
								tempHeight += _self.dis;
							}
							// console.log("减掉顶部后的高度 " + tempHeight);
							uni.createSelectorQuery().in(_self).select("#title-box").fields({
								size: true,
								scrollOffset: true
							}, (data) => {
								// console.log("屏幕数据 " + data.height);
								tempHeight += data.height;
								if (_self.isShowAllAnswer) {
									_self.topHeight = (tempHeight - 15) + 'px';
								} else {
									_self.topHeight = (tempHeight - 15) + 'px';
								}
								//console.log("得到的高度："+_self.topHeight);
							}).exec();
							uni.createSelectorQuery().in(_self).select("#question-box").fields({
								size: true,
								scrollOffset: true
							}, (data) => {
								// console.log(data.height);
								if (_self.isShowAllAnswer) {
									_self.hideBtnHeight = (data.height + 15) + 'px';
								} else {
									_self.hideBtnHeight = (data.height + 15) + 'px';
								}
								//console.log("得到的高度："+_self.hideBtnHeight);
							}).exec();
						}).exec();
						//设置隐藏按钮的高度

						// console.log(_self.clickSyn);
						if (_self.isShowAllAnswer) {
							setTimeout(function() {
								_self.clickSyn = true;
							}, 500);
						} else {
							setTimeout(function() {
								_self.clickSyn = true;
							}, 200);
						}

					},
					fail() {
						console.log("获取屏幕数据失败");
					}
				});
				this.coverSyn = true;

			},
			//设置页面的page
			setPageIndex: function(index, type) {
				let pageIndex = 0;
				for (let i = 0; i < this.allQuestions.length; i++) {
					if (this.allQuestions[i].QTypeID == type && this.allQuestions[i].QuestionOrder == index) {
						pageIndex = i;
						break;
					}
				}
				//转化成在allQuestion中的位置
				return pageIndex;
			},

			//接收下标,得到正确的题号和类型
			getCurrentQuesType: function(index) {
				//index为要跳转的题号
				let page = {
					type: "",
					pageIndex: 0,
				};
				page.type = this.allQuestions[index].QTypeID;
				page.pageIndex = this.allQuestions[index].QuestionOrder;
				return page;
			},
			//下一题
			next: function() {
				if (this.clickSyn) { //同步
					if (this.page_index < this.count - 1) {
						this.uAnsText = ''
						this.AnsText = ''
						this.scrollTop = -1;
						// console.log(this.page_index);
						let page = this.getCurrentQuesType((this.page_index + 1));
						// console.log(page);
						this.getQuesFromServer(page.pageIndex, page.type);
					}
				}
			},
			//上一题
			pre: function() {
				if (this.clickSyn) {
					if (this.page_index > 0) {
						this.uAnsText = ''
						this.AnsText = ''
						this.scrollTop = -1;
						let page = this.getCurrentQuesType(this.page_index - 1);
						this.getQuesFromServer(page.pageIndex, page.type);
					}
				}
			},
			//显示答题卡
			showCardModal: function(e) {
				// this.getQuesListFromServer();
				// console.log(this.allQuestions);
				this.modalCard = e.currentTarget.dataset.target;
			},
			//暂停按钮显示窗口
			holdTime: function() {
				this.showHoldTimeWindow = "showHoldWindow";
				this.storageScore();
			},
			//存储分数在本地
			storageScore: function() {
				uni.setStorage({
					key: 'Score',
					data: this.score
				})
			},
			//读取本地数据分数
			readScore: function() {
				uni.getStorage({
					key: 'Score',
					success: (res) => {
						this.score = res.data;
					}
				})

			},
			//移除本地存储
			removeScore: function() {
				uni.removeStorage({
					key: 'Score',
					success() {
						console.log('移除成功');
					}
				})
			},
			//隐藏窗口
			hideWindow: function() {
				this.showHoldTimeWindow = null;
				this.modalCard = null;
				this.showUpWindow = null;
				this.show = null;
				this.readScore();
			},
			//在时间窗口返回测试页
			returnExam: function() {
				uni.showModal({
					title: '提示',
					content: '保存后请在做题记录中继续答题，确定保存吗？',
					success: (res) => {
						if (res.confirm) {
							this.postReaminTime();
							uni.switchTab({
								url: '../../pages/index/index',
								success: (res) => {
									console.log("返回主页");
								},
								fail: (res) => {
									console.log(res);
								}
							})
						} else if (res.cancel) {

						}
					}
				})

			},
			//返回答题
			returnAnswer: function() {
				this.showHoldTimeWindow = null;
				this.modalCard = null;
				this.showUpWindow = null;
				this.readScore();
			},
			//在弹出窗口的确认交卷
			confimSend: function() {
				
				this.submitTest();

				//跳转到答题详情界面
				
			},
			//答题界面提交试卷弹框
			SendPaper: function() {
				// this.getQuesListFromServer();
				// let sum = 0;
				// //console.log(this.allQuestions);
				// for (let i = 0; i < this.allQuestions.length; i++) {
				// 	if (this.allQuestions[i].uIsTrue === null) {
				// 		sum = 1;
				// 		break;
				// 	}
				// }
				// if (sum !== 0  || this.testmodel == "K") {
				// 	this.showUpWindow = "showUpWindow";
				// } else {
				// 	//获取当前时间,并按照传参进行开始或者结束时间赋值
				// 	let nowTime = this.getCurrentTime();
				// 	this.setCurrentTime(nowTime, 1);
				// 	let lagTime = this.getTimelag();
				// 	let currentTime = JSON.stringify(lagTime);
				// 	//跳转到答题详情界面
				// }
				this.showUpWindow = "showUpWindow"
			},
			//滑动屏幕事件
			SwiperChange: function(el) {
				if (this.clickSyn) {
					//获取滑动当前的current属性
					var index = el.target.current;
					//console.log(index);
					if (index != undefined) {
						this.uAnsText = ''
						this.AnsText = ''
						this.scrollTop = -1;
						var page = this.getCurrentQuesType(index)
						//console.log(page);
						this.getQuesFromServer(page.pageIndex, page.type);
						//console.log(this.question);
						//this.isShowAnswer = (this.question.uIsDone != null) ? true : false;
						// this.getHideBtnTopHeight();
					}
				}
			},
			//单选选中
			RadioboxChange: function(e) {
				// if (this.question.uIsDone === "1" || this.isShowAllAnswer) {
				// 	return;
				// }
				if (this.showAllAnswer) {
					return;
				}
				//this.getHideBtnTopHeight();
				this.scrollTop = 100;
				let value = e.target.value;
				//console.log(value);
				this.question.uAnsText = value;
				this.uAnsText = value;
				this.question.uIsDone = "1";
				if(this.testmodel == 'L'){
					this.question.uIsTrue = (this.question.uAnsText === this.question.AnsText) ? "1" : "0";
				}
				//将答案记录下来，发送给服务器
				this.postQuesToServer();
				if (this.currentType === 5) {
					if (this.question.uIsTrue === "1") {
						this.score += parseInt(this.question.SubScore);
					}
				} else if (this.currentType === 1 || this.currentType === 2) {
					if (this.question.uIsTrue === "1") {
						this.score += parseInt(this.question.Score);
					}
				}
				// console.log(this.score);
				//this.getHideBtnTopHeight();
				//发送题目信息
			},
			//复选选中
			CheckboxChange: function(e) {
				// if (this.question.uIsDone === "1" || this.isShowAllAnswer) {
				// 	return;
				// }
				if (this.isShowAllAnswer) {
					return;
				}
				var items = ["A", "B", "C", "D", "E"];
				var values = e.target.value;
				//console.log(values)
				this.question.uAnsText = "";
				//this.question.uIsDone = true;
				for (var i = 0, lenI = 5; i < lenI; ++i) {
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						//某一个选项被选中
						if (items[i] === values[j]) {
							this.question.uAnsText += items[i];
							this.uAnsText += items[i];
							break
						}
					}
				}
				//console.log(this.question.uAnsText);
			},
			//填空题
			textInput: function(e) {
				// if (this.question.uIsDone === "1" || this.isShowAllAnswer) {
				// 	return;
				// }
				if (this.isShowAllAnswer) {
					return;
				}
				var value = e.detail.value;
				this.question.uAnsText = value;

			},
			//复选，简答确定
			confimAnswer: function(type) {
				if (this.showAllAnswer) {
					return;
				}
				this.scrollTop = 100;
				
				if(type == 'F'){//多选题确定
					if (this.question.uAnsText.trim() == "") {
						return;
					}else{
						if(this.testmodel == 'L'){
							this.question.uIsDone = "1";
							this.question.uIsTrue = (this.question.uAnsText.trim() === this.question.AnsText.trim()) ? "1" : "0";
						}else if(this.testmodel == 'K'){
							this.question.uIsDone = "1";
						}
						this.postQuesToServer();
					}
				}else if(type == 'J'){//简答题确定
					if(this.question.uAnsText.trim() == '' || this.question.uIsDone == '1') return
					this.question.uIsDone = "1";
					this.question.uIsTrue = "1"
					this.postQuesToServer()
				}
				
				// if (this.question.uAnsText.trim() == "") {
				// 	this.question.uIsTrue = "0";
				// } else {
				// 	this.question.uIsDone = "1";
				// 	this.question.uIsTrue = (this.question.uAnsText.trim() === this.question.AnsText.trim()) ? "1" : "0";
				// 	this.postQuesToServer();
				// }
				if (this.question.uIsTrue == "1") {
					this.score += parseInt(this.question.Score);
				}
				// console.log(this.score);
				//发送当前题目信息

				//this.getHideBtnTopHeight();
			},
			//在题目列表中题目跳转
			AppointedSubject: function(index, type) {
				//从服务器上获取题目
				if (this.clickSyn) {
					this.uAnsText = ''
					this.AnsText = ''
					this.modalCard = null; //不展示答题卡
					this.showUpWindow = null; //不展示交卷界面
					this.scrollTop = -1;
					this.getQuesFromServer(index, type);
					
					// this.getHideBtnTopHeight();
				}
			},
			
			//刷新checked
			isChecked: function(options){
				// console.log(options);
				if(this.uAnsText != null){
					// console.log(this.uAnsText)
					if(this.uAnsText.indexOf(options) > -1){
						// console.log('options true')
						return true
					}else{
						// console.log('options false')
						return false
					}
				}else{
					return false
				}
			}
		}
	}
</script>

<style lang="scss">
	@import url("../colorui/animation.css");

	.content {
		//border: 2px solid black;
		position: relative;
		height: 100%;
		margin: 0 35upx;

		.type {
			margin: 20upx 0;
			text-align: center;

			.answer_title {
				height: 50%;
				display: inline;
				text-align: center;
				font-size: 30rpx;
				margin: 0 20upx;
			}

			.time {
				display: inline;
				color: #F17E3F;
				text-align: center;
				align-items: center;
				font-size: 35rpx;
			}

		}
	}

	.windownBtn {
		display: flex;
		position: fixed;
		width: 85%;
		justify-content: center;
		//border: 2upx solid red;
		bottom: 18%;

		.leftBtn {
			background-color: #F17E3F;
			margin: auto 60rpx;
			// float: left;
			// left: 40upx;
		}

		.rightBtn {
			background-color: #F17E3F;
			margin: auto 60rpx;
			// float: right;
			// right: 40upx;
		}
	}

	.scroll_content {
		.quesTitle {
			margin-bottom: 50rpx;

			.textType {
				padding: 0 0 0 10rpx;
				font-size: 33rpx;
				color: #000000;
				font-weight: 600;
			}

			.textQues {
				padding: 0 5rpx;
				font-size: 32rpx;
			}

			.textSubQues {
				padding: 0 5rpx;
				font-size: 32rpx;
				margin: 60rpx 0 0 40rpx;
			}
		}
	}

	.red {
		color: red;
	}

	.tabbarPos {
		margin-bottom: 10rpx;
	}

	.btn {
		text-align: center;
		margin: 15rpx 0;

		.confirmAns {
			width: 200rpx;
			position: relative;
			align-items: center;
		}
	}

	.textQuesType {
		display: flex;
		left: 10rpx;
		font-weight: 600;
		margin-bottom: 20rpx 0;
	}

	.quesSituation {
		display: flex;
		flex-wrap: wrap;
		bottom: 17%;
		font-size: 100rpx;
		padding: 0 60upx;
		justify-content: space-around;

		.textShow {
			font-weight: 600;
			font-size: 30rpx;
		}
	}

	.reamainTime_content {
		position: relative;
		text-align: center;
		margin-top: 260rpx;

		.reaminTime_info {
			color: #F17E3F;
			font-size: 60rpx;
			font-weight: 600;
		}
	}

	.reaminTime_text {
		margin-top: 20rpx;

		.reaminTime_text_info {
			font-size: 40rpx;
			font-weight: 600;
		}
	}

	.hideBtn_content {
		position: absolute;
		width: 100%;
		z-index: 3;

		.hideBtn {
			width: 100%;
			height: 450rpx;
			opacity: 0.3;
			background-color: #C0C0C0;
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

	.cu-form-group .title2 {}

	.cu-form-group+.cu-form-group {
		border-top: none;
	}

	.cuform {
		position: relative;
		left: 50rpx;
	}

	.cuform>.title {
		position: relative;
		top: -50rpx;
		left: 70rpx;
		width: 600rpx;
	}

	.cu-bar-title {
		min-height: 50upx;
	}

	.cu-list.menu>.cu-item-error {
		justify-content: flex-start;
	}

	.rdisable {
		margin-top: 70rpx;
		border-radius: 5rpx 5rpx 5rpx 5rpx;
	}

	cover-view {
		z-index: 999;
	}
</style>
