<template>
  <el-row>
    <el-col :span="24">
      <el-table :data="userData.Rows" style="width: 100%">
        <el-table-column prop="s_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="s_age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="s_address" label="地址"></el-table-column>
      </el-table>
      <el-pagination
        :pager-count="pagerCount"
        :current-page="userData.PageIndex"
        :page-sizes="[10,20,50]"
        :page-size="userData.PageSize"
        :total="userData.Total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="SizeChange"
        @current-change="CurrentChange"
      />
    </el-col>
  </el-row>
</template>

  <script>
// import { get, post } from "@/utils/request";
import { getStuList } from "@/api/StudentApi";
export default {
  data() {
    return {
      pageSizes: [5, 10, 20, 50],
      pagerCount: 5,
      heightParm: {},
      userData: {
        Total: 0,
        Rows: [],
        PageIndex: 1,
        PageSize: 10,
        Sort: "s_createDate-desc",
        Order: "asc"
      } // 用户数据
    };
  },
  created() {
    this.init();
    this.GetList();
  },
  methods: {
    GetList() {
      var _this = this;
      var parm_data = {
        page: _this.userData.PageIndex,
        pagesize: _this.userData.PageSize,
        searchs: null,
        sortName: _this.userData.Sort
      };

      var parm =
        "page=" +
        _this.userData.PageIndex +
        "&pageSize=" +
        _this.userData.PageSize +
        "&searchs=null&sortName=" +
        _this.userData.Sort;

      this.$axios
        .post("http://localhost:2580/Angular/GetStudentByCondition?" + parm)
        .then(res => {
          _this.userData = res.data;
        });
    },
    SizeChange(size) {
      var _this = this;
      _this.userData.PageSize = size;
      _this.GetList();
    },
    CurrentChange(index) {
      var _this = this;
      _this.userData.PageIndex = index;
      _this.GetList();
    },

    init() {
      // 页面加载 固定高度
      var _this = this;
      var height = window.innerHeight;
      var bodyHeight = height * 0.86;
      var clientHeight = height * 0.5;
      _this.heightParm.sideHeight = bodyHeight + "px"; // 布局高度
      _this.heightParm.dialogHeight = clientHeight + "px"; // 弹窗高度
      _this.heightParm.userHeight = height * 0.62 + 5 + "px"; // 用户管理表格高度 固定表头
      _this.heightParm.roleHeight = bodyHeight * 0.7 + "px"; // 角色列表高度
      _this.heightParm.deptHeight = bodyHeight - 130 + "px"; // 组织机构高度
      _this.heightParm.roleAppHeight = bodyHeight * 0.59 + "px"; // 角色应用树形高度
    }
  }
};
</script>