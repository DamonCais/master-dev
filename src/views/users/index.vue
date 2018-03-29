<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="用户名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="电子邮件"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="手机号码"
      >
    </el-table-column>
        <el-table-column
      prop="address"
      label="是否超级管理员"
      >
    </el-table-column>
        <el-table-column
      prop="address"
      label="创建时间"
      >
    </el-table-column>
  </el-table>
</template>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .block{
    margin: 10px 10px 0 0 ;
    float: right;
  }
  .table{
    margin:20px;
    border:1px solid black;
  }
</style>

<script>
import { getShopList } from '@/api/table'
  export default {
    data() {
      return {
        listQuery:{
          filters:{},
          page:1,
          pageSize:10,
          sort:"-createdAt"
        },
        listLoading: true,
        tableData:[],
        currentPage:1,
        total:0,
      }
    },
  created() {
    this.fetchData()
  },
  methods: {
    sortChange(val){
      this.listQuery['sort'] = val.order==='descending'?'-'+val.prop:val.prop;
      this.currentPage = 1;
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      this.tableData = [];
      getShopList(this.listQuery).then(response => {
        this.tableData = response.data.results;
        this.total = response.data.total;
        this.listLoading = false;
      })
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.listQuery['page'] = this.currentPage;
      this.fetchData();
    },
    getPer(value){
      console.log(value);

    },
    getShopById(id){
      this.$router.push({ path: `/example/shop/${id}` })
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    handleClick(e){
      console.log(e);
    }
  }
}
</script>

