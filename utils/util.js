
import { wx_cid, userInfo, tencent_map_key, channel_name } from '@/config/commonStore.js'

const getToken = () => {
	return userInfo ? userInfo.person_token : ''
}
// 获取url路径
export const getPathUrl = () => {
	let page = getCurrentPages()
	let currentPage = page[page.length - 1]
	return currentPage.route;
}

// 获取url参数
export const getPathParams = () => {
	let page = getCurrentPages()
	let currentPage = page[page.length - 1]
	return currentPage.options;
}

// 获取当前页面的路径及参数
export const getCurrentPath = () => {
	let page = getCurrentPages(),
		currentPage = page[page.length - 1],
		// 当前路径
		current_url = currentPage.route,
		// 当前路径参数
		options = currentPage.options,
		// 新拼接url
		url_params = '';
	for (let key in options) {
		url_params += `${key}=${options[key]}&`
	}
	if (url_params) {
		return `/${current_url}?${url_params}`
	} else {
		return `/${current_url}`
	}
}

// uni app 获取当前经纬度
export const getLocation = () => {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			// #ifdef MP-WEIXIN
			type: 'wgs84',
			// #endif
			// geocode: true, //设置该参数为true可直接获取经纬度及城市信息
			success: function (res) {
				resolve(res)
			},
			fail: function (e) {
				uni.showToast({
					title: '获取地址失败，将导致部分功能不可用',
					icon: 'none'
				});
				resolve({
					state: 0
				})
			},
		})
	})
}

/*
 *	调用腾讯小程序地图
 * lat: 经度
 * lon: 纬度
 * address: 目的地址
 */
export const openWxLocation = (lat, lon, address) => {
	let plugin = requirePlugin('routePlan'),
		key = `${tencent_map_key}`, //使用在腾讯位置服务申请的key
		referer = '预约体检看医生', //调用插件的app的名称
		endPoint = JSON.stringify({ //终点
			'name': `${address}`,
			'latitude': lon,
			'longitude': lat
		});
	uni.navigateTo({
		url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
	});
}


// 底部按钮高度
export const getBottomHeight = () => {
	// #ifdef MP-WEIXIN
	let botMenuHeight
	uni.getSystemInfo({
		success: (res) => {
			if (
				res.model.indexOf('iPhone X') != -1 ||
				res.model.indexOf("iPhone XR") != -1 ||
				res.model.indexOf("iPhone XS Max") != -1 ||
				res.model.indexOf('iPhone 11') > -1 ||
				res.model.indexOf('iPhone 12') > -1 ||
				res.model.indexOf('iPhone 13 ') > -1 ||
				res.model.indexOf('iPhone 13 Max') > -1 ||
				res.model.indexOf('iPhone 13 Pro') > -1
			) {
				botMenuHeight = '130rpx';
			} else {
				botMenuHeight = '100rpx';
			}
		}
	})
	return botMenuHeight
	// #endif
}
/*
 *	百度经纬度转腾讯经纬度
 * lat: 经度
 * lon: 纬度
 *
 */
export const translateTxLoc = (lat, lon) => {
	let x_pi = Math.PI * 3000.0 / 180.0;
	let x = lon - 0.0065;
	let y = lat - 0.006;
	let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
	let wz = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);

	lon = z * Math.cos(wz);
	lat = z * Math.sin(wz);

	return {lon, lat};
}




// 数据存储操作
export const storage = {
	set(name, data) {
		uni.setStorageSync(`${name}`, JSON.stringify(data))
	},
	get(name) {
		let data = uni.getStorageSync(`${name}`) ? JSON.parse(uni.getStorageSync(`${name}`)) : '';
		return data;
	},
	remove(name) {
		uni.removeStorageSync(`${name}`)
	}
}

export const storageCache = {
	get(key) {
		let val = uni.getStorageSync(key)
		if (val) {
			// 缓存存在，判断是否过期
			let temp = val.split('|')
			let nowTime = Date.parse(new Date()) / 1000;
			//缓存已过期
			if (!temp[1] || temp[1] <= nowTime) {
				uni.removeStorageSync(key)
				return "";
			} else {
				//未过期
				return JSON.parse(temp[0]);
			}
		}else{
			return ""
		}
	},
	set(key,val,seconds = 3600 * 24){
		let nowTime = Date.parse(new Date()) / 1000;
		let expire = nowTime + Number(seconds);
		uni.setStorageSync(key,JSON.stringify(val) + '|' +expire)
	}
}

// 微信小程序rpx 转换为 px
export const rpxTopx = (rpx) => {
  let deviceWidth = uni.getSystemInfoSync().windowWidth
  let px = (deviceWidth / 750) * Number(rpx)
  return px
}
    
// 微信小程序px转换为rpx 
export const pxTorpx = (px) => {
  let deviceWidth = uni.getSystemInfoSync().windowWidth;	//获取设备屏幕宽度
  let rpx = (750 / Number(px)) * deviceWidth;
  return rpx;
}

