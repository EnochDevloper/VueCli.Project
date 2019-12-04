<template>
  <basic-container>
    <el-row class="row_bg" :gutter="20">
      <el-col :lg="24" :md="24" :sm="{span:24}" :xs="{span:24}">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址" width="250"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
        <el-row>
          <el-col :span="18">
            <el-button icon="el-icon-refresh" type="success">&nbsp;刷新</el-button>
            <el-button icon="el-icon-plus" type="success">&nbsp;新增</el-button>
            <el-button icon="el-icon-edit" type="primary">&nbsp;编辑</el-button>
            <el-button icon="el-icon-delete" type="danger">&nbsp;冻结</el-button>
            <el-button icon="el-icon-rank" type="primary">&nbsp;更换部门</el-button>
            <el-button icon="el-icon-setting" type="primary">&nbsp;次要部门维护</el-button>
            <el-button icon="el-icon-setting" type="primary">&nbsp;重置密码</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </basic-container>
</template>

  <script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods:{
    handleSizeChange(size){
    console.log(size);
    },
    handleCurrentChange(index){
    console.log(index);
    },
  }
};
</script>