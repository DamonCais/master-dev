<template>
  <div>
      <el-row v-for="(items,index) in forms" :key="index" class="row">
          <el-col :span="item.span" v-for="(item,index) in items" :key="index">
              <el-col :span="item.lspan">
                    <span class="span">{{item.placeholder}}</span>
              </el-col>
              <el-col :span="item.ispan">
                    <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
              </el-col>
          </el-col>
      </el-row>
      <el-row>
          <el-button @click="onSubmit">提交</el-button>
      </el-row>
  </div>
</template>

<script>
export default {
  props: {
    forms: {
      type: Array,
      default: []
    }
  },
    methods:{
        onSubmit(){
            this.$emit("onSubmit",this.forms);
        }
    }
};
</script>

<style lang="scss" scoped>
.row{
    margin:10px auto;
    .span{
        height: 36px;
        line-height: 36px;
        text-align: center;
    }
}

</style>

