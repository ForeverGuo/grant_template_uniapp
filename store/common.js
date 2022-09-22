/*
	注意:
	uniapp 内置 pinia 是 vuex的升级版本
	后面使用 pinia 进行存储
	官网地址：https://pinia.web3doc.top/
*/

import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
	state: () => {
		return {
			isLogin: '',
			cityId: 5,
			userInfo: {
				user_key: '',
				user_id: '',
				person_token: '',
				open_id: ''
			},
			// #ifdef MP-WEIXIN
			wx_cid: 100012084,
			wx_appid: 'wx41d50f4960b90df8',
			tencent_map_key: 'TVWBZ-6CU65-APVIE-QM3YS-3H3Y5-GEBD5',
			channel_name: 'mini小程序',  // 频道名称 
			// #endif
		}
	},
	getters: {
		getUserInfo: (state) => state.userInfo
	},
	actions: {
		
	},
})
