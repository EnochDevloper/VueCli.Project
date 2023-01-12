
<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="12">
                    <div>
                        <h2>学生列表</h2>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div>
                        <el-table :data="tableData" style="width:100%" :height="tableHeight">
                            <el-table-column prop="s_name" label="姓名" width="180">
                            </el-table-column>
                            <el-table-column prop="s_loginName" label="登录名" width="180">
                            </el-table-column>
                            <el-table-column prop="s_address" label="地址">
                            </el-table-column>
                            <el-table-column prop="s_age" label="年龄">
                            </el-table-column>
                            <el-table-column prop="s_createDate" label="创建日期" :formatter="formatter">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <el-col :span="12"></el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total"
                        :page-sizes="pagesizeGroup" :page-size="pageSize" @size-change="SizeChange"
                        @current-change="CurrentChange">
                    </el-pagination>
                </el-col>
                <el-col :span="12"></el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import axios from 'axios';
import qs from "qs";
import { formatDate, parseTime1 } from "@/utils/date";
import { OperatingTable } from "@/api/StudentApi";
import { shortTime, time1 } from "@/utils/dateTools";
// axios.defaults.baseURL = `http://localhost:14346/api/`;
export default {
    data() {
        return {
            tableData: [],
            sort: "s_createDate-desc",
            searchs: "",
            total: 0,
            currentPage: 1,
            pageSize: 10,
            tableHeight: 500,
            pagesizeGroup: [2, 5, 10, 15, 20, 50, 100]
        };
    },
    created() {
        this.GetList();
    },
    methods: {
        GetList() {
            var _this = this;
            var params = {
                pageIndex: _this.currentPage,
                pageSize: _this.pageSize,
                sortName: _this.sort,
                searchs: _this.searchs
            };
            var url = "/Student/GetListByCondition";

            OperatingTable(url, params).then((res) => {
                if (res.status == 200) {
                    this.tableData = res.data.rows;
                    _this.total = res.data.total;
                }
            });

            // axios({
            //     url: "http://localhost:5280/api/Student/GetListByCondition",
            //     method: "GET",
            //     params: params
            // }).then(res => {
            //     if (res.status == 200) {
            //         this.tableData = res.data.rows;
            //     }
            // }).catch(function (error) {
            //     console.log("error init." + error)
            // });
        },
        formatter(row, column) {
            return parseTime1(row.s_createDate, 'yyyy-MM-dd HH:mm:ss');
        },
        SizeChange(size) {
            var _this = this;
            _this.pageSize = size;
            this.GetList();
        },
        CurrentChange(page) {
            var _this = this;
            _this.currentPage = page;
            this.GetList();
        }
    }
};
</script>