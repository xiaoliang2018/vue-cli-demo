<template>
  <div class="home">
		<ul id="main">
			<li><router-link  to="/echartDemo1" >demo1</router-link></li>
			<li><router-link  to="/echartDemo2">demo2</router-link></li>
			<li><router-link  to="/echartDemo3">demo3</router-link></li>
      <li><router-link  to="/drag">拖拽</router-link></li>
		</ul>
    <!-- <div>{{userData}}</div>
    <button @click="synchronization">同步修改</button>
    <button @click="asynchronous">异步修改</button>
    <button v-if="$commonJs.isLogin()">111 </button> -->
  </div>
</template>

<script>



export default {
  name: 'Home',
  data(){
    return {
      userData:[],
    }
  },
  mounted(){
    this.userData = this.$store.state.userData;
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
