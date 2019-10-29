<template>
  <div class="page-wrapper">
    <search :rules="rules" :model="model" :inline="true">
      <template slot="inputs">
        <el-form-item>
          <el-col :span="12" style="margin-left: 10px;margin-top: 50px">
            <el-input placeholder="请输入姓名" style="width: 400px" @keyup.enter.native="handleSearch()" icon="el-icon-search" v-model="searchModel.userNameOrUserId">
               <el-button slot="append" style="height: 32px;" size="small" icon="el-icon-search" @click="handleSearch" type="primary" plain ></el-button>
            </el-input>
            </el-col>

          </el-form-item>
        <el-form-item style="margin-left:10px; margin-top: 45px">
          <el-button type="primary" @click="add()">新增</el-button>
          <el-button type="primary" plain @click="resetForm">重置</el-button>
        </el-form-item>
      </template>
    </search>

    <div class="table">
      <el-table
        :data="roleData"
        :header-cell-style="tableHeaderColor"
        style="width: 100%"
        stripe
        border
        max-height="470"
      >
        <el-table-column fixed type="index" label="序号" align="center" width="200"></el-table-column>
        <el-table-column prop="proUser.userId" label="工号" align="center" width="200"></el-table-column>
        <el-table-column prop="proUser.userName" label="姓名" align="center" width="200"></el-table-column>
        <el-table-column label="角色名称" align="left" sortable>
            <template slot-scope="scope">
            <span v-for=" item in scope.row.proRoleList">
              {{item.roleName+";"}}
            </span>
            </template>
        </el-table-column>
        <el-table-column fixed="right"  label="操作"  align="left">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="update(scope.row)" >修改</el-button>
            <el-button type="text" size="small"  @click= "deleted(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="userId?'修改权限':'新增权限'" :visible.sync="dialogVisible" @open="onUserUpdateVisibleOpen" @close="closeUserAdd()" width="40%">
      <permission-add :userId="userId" ref="permission-add" @refreshData="search" @closeUserAdd="closeUserAdd()"></permission-add>
    </el-dialog>
  </div>
</template>

<script>
  import PermissionAdd from "../../components/permission-management/permission-add"
  import search from "../../components/common/search.vue"
  import API from '../../api/api_user_role'
    export default {
        components:{
            PermissionAdd,
            search
        },
        data() {
            return {
                userId: "",
                dialogVisible:false,
                roleData: [],
                rules:{
                },
                model:{

                },
                personData: [],
                searchModel:{
                    userNameOrUserId:""
                },
            }

        },
        methods: {
            // 更改表头样式
            tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #f5f7fa;color: #9c9c9c;font-size: 13px;'
                }
            },
            resetForm() {
                this.searchModel.userNameOrUserId=""
                this.search()
            },
            add(){
                this.dialogVisible = true;
                //ajax后台请求新增
            },
            update(row){
                this.dialogVisible = true
                this.userId = row.proUser.userId

                this.personData={
                    userId: row.proUser.userId,
                    userName:row.proUser.userName,
                    chooseRoles:row.proRoleList.map(c => c.roleId)
                }
                localStorage.setItem('user-role', JSON.stringify(this.personData))
            },

            deleted(row){
                 this.$confirm('确认删除该纪录吗?', '提示', {
                     confirmButtonClass: 'el-button--warning'
                 }).then(() => {
                     //确认

                     let params = {
                         userId: row.proUser.userId
                     }

                     API.deleteUser(params).then(data=>{
                         if (data.code === 200)
                         {
                             this.$message.success(data.msg)
                             this.$message.success("删除成功")
                             this.search();
                         }
                         else
                         {
                             this.$message.error(data.msg);
                         }

                     },({ msg }) => {
                         this.$message.error(msg)
                     });
                 }).catch(() => {});
             },
             handleSearch(){

                 let params={
                     userNameOrUserId: this.searchModel.userNameOrUserId
                 }
                 API.searchUser(params.userNameOrUserId).then(data=> {
                     if (data.code === 200)
                     {
                         this.$message.success(data.msg)
                         this.$message.success("搜索成功")
                         this.roleData=data.data.usersAndRolesList;
                     }
                     else
                     {
                         this.$message.error(data.msg);
                     }
                 },({ msg }) => {
                     this.$message.error(msg)
                 });

             },

            closeUserAdd() {
                this.userId = ""
                this.dialogVisible = false;
            },
            onUserUpdateVisibleOpen() {
                this.$nextTick(() => {
                    let form = this.$refs["permission-add"];
                    form.initPage();
                });
            },
             //获取权限列表
             search: function () {
                 let that = this;
                 that.loading = true;
                 API.getUsers().then(data => {
                     let temp = data.data
                     if (temp && temp.usersAndRolesList) {
                         let result = temp.usersAndRolesList
                         this.roleData=result;
                     }
                 },({msg})=>{
                     this.$message.error(msg);
                 });
             },

         },
        mounted() {
            this.search()
        }
    }
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
</style>

