<template>
  <section class="data-form">
    <el-form
      ref="data-form"
      label-width="80px"
      :inline="true"
      :rules="rules"
      label-position="right"
      :model="model"
      v-show="isActive"
      class="search-wrapper"
    >
      <div ref="inputs" class="inputs">
          <slot name="inputs"></slot>
      </div>
      <div class="operate-button" >
        <el-form-item ref="operate-button">
            <el-button type="primary" @click="submitForm" v-if="hiddenSearch">搜索</el-button>
            <el-button type="primary" plain @click="resetForm" v-if="hiddenReset">重置</el-button>
          </el-form-item>
      </div>
    </el-form>
    <div class="black"></div>
    <div @click="isActive = !isActive" class="search-expand-btn">
      <div class="expand-btn-bg">
        <span>
          <!-- {{`${isActive ? '收起' :'更多'}搜索`}} -->
          <i class="el-icon-caret-bottom"></i>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["rules", "model", "hiddenSearch","hiddenReset"],
  data() {
    return {
      showCollapseIcon: true,
      showCollapseContext: true,
      isActive: true,
      inputs: "",
    };
  },
  methods: {
    resetForm() {
      this.$emit("resetForm")
    },
     /**
   * 提交输入表单
   */
    submitForm() {
      const dataForm = this.$refs['data-form'];
      dataForm.validate((success) => {
        if (!success) {
          return;
        }
        this.onSearch();
      });
    },

    onSearch(){
      this.$emit("onSearch");
    },
  },
  beforeCreate() {
    const inputSlot = this.$slots.inputs
    if (!inputSlot) return
  },
  mounted() {
    this.inputs = this.$refs.inputs
  }

};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search-wrapper {
  background: #ffffff;
  margin-left: 0px;
  margin-top: -30px;
  border: 0px solid #dcddd1;
  margin-top: -5px;
}
.black{
  background: #ffffff;
  margin-top: 0px;
  height: 20px;
}
.inputs {
    display: inline-block;
}

.search-expand-btn {
  position: absolute;
  left: 50%;
  width: 90px;
  text-align: center;
  perspective: 200px;
  text-align: center;
  background: #ffffff;
}

.operate-button{
  display: inline-block;
  margin-left: 10px;
  height: 40px;
}

.el-form-item__content{
  line-height:0px;
}

.el-range-editor.el-input__inner{
  padding: 0px;
}

.expand-btn-bg {
  position: absolute;
  width: 93px;
  height: 40px;
  left: 0;
  margin-top: -13px;
  text-align: center;
  background: #fff;
  -moz-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
  transform: rotateX(-60deg);
  z-index: 1;
}
</style>
