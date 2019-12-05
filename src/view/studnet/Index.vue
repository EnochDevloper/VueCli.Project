<template>
  <el-row>
    <el-col :lg="12" :md="12" :sm="{span:24}" :xs="{span:24}">
      <el-table
        :data="userData.Rows"
        ref="StudentTable"
        height="400px"
        style="width: 100%"
        @row-click="RowChnage"
      >
        <el-table-column prop="s_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="s_age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="s_address" label="地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :pager-count="pagerCount"
        :current-page="userData.PageIndex"
        :page-sizes="pageSizes"
        :page-size="userData.PageSize"
        :total="userData.Total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="SizeChange"
        @current-change="CurrentChange"
      />
    </el-col>
    <el-col :lg="6" :md="6" :sm="{span:24}" :xs="{span:24}" style="padding-left:10px;">
      <el-form id="userform" ref="userform" :model="form">
        <el-row type="flex">
          <el-col :lg="24" :md="24" :sm="{span:24}" :xs="{span:24}">
            <el-form-item label="姓名：" prop="s_name">
              <el-input v-model="form.s_name" class="form-input" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :lg="24" :md="24" :sm="{span:24}" :xs="{span:24}">
            <el-form-item label="登录名" prop="s_loginName">
              <el-input v-model="form.s_loginName" class="form-input" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :lg="24" :md="24" :sm="{span:24}" :xs="{span:24}">
            <el-form-item label="地址" prop="s_address">
              <el-input v-model="form.s_address" class="form-input" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :lg="24" :md="24" :sm="{span:24}" :xs="{span:24}">
            <el-form-item label="联系电话" prop="s_phone">
              <el-input v-model="form.s_phone" class="form-input" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button id="btnClear" ref="btnClear" @click="ClearText">清空</el-button>
      </div>
    </el-col>
    <el-col :lg="6" :md="6" :sm="{span:24}" :xs="{span:24}">
      <el-row style="padding-bottom:10px;">
        <el-col>
          <el-input
            id="companyName"
            v-model="companyName"
            type="text"
            class="searchInput"
            placeholder="请输入部门名称"
          >
            <template slot="prepend">部门</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-tree
            ref="tree1"
            :props="defaultProps"
            :data="treeData"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false"
            node-key="Id"
            :filter-node-method="filterNode"
            :check-strictly="true"
            show-checkbox
            @check-change="treeChange"
          ></el-tree>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

  <script>
// import { get, post } from "@/utils/request";
import { getStuList } from "@/api/StudentApi";
export default {
  data() {
    return {
      treeData: [],
      defaultProps: {
        // 树形绑定数据结构名称
        children: "Children",
        label: "Label"
      },
      companyName: "", //部门名称
      pageSizes: [5, 10, 20, 50],
      pagerCount: 5,
      form: {}, // 用户详情
      heightParm: {},
      userData: {
        Total: 0,
        Rows: [],
        PageIndex: 1,
        PageSize: 5,
        Sort: "s_createDate-desc",
        Order: "asc"
      } // 用户数据
    };
  },
  watch: {
    // 监听
    companyName(val) {
      // 用过滤器进行 搜索
      this.$refs.tree1.filter(val);
    }
  },
  created() {
    this.init();
    this.GetList();
    this.GetTree();
  },
  methods: {
    filterNode(value, data) {
      // 树形过滤 筛选
      if (!value) return true;
      return data.Label.indexOf(value) >= 0;
    },
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
        .post(
          "http://localhost:5280/api/Students/GetStudentByCondition?" + parm
        )
        .then(res => {
          _this.userData = res.data;
        });
    }, //获取学生数据
    SizeChange(size) {
      var _this = this;
      _this.userData.PageSize = size;
      _this.GetList();
    }, //每页显示条数变化
    CurrentChange(index) {
      var _this = this;
      _this.userData.PageIndex = index;
      _this.GetList();
    }, //页码变化

    RowChnage(row, event, column) {
      var _this = this;
      _this.form = row;
    }, //选中学生行
    ClearText() {
      var _this = this;
      this.$refs["userform"].resetFields();
      //刷新列表 因为清空 会影响列表中的数据也清空
      _this.GetList();
    }, //清空编辑页面信息
    GetTree() {
      this.$axios
        .post("http://localhost:5280/api/Students/DiGuiCompany")
        .then(res => {
          this.treeData = res.data;
        });
    }, //获取部门树
    treeChange: function(node, isCheck) {
      console.log(node);
    }, //部门树选中 某个节点
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