<!--<style scoped lang="scss">-->
<!--  .container {-->
<!--    position: absolute;-->
<!--    top: 0px;-->
<!--    bottom: 0px;-->
<!--    width: 100%;-->

<!--    .span-style{-->
<!--      color: #555;-->
<!--      font-size: 14px;-->
<!--    }-->

<!--    .topbar-wrap {-->
<!--      height: 50px;-->
<!--      line-height: 50px;-->
<!--      background: #373d41;-->
<!--      padding: 0px;-->

<!--      .topbar-btn {-->
<!--        color: #fff;-->
<!--      }-->
<!--      /*.topbar-btn:hover {*/-->
<!--      /*background-color: #4A5064;*/-->
<!--      /*}*/-->
<!--      .topbar-logo {-->
<!--        float: left;-->
<!--        width: 59px;-->
<!--        line-height: 26px;-->
<!--      }-->
<!--      .topbar-logos {-->
<!--        float: left;-->
<!--        width: 120px;-->
<!--        line-height: 26px;-->
<!--      }-->
<!--      .topbar-logo img, .topbar-logos img {-->
<!--        height: 40px;-->
<!--        margin-top: 5px;-->
<!--        margin-left: 2px;-->
<!--      }-->
<!--      .topbar-title {-->
<!--        float: left;-->
<!--        text-align: left;-->
<!--        width: 200px;-->
<!--        padding-left: 40px;-->
<!--        /*border-left: 10px solid #000;*/-->
<!--      }-->
<!--      .topbar-account {-->
<!--        float: right;-->
<!--        padding-right: 12px;-->
<!--      }-->
<!--      .userinfo-inner {-->
<!--        cursor: pointer;-->
<!--        color: #fff;-->
<!--        padding-left: 10px;-->
<!--      }-->
<!--    }-->
<!--    .main {-->
<!--      display: -webkit-box;-->
<!--      display: -webkit-flex;-->
<!--      display: -ms-flexbox;-->
<!--      display: flex;-->
<!--      position: absolute;-->
<!--      top: 50px;-->
<!--      bottom: 0px;-->
<!--      overflow: hidden;-->
<!--    }-->

<!--    aside {-->
<!--      min-width: 50px;-->
<!--      background: #333744;-->
<!--      &::-webkit-scrollbar {-->
<!--        display: none;-->
<!--      }-->

<!--      &.showSidebar {-->
<!--        overflow-x: hidden;-->
<!--        overflow-y: auto;-->
<!--      }-->

<!--      .el-menu {-->
<!--        height: 100%; /*写给不支持calc()的浏览器*/-->
<!--        height: -moz-calc(100% - 80px);-->
<!--        height: -webkit-calc(100% - 80px);-->
<!--        height: calc(100% - 80px);-->
<!--        border-radius: 0px;-->
<!--        background-color: #333744;-->
<!--        border-right: 0px;-->
<!--      }-->

<!--      .el-submenu .el-menu-item {-->
<!--        min-width: 60px;-->
<!--      }-->
<!--      .el-menu {-->
<!--        width: 180px;-->
<!--      }-->
<!--      .el-menu&#45;&#45;collapse {-->
<!--        width: 60px;-->
<!--      }-->

<!--      .el-menu .el-menu-item, .el-submenu .el-submenu__title {-->
<!--        height: 46px;-->
<!--        line-height: 46px;-->
<!--      }-->

<!--      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {-->
<!--        background-color: #7ed2df;-->
<!--      }-->
<!--    }-->

<!--    .menu-toggle {-->
<!--      background: #4A5064;-->
<!--      text-align: center;-->
<!--      color: white;-->
<!--      height: 26px;-->
<!--      line-height: 30px;-->
<!--    }-->

<!--    .content-container {-->
<!--      background: #fff;-->
<!--      flex: 1;-->
<!--      overflow-y: auto;-->
<!--      padding: 10px;-->
<!--      padding-bottom: 1px;-->

<!--      .content-wrapper {-->
<!--        background-color: #fff;-->
<!--        box-sizing: border-box;-->
<!--      }-->
<!--    }-->
<!--  }-->
</style>
