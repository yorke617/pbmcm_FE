<template>
  <div class="user-detail">
    <el-form label-width="150px" align="left" ref="form" :rules="rules" :model="model">
      <div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目角色:" prop="proRole" >
              <el-select v-model="model.proRole" placeholder="请选择项目角色" style="width: 100%">
                <el-option
                  v-for=" list in proRole_list"
                  :key="list.ref_id"
                  :label="list.ref_value"
                  :value="list.ref_key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人员:"  prop="peoId" >
              <el-input v-model="model.peoId" placeholder="请输入人员" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="入项时间:" prop="joinTime" >
              <el-date-picker
                style="width: 100%"
                type="date"
                :editable="false"
                v-model="model.joinTime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否录入OMP:" prop="conOmp">
              <el-select v-model="model.conOmp" placeholder="请选择是否录入OMP" style="width: 100%">
                <el-option
                  v-for=" list in yesOrNo_list"
                  :key="list.ref_id"
                  :label="list.ref_value"
                  :value="list.ref_key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="是否OMP骨干:" prop="ompBackbone">
              <el-select v-model="model.conOmpKey" placeholder="请选择是否OMP骨干" style="width: 100%">
                <el-option
                  v-for=" list in yesOrNo_list"
                  :key="list.ref_id"
                  :label="list.ref_value"
                  :value="list.ref_key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否是关键角色:" prop="keyRole">
              <el-select v-model="model.keyRole" placeholder="请选择角色" style="width: 100%">
                <el-option
                  v-for=" list in yesOrNo_list"
                  :key="list.ref_id"
                  :label="list.ref_value"
                  :value="list.ref_key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="技能方向:" prop="skillDriection" >
              <el-input v-model="model.skillDriection" placeholder="请输入技能方向" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="OPM职级:" prop="ompLevel" >
              <el-input v-model="model.ompLevel" placeholder="请输入OPM职级" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="人员状态:" prop="membState" >
              <el-select v-model="model.membState" placeholder="请选人员状态" style="width: 100%">
                <el-option
                  v-for=" list in memberState_list"
                  :key="list.ref_id"
                  :label="list.ref_value"
                  :value="list.ref_key"
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
        name: "memberDetail",
        props:['proPeoId','projectId','proNum',],
        watch: {
            'proPeoId':{
                // proProId，所以每次都能监听到变化
                immediate:true,
                handler:function(val){
                    if(!val) return;
                    this.onMemberIdChange(val);
                }
            }
        },
        data(){
            return{
                proRole_list:[{
                    ref_id: "1",
                    ref_value:'PM',
                    ref_key:'1'
                },{
                    ref_id: "2",
                    ref_value:'QA',
                    ref_key:'2'
                },{
                    ref_id: "3",
                    ref_value:'MDE',
                    ref_key:'3'
                },{
                    ref_id: "4",
                    ref_value:'PL',
                    ref_key:'4'
                },{
                    ref_id: "5",
                    ref_value:'SE',
                    ref_key:'5'
                },{
                    ref_id: "6",
                    ref_value:'DE',
                    ref_key:'6'
                },{
                    ref_id: "7",
                    ref_value:'TSE',
                    ref_key:'7'
                },{
                    ref_id: "8",
                    ref_value:'TE',
                    ref_key:'8'

                }],
                memberState_list:[{
                    ref_id: "1",
                    ref_value:'正常',
                    ref_key:'1'
                },{
                    ref_id: "2",
                    ref_value:'长期休假',
                    ref_key:'2'
                },{ref_id: "3",
                    ref_value:'离项',
                    ref_key:'3'
                }
                ],
                yesOrNo_list: [{
                    ref_id: "1",
                    ref_value:'是',
                    ref_key:'1'
                },{
                    ref_id: "2",
                    ref_value:'否',
                    ref_key:'2'
                }],
                nowDate:'',
                model:{
                    proPeoId:'',
                    proId:"",
                    peoId:"",
                    joinTime:"",
                    keyRole:"",
                    conOmp:"",
                    conOmpKey:"",
                    proRole:"",
                    skillDriection:"",
                    ompLevel:"",
                    membState:"",
                },
                rules: {
                    peoId: [
                        {required: true, message: '请输入人员', trigger: 'change'},
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
                        this.$message.error('请完善信息');
                        return;
                    }

                    if(!this.proPeoId){
                        API.addProjectMember(this.model).then(data => {
                            console.log('添加人员this.model');
                            console.log(this.model);
                            console.log(data);
                            this.close();
                            this.refreshData();
                            if (data.code == 200) {
                                this.$message.success(data.msg);
                                this.$message.success("新增成功");
                                this.close();
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    }else{
                        let param={
                            proPeoId:this.proPeoId,
                            proMemb:this.model
                        }
                        API.updateProjectMember(param).then(data => {
                            console.log('修改人员：========')
                            console.log(this.model)
                            this.close();
                            this.refreshData();
                            if (data.code == 200) {
                                this.$message.success(data.msg);
                                this.$message.success("修改成功");
                                // this.close();
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    }
                });
            },
            close(){
                this.$emit("closeMemberAdd");
            },
            refreshData(){
                this.$emit("refreshMemberData");
            },
            onMemberIdChange(id){
                // revert
                if(id){
                    API.getMemberInfo(id).then((data)=>{
                        Object.assign(this.model, data.data)
                        this.model.keyRole = this.model.keyRole.toString();
                        this.model.conOmp = this.model.conOmp.toString();
                        this.model.conOmpKey = this.model.conOmpKey.toString();
                        this.model.membState = this.model.membState.toString();
                    })
                }
            },
            addDate() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
            /**
             * dialog打开时调用的方法
             */
            initPage() {
                if(this.proPeoId){
                    this.onMemberIdChange(this.proPeoId);
                }else{
                    this.model = {
                        proId:this.projectId,
                        keyRole:"2",
                        conOmp:"2",
                        conOmpKey:"2",
                        membState:"1",
                        proRole:'6',
                        joinTime:this.addDate(),
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
