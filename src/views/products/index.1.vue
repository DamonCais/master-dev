<!-- Table -->
<template>
<div>
  <el-button type="text" @click="getUsers(true)">多选用户</el-button>
    <el-button type="text" @click="getUsers(false)">单选用户</el-button>
  <el-dialog title="用户列表" :visible.sync="dialogVisible">
    <el-table 
    v-if="dialogVisible"
    class="table"
    :data="gridData"
     height="500"
     @selection-change="handleSelectionChange">
    <el-table-column width="55" v-if="!multi"
    fixed>
      <template slot-scope="scope">
        <div>
          <input type="radio" name="select" v-model="picked" :value="scope.row['_id']" >
       </div>
      </template>
      </el-table-column>
      <el-table-column width="55"  type="selection"  v-if="multi" fixed>
      </el-table-column>
      <el-table-column property="_id" label="id" width="150"></el-table-column>
      <el-table-column property="name" label="name" width="200"></el-table-column>
            <el-table-column property="_id" label="id" width="150"></el-table-column>
      <el-table-column property="name" label="name" width="200"></el-table-column>
            <el-table-column property="_id" label="id" width="150"></el-table-column>
      <el-table-column property="name" label="name" width="200"></el-table-column>
            <el-table-column property="_id" label="id" width="150"></el-table-column>
      <el-table-column property="name" label="name" width="200"></el-table-column>
      <!-- <el-table-column property="image" label="地址"></el-table-column> -->
    </el-table>
      <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="userSelect">确 定</el-button>

  </div>
</el-dialog>
      <div>
        {{users}}
      </div>
<!-- Form -->

</div>

</template>

<script>
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
    };
  },
  methods: {
    getUsers(val) {
      this.multi = val;
      this.dialogVisible = true;
      doPost("/User.searchByName", { partialName: "" }).then(result => {
        this.gridData = result.data;
      });
    },
    userSelect() {
      this.dialogVisible = false;
      this.users = [];
      if(this.multi){
        this.multipleSelection.forEach(element => {
          this.users.push(element._id);
        });
      }
      else{
        this.users.push(this.picked);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  max-height: 600px;
}
</style>
