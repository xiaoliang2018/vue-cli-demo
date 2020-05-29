<template>
  <div class="home">
		<ul id="main">
			<li><router-link  to="/echartDemo1" >demo1</router-link></li>
			<li><router-link  to="/echartDemo2">demo2</router-link></li>
			<li><router-link  to="/echartDemo3">demo3</router-link></li>
      <li><router-link  to="/drag">拖拽</router-link></li>
      <li><router-link  to="/selectQuery">查询条件</router-link></li>
		</ul>

    <div class="testClass">111</div>
    <!-- <div>{{userData}}</div>
    <button @click="synchronization">同步修改</button>
    <button @click="asynchronous">异步修改</button>
    <button v-if="$commonJs.isLogin()">111 </button> -->


  </div>
</template>
<style>
  .testClass{
    font-size:100px;
  }

</style>

<script>


import api from './../assets/js/api'
export default {
  name: 'Home',
  data(){
    return {
      userData:[],
    }
  },
  mounted(){
    this.userData = this.$store.state.userData;
    api.testAxios('546564564',(res)=>{  //测试api公共函数接口
      console.log(res)
    },(err)=>{
      console.log(err);
    })
    
  },
  methods:{
    synchronization(){
      this.$store.commit('updateName','同步修改名称')
    },
    asynchronous(){
      this.$store.dispatch('updateNameAjax','异步修改名称');
    }
  },
  components: {
  }
}
</script>
