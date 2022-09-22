<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
<!-- 		<van-button type="warning">vant 按钮</van-button>
		<u-button type="success" class="mt10">uk-uview</u-button> -->
	</view>
</template>

<script>
	import {
		common
	} from '@/services/index.js'
	import {
		reactive,
		toRefs,
		onMounted,
		ref
	} from 'vue'
	import { useCommonStore } from '@/store/common.js'
	export default {
		setup() {
			const data = reactive({
				title: 'Hello vue3',
				type: "warning",
				value: 100
			})
			onMounted(() => {
				const common = useCommonStore()
				console.log(common)
				getDisease()
			})
			const getDisease = () => {
					console.log('请求接口数据....')
			}
			const bindClick = () => {
				uni.navigateTo({
					url: '/page/webview/index?url=' + encodeURIComponent(JSON.stringify('https://weixin.91160.com/h5/shop/shop/index.html?id=629'))
				})
			}
			return {
				...toRefs(data),
				bindClick,
				getDisease
			}
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 500rpx 0
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
