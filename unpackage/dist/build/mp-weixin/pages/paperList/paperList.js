(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/paperList/paperList"],{3046:function(e,t,n){"use strict";n.r(t);var a=n("bbe2"),i=n("4f5d");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("b55f");var r,u=n("f0c5"),s=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);t["default"]=s.exports},"4f5d":function(e,t,n){"use strict";n.r(t);var a=n("6492"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},6492:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("b41e"));function i(e){return e&&e.__esModule?e:{default:e}}var o={data:function(){return{activeNames:"",paperListData:[],classChange:["bg-orange","bg-green","bg-red","bg-blue"],paperItemTransInfo:{},isnodata:!1,cookie:""}},components:{},onLoad:function(){var t=this;this.cookie=e.getStorageSync("sessionid"),e.showLoading({title:"加载中..."}),e.request({url:a.default.DomainName+"/funcQuestion/TestType/getUserType",header:{cookie:this.cookie},success:function(e){e.data.length>0?(t.activeNames=e.data[0].vipnos[0],t.paperListData=e.data):t.isnodata=!0},fail:function(e){console.log(e),t.isnodata=!0},complete:function(t){e.hideLoading()}})},methods:{onChange:function(e){this.activeNames=e.detail},goPaperListItem:function(t,n,a,i){if(this.paperItemTransInfo.vipNo=t,null==i){var o=n+"·"+a;this.paperItemTransInfo.paperItemName=o.trim()}else{var r=n+"·"+a+"·"+i;this.paperItemTransInfo.paperItemName=r.trim()}e.navigateTo({url:"../paperListItem/paperListItem?paperitem="+encodeURIComponent(JSON.stringify(this.paperItemTransInfo))})}}};t.default=o}).call(this,n("543d")["default"])},"887c":function(e,t,n){"use strict";(function(e){n("e5f5");a(n("66fd"));var t=a(n("3046"));function a(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},b55f:function(e,t,n){"use strict";var a=n("b611"),i=n.n(a);i.a},b611:function(e,t,n){},bbe2:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}));var i=function(){var e=this,t=e.$createElement;e._self._c},o=[]}},[["887c","common/runtime","common/vendor"]]]);