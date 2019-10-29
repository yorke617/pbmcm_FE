<template>
  <!--面包屑-->
  <div class="page-wrapper">
    <search :model="searchModel">
      <template slot="inputs">
          <el-form-item prop="searchConent" style="margin-left:10px; margin-top: 30px">
            <el-col :span="12" >
              <el-input
                placeholder="请输入角色名"
                style="width: 400px"
                @keyup.enter.native="huichesearch()"
                icon="el-icon-search"
                v-model="searchModel.roleName"
              >
                <el-button
                  slot="append"
                  style="height: 32px;"
                  size="small"
                  icon="el-icon-search"
                  @click="handleSearch"
                  type="primary"
                  plain
                ></el-button>
              </el-input>
            </el-col>
        </el-form-item>
        <el-form-item style="margin-left:10px; margin-top: 25px">
          <el-button type="primary" @click="add()">新增</el-button>
        </el-form-item>
          <el-form-item style="margin-left:10px; margin-top: 25px">
          <el-button type="primary" plain @click="reset()">重置</el-button>
        </el-form-item>
      </template>
    </search>
    <div class="table">
        <el-table :data="tableData" stripe border :header-cell-style="tableHeaderColor" style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
          <el-table-column prop="roleName" label="角色" width="200px"></el-table-column>
          <el-table-column prop="roleDes" label="描述"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="modify(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="deleted(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <el-dialog
      :title="this.selectedRoleId?'修改':'新增'"
      center
      :visible.sync="dialogVisible"
      width="40%"
      @open="openUserAdd()"
      @close="closeUserAdd()"
    >
      <role-router
        @closeUserAdd="closeUserAdd()"
        ref="role-router"
        :selectedRole="selectedRole"
        @refreshData="getAllRoles()"
      ></role-router>
    </el-dialog>
  </div>
</template>

<script>
import roleRouter from "../../components/system-mamagement/role-router.vue";
import roleAPI from "../../api/api_role";
import Search from "../../components/common/search.vue"

export default {
  components: {
    roleRouter,
    Search
  },
  data() {
    return {
      tableData: [],
      searchModel:{
        roleName: ""
      },
      dialogVisible: false,
      selectedRoleId: "",
      selectedRole: {},
      form: {
        roleId: "",
        roleName: "",
        roleDesc: "",
        skills: []
      },
      search: {
        roleName: ""
      }
    };
  },
  methods: {
    add() {
      this.dialogVisible = true;
    },

    reset(){

    },
    // 更改表头样式
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
            return 'background-color: #E4E7ED;color: #aaaa9;font-size: 13px;'
        }
    },

    handleSearch(){
      this.getAllRoles();
    },

    deleted(row) {
      roleAPI.deleteRole(row.roleId).then(data=>{
        if(data.success){
           this.$message.success("删除成功")
           this.getAllRoles();
        }else{
           this.$message.error(data.msg)
        }
      })
    },

    huichesearch(e){//回车搜索
        varkeyCode =window.event? e.keyCode:e.which;
        if(keyCode== 13){
            this.handleSearch();//搜索函数
        }
    },
    modify(index) {
      this.dialogVisible = true;
      this.selectedRoleId = index.roleId;
      this.selectedRole = index;
    },

    btn: function() {
      var search = this.search;
      if (search) {
        this.searchData = this.tableData.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return (
              String(product[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
    },
    openUserAdd() {
      this.$nextTick(() => {
        let form = this.$refs["role-router"];
        form.initPage();
      });
    },
    closeUserAdd() {
      this.selectedRoleId = ""
      this.selectedRole = {}
      this.dialogVisible = false;
    },
    getAllRoles() {
      roleAPI.getRole().then(res => {
        this.tableData = res.data.roleList;
      });
    }
  },
  mounted() {
    this.getAllRoles();
  }
};
</script>

<style scoped>
 .table {
    margin-top: 30px;
  }
</style>
