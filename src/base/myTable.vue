
<template>
<div>
  <el-table
    class="table"
    :data="tableData"
    height="650">
    <!-- 表格内容, showData 是传入的将要显示的内容 -->
    <el-table-column
      v-for="(item,index) in showData"
      :key="index"
      :sortable="item.sortable"
      :label="item.label"
      >
      <template slot-scope="scope">
        <div >
          <!-- 支持三种格式：1.String,2.Image,3.button 其中deepGet是实现lodash的get方法的filter-->
          <img v-if="item.type ==='image'" :src="scope.row|deepGet(item.prop)" alt="" style="width: 50px;height: 50px">
          <span v-if="item.type ==='string'">{{scope.row|deepGet(item.prop)}}</span>
          <el-button v-if="item.type ==='button'" @click="toUrl(item.url + scope.row._id)">{{item.prop}}</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>


<script>
import { getOrderList } from "@/api/api";
import { mapGetters } from "vuex";
export default {
 props: {
    tableData:{
        type: Array,
        default: [],
    },
    showData:{
        type: Array,
        default: [],
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.oheader {
  width: 90%;
  margin: 0 auto;
}
.table {
  /* margin:16px auto;
    padding:16px; */
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
    max-width: 90%;
    margin: 0 auto;
}
.block {
  margin: 20px 10%;
  float: right;
}
</style>
