<template>
  <div class="page-wrapper">
    <search :rules="rules" :model="model" :hiddenReset="hiddenReset" @onSearch="search()" @resetForm="resetFrom()" :hiddenSearch="hiddenSearch">
      <template slot="inputs">
        <div style="margin-top: 20px">
          <el-form-item label="项目编号" prop="operateContent">
            <el-input v-model="model.proNum" placeholder="请输入项目编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="operatePeoId">
            <el-input v-model="model.proName" placeholder="请输入项目名称" clearable></el-input>
          </el-form-item>
          <el-form-item >
            <el-button  @click="projectUpdateVisible = true"  type="primary"  >新增项目</el-button>
          </el-form-item>
        </div>
      </template>
    </search>

    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">

<!--    <el-col :span="24" class="toolbar" style="padding-bottom: -10px;">-->
<!--      <el-form  ref="model" :inline="true" :model="model">-->
<!--        <el-form-item style="margin-top: -15px" prop="searchConent">-->
<!--          <el-col :span="12" style="margin-top: 5px">-->
<!--            <el-input v-model="model.searchConent" placeholder="请输入项目编号或项目名称" style="width: 450px"   @keyup.enter.native="handleSearch()" icon="el-icon-search">-->
<!--              <el-button slot="append" style="height: 32px;" size="small" icon="el-icon-search" @click="handleSearch" type="primary" plain></el-button>-->
<!--            </el-input>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
<!--        <el-form-item style="margin-top: -14px">-->
<!--          <el-button  style="margin-left: 1px " @click="resetButton()" >重置</el-button>-->
<!--          <el-button  @click="projectUpdateVisible = true"  type="primary" plain >新增项目</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-col>-->


