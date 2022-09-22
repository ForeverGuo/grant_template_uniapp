import { useCommonStore } from '@/store/common.js'
import { storeToRefs } from 'pinia'
const commonStore = useCommonStore()
const { wx_cid, userInfo, tencent_map_key, wx_appid, channel_name } = storeToRefs(commonStore)

export {
	wx_cid,
	userInfo,
	tencent_map_key,
	wx_appid,
	channel_name
}