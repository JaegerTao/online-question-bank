(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/exam/testResult/testResult"],{"0bf1":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.TestResult,(function(e,n){var r=t.__get_orig(e),a=t.qtypeToString(e.QTypeID);return{$orig:r,m0:a}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},o=[]},"282a":function(t,e,n){"use strict";n.r(e);var r=n("7aa9"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},"38d5":function(t,e,n){"use strict";(function(t){n("e5f5");r(n("66fd"));var e=r(n("bdb6"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"53b3":function(t,e,n){},"5c74":function(t,e,n){"use strict";var r=n("53b3"),a=n.n(r);a.a},"7aa9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("b41e"));function a(t){return t&&t.__esModule?t:{default:t}}function o(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=u(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return i=t.done,t},e:function(t){c=!0,o=t},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw o}}}}function u(t,e){if(t){if("string"===typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var c={data:function(){return{TestName:"",TestID:"",SubmitTime:"",TestResult:[],paperSumScore:0,mySumScore:0,cookie:""}},onLoad:function(e){this.TestName=e.TestName,this.TestID=e.TestID,this.cookie=t.getStorageSync("sessionid"),this.kcResult()},methods:{kcResult:function(){var e=this;t.request({url:r.default.DomainName+"/funcQuestion/Test/kcResult",method:"POST",data:{TestID:this.TestID},header:{"content-type":"application/x-www-form-urlencoded",cookie:this.cookie},success:function(t){if(t.data.length>0){e.SubmitTime=t.data[0].SubmitTime,e.TestResult=t.data,e.mySumScore=Number(t.data[0].Score);var n,r=o(t.data);try{for(r.s();!(n=r.n()).done;){var a=n.value;e.paperSumScore+=Number(a.QSumScore)}}catch(u){r.e(u)}finally{r.f()}}}})},qtypeToString:function(t){var e="";switch(t){case"D":e="单选题";break;case"F":e="多选题";break;case"P":e="判断题";break;case"Z":e="综合单选题";break}return e},NavBack:function(){t.navigateBack({delta:1})},NavBackHome:function(){t.navigateBack({delta:2})}}};e.default=c}).call(this,n("543d")["default"])},bdb6:function(t,e,n){"use strict";n.r(e);var r=n("0bf1"),a=n("282a");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("5c74");var u,i=n("f0c5"),c=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);e["default"]=c.exports}},[["38d5","common/runtime","common/vendor"]]]);