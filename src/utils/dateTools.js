//封装项目中常用的日期转换格式的函数

// 在tool.js文件中引入
import moment from "moment";

// 年-月-日
export const shortTime = function (value, formater = "YYYY-MM-DD") {
    return moment(value).format(formater);
};

// 年-月-日 时:分:秒
export const time = function (value, formater = "YYYY-MM-DD HH:mm:ss") {
    return moment(value).format(formater);
};

// 年/月/日 时:分:秒
export const time1 = function (value, formater = "YYYY-MM-DD HH:mm:ss") {
    return moment(value).format(formater);
};

// 年/月/日 时:分
export const leaveTime = function (value) {
    return moment(value).format("YYYY-MM-DD HH:mm");
};

// 年-月
export const monthTime = function (value) {
    return moment(value).format("YYYY-MM");
};

// 年/月
export const monthTime1 = function (value) {
    return moment(value).format("YYYY/MM");
};

// 年-月-日
export const monthTime2 = function (value) {
    return moment(value).format("YYYY-MM-DD");
};

// 每月第一天
export const monthOne = function (value) {
    return moment(value).format("YYYY-MM-01");
};
// 每月第一天精确
export const monthOnes = function (value) {
    return moment(value).format("YYYY-MM-01 00:00:00");
};
// 补全00:00:00
export const addZero = function (value) {
    return moment(value).format("YYYY-MM-DD 00:00:00");
};
// 月数
export const MonTime = function (value) {
    return moment(value).format("MM");
};
// 天数
export const dayTime = function (value) {
    return moment(value).format("DD");
};
// 时:分:秒
export const secondsTime = function (value) {
    return moment(value).format("HH:mm:ss");
};

// 时:分
export const secondShortTime = function (value) {
    return moment(value).format("HH:mm");
};
