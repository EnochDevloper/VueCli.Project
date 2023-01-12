
<style type="text/css">
.col_right {
    padding-left: 10px;
}

.form-input {
    width: 220px !important;
    max-width: 220px;
}
</style>

    
<template>
    <basic-container name="basic">
        <h2>{{ message }}</h2>
        <el-row>
            <el-col :lg="8" :md="8" :sm="{ span: 24 }" :xs="{ span: 24 }">
                <el-form id="userform" ref="userform" :model="formData" label-position="left" label-width="85px"
                    style="overflow: auto">
                    <el-row type="flex">
                        <el-col :lg="12" :md="12" :sm="{ span: 24 }" :xs="{ span: 24 }">
                            <el-form-item label="姓名：" prop="name">
                                <el-input id="userName" name="userName" v-model="formData.name" class="form-input"
                                    clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="{ span: 24 }" :xs="{ span: 24 }" class="col_right">
                            <el-form-item label="登录名：" prop="loginName">
                                <el-input id="loginName" name="loginName" class="form-input"
                                    v-model="formData.loginName" :disabled="true" clearable />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col :lg="12" :md="12" :sm="{ span: 24 }" :xs="{ span: 24 }">
                            <el-form-item label="地址：" prop="address">
                                <el-input id="address" name="address" class="form-input" v-model="formData.address"
                                    clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="{ span: 24 }" :xs="{ span: 24 }" class="col_right">
                            <el-form-item label="日期：" prop="date">
                                <el-date-picker id="createDate" name="createDate" type="month" v-model="formData.date"
                                    placeholder="选择日期" class="form-input" :picker-options="pickerOptions0">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col :lg="12" :md="12" :sm="{ span: 24 }" :xs="{ span: 24 }">
                            <el-form-item label="部门：" prop="dept">
                                <el-select v-model="formData.dept" class="form-input" filterable>
                                    <el-option id="dept" name="dept" v-for="item in deptData" :key="item.value"
                                        :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="12" :md="12" :sm="{ span: 24 }" :xs="{ span: 24 }" class="col_right">
                            <el-form-item label="状态：" prop="status">
                                <el-radio-group v-model="formData.status" ref="refStatus" id="rdoStatusGroup">
                                    <el-radio v-for="m_status in statusData" :key="m_status.label"
                                        :value="m_status.label" :label="m_status.value">{{ m_status.label }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col :lg="24" :md="24" :sm="{ span: 24 }" :xs="{ span: 24 }">
                            <el-form-item label="职位：" prop="job">
                                <el-checkbox-group v-model="formData.job" id="rdoJobGroup">
                                    <el-checkbox id="job" name="job" v-model="formData.job" v-for="m_job in jobData"
                                        :key="m_job.value" :label="m_job.value" style="width:100px;">{{ m_job.label }}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col :lg="24" :md="24" :sm="{ span: 24 }" :xs="{ span: 24 }">
                            <el-form-item label="城市：" prop="city">
                                <el-radio-group v-model="formData.city" id="rdoCityGroup">
                                    <el-radio-button v-for="m_city in cityData" :key="m_city.value"
                                        :value="m_city.value" :label="m_city.value">{{ m_city.label }}</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col :lg="24" :md="24" :sm="{ span: 24 }" :xs="{ span: 24 }">
                            <el-form-item label="图片上传：" prop="file">
                                <el-upload class="upload-demo" ref="upload" action="null" multiple :auto-upload="false"
                                    :filelist="file_lists" :on-change="handleChange" :on-success="uploadSuccess"
                                    list-type="picture">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
                                    上传到服务器</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex">
                        <el-col :lg="24" :md="24" :sm="{ span: 24 }" :xs="{ span: 24 }">
                            <el-form-item label="评分：" prop="rate">
                                <el-rate v-model="value" disabled show-score text-color="#ff9900"
                                    score-template="{value}">
                                </el-rate>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :lg="8" :md="8" :sm="{ span: 24 }" :xs="{ span: 24 }">
                <p v-for="item in tableData.rows">姓名{{ item.s_name }}</p>
                <el-table :data="tableData.rows" height="250" style="width: 100%" tooltip-effect="light">
                    <div v-for=" (item, index) in columns">
                        <el-table-column :prop="item.attrs" :label="item.label" align="center" show-overflow-tooltip>

                        </el-table-column>
                    </div>
                    <!-- <el-table-column :prop="item.attrs" :label="item.label" :v-for="(item,index) in columns">
                    </el-table-column> -->
                    <!-- <el-table-column prop="s_name" label="姓名" width="180"></el-table-column> -->
                </el-table>
                <div class="block">
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" :pager-count="pagerCount"
                        :current-page="tableData.pageIndex" :page-sizes="pageSizes" :page-size="tableData.pageSize"
                        :total="tableData.total" @size-change="SizeChange" @current-change="CurrentChange">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </basic-container>

</template>



<script>

import $ from "jquery";
import { OperatingTable } from "@/api/StudentApi";
import qs from "qs";

export default {
    data() {
        return {
            message2: "本模版暂无内容",
            message: "欢迎来到VUE世界",
            file_lists: [],
            imageData: {},
            base64Arr: [],
            tableData: {
                rows: [],
                pageIndex: 1,
                pageSize: 4,
                sortName: "s_createDate-desc",
                total: 0,
            },
            value: 4.6,
            pagerCount: 5,
            pageSizes: [4, 5, 10, 20, 50],
            columns: [
                {
                    attrs: "s_name",
                    label: "姓名",
                },
                {
                    attrs: "s_loginName",
                    label: "登录名",
                },
                {
                    attrs: "s_address",
                    label: "地址",
                }
            ],
            user_Datas: [
                { id: 1, name: '张三' },
                { id: 2, name: '李四' },
                { id: 3, name: '王五' }
            ],
            //表单属性开始
            formData: {
                name: "孙强",
                loginName: "sunqiang",
                address: "北京",
                date: "2021-12-01",
                dept: "SD",
                status: "1",
                city: "TJ",
                job: ["sale", "reception"],
                fileData: "",
                season: "2",  //季度
                rate: 4.2,  //评分
            },
            deptData: [
                { value: "IT", label: "研发部门" },
                { value: "CS", label: "客服部门" },
                { value: "SD", label: "销售部门" },
                { value: "HS", label: "人力资源中心" },
            ],
            statusData: [
                { value: "0", label: "禁用" },
                { value: "1", label: "启用" },
            ],
            cityData: [
                { value: "CQ", label: "重庆" },
                { value: "BJ", label: "北京" },
                { value: "TJ", label: "天津" },
                { value: "SH", label: "上海" },
            ],
            seasonData: [
                { value: "1", label: "第一季度" },
                { value: "2", label: "第二季度" },
                { value: "3", label: "第三季度" },
                { value: "4", label: "第四季度" },
            ],
            jobData: [
                { value: "sale", label: "销售人员" },
                { value: "saleManager", label: "销售主管" },
                { value: "reception", label: "前台人员" },
                { value: "plan", label: "策划人员" },
                { value: "overPlanning", label: "统筹人员" },
                { value: "execute", label: "执行人员" },
                { value: "manager", label: "经理" },
                { value: "general", label: "总经理" },
            ],
            //表单属性结束
            //文件上传开始
            jobList: [],
            successList: [],
            file: null,
            isChangeTmImg: false,           //是否有选择图片
            teamOrMemberUpdateData: {},
            //文件上传结束
            pickerOptions0: {
                disabledDate(time) {
                    let _now = Date.now();
                    seven = 365 * 24 * 60 * 60 * 1000;
                    sevenDays = _now - seven;
                    return time.getTime() > _now || time.getTime() < sevenDays;
                }
            },
            //季度选择
            valueArr: ['01-03', '04-06', '07-09', '10-12'],
            defaultValue: "",
            showSeason: false,
            season: '',
            year: new Date().getFullYear(),
            showValue: ''
        };
    },
    created() {
        this.Init();
        this.GetList();
        if (this.defaultValue) {
            let value = this.defaultValue
            let arr = value.split('-')
            this.year = arr[0].slice(0, 4)
            let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
            let arrAll = this.valueArr
            //this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`
        }
    },
    watch: {
        defaultValue: function (value, oldValue) {
            let arr = value.split('-')
            this.year = arr[0].slice(0, 4)
            let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
            let arrAll = this.valueArr
            //this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`
        }
    },
    mounted() {

        this.load();
    },
    methods: {
        load() {
            $("input[type='file']").hide();
        },
        Init() {
            var _this = this;
            console.log(_this.formData);
        },
        GetList() {
            var _this = this;
            var data = { page: _this.tableData.pageIndex, pageSize: _this.tableData.pageSize, sortName: _this.tableData.sortName, searchs: null };
            OperatingTable('/Students/GetStudentByCondition', data, "post")
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data) {
                            var data = res.data;
                            _this.tableData.rows = data.Rows;
                            _this.tableData.total = data.Total;
                            _this.tableData.pageIndex = data.PageIndex;
                            _this.tableData.pageSize = data.PageSize;
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        },
        SizeChange(size) {
            var _this = this;
            _this.tableData.pageSize = size;
            _this.GetList();
        },
        CurrentChange(index) {
            var _this = this;
            _this.tableData.pageIndex = index;
            _this.GetList();
        },
        submitUpload: function () {
            this.$refs.upload.submit();
        },
        onSubmit() {
            var _this = this;
            var statusText = $("#rdoStatusGroup").find(".is-checked").find("span[class='el-radio__label']").text();
            var cityText = $("#rdoCityGroup").find(".is-active").find("span[class='el-radio-button__inner']").text();

            var jobsText = "";
            $("#rdoJobGroup").find("label[class='el-checkbox is-checked']").each(function () {
                jobsText += $(this).find(".el-checkbox__label").text() + ",";
            });
            jobsText = jobsText.substring(0, jobsText.length - 1);

            console.log(statusText + "||" + cityText + "||" + jobsText);

            var file = _this.file;
            var formData = _this.formData;
            formData.job = formData.job.toString()              //职位
            formData.fileData = JSON.stringify(file);    //json格式化  文件名称

            // this.file_lists.forEach(
            //     (val, index) => {
            //         file = val.raw;
            //     }
            // );

            var postData = JSON.stringify(formData);
            var imgData = qs.stringify(_this.base64Arr);
            console.log(formData);
            OperatingTable("/Vue/UploadFileData", { data: postData, baseArr: imgData }, "post")
                .then((res) => {
                    if (res.status == 200) {
                        if (result) {
                            console.log(result);
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                });

        },
        handleChange(file, fileList) {

            var _this = this;
            _this.file_lists = fileList;

            var reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = function (e) {
                //this.result // 这个就是base64编码了
                var base64 = this.result.split(',')[1];
                _this.base64Arr.push(base64);
            }

            // _this.file = filelist;
            // var m_file = { name: file.name, url: file.url };        //拼接文件名称以及本地网络地址
            // _this.file_lists.push(m_file);         //文件放在表单中
        },
        uploadSuccess: function (response, file, fileList) {
            debugger
            var _this = this;
            var filePath = response.filePath;       //文件本地路径
            var m_file = { name: file.name, url: filePath };        //拼接文件名称以及本地地址
            _this.successList.push(m_file);         //文件放在表单中
        },

        //季度选择
        one() {
            this.showSeason = false
        },
        prev() {
            this.year = this.year * 1 - 1
        },
        next() {
            this.year = this.year * 1 + 1
        },
        selectSeason(i) {

            let _this = this
            _this.season = i + 1
            let arr = _this.valueArr[i].split('-')
            //var date = that.year + arr[0] + '-' + that.year + arr[1];
            var beginDay = _this.getFirstDay(_this.year, arr[0]).format("yyyy-MM-dd");
            var endDay = _this.getLastDay(_this.year, arr[1]).format("yyyy-MM-dd");
            _this.showSeason = false
            // _this.showValue = `${_this.year}年${_this.season}季度`
            console.log(_this.showValue + "开始日：" + beginDay + ",结束日：" + endDay);
        },
        getFirstDay(year, month) {
            var new_year = year; //取当前的年份
            var new_month = month - 1; //取下一个月的第一天，方便计算（最后一天不固定）
            var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
            return new_date;
        },
        getLastDay(year, month) {
            var new_year = year; //取当前的年份
            var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
            if (month > 12) {
                new_month -= 12;//月份减
                new_year++; //年份增
            }
            var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
            return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)); //获取当月最后一天日期
        }
    }
}
</script>

<style scoped>
._mark {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 999;
}

.yearBtn {
    text-align: center;
    padding: 0
}

.box-card {
    width: 322px;
    padding: 0 3px 20px;
    margin-top: 10px;
    position: fixed;
    z-index: 9999
}

.text.item {
    text-align: center;
}

.text.item>>>.el-button {
    width: 40%;
    color: #606266;
}

.text.item ._left {
    float: left;
}

.text.item ._right {
    float: right;
}
</style>