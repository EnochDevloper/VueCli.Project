import { get, post } from "@/utils/request";//导入axios实例文件中方法

// export const getStuList = (url, parm) => {
//   return post(url, parm); //resfulapi风格
// }
var parm_data = {
  page: 1,
  pagesize: 10,
  searchs: null,
  sortName: "s_id-desc"
};
export const getStuList = p => post("/Angular/GetStudentByCondition", parm_data)