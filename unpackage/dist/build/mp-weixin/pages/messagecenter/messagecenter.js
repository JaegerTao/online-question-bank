(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/messagecenter/messagecenter"],{"0aa0":function(e,t,n){"use strict";(function(e){n("e5f5");o(n("66fd"));var t=o(n("0f59"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"0f59":function(e,t,n){"use strict";n.r(t);var o=n("8247"),s=n("3e31");for(var a in s)"default"!==a&&function(e){n.d(t,e,(function(){return s[e]}))}(a);n("9da2");var r,i=n("f0c5"),u=Object(i["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=u.exports},"3e31":function(e,t,n){"use strict";n.r(t);var o=n("98b5"),s=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=s.a},"5cd3":function(e,t,n){},8247:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var s=function(){var e=this,t=e.$createElement;e._self._c},a=[]},"98b5":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=s(n("b41e"));function s(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=r(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var o=0,s=function(){};return{s:s,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,u=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){u=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(u)throw a}}}}function r(e,t){if(e){if("string"===typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var u=function(){n.e("components/message-list-item").then(function(){return resolve(n("5ef6"))}.bind(null,n)).catch(n.oe)},c={data:function(){return{nomessage:!1,messageList:[],currenrPage:1,messageCount:0,messageNotread:0,cookie:""}},components:{messageListItem:u},onLoad:function(){this.cookie=e.getStorageSync("sessionid"),this.getInfos(),this.AllRead()},onShow:function(){},methods:{getInfos:function(){var t=this;e.showLoading({title:"加载中..."}),e.request({url:o.default.DomainName+"/funcQuestion/TestMessage/getInfos",method:"POST",data:{page:this.currenrPage,PageSize:12},dataType:"json",header:{"content-type":"application/x-www-form-urlencoded",cookie:this.cookie},success:function(n){if(console.log(n),n.data.data.length>0){t.messageCount+=n.data.data.length;var o,s=a(n.data.data);try{for(s.s();!(o=s.n()).done;){var r=o.value;t.messageList.unshift(r),"0"==r.IsRead&&(t.messageNotread+=1)}}catch(u){s.e(u)}finally{s.f()}console.log(t.messageList)}else if(1==t.currenrPage)t.nomessage=!0;else{var i=t.currenrPage;t.currenrPage=i-1,e.showToast({title:"暂无更多消息",icon:"none"})}},fail:function(){e.showToast({title:"请检查网络",icon:"none"})},complete:function(){e.hideLoading()}})},MessageDel:function(){var t=this;e.showModal({title:"提示",content:"将要清除系统中的全部消息，是否继续？",success:function(n){n.confirm?e.request({url:o.default.DomainName+"/funcQuestion/TestMessage/MessageDel",header:{cookie:t.cookie},success:function(n){"成功"==n.data.msg?(e.showToast({title:"清除成功"}),t.messageList=[],t.messageCount=0,t.nomessage=!0):e.showToast({title:"清除失败",icon:"none"})}}):n.cancel&&console.log("取消清除全部消息")}})},AllRead:function(){e.request({url:o.default.DomainName+"/funcQuestion/TestMessage/AllRead",header:{cookie:this.cookie},success:function(e){console.log(e.data)}})},DelThis:function(t){var n=this;console.log("delthis"),e.request({url:o.default.DomainName+"/funcQuestion/TestMessage/DelThis",header:{cookie:this.cookie},data:{delId:t},success:function(o){if("成功"==o.data.msg){console.log("refmsglist");for(var s=0;s<n.messageList.length;s++)n.messageList[s].IdNo==t&&(n.messageList.splice(s,1),n.messageCount-=1);0==n.messageCount&&(n.nomessage=!0),e.showToast({title:"删除成功"})}else e.showToast({title:"删除失败"})}})},ReadThis:function(){var t=this;e.request({url:o.default.DomainName+"/funcQuestion/TestMessage/ReadThis",header:{cookie:this.cookie},data:{IdNo:idno},success:function(e){"成功"==e.data.msg&&(t.messageNotread-=1)}})},getMoreMessage:function(){var e=this.currenrPage;this.currenrPage=e+1,this.getInfos()}}};t.default=c}).call(this,n("543d")["default"])},"9da2":function(e,t,n){"use strict";var o=n("5cd3"),s=n.n(o);s.a}},[["0aa0","common/runtime","common/vendor"]]]);