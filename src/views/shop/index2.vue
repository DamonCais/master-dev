
<template>
    <div>
        <el-card class="box-card">
            <my-form :forms="forms" :width="500" :edit="edit" @onSubmit="onSubmit"/>
            <div class="text item">
                <div class="btn">
                    <el-button type="primary" v-if="!edit" @click="edit=true">EDIT</el-button>
                    <el-button type="primary" v-if="edit" @click="edit=false">SAVE</el-button>
                    <el-button type="danger" v-if="edit" @click="cancel">CANCEL</el-button>
                    <el-button v-if="showMore" @click="showMore=false" icon="el-icon-arrow-down">SHOW LESS</el-button>
                    <el-button v-if="!showMore" @click="showMore=true" icon="el-icon-arrow-up">SHOW MORE</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>



<script>
import QRCode from "qrcodejs2";
import { getShopById } from "@/api/table";
import myForm from "./shopForm";
export default {
  created() {
    this.storeId = this.$route.params.id;
    this.qrcodeUrl = "http://localhost:9528/#/shop/" + this.$route.params.id;
    this.formsbak = this.forms;
    this._getShopById();
  },
  data() {
    return {
      storeId: "",
      forms: [
        [
          {
            value: "",
            label: "URL Keyword",
            span: 12,
            type: "input",
            key: "URL Keyword"
          }
        ],
        [
          {
            value: "",
            label: "Status",
            span: 12,
            type: "select",
            key: "Status",
            options: [
              { label: "All", value: "All" },
              { label: "unverified", value: "unverified" },
              { label: "verified", value: "verified" }
            ]
          }
        ],
        [
          {
            value: "",
            label: "Transaction Fee",
            span: 12,
            type: "input",
            key: "Transaction Fee"
          }
        ],
        [
          {
            value: "",
            label: "Primary Language",
            span: 12,
            type: "select",
            key: "Primary Language"
          }
        ],
        [
          {
            value: "",
            label: "Cross Border Seller",
            span: 12,
            type: "select",
            key: "Cross Border Seller"
          }
        ]
      ],
      edit: false,
      showMore: false,
      cancelflag: false
    };
  },
  methods: {
    cancel() {
      this.cancelflag = true;
      this.edit = false;
    },
    _getShopById() {
      getShopById(this.storeId).then(res => {
        this.data = res.data;
        console.log(res.data);
      });
    },
    onSubmit(val) {
      if (this.cancelflag) {
        this.forms = this.formsbak;
        return;
      }
      console.log(val);
      console.log(this.formsbak);
      console.log(this.forms);
      this.forms = val;
      this.cancelflag = true;
    }
  },
  components: {
    myForm
  }
};
</script>
<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 20px 30px;
}
.btn {
  width: 50%;
  display: flex;
  justify-content: space-around;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
