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
      @refresh-change="RefreshPage"
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
      searchBeginDate: "2021-01-01 00:00:00",
      searchEndDate: "2021-06-01 00:00:00",
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
      }, //分页参数
      form: {}, //单个实体
      params: {}, //查询参数
      search: {},
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
            label: "性别",
            prop: "s_sex",
            formatter: function (data, value) {
              return value == "0" ? "男" : "女";
            },
            type: "select",
            dicData: [
              { label: "男", value: 0 },
              { label: "女", value: 1 },
            ],
            // addDisplay: false,
            // editDisplay: false,
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
            label: "创建时间",
            prop: "s_createDate",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
            search: true,
            searchRange: true,
            searchSpan: 12,
          },
          {
            label: "备注",
            prop: "s_remark",
            search: true,
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
          searchs: null,
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
      var condition = [
        {
          property: "s_name/s_loginName",
          value: params.s_name || "",
          method: "Contains",
        },
        {
          property: "s_address",
          value: params.s_address || "",
          method: "==",
        },
        {
          property: "s_remark",
          value: params.s_remark || "",
          method: "Contains",
        },
        {
          property: "s_createDate",
          value:
            params.s_createDate == undefined
              ? ""
              : params.s_createDate[0] + "," + params.s_createDate[1] || "",
          method: "DateTime",
        },
      ];

      var searchs = JSON.stringify(condition);

      this.params = {
        page: 1,
        pageSize: this.userData.PageSize,
        sortName: this.userData.Sort,
        searchs,
      };
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
    //刷新页面
    RefreshPage() {
      this.params.page = 1;
      this.GetList();
    },
  },
};
</script>