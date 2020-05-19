<template>
  <div class="home">
    <div>{{userData}}</div>
    <button @click="synchronization">同步修改</button>
    <button @click="asynchronous">异步3213123213修改</button>
  </div>
</template>

<script>



export default {
  name: 'Home',
  data(){
    return {
      userData:[]
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
