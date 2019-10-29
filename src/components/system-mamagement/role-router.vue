<template>
  <el-form :model="form" :rules="rules" ref="form">
    <el-row>
      <el-col :span="24">
        <el-form-item label="角色" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="form.roleName" maxlength="30"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.roleDes" maxlength="200"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-tree
          :data="funsTreeList"
          ref="permissionTree"
          show-checkbox
          node-key="permissId"
          highlight-current
          default-expand-all
          :default-checked-keys="checkedList"
          :props="defaultProps">
        </el-tree>
      </el-col>
      <!--      </el-col>-->
    </el-row>
    <div style="width: 200px; height: 60px; margin: 0 auto">
      <el-button @click="close()">取 消</el-button>
      <el-button type="primary" @click="addRole()">确 定</el-button>
    </div>
  </el-form>
</template>

<script>
    import API from '../../api/permission_req';
    import roleAPI from '../../api/api_role';

    export default {
        props: ["selectedRole"],
        name: "roleRouter",
        computed: {

        },
        data() {
            return {
              form: {
                  roleId: '',
                  roleName: '',
                  roleDes: ''
              },
              rules:{
                roleName:[{required: true, message: '请输入角色名称', trigger: 'changed'}]
              },
              formLabelWidth: '80px',
              funsTreeList:[],
              checkedList:[],
              defaultProps: {
                  children: 'childFunctionTree',
                  label: "permissName"
              }
            }
        },
        methods: {
          close() {
              this.checkedList = [];
              this.$emit("closeUserAdd");
          },
          refreshData() {
              this.$emit("refreshData");
          },
          addRole(){
            return this.$refs.form.validate((valid) => {
              if (!valid) {
                return false;
              }else {
                this.submit();
              }
            })
          },
          getPermissionArray(checkedPermissions, permissionArray){
              for (var i = 0; i < checkedPermissions.length; i++){
                permissionArray[permissionArray.length] = checkedPermissions[i].permissId
                if (checkedPermissions.childFunctionTree != null && checkedPermissions.childFunctionTree.length != 0) {
                  getPermissionArray(checkedPermissions.childFunctionTree, permissionArray)
                }
              }
          },
          submit() {
            let checkedPermissions = this.$refs.permissionTree.getCheckedNodes()
            if(checkedPermissions == null || checkedPermissions.length == 0){
              this.$message.error("请选择相应的菜单权限！");
              return false;
            }
            let permissionArray = []
            this.getPermissionArray(checkedPermissions,permissionArray);
            let params = {
                funList: permissionArray,
                role: this.form
            }
            if (!this.form.roleId) {
              roleAPI.addRole(params).then(re => {
                  this.$message.success("新增角色成功！");
                  this.close();
                  this.refreshData();
              })
            }else {
              roleAPI.updateRole(this.form.roleId, {"funList":permissionArray}).then(re => {
                this.$message.success("更新角色成功！");
                this.close();
                this.refreshData();
              })
            }
         
          },
          /**
           * 加载所有菜单信息
           * 构建菜单树
           */
          getPermissions(){
            API.getAllPermissions().then(re => {
              if (re.success){
                this.form = this.selectedRole;
                this.funsTreeList = re.data.funsTreeList;
              } else{
                this.$message.error(re.msg);
              }
            })
          },
          getCheckedList(roleId){
              API.getPermissionsByRole(roleId).then(res => {
                if (res.success){
                  this.checkedList = res.data;
                }else{
                  this.$message.error(res.msg);
                }
              })
          },
          
          initPage(){
            this.getPermissions();
            if(this.selectedRole && this.selectedRole.roleId){
               this.getCheckedList(this.selectedRole.roleId)
            }else{
              this.form = {};
              this.checkedList = []
            }
          }
        }
    
    }
</script>

<style scoped>

</style>
