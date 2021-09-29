{{page}}
<template>
  <basic-container name="basic">
    <avue-crud
      :data="userData.Rows"
      :option="option"
      :page.sync="page"
      :search.sync="search"
      @search-change="searchChange"
      @size-change="sizeChange"
      @current-change="currentChange"
      v-model="form"
    ></avue-crud>
  </basic-container>
</template>
<script>
import { OperatingTable } from "@/api/StudentApi";
import qs from "qs";

export default {
  data() {
    return {
      userData: {
        Total: 0,
        Rows: [],
        PageIndex: 1,
        PageSize: 5,
        Sort: "s_createDate-desc",
        Order: "asc",
      }, // 用户数据
      page: {
        currentPage: 1,
        total: 0,
        background: false,
        pageSize: 5,
      },
      search: {},
      form: {},
      params: {},
      option: {
        align: "center",
        menuAlign: "center",
        card: true,
        searchMenuSpan: 6,
        column: [
          {
            label: "姓名",
            prop: "s_name",
            search: true,
          },
          {
            label: "登录名",
            prop: "s_loginName",
          },
          {
            label: "地址",
            prop: "s_address",
            search: true,
          },
          {
            label: "联系电话",
            prop: "s_phone",
          },
          {
            label: "备注",
            prop: "s_remark",
          },
        ],
      },
    };
  },
  created() {
    this.page.pageSizes = [5, 10, 15];

    this.GetList();
  },
  methods: {
    //查询方法
    GetList() {
      var _this = this;

      if (!this.params.page) {
        this.params = {
          page: this.page.currentPage,
          pageSize: this.page.pageSize,
          sortName: this.userData.Sort,
          s_name: "",
          s_address: "",
        };
      }
      var params = _this.params;
      var url = "/Students/GetStudentByCondition";

      OperatingTable(url, params, "post").then((data) => {
        var result = data.data;
        _this.userData = result;
        _this.page.total = result.Total;
        _this.page.pageSize = result.PageSize;
        _this.page.currentPage = result.PageIndex;
      });
    },
    //搜索
    searchChange(params, done) {
      done();
      this.params = {
        page: 1,
        pageSize: this.userData.PageSize,
        sortName: this.userData.Sort,
        s_name: params.s_name || "",
        // s_address: params.s_address || "",
      };
      debugger;
      this.params.s_address = params.s_address || "";
      this.GetList();
    },
    //显示条数变化
    sizeChange(val) {
      this.params.page = 1;
      this.params.pageSize = val;
      this.GetList();
    },
    //选页码
    currentChange(val) {
      this.params.page = val;
      this.GetList();
    },
  },
};
</script>