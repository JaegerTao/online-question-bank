// 云函数入口文件
const cloud = require('wx-server-sdk')

const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
	// const wxContext = cloud.getWXContext()

	// return {
	//   event,
	//   openid: wxContext.OPENID,
	//   appid: wxContext.APPID,
	//   unionid: wxContext.UNIONID,
	// }
	let url = 'http://wzdq123.com/';
	return await rp(url).then(function(res) {
		return res
	}).catch(function(err) {
		return err
	});
}
