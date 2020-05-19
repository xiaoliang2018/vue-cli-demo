<template>
  <div class="home">
    <div>{{userData}}221</div>
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
