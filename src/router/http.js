import axios from 'axios';
import { apiBaseUrl } from '@/router/config'
import { Notification } from 'element-ui'
import qs from 'qs'

// 统一配置
let service = axios.create({
  baseURL: apiBaseUrl,
  responseType: 'json',
  validateStatus(status) {
    // 200 外的状态码都认定为失败
    return status === 200
  }
});

// 拦截请求
service.interceptors.request.use((config) => {
  debugger;
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
    config.url += "?" + config.data;
  }
  return config;
}, (error) => {
  return Promise.reject(error)
})

// 拦截响应
service.interceptors.response.use((config) => {
  return config
}, (error) => {
  if (error.response) {
    let errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.message
    switch (error.response.status) {
      case 404:
        Notification({
          title: '系统提示',
          message: '很抱歉，资源未找到',
          type: "error"
        })
        break
      case 403:
      case 401:
        Notification({
          title: '系统提示',
          message: '很抱歉，您无法访问该资源，可能是因为没有相应权限或者登录已失效',
          type: "error"
        })
        break
      default:
        Notification({
          title: '系统提示',
          message: errorMessage,
          type: "error"
        })
        break
    }
  }
  return Promise.reject(error)
})

export default service
