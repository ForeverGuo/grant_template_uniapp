<template>
	<div>
		<web-view :src="url" @message="handleViewMess"></web-view>
	</div>
</template>
<script>
	import { wx_cid, userInfo } from '@/config/commonStore.js'
	import {
		getLocation
	} from '@/utils/util.js'
	export default {
		name: "webview",
		data() {
			return {
				url: '',
				share: {
					title: '健康160',
					path: '/page/webview/index',
					imageUrl: '',
					desc: '',
					content: '',
				},
				locationMap: {}
			}
		},
		methods: {
			handleViewMess(event) {
				console.log('分享信息：------------', event);
        // TODO: 这个地方第一版代码逻辑有重大隐患，后续如果需要扩展需要重构数据结构
				if (event && event.detail && event.detail.data) {
					const dataArr = event.detail.data
					let shareItem = null
					for(let i = dataArr.length - 1; i >= 0; i--) {
						const item = dataArr[i]
						if(item.url && item.title) {
							shareItem = item
							break
						}
					}
					// const item = event.detail.data[event.detail.data.length - 1];
					console.log('shareItem:', shareItem)
					if(shareItem) {
						const {
							title,
							imgUrl = '',
							link,
							desc
						} = shareItem;
						this.share.title = title || '';
						this.share.desc = desc || '';
						this.share.imageUrl = imgUrl
						this.share.path = `/page/index/index?jumpWebview=${encodeURIComponent(link)}`
					}
				}
			},
			dealwithShareParams(item) {
				if(!item || !item.link) {
					return
				}
				console.log(item)
				const {
				  title,
				  imgUrl,
				  link,
				  desc
				} = item;
				this.share.title = desc ? desc : '';
				this.share.desc = desc ? desc : '';
				this.share.imageUrl = imgUrl
				this.share.path = `/page/index/index?jumpWebview=${encodeURIComponent(link)}`
			},
			resetUrl(url) {
				const cid = wx_cid;
				let newUrl = url.split("&");
				let w_url = '';
				newUrl.forEach((curr, index) => {
					if (index == 0) {
						if (curr.includes("?")) {
							w_url = `${curr}`;
						} else {
							w_url = `${curr}?`;
						}
					} else {
						if (curr.includes("user_key")) {
							w_url = `${w_url}&user_key=${userInfo.user_key}`
						} else if (curr.includes("cid")) {
							w_url = `${w_url}&cid=${cid}`
						} else {
							w_url = `${w_url}&${curr}`
						}
					}
				})
				if (!w_url.includes("user_key")) {
					w_url = `${w_url}&f=1&user_key=${userInfo.user_key}`
				}

				if (!w_url.includes("cid")) {
					w_url = `${w_url}&cid=${cid}`
				}

				if (!w_url.includes('lat') && !w_url.includes('lng')) {
					w_url = `${w_url}&lat=${this.locationMap.latitude || 0}&lng=${this.locationMap.longitude || 0}`
				}

				if (!w_url.includes('from')) {
					w_url = `${w_url}&from=guahao`
				}

				if(this.needAppendScTrack(w_url)) {
					w_url = `${w_url}&sc_track=${encodeURIComponent(JSON.stringify(getPackTrackDataToH5()))}`
				}
				return w_url;
			},
			// 根据页面维度判断是否需要将路径传递给h5
			needAppendScTrack(url) {
				// https://weixin.91160.com/h5/shop/health/product.html
				// https://weixin.91160.com/h5/smart/diycms/index.html
				if(url.indexOf('/h5/shop/health/product.html') > -1 || url.indexOf('/h5/smart/diycms/index.html') > -1 ) {
					return true
				}
				return false
			}
		},
		async onLoad(val) {
			// 有的H5页面进去不显示title
			uni.setNavigationBarTitle({
				title: ''
			})
			//动态获取的url
			const redirectURL = `/page/webview/index?url=${val.url}`
			this.share.path = `/page/index/index?redirectURL=${encodeURIComponent(redirectURL)}`
			this.locationMap = await getLocation();
			let url = JSON.parse(decodeURIComponent(val.url));
			// 对url参数进行重置
			url = this.resetUrl(url);
			console.log(url, "webview 跳转的url");
			this.url = url;
		}
	}
</script>
<style lang="scss" scoped>
</style>
