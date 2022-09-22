import { wx_cid, userInfo } from '@/config/commonStore.js'
const service = (url, params = {}, opts) => {
	Object.assign(params, { cid: wx_cid, user_key: userInfo.user_key })
	if (opts.method == 'POST') {
		if (!url.includes('cid')) {
			if (!url.includes('?')) {
				url = `${url}?cid=${wx_cid}`
			} else {
				url = `${url}&cid=${wx_cid}`
			}
		}
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: params,
			method: opts.method || 'GET',
			header: {
				"Content-type":
					opts.dataType == 'FORM' ?
						'application/x-www-form-urlencoded' :
						'application/json;charset=UTF-8'
			},
			success: (res) => {
				const data = res.data
				resolve(data)
			},
			fail: (err) => {
				console.log(err)
			}
		})
	})
}

// export default service

export const get = (url, params, opts = {}) => {
	opts.method = 'GET'
	return service(url, params, opts)
}

export const post = (url, params, opts = {}) => {
	opts.method = 'POST'
	return service(url, params, opts)
}
export const patch = (url, params, opts = {}) => {
	opts.method = 'PATCH'
	return service(url, params, opts)
}
export const put = (url, params, opts = {}) => {
	opts.method = 'PUT'
	return service(url, params, opts)
}
export const del = (url, params, opts = {}) => {
	opts.method = 'DELETE'
	return service(url, params, opts)
}

uni.addInterceptor('request', {
  invoke(args) {
    // 请求拦截 request触发前拼接必要参数
		console.log('request: ', args)
  }
})
