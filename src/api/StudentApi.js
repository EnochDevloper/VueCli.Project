import request from "@/router/http";   //导入axios实例文件中方法

// export const getStuList = (url, parm) => {
//   return post(url, parm); //resfulapi风格
// }

// 统一调用方法 默认get请求  post请求需要type 控制 typ默认get请求  post请求需要type 控制 type 1.传实体 例{entity:form}  2.传参 例{id:parm.Id}
export function OperatingTable(url, parm, method) {
  if (!method) {
    method = 'get'
  }

  if (method === 'post' || method === 'put' || method === 'delete') {
    return request({
      url: url,
      method: method,
      data: parm
    })
  } else {
    return request({
      url: url,
      method: method,
      params: parm
    })
  }
}