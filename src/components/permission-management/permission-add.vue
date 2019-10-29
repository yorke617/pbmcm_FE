<template>
  <div>
    <el-form ref="form" :model="model" label-width="80px">
      <el-form-item label="工号">
        <el-input v-model="model.userId"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="model.userName"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="chooseRoles" @change="handleCheckedRolesChange">
          <el-checkbox
            v-for=" role in roleList"
            :key="role.roleId"
            :label="role.roleId">
            {{role.roleName}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="showNewRecords">确 定</el-button>
      </span>
  </div>
</template>

<script>
    import API from '../../api/api_user_role'
    import APIROLE from '../../api/api_role'
    export default {

        props: ['userId', 'userName'],
        watch: {
            'userId': {
                // 因为userID是值类型，所以每次都能监听到变化
                immediate: true,
                handler: function (val) {
                    if (!val) return;
                    this.onUserIdChange(val);
                }
            }
        },
        data() {
            return {
                roleList: [],
                isIndeterminate: true,
                checkAll: false,
                chooseRoles: [],
                model: {
                    userId: "",
                    userName: ""
                }
            }
        },
        methods: {
            onUserIdChange(id) {
                // revert
                if (id) {
                    let personInfo = JSON.parse(localStorage.getItem('user-role') || '[]')
                    this.model.userId = personInfo.userId
                    this.model.userName = personInfo.userName
                    this.chooseRoles=personInfo.chooseRoles
                    this.handleCheckedRolesChange(this.chooseRoles)
                }
            },
            handleCheckAllChange(val) {
                this.chooseRoles = val ? this.roleList.map(c => c.roleId) : [];
                this.isIndeterminate = false;
            },
            handleCheckedRolesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.roleList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleList.length;
            },
            showNewRecords() {
                this.$refs.form.validate((valid) => {
                    if (!this.userId) {
                        let params = {
                            userName: this.model.userName,
                            personnelId: "952700",
                            password: '123456',
                            roleId: this.chooseRoles,
                            personnelName: '',
                            personnelTel: ''
                        }

                        API.addUserRole(params).then(data => {
                            this.close();
                            this.refreshData();
                            if (data.code == 200) {
                                this.$message.success(data.msg)
                                this.$message.success("新增成功");

                                this.userId = ""
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    } else {
                        let params = {
                            userId: this.model.userId,
                            userName: "",
                            personnelId: "",
                            password: "",
                            roleId: this.chooseRoles,
                            personnelName:"",
                            personnelTel : ""
                        }
                        API.updateUser(params).then(data => {
                            this.close();
                            this.refreshData();
                            if (data.code == 200) {
                                this.$message.success(data.msg)
                                this.$message.success("更新成功");
                            }else{
                                this.$message.error(data.msg);
                            }
                        }, ({msg}) => {
                            this.$message.error(msg);
                        });
                    }
                }, ({msg}) => {
                    this.$message.error(msg)
                });
            },
            getRoles(){
                APIROLE.getRole().then(data => {
                    if(data.success){
                        this.roleList = data.data.roleList;
                    }else {
                        this.$message.error(data.msg)
                    }
                });
            },
            /**
             * dialog打开时调用的方法
             */
            initPage() {
                this.getRoles()
                if (this.userId) {
                    this.onUserIdChange()
                } else {
                    this.model = {}
                    this.chooseRoles = [];
                }
            },
            refreshData() {
                this.$emit("refreshData");

            },
            close() {
                this.model.userId = "";
                this.model.userName = "";
                this.chooseRoles = [];
                this.$emit("closeUserAdd");
            },

        },
        created() {
            if (this.userId) {
                this.onUserIdChange()
            }
        }
    }
</script>

<style scoped>
</style>
