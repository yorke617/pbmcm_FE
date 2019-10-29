<template>
    <div class="header-box">
    <div>
      <header>

      </header>
    </div>
  </div>
</template>

<script>
  import {bus} from '../bus.js'
  import API from '../api/api_user';

  export default {
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  
  .header-box {
    background: $head-bgc;
    background-image: -webkit-linear-gradient(#000, #121212);
    background-image: linear-gradient(#000, #121212);
    width: 100%;

  }
</style>
