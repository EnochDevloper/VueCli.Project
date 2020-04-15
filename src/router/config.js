//api接口前缀

let apiBaseUrl = ''
const env = process.env
if (env.NODE_ENV === 'development') {
  apiBaseUrl = `http://localhost:5280/api` // 开发环境地址
} else if (env.NODE_ENV === 'production') {
  apiBaseUrl = `http://192.168.10.96/api` // 生产环境地址
} else if (env.NODE_ENV === 'test') {
  apiBaseUrl = `http://localhost:5280/api` // 测试环境地址
}
export {
  apiBaseUrl,
  env
}