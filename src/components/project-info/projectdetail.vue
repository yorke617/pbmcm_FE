<template>
  <div class="user-detail">
    <el-form label-width="150px" align="left" ref="form" :rules="rules" :model="model">
      <div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编号:"  prop="proNum" >
              <el-input v-model="model.proNum" placeholder="请输入项目编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称:" prop="proName">
              <el-input v-model="model.proName" placeholder="请输入项目名称"></el-input >
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="华为部门:" prop="hwDept">
              <el-input v-model="model.hwDept" placeholder="请输入华为部门"></el-input>
            </el-form-item>
          </el-col>
        <el-col :span="12">
          <el-form-item label="华为PO号:" prop="hwPo">
            <el-input v-model="model.hwPo" placeholder="请输入华为PO号" ></el-input>
          </el-form-item>
        </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="商务模式:" prop="busynessMode">
              <el-select v-model="model.busineMode" placeholder="请选择商务模式" style="width: 100%">
                <el-option
                  v-for=" list in busynessMode_list"
                  :key="list.ref_id"
                  :label="list.ref_value"
                  :value="list.ref_key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="立项日期:" prop="buildProDate" >
              <el-date-picker
                style="width: 100%"
                type="date"
                :editable="false"
                v-model="model.buildProDate"
                placeholder="选择日期时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="开始日期:" prop="startDate" >
              <el-date-picker
                type="date"
                style="width: 100%"
                :editable="false"
                v-model="model.startDate"
                placeholder="选择日期时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

        <el-col :span="12">
          <el-form-item label="预计结束日期:" prop="expEndDate" >
            <el-date-picker
              v-model="model.expEndDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="华为PO日期:" prop="hwPoDate" >
              <el-date-picker
                style="width: 100%"
                type="date"
                :editable="false"
                v-model="model.hwPoDate"
                placeholder="选择日期时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="华为PO结束日期:" prop="hwPoEndDate">
              <el-date-picker
                type="date"
                style="width: 100%"
                :editable="false"
                v-model="model.hwPoEndDate"
                placeholder="选择日期时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="实际结束日期:" prop="realEndDate">
              <el-date-picker
                type="date"
                style="width: 100%"
                :editable="false"
                v-model="model.realEndDate"
                placeholder="选择日期时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目经理:" prop="proManageId">
              <el-input v-model="model.proManageId" placeholder="请输入项目经理id"></el-input >
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="项目QA:" prop="proQa">
              <el-input v-model="model.proQa" placeholder="请输入项目QA"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="华为合作PM:" prop="hwPm">
              <el-input v-model="model.hwPm" placeholder="请输入华为合作PM"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="项目预计人数:" prop="proEstNum">
              <el-input v-model="model.proEstNum" placeholder="请输入项目预计人数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目状态:" prop="proState">
              <el-select v-model="model.proState" placeholder="请输入项目状态" style="width: 100%">
                <el-option
                  v-for=" item in proState_list"
                  :key="item.ref_id"
                  :label="item.ref_value"
                  :value="item.ref_key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div style=" width: 300px; height: 60px; margin:0 auto">
          <el-button @click="close()" style="width: 100px">取消</el-button>
          <el-button type="primary" @click="submit()" style="width: 100px">提交</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
    import API from '../../api/api_project';
    export default {
        name: "projectDetail",
        props:['projectId'],
        watch: {
            'projectId':{
                // projectId，所以每次都能监听到变化
                immediate:true,
                handler:function(val){
                    if(!val) return;
                    this.onProjectIdChange(val);
                }
            }
        },
        mounted(){
            var busynessMode_list=[{
                ref_id: "1",
                ref_value:'FP',
                ref_key:'1'

            },
                {
                    ref_id: "2",
                    ref_value:'TM',
                    ref_key:'2'
                }];
            var proState_list=[{
                ref_id: "1",
                ref_value:'预立',
                ref_key:'1'

            }, {
                    ref_id: "2",
                    ref_value:'正常运行',
                    ref_key:'2'
                }, {
                ref_id: "3",
                ref_value:'超期运行',
                ref_key:'3'
            }, {
                ref_id: "4",
                ref_value:'客户验收',
                ref_key:'4'
            }, {
                ref_id: "5",
                ref_value:'关闭',
                ref_key:'5'
            }];
            localStorage.setItem('busynessMode_list', JSON.stringify(busynessMode_list));
            localStorage.setItem('proState_list', JSON.stringify(proState_list));
        },
        data(){
            return{
                busynessMode_list: [],
                proState_list: [],
                model:{
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
                rules: {
                    proId: [
                        {required: true, message: '请输入项目id', trigger: 'change'},
                    ],
                    proNum: [
                        {required: true, message: '请输入项目编号', trigger: 'change'},
                    ],
                    proEstNum:[
                        {message: "请输入数字", pattern: /^[0-9]*$/}
                    ],
                    proManageId:[
                        {message: "请输入数字", pattern: /^[0-9]*$/},
                    ],
                    proQa:[
                        {message: "请输入数字", pattern: /^[0-9]*$/},
                    ],
                },

            }
        },
        methods:{
            submit: function(){
                this.$refs.form.validate((valid) => {
                  if(!valid)
                  {
                      this.$message.error('请填写正确信息');
                      return;
                  }
                    if(!this.projectId){
                        API.addProject(this.model).then(data => {
                            if (data.code == 200) {
                                this.$message.success(data.msg);
                                this.$message.success("新增成功");
                                this.close();
                                this.refreshData();
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    }else{
                        console.log(this.model)
                        let param={
                            proId:this.model.proId,
                            proMemb:this.model
                        }
                        API.updateProject(param).then(data => {
                            if (data.code == 200) {
                                this.$message.success(data.msg);
                                this.$message.success("修改成功");
                                this.close();
                                this.refreshData();
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    }
                });
            },
            close(){
                this.$emit("closeProjectAdd");
            },
            refreshData(){
                this.$emit("refreshData");
            },
            onProjectIdChange(id){
                // revert
                if(id){
                    console.log(id)
                    API.getProjectInfo(id).then((data)=>{
                        this.model = data.data;
                        this.model.busineMode = this.model.busineMode.toString();
                        this.model.proState = this.model.proState.toString();
                    })
                }
            },
            /**
             * dialog打开时调用的方法
             */
            initPage() {
                this.busynessMode_list = JSON.parse(localStorage.getItem("busynessMode_list"));
                this.proState_list = JSON.parse(localStorage.getItem("proState_list"));
                console.log(this.projectId)
                if(this.projectId){
                    this.onProjectIdChange(this.projectId);
                }else{
                    this.model = {};
                    this.model = {
                        busineMode: "1",
                        proState:'1'
                    }

                }
            }
        }
    }
</script>

<style scoped>
  .user-detail{
    margin-bottom: 10px;
  }
</style>
