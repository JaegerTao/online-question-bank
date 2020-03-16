<script>
	global.isLogin = function(){
		try{
			var suid = uni.getStorageSync('suid');
			var srand = uni.getStorageSync('srand');
		}catch(e){
			//TODO handle the exception
		}
		if(suid === '' || srand === ''){
			return false;
		}else{
			return{
				suid
			}
		}
	};
	export default {
		// globalData:{
		// 	isLogin: null,//全局变量，用于记录登录状态
		// },
		onLaunch: function() {
			console.log('App Launch');
			// try{
			// 	var suid  = uni.getStorageSync('suid');
			// 	var srand = uni.getStorageSync('srand');
			// }catch(e){
			// 	//TODO handle the exception
			// }
			// if(suid == '' || srand == ''){
			//   this.$scope.globalData.isLogin = false;
			//  }else{
			//   this.$scope.globalData.isLogin = [suid, srand];
			// }
			// // console.log(this.$scope.globalData.isLogin)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/uni.css");
	@import url("./colorui/main.css");
	@import url("./colorui/icon.css");
	page {
	    background-color: #FFFFFF;
	    height: 100%;
	    font-size: 28upx;
	    line-height: 1.8;
	}
</style>
