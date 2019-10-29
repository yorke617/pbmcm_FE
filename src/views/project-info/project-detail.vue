<template>
<!--  <div>-->
<!--    <MileStone></MileStone>-->
<!--  </div>-->
  <div class="page-wrapper">
    <div class="title_top">
      <div class="fall-back">
        <el-button type="primary" @click="back">返回</el-button>
      </div>
      <div class="obj_tit_mile">
        <b class="tit_deco">{{projectData.proNum}}项目里程碑</b>
      </div>
    </div>


    <div class="state_grade.process_wrap">
      <div  class="state_grade">
<!--        <mile-stone :projectId="projectData.proId" :projectName="projectData.proName" :proNum="projectData.proNum"></mile-stone>-->
        <div class="timeLine" style="overflow: hidden;">
          <div style="width: 10%; display: inline-block; margin-left: 5px;">
            <el-button @click="mileStoUpdateVisible = true" type="primary">编辑里程碑</el-button>
          </div>
          <div  style="width: 70%;display: inline-block" align="center">
            <div  style="width: 20%;display: inline-block; font-size: 14px;">里程碑状态：</div>
            <div  style="width: 100px;display: inline-block; font-size: 14px; ">开始 <img class="node_picture" src="../../assets/images/timeLineA.png"></div>

            <div style="width: 100px;display: inline-block; font-size: 14px;">超期 <img class="node_picture" src="../../assets/images/timeLineB.png"> </div>

            <div style="width: 100px;display: inline-block; font-size: 14px;">关闭 <img class="node_picture" src="../../assets/images/timeLineC.png"> </div>

          </div>

          <div class="my_timeline_prev" @click="moveLeft">
            <img src="../../assets/arrow_left_blue.png" class="my_timeline_node"/>
            <!--      <div class="my_timeline_item_line" style="margin-top: -18px;"></div>-->
            <!--      <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);">上</div>-->
          </div>
          <div v-if="destroyIncomeStatistics" class="ul_box">
            <ul class="my_timeline" ref="mytimeline" style="margin-left: 10px;">
              <li class="my_timeline_item" v-for="(item,index) in timeLineList" :key="index">

                <el-tooltip placement="top" effect="light">
                  <div slot="content" class="tooltip">
                    <el-row>
                      <el-col :span="24">{{'阶段名称：'+item.stageName}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">{{'阶段目标：'+item.stageTarget}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">{{'开始时间：'+item.startTime}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">{{'结束时间：'+item.endTime}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">{{'验收标准：'+item.acceptStar}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <span v-if="item.milepostState==='1'">里程碑状态：打开</span>
                        <span v-if="item.milepostState==='2'">里程碑状态：超期</span>
                        <span v-if="item.milepostState==='3'">里程碑状态：关闭</span>
                      </el-col>
                    </el-row>
                  </div>
                  <!--圈圈节点-->
                  <!--              <div class="my_timeline_node"  style="backgroundColor: #999; width: 28px;height: 28px;"  @click="changeActive(index)" :class="{active: index == timeIndex}"></div>-->
                  <div class="my_timeline_node">
                    <div style="background-color: #FCFCFC">
                      <img class="my_timeline_picture" v-if="item.milepostState==='1'"
                           src="../../assets/images/timeLineA.png">
                      <img class="my_timeline_picture" v-if="item.milepostState==='2'"
                           src="../../assets/images/timeLineB.png">
                      <img class="my_timeline_picture" v-if="item.milepostState==='3'"
                           src="../../assets/images/timeLineC.png">
                    </div>
                  </div>
                </el-tooltip>
                <!--线-->
                <div
                  :class="[timeLineList.length==index+1?my_timeline_item_line_last:my_timeline_item_line_not_last]"></div>
                <!--标注-->
                <div class="my_timeline_item_content">
                  <div>{{item.endTime}}</div>
                  <el-tooltip placement="top" effect="light">
                    <div slot="content">{{item.endTime}}<br/>{{item.stageName}}</div>
                    <div class="detail_info">{{item.stageName}}</div>
                  </el-tooltip>
                </div>
              </li>
            </ul>
          </div>
          <div class="my_timeline_next" @click="moveRight">
            <img src="../../assets/arrow_right_blue.png" class="my_timeline_node"/>
            <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);">下</div>
          </div>
        </div>
        <el-dialog :title="titleMessage" center :visible="mileStoUpdateVisible" width="50%"
                   @open="onMileStoUpdateVisibleOpen()" @close="closeMileStone()">
          <stone-detail :projectId="this.projectId" :proNum="this.projectData.proNum" @closeMileStone="closeMileStone()" ref="stone-detail"
                        @refreshMileStoneData="searchMileStone()"></stone-detail>
        </el-dialog>
      </div>
    </div>

    <div class="obj_tit_wrap">
      <b class="tit_deco">项目信息</b>
    </div>
<!--    <div class="project_content_warp" style="min-width: 800px;max-width: 1400px">-->
    <div class="project_content_warp">
      <el-form label-width="150px" align="left" ref="form"  :model="projectData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目编号:" prop="proNum" >
              <span class="project_info_span">{{projectData.proNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称:" prop="proName" >
              <span class="project_info_span">{{projectData.proName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="华为部门:" prop="hwDept" >
              <span class="project_info_span">{{projectData.hwDept}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

          <el-col :span="8">
            <el-form-item label="华为PO号:" prop="hwPo">
              <span class="project_info_span">{{projectData.hwPo}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商务模式:" prop="busineMode" >
              <span class="project_info_span" v-if="projectData.busineMode === '1' ">FP</span>
              <span class="project_info_span" v-else>TM</span>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="立项日期:" prop="buildProDate">
              <span class="project_info_span">{{projectData.buildProDate}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="开始日期:" prop="startDate" >
              <span class="project_info_span">{{projectData.startDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计结束日期:" prop="expEndDate">
              <span class="project_info_span">{{projectData.expEndDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="华为PO日期:" prop="hwPoDate" >
              <span class="project_info_span">{{projectData.hwPoDate}}</span>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="8">
            <el-form-item label="华为PO结束日期:" prop="hwPoEndDate">
              <span class="project_info_span">{{projectData.hwPoEndDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际结束日期:" prop="realEndDate" >
              <span class="project_info_span">{{projectData.realEndDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目经理:" prop="proManageId">
              <span class="project_info_span">{{projectData.proManageId}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

        <el-col :span="8">
          <el-form-item label="项目QA:" prop="proQa" >
            <span class="project_info_span">{{projectData.proQa}}</span>
          </el-form-item>
        </el-col>
          <el-col :span="8">
            <el-form-item label="华为合作PM:" prop="hwPm">
              <span class="project_info_span">{{projectData.hwPm}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目预计人数:" prop="proEstNum" >
              <span class="project_info_span">{{projectData.proEstNum}}</span>
            </el-form-item>
          </el-col>
      </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="项目状态:" prop="proState">
              <span class="project_info_span"  v-if="projectData.proState==='1'">预立</span>
              <span class="project_info_span"  v-else-if="projectData.proState==='2'">正常运行</span>
              <span class="project_info_span"  v-else-if="projectData.proState==='3'">超期运行</span>
              <span class="project_info_span"  v-else-if="projectData.proState==='4'">客户验收</span>
              <span class="project_info_span"  v-else-if="projectData.proState==='5'">关闭</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </div>


    <div class="obj_tit_wrap">
      <b class="tit_deco">项目人员</b>
    </div>
    <div class="project_job_add">
      <a href="javascript:void(0)" class="add_contain" @click="proPeoUpdateVisible=true">添加人员</a>
    </div>
    <div style="margin-left: -10px">
      <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <el-table :data="projectMember" :header-cell-style="tableHeaderColor"  >
        <el-table-column fixed type="index" label="序号" align='center'></el-table-column>
        <el-table-column prop="proRole" label="项目角色" align='center'></el-table-column>
        <el-table-column prop="peoId" label="人员" align='center'  sortable></el-table-column>
        <el-table-column prop="joinTime" label="入项时间" align='center' sortable></el-table-column>
        <el-table-column prop="keyRole" label="是否是关键角色" align='center'>
          <template slot-scope="scope">
            <span v-if="scope.row.keyRole === '1' ">是</span>
            <span v-if="scope.row.keyRole === '2' ">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="conOmp" label="是否录入OMP" align='center' >
          <template slot-scope="scope">
            <span v-if="scope.row.conOmp === '1' ">是</span>
            <span v-if="scope.row.conOmp === '2' ">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="conOmpKey" label="是否OMP骨干" align='center'>
          <template slot-scope="scope">
            <span v-if="scope.row.conOmpKey === '1' ">是</span>
            <span v-if="scope.row.conOmpKey === '2' ">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="skillDriection" label="技能方向" align='center' ></el-table-column>
        <el-table-column prop="ompLevel" label="OMP职级" align='center'></el-table-column>
        <el-table-column prop="membState" label="状态" align='center'>
<!--          <template slot-scope="scope">-->
<!--            <span v-if="scope.row.membState === '1' ">正常</span>-->
<!--            <span v-if="scope.row.membState === '2' ">长期休假</span>-->
<!--            <span v-if="scope.row.membState === '3' ">离项</span>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column fixed="right" label="操作" align='center' width="160">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="modifyChange(scope.row.proPeoId)">修改</el-button>
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
      </el-col>
    </div>

    <el-dialog :title="proPeoId?'修改人员信息':'新建人员信息'" center :visible="proPeoUpdateVisible" width="50%"
               @open="onMemberUpdateVisibleOpen()" @close="closeMemberAdd()">
      <member-detail :proPeoId="proPeoId" :projectId="projectData.proId" :proNum="projectData.proNum" @closeMemberAdd="closeMemberAdd()" ref="member-detail"
                     @refreshMemberData="search()"></member-detail>
    </el-dialog>
  </div>
</template>

<script>
    import API from '../../api/api_project';
    import StoneDetail from "../../components/project-info/stonedetail"
    import MemberDetail from "../../components/project-info/memberdetail.vue"
    export default {
        name: 'project-detail',
        components:{
            MemberDetail,
            StoneDetail,
        },
        data() {
            return {
                destroyIncomeStatistics:true,
                loading: false,
                titleMessage: '',
                mileStoUpdateVisible: false,
                my_timeline_item_line_last: "my_timeline_item_line_last",
                my_timeline_item_line_not_last: "my_timeline_item_line_not_last",

                menuTree:[],
                timeLineList: [],
                page:{
                    total:0,
                    pageNum: 0,
                    pageSize: 10,
                },
                model: {
                    select: "",
                    searchConent: "",
                    projectId: "",
                    proName:"",
                },
                projectData:{
                    proId: '',
                    proNum: '',
                    proName: '',
                    hwDept: '',
                    hwPo: '',
                    busineMode: '1',
                    buildProDate: '',
                    startDate: '',
                    expEndDate: '',
                    hwPoDate: '',
                    hwPoEndDate:'',
                    realEndDate: '',
                    proManageId:'',
                    proQa:'',
                    hwPm:'',
                    proEstNum: '0',
                    proState:'1'
                },
                proPeoId:'',
                projectId:'',
                proPeoUpdateVisible:false,
                projectMember: [],
            }
        },
        mounted(){
            this.projectId=this.$route.params.projectId

            this.searchMileStone()
            this.sortDataArray(this.timeLineList)
            //到数据库获取projectId对应的信息列表存入projectData
            API.getProjectInfo(this.projectId).then((data)=>{
                this.projectData=data.data;
                this.projectData.busineMode = this.projectData.busineMode.toString();
                this.projectData.proState = this.projectData.proState.toString();
            })
            this.search();
        },
        methods: {
            searchMileStone() {
                console.log('项目id：'+this.projectId)
                let params={
                    proId:this.projectId,
                };
                API.getMileStoneList(params).then(data => {
                    let result = data.data
                    if (result && result.list) {
                        if(this.timeLineList.length>0){
                            this.timeLineList.splice(0,this.timeLineList.length);
                        }
                        for(var i=0;i<result.list.length;i++){
                            this.timeLineList.splice(i, 1, result.list[i])
                        }
                        this.sortDataArray(this.timeLineList)
                    }

                },({msg})=>{
                    this.$message.error(msg);
                });
console.log('刷新里程碑列表')
console.log(this.timeLineList)
            },

            closeMileStone() {
                this.mileStoUpdateVisible = false;
                // this.projectId = '';
            },
            onMileStoUpdateVisibleOpen() {
                this.titleMessage = this.projectData.proNum + '项目里程碑';
                this.$nextTick(() => {
                    let form = this.$refs["stone-detail"];
                    form.initPage();
                });
            },
            changeActive(index) {
                this.timeIndex = index;
            },
            moveLeft() {
                let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
                let listNum = 0;

                if (Math.abs(marginLeft) > 10) {
                    this.$refs.mytimeline.style.marginLeft = marginLeft + 120 + 'px';
                }
            },
            moveRight() {
                let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
                if (marginLeft <= 10 && (marginLeft >= -(this.timeLineList.length * 120))) {
                    this.$refs.mytimeline.style.marginLeft = marginLeft - 120 + 'px';
                }
            },
//对数组根据日期进行排序
            sortDataArray(dataArray) {
                return dataArray.sort(function (a, b) {
                    return Date.parse(a.endTime.replace(/-/g, "/")) - Date.parse(b.endTime.replace(/-/g, "/"));
                })
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
                this.page.pageNum= 0;
                this.search();
            },

            // 更改表头样式
            tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #E4E7ED;color: #aaaa9;font-size: 13px;'
                }
            },
            closeMemberAdd(){
                this.proPeoId = ""
                this.proPeoUpdateVisible = false;
            },
            onMemberUpdateVisibleOpen(){
                this.$nextTick(() => {
                    // this.page.currentPage=0
                    let form = this.$refs["member-detail"];
                    form.initPage();
                });
            },
            modifyChange(proPeoId){
                this.proPeoId = proPeoId;
                this.proPeoUpdateVisible = true;
    },
            modifyDelete(row){
                this.$confirm('确认删除该员工吗?', '提示', {
                    confirmButtonClass: 'el-button--warning'
                }).then(() => {
                    API.deleteProjectMember(row.proPeoId).then((data)=>{
                        if (data.code == 200) {
                            this.$message.success("删除成功");
                            this.search();
                        } else {
                            this.$message.error(data.msg);
                        }
                    });
                }).catch(() => {});
            },
            //获取用户列表
            search() {
                let params = {
                    pageNum: this.page.pageNum,
                    pageSize: this.page.pageSize,
                    proId:this.projectId,
                };
                this.loading = true;
                API.getProjectMemberList(params).then(data => {
                    let result = data.data
                    this.loading = false;
                    if (result && result.list) {
                        this.projectMember = result.list
                        this.projectMember=this.sortByKey(this.projectMember, 'proPeoId');
                        this.page.pageNum = result.pageNum
                        this.page.pageSize = result.pageSize
                        this.page.total=result.total;
                    }
                },({msg})=>{
                    this.$message.error(msg);
                });
            },
            handleSelect(index) {
                this.defaultActiveIndex = index;
            },
            back() {
                this.$router.push('/project-info/project-list.vue')
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .content {
    height: 100px;
  }

  .my_timeline_next {
    float: left;
    display: inline-block;
    background-color: #FCFCFC;
    cursor: pointer;
  }

  .my_timeline_prev {
    width: 50px;
    float: left;
     margin-top: 110px;
  }

  .my_timeline_next {
    width: 34px;
    margin-top: 80px;
  }

  .el-col-24 {
    margin-left: 10px;
    padding-bottom: 5px;
  }

  .el-col-12 {
    margin-left: 10px;
  }

  .tooltip {

  }

  .ul_box {
    width: 80%;
    height: 120px;
    display: inline-block;
    float: left;
    margin-top: 50px;
    overflow: hidden;
  }

  .my_timeline_item {
    display: inline-block;
    width: 150px;
  }

  .my_timeline_node {
    background-color: #FCFCFC;
    box-sizing: border-box;
    border-radius: 50%;
    cursor: pointer;
    width: 40px;
    height: 40px;
  }

  .node_picture {
    //margin-top: 20px;
    height: 25px;
    width: 25px;
    margin-left: 5px;
    margin-bottom: -7px;
  }

  .my_timeline_picture {
    margin-top: 13px;
    height: 25px;
    width: 25px;
  }

  .my_timeline_node.active {
    background-color: #fff !important;
    border: 6px solid #f68720;
  }

  .my_timeline_item_line_last {
    width: 100%;
    height: 10px;
    margin: -14px 0 0 28px;
    border-left: none;
  }

  .my_timeline_item_line_not_last {
    width: 100%;
    height: 10px;
    margin: -14px 0 0 25px;
    border-top: 2px solid #E4E7ED;
    border-left: none;
  }

  .my_timeline_item_content {
    margin: 10px 0 0 -10px;
    width: 90%; /*根据自己项目进行定义宽度*/
    font-size: 14px;
  }

  .detail_info {
    width: 80%;
    height: 250px;
    padding-bottom: 50px;
    overflow: hidden; /*设置超出的部分进行影藏*/
    text-overflow: ellipsis; /*设置超出部分使用省略号*/
    white-space: nowrap; /*设置为单行*/
    font-size: 14px;
  }
  .state_grade.process_wrap{
    border-color: #e4ebf0;
    margin-top: 150px;
    border-radius: 2px;
    padding-bottom: 10px;
  }

  .fall-back {
    float:right;
    margin-right: 20px;
    margin-bottom:50px;
  }
  .state_grade{
    border: 1px solid #e6e6e6;
    background: #FCFCFC;
    padding: 10px;
    //position: relative;
    /*height: 90px;*/
    height: 250px;
    margin-bottom: 15px;
    /*margin-top: 15px;*/
  }
  .title_top{
    height: 33px;
  }
  .obj_tit_wrap{
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 3px;
    font-size: 14px;
  }

  .obj_tit_mile{
     width: 150px;
     height: 35px;
  }

  .tit_deco{
    color: #9a9a9a;
    font-size: 14px;
  }
  .add_contain{
    display:inline-block;
    padding-bottom: 10px;
    padding-top: 20px;
  }
  .project_content_warp{
    background: #fdfdfd;
    margin-bottom: 15px;
  }
  .project_job_add{
    padding-left: 30px;
    background: #FCFCFC;
    border-bottom: 1px solid #E5E5E5;
    line-height: 10px;
    margin-bottom: 15px;
    font-size: 14px;
  }
  .project_info_span{
    display:inline-block;
    padding-left: 10px;
  }

  .el-col-8{
    height: 50px;
  }
</style>