<!--  列表数据  -->
    <el-table :data="projectData" v-loading="loading" :header-cell-style="tableHeaderColor" style="width: 100%;"  >
      <el-table-column fixed type="index" label="序号"  align='center'  width="50px"  ></el-table-column>
      <el-table-column prop="proNum" label="项目编号" align='left' width="120" sortable>
        <template slot-scope="scope">
          <el-button @click.native.prevent="detailRow(scope.row.proId)" type="text" >
            {{scope.row.proNum}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="proName" label="项目名称" align='center' width="200"></el-table-column>
      <el-table-column prop="hwDept" label="华为部门" align='center' width="150"></el-table-column>
      <el-table-column prop="hwPo" label="华为PO号" align='center' width="120" sortable></el-table-column>
      <el-table-column prop="busineMode" label="商务模式" align='center' width="120">
<!--        <template slot-scope="scope">-->
<!--          <span v-if="scope.row.busineMode === 1 ">FP</span>-->
<!--          <span v-if="scope.row.busineMode === 2 ">TM</span>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column prop="buildProDate" label="立项日期" align='center' width="120" sortable></el-table-column>
      <el-table-column prop="startDate" label="开始日期" align='center' width="120" sortable></el-table-column>
      <el-table-column prop="expEndDate" label="预计结束日期" align='center' width="140" sortable></el-table-column>
      <el-table-column prop="hwPoDate" label="华为PO日期" align='center' width="140" sortable></el-table-column>
      <el-table-column prop="realEndDate" label="华为PO结束日期" align='center' width="160" sortable></el-table-column>
      <el-table-column prop="proManageId" label="项目经理" align='center' width="120" sortable></el-table-column>
      <el-table-column prop="proQa" label="项目QA" align='center' width="120" ></el-table-column>
      <el-table-column prop="hwPm" label="华为合作PM" align='center' width="120" ></el-table-column>
      <el-table-column prop="proEstNum" label="项目预计人数" align='center' width="120" ></el-table-column>
      <el-table-column prop="proState" label="项目状态" align='center' width="120" >
<!--        <template slot-scope="scope">-->
<!--          <span v-if="scope.row.proState === 1 ">预立</span>-->
<!--          <span v-if="scope.row.proState === 2 ">正常运行</span>-->
<!--          <span v-if="scope.row.proState === 3">超期运行 </span>-->
<!--          <span v-if="scope.row.proState === 4 ">客户验收</span>-->
<!--          <span v-if="scope.row.proState === 5 ">关闭</span>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column fixed="right" label="操作" align='center' width="180">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="modifyChange(scope.row.proId)">修改</el-button>
          <el-button type="text" size="mini" @click="modifyDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog :title="projectId?'修改项目信息':'新建项目信息'" center :visible="projectUpdateVisible" width="50%" @open="onProjectUpdateVisibleOpen()" @close="closeProjectAdd()" >
      <project-detail :projectId="projectId" @closeProjectAdd="closeProjectAdd()" ref="project-detail" @refreshData="search()" ></project-detail>
    </el-dialog>

    </el-col>
  </div>
</template>

<script>
    import API from '../../api/api_project';
    import Search from "../../components/common/search.vue"
    import ProjectDetail from "../../components/project-info/projectdetail.vue"
    export default {
        components:{
            ProjectDetail,
            Search,
        },
        name: 'project-list',
        data() {
            return {
                loading: false,
                rules:{},
                hiddenReset: true,
                hiddenSearch: true,
                roles: {},
                page:{
                    total: 0,
                    pageNum: 1,
                    pageSize: 10,
                },
                model: {
                    proNum: "",
                    proName:"",
                },
                projectUpdateVisible:false,
                projectId:'',
                projectData:[]
            }
        },
        mounted() {
            this.search();
        },
        methods: {
            resetFrom(){
                this.model = {}
                this.page.pageNum = 1;
                this.page.pageSize = 10;
                this.search();
            },
            sortByKey(array,key){
                return array.sort(function(a,b){
                    var y = a[key];
                    var x = b[key];
                    return((x<y)?-1:((x>y)?1:0));
                })

            },
            handleCurrentChange(val) {
                this.page.pageNum = val ;
                this.search();
            },
            handleSizeChange(val) {
                this.page.pageSize = val;
                this.search();
            },
            handleSearch(){
                this.page.pageNum= 1;
                this.search();
            },
            // 更改表头样式
            tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #E4E7ED;color: #aaaa9;font-size: 13px;'
                }
            },
            modifyChange(proId){
                this.projectId = proId;
                this.projectUpdateVisible = true;
                },
            /**
             * 删除
             */
            modifyDelete(row){
                this.$confirm('确认删除该员工吗?', '提示', {
                    confirmButtonClass: 'el-button--warning'
                }).then(() => {
                    API.deleteProject(row.proId).then((data)=>{
                        if (data.code == 200) {
                            this.$message.success(data.msg);
                            this.$message.success("删除成功");
                            this.closeProjectAdd();
                            this.search();
                        } else {
                            this.$message.error(data.msg);
                        }
                    });
                }).catch(() => {});
            },
            //获取用户列表
            search() {
                // this.getRole();
                // let that = this;

                let params = {
                    pageNum: this.page.pageNum,
                    pageSize: this.page.pageSize,
                    proNum: this.model.proNum,
                    proName: this.model.proName,
                };
                this.loading = true;
                API.getProjectList(params).then(data => {
                    let result = data.data
                    this.loading = false;
                    if (result && result.list) {
                        this.projectData = result.list
                        this.projectData=this.sortByKey(this.projectData, 'proId');
                        this.page.pageNum = result.pageNum;
                        this.page.pageSize = result.pageSize;
                        this.page.total = result.total
                    }
                },({msg})=>{
                    this.$message.error(msg);
                });
            },
            closeProjectAdd(){
                this.projectId = ""
                this.projectUpdateVisible = false;
            },
            onProjectUpdateVisibleOpen(){
                this.$nextTick(() => {
                    // this.page.currentPage=0
                    let form = this.$refs["project-detail"];
                    form.initPage();
                });
            },
            detailRow(proId) {
                this.$router.push({ name: '项目详细信息', params: { projectId: proId}})
            },
            handleSelect(index) {
                this.defaultActiveIndex = index;
            },
        },


    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .span-style {
      color: #555;
      font-size: 14px;
    }

    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #373d41;
      padding: 0px;

      .topbar-btn {
        color: #fff;
      }

      /*.topbar-btn:hover {*/
      /*background-color: #4A5064;*/
      /*}*/
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }

      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }

      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }

      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 40px;
        /*border-left: 10px solid #000;*/
      }

      .topbar-account {
        float: right;
        padding-right: 12px;
      }

      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }

    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 50px;
      bottom: 0px;
      overflow: hidden;
    }

    aside {
      min-width: 50px;
      background: #333744;

      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #333744;
        border-right: 0px;
      }

      .el-submenu .el-menu-item {
        min-width: 60px;
      }

      .el-menu {
        width: 180px;
      }

      .el-menu--collapse {
        width: 60px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 46px;
        line-height: 46px;
      }

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }
    }

    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }

    .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      padding-bottom: 1px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>
