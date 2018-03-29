<template>
  <div>
    <my-form :forms="forms" :edit="false" :width="800" @onSubmit="onSubmit"/>
  </div>
</template>

<script>
import myForm from "@/base/myForm"
export default {
  data(){
    return{
      forms:[
        [{value:'sfsdf',label:'hello world',span:12},{value:'',label:'二',span:12}],
      ]
    }
  },
  methods:{
    onSubmit(val){
      console.log(val);
    }
  },
  components:{
    myForm
  }
}
</script>

<style>

</style>
