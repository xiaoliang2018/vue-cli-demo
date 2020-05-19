<template>
  <div class="home">
    <div>{{userData}}223213232133211</div>
    <div>你好</div>
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
  components: {
  }
}
</script>
