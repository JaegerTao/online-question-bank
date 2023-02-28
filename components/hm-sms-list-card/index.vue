<template>
	<div class="hm-sms-list-card">
		<div class="box">
			<!-- <image class="xueshengdangan" :src="options.xueshengdangan" /> -->
			<image class="primary" :src="primary" />
			<div class="sub">
				<div class="outer">
					<div class="wrap">
						<text class="paybak">{{ Type }}</text>
						<text class="company"></text>
					</div>
					<text class="txt">{{ NoticeTime }}</text>
				</div>
				<div class="block">
					<text class="desc">{{ Content }}</text>
				</div>
			</div>
			<!-- <image class="side" :src="options.side" /> -->
		</div>
	</div>
</template>
<script>
	export default {
		name: 'HmSmsListCard',
		props: {
			dataId: {
				type: String,
				default: 'card'
			},
			Content: {
				type: String,
				default: ''
			},
			IsRead: {
				type: String,
				default: ''
			},
			NoticeTime:{
				type: String,
				default: ''
			},
			Type:{
				type: String,
				default: ''
			},
			primary: '/static/logo-b.png',
			// options: {
			// 	type: Object,
			// 	default: function() {
			// 		return {
			// 			// xueshengdangan: '/static/hm-sms-list-card/images/img_25832_0_1.png',
			// 			xueshengdangan: '',
			// 			primary: '/static/logo-b.png',
			// 			paybak: '系统通知',
			// 			company: '',
			// 			txt: '03-30',
			// 			desc: '亲爱的用户，您的会员剩余3天到期，请尽快充值。亲爱的用户，您的会员剩余3天到期，请尽快充值。',
			// 			side: '/static/hm-sms-list-card/images/img_25832_0_0.png'
			// 		};
			// 	}
			// }
		},
		data() {
			return {};
		},
		methods: {}
	};
</script>
<style>
	@import './index.response.css';
</style>
