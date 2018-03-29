<template>
<div class="table">
  <el-table
    :data="tableData"
    style="width: 100%"
    v-loading.body="listLoading"
    @sort-change="sortChange"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="店铺名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="URL关键字">
            <span>{{ props.row.slug }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ props.row.status }}</span>
          </el-form-item>
          <el-form-item label="服务手续费">
            <span >{{props.row.serviceConfig.percentPerOrder}}</span>%
          </el-form-item>
          <el-form-item label="推广员报酬">
            <span  v-if="props.row.storeConfig">{{ props.row.storeConfig.affiliatePercentPerOrder }}%</span>
          </el-form-item>
          <el-form-item label="跨境店家">
            <span>{{ props.row.isCrossBorderSeller }}</span>
          </el-form-item>
          <el-form-item label="地址">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      sortable='custom'
      label="名称"
      prop="name"
      >
      <template slot-scope="scope">
        <div @click="getShopById(scope.row['_id'])" type="text" size="small">
            <span style="display:block"> <el-tag type="success">zh</el-tag>{{scope.row['name'].zh}}</span>
            <span style="display:block"> <el-tag type="warning">en</el-tag>{{scope.row['name'].en}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
    sortable='custom'
      label="余额"
      prop="balance"
      >
    </el-table-column>
    <el-table-column
    sortable='custom'
      label="服务手续费"
      prop="serviceConfig.percentPerOrder" >
    </el-table-column>
    <el-table-column
    sortable='custom'
      label="状态"
      prop="status"
      :filters="[{text: 'draft', value: 'draft'}, {text: 'verified', value: 'verified'}, {text: 'published', value: 'published'}]"
      :filter-method="filterStatus"
      >
    </el-table-column>
    <el-table-column
    sortable='custom'
      label="创建时间"
      prop="createdAt">
    </el-table-column>
    <el-table-column
    sortable='custom'
      label="更新时间"
      prop="updatedAt">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="getShopById(scope.row['_id'])" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      layout="prev, pager, next"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
      :total="total">
    </el-pagination>
  </div>
  </div>
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
    padding: 16px 24px;
    color: rgba(0,0,0,0.87);
    background-color: rgb(250,250,250);
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
      console.log(val.prop);
      this.listQuery['sort'] = val.order==='descending'?'-'+val.prop:val.prop;
      this.currentPage = 1;
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      this.tableData = [];
      getShopList(this.listQuery).then(response => {

        this.tableData = response.data.results;
        console.log(this.tableData);
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
      this.$router.push({ path: `/shop/${id}` })
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

