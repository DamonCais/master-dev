<template>
    <div class="oheader">
        <div class="wrapper">
                <my-dialog @cancleSelect="cancleSelect" @userSelect="userSelect" :url="url"
                    :params="params" title="用户选择" :dialogVisible="dialogVisible"
                    :showData="showData" :multi="multi"  />
                <div class="elInput">
                </div>
                <div class="elInput">
                    <input  @focus="inputFocus" @blur="inputBlur" v-model="users" />
                    <label :class="!dialogVisible&&users.length===0?'blur':'focus'">Customer</label>
                </div>
        </div>
        <div class = "wrapper">
            <div class="elSelect">
                <label>OrderStatus</label>
                <el-select  v-model="form.oStatus" placeholder="请选择">
                    <el-option
                    v-for="item in orderStatus"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="elSelect">
                <label>paymentStatus</label>
                <el-select v-model="form.pStatus" placeholder="请选择">
                    <el-option
                    v-for="item in paymentStatus"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="elSelect">
                <label>shippingStatus</label>
                <el-select v-model="form.sStatus" placeholder="请选择">
                    <el-option
                    v-for="item in shippingStatus"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="wrapper">
            <div class="elDate">
                <el-select v-model="form.dType" placeholder="请选择">
                    <el-option
                    v-for="item in dateTypes"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <el-date-picker
                v-model="form.date"
                type="daterange"
                format="yyyy/MM/ dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="elSwitch">
                <el-switch
                @change="onSwitch"
                v-model="form.archivedStatus"
                active-text="Show Unfiled"
                inactive-text="Show Archived">
                </el-switch>
            </div>
        </div>
        <div class="wrapper">
            <div class="elButton">
                <el-button  @click="onSubmit" type="primary" icon="el-icon-search">搜索</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import myDialog from "@/base/myDialog";
export default {
  props: {
    form: {
      type: Object,
      default: function() {
        return {
          Store: "",
          Customer: "",
          status: "All",
          paymentStatus: "All",
          shippingStatus: "All",
          dType: "Ordered At",
          date: "",
          archivedStatus: false
        };
      }
    }
  },
  data() {
    return {
      orderStatus: ["All", "open", "closed"],
      paymentStatus: ["All", "pending", "paid", "failed", "completed"],
      shippingStatus: ["All", "unshipped", "shipped", "received"],
      dateTypes: ["Ordered At", "Paid At", "Refunded At"],
      dialogVisible: false,
      users: [],
      multi: false,
      url: "/User.find",
      params: {
        page: 1
      },
      showData: [
        { prop: "_id", label: "id", width: 120 },
        { prop: "name", label: "name", width: 120 }
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
    cancleSelect() {
      this.dialogVisible = false;
    },
    onSubmit() {
      let filters = {};
      this.form.paymentStatus;
      this.$emit("onSubmit", this.form);
    },
    onSwitch() {
      this.$emit("onSubmit", { archivedStatus: this.form.archivedStatus });
    },
    inputFocus(e) {
      // if (!e.target.value) {
      //   let label = e.target.nextElementSibling;
      //   label.style.color = "red";
      //   label.style["font-size"] = "10px";
      //   label.style.transform = "translate3d(0,-28px,0)";
      // }
      this.getUsers(true);
    },
    inputBlur(e) {
      // if (!e.target.value && !this.dialogVisible) {
      //   let label = e.target.nextElementSibling;
      //   label.style.color = "#999";
      //   label.style["font-size"] = "16px";
      //   label.style.transform = "translate3d(0,0,0)";
      // }
    }
  },
  components: {
    myDialog
  }
};
</script>

<style lang="scss" scoped>
.oheader {
  margin: 16px auto;
  padding: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  .wrapper {
    display: flex;
    margin: 10px 0;
    justify-content: flex-start;
  }
  .elInput {
    margin: 10px 0;
    flex: 1;
    padding-right: 10px;
    position: relative;
    .focus {
      color: red;
      font-size: 10px;
      transform: translate3d(0, -28px, 0);
    }
    .blur {
      color: #999;
      font-size: 16px;
      transform: translate3d(0, 0, 0);
    }
    label {
      font-size: 16px;
      position: absolute;
      color: #999;
      top: 20px;
      left: 0;
      transition: all 0.2s linear;
    }
  }
  .elSelect {
    margin: 5px 0;
    flex: 1;
    padding: 10px 5px 0 0;
    position: relative;

    label {
      position: absolute;
      top: -5px;
      font-size: 10px;
    }
    .el-select {
      width: 100%;
    }
  }
  .elDate {
    flex: 1;
    margin: 5px 0;
    padding: 10px 5px 0 0;
    .el-select {
      width: 150px;
    }
  }
  .elSwitch {
    float: right;
    align-items: center;
    padding: 20px 0;
  }
  .elButton {
    margin: 0 auto;
  }

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    height: 36px;
    margin-right: 10px;
  }
  input:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid black;
  }
}
</style>
