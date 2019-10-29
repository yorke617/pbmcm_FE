<template>

  <div>
    <el-row>
      <el-col :span="23">
        <div style="margin-top: 10px">
          <el-tag effect="dark" style="font-size: 16px;width: 110px;text-align: center">里程碑</el-tag>
        </div>
      </el-col>
      <el-col :span="1">
        <img src="../../assets/images/add.png" style="width: 30px;height: 30px;margin-top: 10px" @click="addItems()"/>
      </el-col>
    </el-row>
    <hr/>

    <el-row style="text-align: center">
      <el-col :span="3">
        <el-tag style="width: 100%;font-size: 14px">序&#12288;号</el-tag>
      </el-col>
      <el-col :span="8">
        <el-tag style="width: 100%;font-size: 14px">阶段名称</el-tag>
      </el-col>
      <el-col :span="7">
        <el-tag style="width: 100%;font-size: 14px">起始时间</el-tag>
      </el-col>
      <el-col :span="5">
        <el-tag style="width: 100%;font-size: 14px">结束时间</el-tag>
      </el-col>
    </el-row>

    <el-form label-width="100px" align="left" ref="form"  style="text-align: left;" :model="model">
      <div v-for="(item, index) in model.timeLineList" :key="index">
        <el-row>
          <el-col :span="3">
            <input style="text-align: center" class="el-input__inner" type="text" v-model="index" disabled="true">
          </el-col>
          <el-col :span="8">
            <input placeholder="请输入阶段名称" style="text-align: center" class="el-input__inner" type="text"
                   v-model="item.stageName">
          </el-col>
          <el-col :span="6">
            <el-date-picker
              style="width: 100%"
              type="date"
              :editable="false"
              v-model="item.startTime"
              placeholder="请选择起始时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>

          </el-col>
          <el-col :span="6">
            <el-date-picker
              style="width: 100%"
              type="date"
              :editable="false"
              v-model="item.endTime"
              placeholder="请选择结束时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <input placeholder="阶段目标" style="text-align: center;" class="el-input__inner" type="text" disabled="true">
          </el-col>
          <el-col :span="20">
            <el-input v-model="item.stageTarget" placeholder="请输入阶段目标"></el-input>
            <!--          <textarea placeholder="请输入阶段目标" v-model="item.stageTarget" style="height: 30px;" class="el-input__inner" type="text"></textarea>-->
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <input placeholder="验收标准" style="text-align: center;" class="el-input__inner" type="text" disabled="true">
          </el-col>
          <el-col :span="20">
            <el-input v-model="item.acceptStar" placeholder="请输入验收标准"></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="3">
            <input placeholder="里程碑状态" style="text-align: center;" class="el-input__inner" type="text" disabled="true">
          </el-col>
          <el-col :span="20">
            <template>
              <el-select v-model="item.milepostState" placeholder="请选择">
                <el-option
                  v-for="item in milepostStateList"
                  :key="item.ref_id"
                  :label="item.ref_value"
                  :value="item.ref_id">
                </el-option>
              </el-select>
            </template>
          </el-col>

          <el-col :span="1">
            <img src="../../assets/images/delete.png" style="width: 30px;height: 30px" @click="deleteItems(index)"/>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div style="text-align: center;margin-top: 30px">
      <el-button type="primary" @click="submit()">确认修改</el-button>
    </div>
  </div>


</template>

<script>
    import API from '../../api/api_project';

    export default {
        name: "stoneDetail",
        props: ['projectId', 'proNum'],
        watch: {
            'proId': {
                // projectId，所以每次都能监听到变化
                immediate: true,
                handler: function (val) {
                    if (!val) return;
                    this.onProjectIdChange(val);
                }
            }
        },
        data() {
            return {
                proId:'',
                milepostStateList: [{
                    ref_id: "1",
                    ref_value: '打开',
                    ref_key: '1'
                }, {
                    ref_id: "2",
                    ref_value: '超期',
                    ref_key: '2'
                }, {
                    ref_id: "3",
                    ref_value: '关闭',
                    ref_key: '3'
                }],
                deleteList: [],
                model: {
                    timeLineList: [],
                },

            }
        },
        methods: {
            /**
             * 提交修改的信息
             */
            submit: function () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        this.$message.error('请填写正确信息');
                        return;
                    }


                    console.log('编辑里程碑结果：')
                    console.log(this.model.timeLineList)

                    let proMileposts = this.model.timeLineList

                    API.updatetMileStone(proMileposts).then(data => {
                        if (data.code == 200) {
                            this.$message.success("修改成功");
                            this.refreshMileStoneData();
                            this.close();
                        } else {
                            this.$message.error(data.msg);
                            // this.close();
                        }
                    })


                });
            },
            close() {
                this.$emit("closeMileStone");
                this.proId=''
                this.model.timeLineList.splice(0,this.model.timeLineList.length)
            },
            refreshMileStoneData() {
                this.$emit("refreshMileStoneData");

            },
            addItems() {
                this.model.timeLineList.push({
                    milepostId:'',
                    proId: this.proId,
                    stageName: '',
                    startTime: this.addDate(),
                    endTime: this.addDate(),
                    stageTarget: '',
                    acceptStar: '',
                    deliverableName: '',
                    milepostState: '1',
                });

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
            deleteItems(index) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    confirmButtonClass: 'el-button--warning'
                }).then(() => {
                    if(this.model.timeLineList[index].milepostId)
                    {
                        API.deleteMileStone(this.model.timeLineList[index].milepostId).then(data=>{
                            if(data.code===200)
                            {
                                this.$message.success("删除成功");
                                this.model.timeLineList.splice(index, 1);
                                this.refreshMileStoneData();
                            }else {
                                this.$message.error(data.msg);
                            }
                        })
                    }
                    else{
                        this.model.timeLineList.splice(index, 1);
                    }

                }).catch(() => {});


            },
            onProjectIdChange(id) {
                this.model.timeLineList.splice(0,this.model.timeLineList.length)
                // if (id) {
                    let params={
                        proId:id,
                    };
                    API.getMileStoneList(params).then(data => {
                        let result = data.data
                        if (result && result.list) {
                            for(var i=0;i<result.list.length;i++){
                                this.model.timeLineList.splice(i, 1, result.list[i])
                            }
                        }
                    }, ({msg}) => {
                        this.$message.error(msg);
                    });
                // }
                console.log('dailog打开里程碑列表')
                console.log(this.model.timeLineList)
            },
            initPage() {
                  this.proId=this.projectId;
                if (this.proId) {
                    this.onProjectIdChange(this.proId);
                }

            }
        },
    }
</script>

<style scoped>

</style>
