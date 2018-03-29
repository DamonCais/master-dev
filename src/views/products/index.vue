<!-- Table -->
<template>
<div>
  <el-button type="text" @click="getUsers(true)">多选用户</el-button>
    <el-button type="text" @click="getUsers(false)">单选用户</el-button>
    <my-dialog @cancleSelect="cancleSelect" @userSelect="userSelect" :url="url"
     :params="params" title="用户选择" :dialogVisible="dialogVisible"
      :showData="showData" :multi="multi"  />
      <div>
        {{users}}
      </div>
<!-- Form -->

</div>

</template>

<script>
import myDialog from "@/base/myDialog"
import { doPost } from "@/api/api";
export default {
  data() {
    return {
      gridData: [],
      dialogVisible: false,
      multipleSelection: [],
      users: [],
      picked: "",
      multi:false,
      url:"/Product.find",
      params:{ 
        page: 1,
        pageSize:10,
      },
      showData:[
        {prop:'_id',label:'id',width:120,type:'string'},
        {prop:'name.en',label:'name',width:120,type:'string'},
        {prop:'image.url',label:'image',width:120,type:'image'},
        {prop:'view',label:'view product',width:120,type:'button',url:'xxxProduct/'},
      ]
    };
  },
  methods: {
    getUsers(val) {
      this.multi = val;
      this.dialogVisible = true;
    },
    userSelect(val) {
      this.users = val;
    },
    cancleSelect(){
      this.dialogVisible = false;
    },
  },
  components:{
    myDialog,
  }
};
</script>

<style lang="scss" scoped>
.table {
  max-height: 600px;
}
</style>
