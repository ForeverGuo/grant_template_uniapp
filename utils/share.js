export default {
	data() {
		return {
			//设置默认的分享参数
			share: {
				title: '健康看病就医 就选健康160',
				path: '/page/index/index',
				imageUrl: '',
				desc: '',
				content: ''
			}
		}
	},
	onShareAppMessage(res) {
		uni.removeStorageSync('redirectURL')
		if(this.share.title.length > 15) {
			this.share.title = this.share.title.slice(0,14) + '...'
		}
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			desc: this.share.desc,
			content: this.share.content,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			}
		}
	}
}
