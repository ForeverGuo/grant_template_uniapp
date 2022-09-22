import { cube } from '@/config/apiHost'
import { get, post } from '@/utils/request.js'

// 上传头像
const uploadIimgCropper = params => {
  return post(`${cube}/v1/alioss/upload/nykj/leaderboard`, params)
}


export default {
  uploadIimgCropper
}
