<style lang="scss">
@import url("../../styles/pager.scss");

.el-dialog__header {
  background-color: #82a7d7 !important;
}
.el-dialog__header span {
  color: white;
}
.el-dialog__header button i {
  color: white;
}
.col_button {
  padding: 10px;
}
</style>

<template>
  <basic-container name="basic">
    <el-row>
      <div class="box">
        <span :style="{backgroundColor:'#6ba2d6'}" class="container">
          <i icon-class="wechat" class="iconfont icon-weixin" />
        </span>
      </div>
      <el-col class="col_button">
        <el-button icon="el-icon-refresh" type="success">&nbsp;刷新</el-button>
        <el-button icon="el-icon-edit" type="primary">&nbsp;编辑</el-button>
        <el-button icon="el-icon-setting" type="warning" @click="ResetPwd()">&nbsp;重置密码</el-button>
        <el-button icon="el-icon-remove-outline" type="danger" @click="LoginOut()">&nbsp;注销账户</el-button>
      </el-col>
    </el-row>
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
              <el-button type="text" size="small" @click="LookStu">查看</el-button>
              <el-button type="text" size="small" @click="EditStu">编辑</el-button>
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
              :check-on-click-node="true"
              node-key="Id"
              :filter-node-method="filterNode"
              :check-strictly="true"
              show-checkbox
              @check-change="treeChange"
            ></el-tree>
          </el-col>
        </el-row>
      </el-col>
      <el-dialog
        title="学生信息"
        ref="stuDialog"
        :visible.sync="dialogVisible"
        width="32%"
        :close-on-click-modal="false"
      >
        <el-form
          id="userform"
          ref="userform"
          :model="form"
          label-position="right"
          label-width="120px"
          style="overflow:auto"
        >
          <el-row type="flex">
            <el-col :lg="24" :md="24" :sm="{span:24}" :xs="{span:24}">
              <el-form-item label="姓名：" prop="s_name">
                <input type="hidden" v-model="form.s_Grade_ID" />
                <el-input v-model="form.s_name" class="form-input" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :lg="24" :md="24" :sm="{span:24}" :xs="{span:24}">
              <el-form-item label="登录名：" prop="s_loginName">
                <el-input v-model="form.s_loginName" class="form-input" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :lg="24" :md="24" :sm="{span:24}" :xs="{span:24}">
              <el-form-item label="地址：" prop="s_address">
                <el-input v-model="form.s_address" class="form-input" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :lg="24" :md="24" :sm="{span:24}" :xs="{span:24}">
              <el-form-item label="联系电话：" prop="s_phone">
                <el-input v-model="form.s_phone" class="form-input" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="ConfirmEdit()">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </basic-container>
</template>

<script>
import { OperatingTable } from "@/api/StudentApi";
import { Message } from "element-ui";
import Cookies from "js-cookie";
import qs from "qs";

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
      }, // 用户数据
      dialogVisible: false
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
    this.GetTree();
    this.GetList();
  },
  methods: {
    filterNode(value, data) {
      // 树形过滤 筛选
      if (!value) return true;
      return data.Label.indexOf(value) >= 0;
    },
    GetList() {
      var _this = this;

      var params = {
        page: _this.userData.PageIndex,
        pageSize: _this.userData.PageSize,
        searchs: null,
        sortName: _this.userData.Sort
      };
      var url = "/Students/GetStudentByCondition";

      OperatingTable(url, params, "post").then(data => {
        _this.userData = data.data;
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
      var _this = this;
      OperatingTable("/Students/DiGuiCompany", null, "post")
        .then(res => {
          _this.treeData = res.data;
        })
        .catch(err => {
          console.log(err);
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
    },
    //查看学生信息
    LookStu() {
      var _this = this;
      _this.dialogVisible = true;
    },
    //编辑学生信息
    EditStu() {
      var _this = this;
      _this.dialogVisible = true;
    },
    //关闭弹出前的操作
    handleClose() {
      var _this = this;
      _this.dialogVisible = false;
    },
    //重置密码功能
    ResetPwd() {
      var _this = this;
      var id = _this.form.s_id;
      if (id) {
        this.$confirm("是否确定重置密码?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            OperatingTable("/Students/ResetPassWord", { sid: id }, "post")
              .then(res => {
                if (res.status == 200) {
                  if (res.data.IsSuccess) {
                    Message.success(res.data.Message);
                  }
                } else {
                  Message.info(res.data.Message);
                }
              })
              .catch(err => {
                Message.error(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消重置"
            });
          });
      } else {
        Message.info("请选择用户重置密码");
      }
    },
    //确定编辑保存
    ConfirmEdit() {
      var _this = this;
      var data = _this.form;
      OperatingTable("/Students/UpdateStu", data, "post")
        .then(res => {
          if (res.status == 200) {
            if (res.data.IsSuccess) {
              Message.success(res.data.Message);
              setTimeout(() => {
                _this.dialogVisible = false;
              }, 500);
            } else {
              Message.info(res.data.Message);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //注销功能
    LoginOut() {
      var _this = this;

      var data = Cookies.get("data");
      var m_student = qs.parse(data);

      _this
        .$confirm("是否确定注销用户" + m_student.s_name, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          // sessionStorage.removeItem("token");
          _this.$router.push("/");
        })
        .catch(() => {
          Message.info("已取消注销账户");
        });
    }
  }
};
</script>