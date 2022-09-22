<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "vk-uview-ui/index.scss";
	@import "/wxcomponents/vant/dist/common/index.wxss";
	@import '@/common/css/common.scss';
</style>
