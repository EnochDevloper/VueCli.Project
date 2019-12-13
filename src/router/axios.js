import axios from 'axios'
import qs from 'qs'
import { apiBaseUrl } from './config.js'

//请求拦截器
axios.interceptors.request.use(function (param) {
  return param
}, function (error) {
  // 请求错误
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  // 响应错误
  return Promise.reject(error)
})

// 封装axios--------------------------------------------------------------------------------------
function apiAxios(url, params) {
  let httpDefault = {
    method: "POST",
    baseURL: apiBaseUrl,
    url: url,
    data: qs.stringify(params),
  }

  return new Promise((resolve, reject) => {
    axios(httpDefault)
      // 此处的.then属于axios
      .then((res) => {
        resolve(res)
      }).catch((response) => {
        reject(response)
      })
  })
}

export default apiAxios