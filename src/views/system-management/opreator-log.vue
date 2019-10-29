<template>
  <div class="page-wrapper">
    <search :rules="rules" :model="searchModel" :hiddenReset="hiddenReset" @onSearch="search()" @resetForm="resetFrom()" :hiddenSearch="hiddenSearch">
      <template slot="inputs">
        <div style="margin-top: 20px">
        <el-form-item label="日志内容" prop="operateContent">
          <el-input v-model="searchModel.operateContent" @keyup.enter.native="huichesearch()" placeholder="请输入操作内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作人" prop="operatePeoId">
          <el-input v-model="searchModel.operatePeoId" placeholder="请输入操作人" clearable></el-input>
        </el-form-item>
        <el-form-item label="操作时间" prop="operateTime">
          <el-date-picker range-separator="~" type="daterange" :editable="false" v-model="searchModel.operateTime" placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        </div>
      </template>
    </search>
    <div class="table">
      <el-table
        :data="data"
        :header-cell-style="tableHeaderColor"
        style="width: 100%"
        stripe
        border
      >
        <el-table-column fixed type="index" label="序号" align="center" width="100px" ></el-table-column>
        <el-table-column prop="operateContent" label="日志内容"  width="400px"></el-table-column>
        <el-table-column prop="operatePeoId" label="操作人" width="300px" ></el-table-column>
        <el-table-column prop="operateTime" label="操作时间" sortable>
          <!-- <template slot-scope="scope">
            <span>{{dateFormat(scope.row.operateTime)}}</span>
          </template> -->
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page= page.pageNum
          :page-size= page.pageSize
          layout="total, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
  </div>
</template>

<script>

import Search from "../../components/common/search.vue"
import API from "../../api/api_user.js"
import CommonService from "../../utils/common_service"

export default {
  components:{
    Search
  },
  data() {
    return {
      searchModel:{
        operateContent: "",
        operateTime: [],
        operatePeoId: "",
        startTime: "",
        endTime: "",
        pageNum: 1,
        pageSize: 10
      },
      data: [],
      hiddenSearch: true,
      hiddenReset: true,
      rules:{

      },
      operatePeoId:"",
      page:{
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.search();
    },
    dateFormat(value){
      return CommonService.dateFormat(value);

    },
    // 更改表头样式
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
            return 'background-color: #E4E7ED;color: #aaaa9;font-size: 13px;'
        }
    },

    huichesearch(){//回车搜索
        let keyCode = window.event? window.event.keyCode:window.event.which;
        if(keyCode== 13){
            this.search();//搜索函数
        }
    },

    /**
     * 重置搜索框
     */
    resetFrom(){
      this.searchModel = {}
      this.searchModel.pageNum = 1;
      this.searchModel.pageSize = 10;
      this.search();
    },

    search(){
      
      this.searchModel.startTime = this.searchModel.operateTime? this.dateFormat(this.searchModel.operateTime[0]):"";
      this.searchModel.endTime = this.searchModel.operateTime? this.dateFormat(this.searchModel.operateTime[1]):"";
      delete this.searchModel.operateTime;
      this.searchModel.pageNum = this.page.pageNum
      API.operatorLog(this.searchModel).then(data=>{
        if(!data.data) return;
        let result = data.data
        this.data = result.list
        this.page.total = result.total
        this.page.pageNum = result.pageNum
        this.page.pageSize = result.pageSize

      },({msg})=>{
        this.$message.error(msg)
      })
    }
  },

  mounted(){
    this.search();
  }
};
</script>

<style scoped lang="scss">
  .table {
    margin-top: 30px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-range-editor.el-input__inner{
    padding: 0px;
  }

  .el-date-editor .el-range-input{
    width: 25%
  }

  .el-date-editor--daterange.el-input__inner{
    width: 290px;
  }
</style>
