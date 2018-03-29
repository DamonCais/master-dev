<template>
  <div>
      this is editor
  </div>
</template>

<script>
export default {
  created(){
    // this.login();
  },
  // sockets:{
  //   'update':function(msg){
  //     console.log(msg);
  //   }
  // },
  methods:{
    login(){
      var data = {
        username:'damon',
        password:'admin'
      }
      this.$socket.emit('login', data);
    }
  }
}
</script>

<style>

</style>
