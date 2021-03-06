<template>
<div>
  <el-dialog 
    :before-close="handleClose"
    :title="title" 
    v-if="dialogVisible" 
    :visible.sync="visible"
    :show-close="false">
    <el-table 
      ref="multipleTable"
      class="table"
      :data="gridData"
      height="500"
      @select-all="handleSelectionChange"
      @select="handleSelectionChange">
      <!-- 单选框 -->
    <el-table-column width="55" v-if="!multi" fixed>
      <template slot-scope="scope">
          <input type="radio" name="select" v-model="picked" :value="scope.row['_id']" >
      </template>
    </el-table-column>
    <!-- 多选框 -->
    <el-table-column width="55"  type="selection"  v-if="multi" fixed>
    </el-table-column>

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

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="params.pageSize||10"
        :total="total">
      </el-pagination>
    </div>
    <!-- 操作按钮 -->
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancleSelect">取消</el-button>
        <el-button type="primary" @click="userSelect">确定</el-button>
    </div>
  </el-dialog>
</div>

</template>

<script>
import { doPost } from "@/api/api";
export default {
  props: {
    url: {
      type: String,
      default: ""
    },
    params: {
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: "GUZZU弹框"
    },
    showData: {
      type: Array,
      default: []
    },
    multi: {
      type: Boolean,
      default: false
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      gridData: [],
      multipleSelection: [],
      users: [],
      picked: "",
      visible: false,
      currentPage: 1,
      total: 0,
    };
  },
  filters: {
    deepGet(value,path){
      return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], value) || undefined;
    }
  },
  methods: {
    toUrl(val){
      //这个方法用来操作表格中的button选项
      console.log(val);
    },
    handleClose(done) {},//在点击模态框外时，不触发关闭事件
    //每次分页跳转时，查看哪些选项已被选中过，选中它们
    toggleSelection() {
      let obj = this.gridData.filter(
        d => this.multipleSelection[this.currentPage].indexOf(d._id) !== -1
      );
      obj.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    },
    //触发Ajax获得用户列表
    getUsers() {
      this.gridData = [];
      doPost(this.url, this.params).then(result => {
        this.total = result.data.total;
        this.gridData = result.data.results;
        if (!this.multipleSelection[this.currentPage]) return;
        setTimeout(() => {
          this.toggleSelection();
        }, 20);
      });
    },
    //确定按钮，把缓存中的multipleSelection 复制到users 传出
    userSelect() {
      this.visible = false;
      this.users = [];
      if (this.multi) {
        this.multipleSelection.forEach(element => {
          this.users.push(...element);
        });
      } else {
        this.users.push(this.picked);
      }
      this.$emit("userSelect", this.users);
    },
    //取消按钮
    cancleSelect() {
      this.visible = false;
      this.$emit("cancleSelect");
    },
    // 每次触发选中按钮时，把选中的值传入缓存multipleSelection中
    handleSelectionChange(val) {
      let arr = [];
      val.forEach(element => {
        arr.push(element._id);
      });
      this.multipleSelection[this.currentPage] = arr;
    },
    // 切换页面时，触发新的Ajax请求
    handleCurrentChange(val) {
      this.currentPage = val;
      this.params["page"] = this.currentPage;
      this.getUsers();
    }
  },
  watch: {
    //通过传入的dialogVisible触发更新，重置所以值
    dialogVisible() {
      if (this.dialogVisible) {
        this.visible = this.dialogVisible;
        this.params.page = 1;
        this.currentPage = this.params.page;
        this.multipleSelection = [];
        this.getUsers();
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.table {
  max-height: 600px;
}
.block {
  text-align: right;
  margin: 10px 10px 0 0;
}
</style>
