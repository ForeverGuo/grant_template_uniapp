
import { createSSRApp } from 'vue'
import App from './App.vue'

import * as Pinia from 'pinia';
import uView from 'vk-uview-ui'
import share from '@/utils/share.js'
	
export function createApp() {
	const app = createSSRApp(App);
	
	app
		.use(uView)
		.use(Pinia.createPinia())
		.mixin(share)
		.mount('#app')
	return {
		app,
		Pinia,
	};
}