
<template>
<div>
  <el-table
    class="table"
    :data="tableData"
    height="650">
    <el-table-column
      v-for="item in showData"
      :key="item.id"
      :sortable="item.sortable"
      :prop="item.prop"
      :label="item.label"
      :width="item.width">
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
