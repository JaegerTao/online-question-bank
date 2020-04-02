(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/question-options"],{

/***/ 92:
/*!******************************************************************************************************!*\
  !*** C:/Users/14305/Documents/HBuilderProjects/online-question-bank/components/question-options.vue ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _question_options_vue_vue_type_template_id_481de7ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./question-options.vue?vue&type=template&id=481de7ea& */ 93);
/* harmony import */ var _question_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./question-options.vue?vue&type=script&lang=js& */ 95);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _question_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _question_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _question_options_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./question-options.vue?vue&type=style&index=0&lang=scss& */ 97);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _question_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _question_options_vue_vue_type_template_id_481de7ea___WEBPACK_IMPORTED_MODULE_0__["render"],
  _question_options_vue_vue_type_template_id_481de7ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _question_options_vue_vue_type_template_id_481de7ea___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

/* hot reload */
if (false) { var api; }
component.options.__file = "C:/Users/14305/Documents/HBuilderProjects/online-question-bank/components/question-options.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 93:
/*!*************************************************************************************************************************************!*\
  !*** C:/Users/14305/Documents/HBuilderProjects/online-question-bank/components/question-options.vue?vue&type=template&id=481de7ea& ***!
  \*************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_template_id_481de7ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./question-options.vue?vue&type=template&id=481de7ea& */ 94);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_template_id_481de7ea___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_template_id_481de7ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_template_id_481de7ea___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_template_id_481de7ea___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 94:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/14305/Documents/HBuilderProjects/online-question-bank/components/question-options.vue?vue&type=template&id=481de7ea& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l3 = _vm.__map(_vm.questionData, function(item, index) {
    var l0 = _vm.__map(_vm.question.optionList, function(option, index) {
      var g0 = _vm.question.userAnswer.indexOf(option.id)
      return {
        $orig: _vm.__get_orig(option),
        g0: g0
      }
    })

    var l1 = _vm.__map(_vm.question.optionList, function(option, index) {
      var g1 = _vm.question.userAnswer.indexOf(option.id)
      var g2 = _vm.question.userAnswer.indexOf(option.id)
      return {
        $orig: _vm.__get_orig(option),
        g1: g1,
        g2: g2
      }
    })

    var l2 = _vm.__map(_vm.question.optionList, function(option, index) {
      var g3 = _vm.question.userAnswer.indexOf(option.id)
      return {
        $orig: _vm.__get_orig(option),
        g3: g3
      }
    })

    return {
      $orig: _vm.__get_orig(item),
      l0: l0,
      l1: l1,
      l2: l2
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l3: l3
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 95:
/*!*******************************************************************************************************************************!*\
  !*** C:/Users/14305/Documents/HBuilderProjects/online-question-bank/components/question-options.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./question-options.vue?vue&type=script&lang=js& */ 96);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 96:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/14305/Documents/HBuilderProjects/online-question-bank/components/question-options.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      question: {},
      questionData: {},
      score: 0, //玩家的得分
      page_index: 0, //当前题号
      count: 0, //题目数量
      currentType: 0, //代表样式的数字
      modalCard: null, //显示答题卡
      swiperHeight: '460px', //答题卡界面高度,以及弹窗高度
      isNextQues: false, //是否自动下一题
      showUpWindow: null, //显示提示窗口（未答题完）
      showMaterial: null, //显示综合题材料窗口
      isShowAnswer: false,
      Value: 0, //题库的第几套题目列表
      //开始时间
      startTime: {
        hour: 0,
        minute: 0,
        second: 0 },

      //结束时间
      endIime: {
        hour: 0,
        minute: 0,
        second: 0 } };


  },
  onLoad: function onLoad() {

  },
  onReady: function onReady() {
    //初始清空时间列表
    this.setCurrentTime({}, -1);
    //获取当前时间,并按照传参进行开始或者结束时间赋值
    var nowTime = this.getCurrentTime();
    this.setCurrentTime(nowTime, 0);
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
  props: {
    bankQues: {},
    value: 0,
    showAnswer: false,
    index: 0 },

  methods: {
    //获取当前时间戳转化为对应时间
    getCurrentTime: function getCurrentTime() {
      var date = new Date();
      //分别获取时分秒
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      console.log(hour + ':' + minute + ':' + second);
      var currentTime = {
        hour: hour,
        minute: minute,
        second: second };

      //获取当前时间戳
      // var time = (new Date()).getTime();
      // console.log('time=='+time/1000);
      //返回当前时间
      return currentTime;
    },
    setCurrentTime: function setCurrentTime(nowTime, index) {
      //index==0处理开始时间，为1处理结束时间,-1为清空
      if (index === 0) {
        this.startTime.hour = nowTime.hour;
        this.startTime.minute = nowTime.minute,
        this.startTime.second = nowTime.second;
      } else
      if (index === 1) {
        this.endIime.hour = nowTime.hour;
        this.endIime.minute = nowTime.minute;
        this.endIime.second = nowTime.second;
      } else
      if (index === -1) {
        this.startTime.hour = 0;
        this.startTime.minute = 0;
        this.startTime.second = 0;
        this.endIime.hour = 0;
        this.endIime.minute = 0;
        this.endIime.second = 0;
      }
    },
    //获取开始时间到交卷时间的时间间隔
    getTimelag: function getTimelag() {
      var lagTime = {
        hour: 0,
        minute: 0,
        second: 0 };

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
      return lagTime;
    },
    //动态获取scrollview的高度
    getScrollHeight: function getScrollHeight() {
      //初始是处理屏幕的高度
      var tempHeight = 800;
      var _self = this;
      uni.getSystemInfo({
        //获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
        success: function success(res) {
          tempHeight = res.windowHeight;
          console.log("屏幕可用高度 " + JSON.stringify(res));
          //在组件内获取id，需要加in(this),此处使用—_self代替了this
          uni.createSelectorQuery().in(_self).select("#top-box").fields({
            size: true,
            scrollOffset: true },
          function (data) {
            //console.log("屏幕数据 " + data);
            tempHeight -= data.height;
            //console.log("减掉顶部后的高度 " + tempHeight);
            uni.createSelectorQuery().in(_self).select("#foot-box").fields({
              size: true,
              scrollOffset: true },
            function (data) {
              tempHeight -= data.height;
              //console.log("减掉底部后的高度 " + tempHeight);
              _self.swiperHeight = tempHeight + 'px';
              //console.log("滑屏最后高度 " + _self.swiperHeight);
            }).exec();
          }).exec();
        },
        fail: function fail() {

        } });

    },
    //自动跳转下一题
    nextQues: function nextQues() {var _this = this;
      if (this.isNextQues) {
        setInterval(function () {
          if (_this.page_index < _this.count - 1 && _this.isNextQues === true) {
            _this.page_index++;
            _this.question = _this.questionData[_this.page_index];
            _this.currentType = _this.question.type;
            _this.userFavor = _this.question.userFavor;
            _this.isNextQues = false;
          }
        }, 500);
      }
    },
    //下一题
    next: function next() {
      if (this.page_index < this.count - 1) {
        this.page_index++;
        this.question = this.questionData[this.page_index];
        this.currentType = this.question.type;
      }
    },
    //上一题
    pre: function pre() {
      if (this.page_index > 0) {
        this.page_index--;
        this.question = this.questionData[this.page_index];
        this.currentType = this.question.type;
      }
    },
    //显示答题卡
    showCardModal: function showCardModal(e) {
      this.modalCard = e.currentTarget.dataset.target;
    },
    //隐藏答题卡
    hideCardModal: function hideCardModal() {
      this.modalCard = null;
    },
    //返回答题
    returnAnswer: function returnAnswer() {
      this.showUpWindow = null;
    },
    //在弹出窗口的确认交卷
    confimSend: function confimSend() {
      //获取当前时间,并按照传参进行开始或者结束时间赋值
      var nowTime = this.getCurrentTime();
      this.setCurrentTime(nowTime, 1);
      var lagTime = this.getTimelag();
      var currentTime = JSON.stringify(lagTime);
      console.log('time=' + JSON.stringify(lagTime));
      //跳转到答题详情界面
      var questionData = JSON.stringify(this.questionData);
      uni.navigateTo({
        url: "./questionDetails/questionDetails?questionData=" + questionData + '&value=' + this.Value + '&time=' + currentTime,
        success: function success(res) {
          console.log('success');
        },
        fail: function fail(res) {
          console.log(res);
        } });

      //this.showUpWindow = null;
    },
    //隐藏交卷窗口
    hideUpWindow: function hideUpWindow() {
      this.showUpWindow = null;
      this.showAllUpWindow = null;
      this.showMaterial = null;
    },
    //答题界面提交试卷
    SendPaper: function SendPaper() {
      var sum = 0;
      for (var i = 0; i < this.questionData.length; i++) {
        console.log(this.questionData[i].userAnswer);
        if (this.questionData[i].userAnswer.length === 0) {
          sum = 1;
          break;
        }
      }
      if (sum !== 0) {
        this.showUpWindow = "showUpWindow";
      } else
      {
        //获取当前时间,并按照传参进行开始或者结束时间赋值
        var nowTime = this.getCurrentTime();
        this.setCurrentTime(nowTime, 1);
        var lagTime = this.getTimelag();
        var currentTime = JSON.stringify(lagTime);
        var questionData = JSON.stringify(this.questionData);
        uni.navigateTo({
          url: "./questionDetails/questionDetails?questionData=" + questionData + '&value=' + this.Value + '&time=' + currentTime,
          success: function success(res) {
            console.log('success');
          } });

      }
    },
    //滑动屏幕事件
    SwiperChange: function SwiperChange(el) {
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
    RadioboxChange: function RadioboxChange(e) {

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
    CheckboxChange: function CheckboxChange(e) {
      var items = this.questionData[this.page_index].optionList;
      var values = e.detail.value;
      this.questionData[this.page_index].userAnswer = "";
      for (var i = 0, lenI = items.length; i < lenI; ++i) {
        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          //某一个选项被选中
          if (items[i].id == values[j]) {
            this.questionData[this.page_index].userAnswer += items[i].id;
            break;
          }
        }
      }
      this.questionData[this.page_index].userFavor = true;
    },
    //填空题
    textInput: function textInput(e) {
      this.questionData[this.page_index].userAnswer = e.detail.value;
      this.questionData[this.page_index].userFavor = true;
    },
    //在题目列表中题目跳转
    AppointedSubject: function AppointedSubject(index) {
      this.page_index = index;
      this.question = this.questionData[this.page_index];
      this.currentType = this.question.type;
      this.userFavor = this.question.userFavor;
      this.modalCard = null; //不展示答题卡
      this.showUpWindow = null; //不展示交卷界面
    },
    //再次答题
    againAnswer: function againAnswer() {
      this.showAllUpWindow = null;
      this.page_index = 0;
      this.question = this.questionData[this.page_index];
      this.currentType = this.question.type;
      for (var i = 0; i < this.questionData.length; i++) {
        this.questionData[i].userFavor = false;
        this.questionData[i].userAnswer = "";
      }
    },
    //展示综合题材料
    ShowMaterial: function ShowMaterial() {
      this.showMaterial = "showMaterial";
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 97:
/*!****************************************************************************************************************************************!*\
  !*** C:/Users/14305/Documents/HBuilderProjects/online-question-bank/components/question-options.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./question-options.vue?vue&type=style&index=0&lang=scss& */ 98);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_question_options_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 98:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/14305/Documents/HBuilderProjects/online-question-bank/components/question-options.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/question-options.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/question-options-create-component',
    {
        'components/question-options-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(92))
        })
    },
    [['components/question-options-create-component']]
]);
