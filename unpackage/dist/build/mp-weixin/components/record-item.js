(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/record-item"],{"111b":function(e,t,a){"use strict";var n=a("41c1"),r=a.n(n);r.a},"15d8":function(e,t,a){"use strict";a.r(t);var n=a("30ba"),r=a("3748");for(var o in r)"default"!==o&&function(e){a.d(t,e,(function(){return r[e]}))}(o);a("111b");var s,i=a("f0c5"),u=Object(i["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);t["default"]=u.exports},"30ba":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return n}));var r=function(){var e=this,t=e.$createElement;e._self._c},o=[]},3748:function(e,t,a){"use strict";a.r(t);var n=a("f6a5"),r=a.n(n);for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);t["default"]=r.a},"41c1":function(e,t,a){},f6a5:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("b41e"));function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var a;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=s(e))||t&&e&&"number"===typeof e.length){a&&(e=a);var n=0,r=function(){};return{s:r,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,u=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return i=e.done,e},e:function(e){u=!0,o=e},f:function(){try{i||null==a.return||a.return()}finally{if(u)throw o}}}}function s(e,t){if(e){if("string"===typeof e)return i(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?i(e,t):void 0}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var u={data:function(){return{paperDetails:{TestID:"",TestName:"",Duration:"",QCount:0,QSumScore:0,Q_Types:"",Q_TypeCounts:[]}}},props:{testid:{type:String,default:""},title:{type:String,default:""},subdate:{type:String,default:""},qsum:{type:String,default:"0"},qcrtnum:{type:String,default:"0"},issubmit:{type:String,default:"1"},isrecord:{type:Boolean,default:!0}},methods:{goQDetails:function(){var t=this;this.paperDetails.TestID=this.testid,e.request({url:n.default.DomainName+"/funcQuestion/Test/getTestInfo",method:"POST",data:{TestID:this.paperDetails.TestID,type:1,TestModel:"L"},header:{"content-type":"application/x-www-form-urlencoded",cookie:e.getStorageSync("sessionid")},success:function(a){if("失败"==a.data.msg);else{t.paperDetails.TestName=a.data[0].TestName,t.paperDetails.Duration=a.data[0].Duration;var n="";t.paperDetails.Q_TypeCounts=[];var r,s=o(a.data);try{for(s.s();!(r=s.n()).done;){var i=r.value;t.paperDetails.QCount+=Number(i.QCount),t.paperDetails.QSumScore+=Number(i.QSumScore),n=n+i.QTypeID+"_";var u={QTypeOrder:"",QCount:"",QTypeID:""};u.QTypeOrder=i.QTypeOrder,u.QCount=i.QCount,u.QTypeID=i.QTypeID,t.paperDetails.Q_TypeCounts.push(u)}}catch(c){s.e(c)}finally{s.f()}var l=n.length;t.paperDetails.Q_Types=n.substr(0,l-1);var p=n.substr(0,1);console.log(t.paperDetails),e.navigateTo({url:"../exam/exam?TestModel=L&paperDetails="+encodeURIComponent(JSON.stringify(t.paperDetails))+"&showAllAnswer="+!0+"&type="+p+"&index=1"})}}})},goExam:function(){var t=this;console.log("click"),this.paperDetails.TestID=this.testid,e.showModal({title:"提醒",content:"重新测试将会消耗一次练习机会，是否继续？",success:function(a){a.confirm?e.request({url:n.default.DomainName+"/funcQuestion/Test/start",method:"POST",data:{TestID:t.paperDetails.TestID,TestModel:"L"},header:{"content-type":"application/x-www-form-urlencoded",cookie:e.getStorageSync("sessionid")},success:function(a){if("失败"==a.data.msg)e.showModal({title:"提示",content:"您的该套试卷练习次数已用完，请联系班主任通过续费购买在线练题次数",showCancel:!1,success:function(e){e.confirm&&console.log("不进入exam")}});else{t.paperDetails.TestName=a.data[0].TestName,t.paperDetails.Duration=a.data[0].Duration;var n="";t.paperDetails.Q_TypeCounts=[];var r,s=o(a.data);try{for(s.s();!(r=s.n()).done;){var i=r.value;t.paperDetails.QCount+=Number(i.QCount),t.paperDetails.QSumScore+=Number(i.QSumScore),n=n+i.QTypeID+"_";var u={QTypeOrder:"",QCount:"",QTypeID:""};u.QTypeOrder=i.QTypeOrder,u.QCount=i.QCount,u.QTypeID=i.QTypeID,t.paperDetails.Q_TypeCounts.push(u)}}catch(p){s.e(p)}finally{s.f()}var l=n.length;t.paperDetails.Q_Types=n.substr(0,l-1),console.log(t.paperDetails),e.reLaunch({url:"../exam/exam?TestModel=L&paperDetails="+encodeURIComponent(JSON.stringify(t.paperDetails))})}}}):a.cancel&&console.log("取消重新测试")}})},goExamContinue:function(){var t=this;this.paperDetails.TestID=this.testid,e.request({url:n.default.DomainName+"/funcQuestion/Test/getTestInfo",method:"POST",data:{TestID:this.paperDetails.TestID,type:0,TestModel:"L"},header:{"content-type":"application/x-www-form-urlencoded",cookie:e.getStorageSync("sessionid")},success:function(a){if("失败"==a.data.msg)e.showModal({title:"提示",content:"您的该套试卷正在练习当中",showCancel:!1,success:function(e){e.confirm&&console.log("不进入exam")}});else{t.paperDetails.TestName=a.data[0].TestName,t.paperDetails.Duration=a.data[0].Duration;var n="";t.paperDetails.Q_TypeCounts=[];var r,s=o(a.data);try{for(s.s();!(r=s.n()).done;){var i=r.value;t.paperDetails.QCount+=Number(i.QCount),t.paperDetails.QSumScore+=Number(i.QSumScore),n=n+i.QTypeID+"_";var u={QTypeOrder:"",QCount:"",QTypeID:""};u.QTypeOrder=i.QTypeOrder,u.QCount=i.QCount,u.QTypeID=i.QTypeID,t.paperDetails.Q_TypeCounts.push(u)}}catch(p){s.e(p)}finally{s.f()}var l=n.length;t.paperDetails.Q_Types=n.substr(0,l-1),console.log(t.paperDetails),e.reLaunch({url:"../exam/exam?TestModel=L&paperDetails="+encodeURIComponent(JSON.stringify(t.paperDetails))})}}})}}};t.default=u}).call(this,a("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/record-item-create-component',
    {
        'components/record-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("15d8"))
        })
    },
    [['components/record-item-create-component']]
]);