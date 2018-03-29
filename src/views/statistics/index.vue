<template>
<div>
    <my-table :tableData="tableData" :showData="showData" />
</div>
</template>

<script>
import myTable from "@/base/myTable"
import { getOrderList } from "@/api/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      listQuery: {},
      form: {
            Store: "",
            Customer: "",
            status: "All",
            paymentStatus: "All",
            shippingStatus: "All",
            dType: "Ordered At",
            date: "",
            archivedStatus: false
      },
      listLoading: true,
      tableData: [],
      showData:[
        {id:0,sortable:'custom',prop:'refId',label:'订单号',width:120},
        {id:1,sortable:'custom',prop:'store.name.en',label:'店铺',width:120},
        {id:2,sortable:'custom',prop:'customer.name',label:'客户',width:120},
        {id:3,sortable:'custom',prop:'status',label:'状态',width:120},
        {id:4,sortable:'custom',prop:'paymentStatus',label:'支付状态',width:120},
        {id:5,sortable:'custom',prop:'shippingStatus',label:'物流状态',width:120},
        {id:6,sortable:'custom',prop:'createdAt',label:'下单时间',width:120},
        {id:7,sortable:'custom',prop:'paidAt',label:'支付时间',width:120},
      ],
      currentPage: 1,
      total: 0
    };
  },
  mounted() {
    this.listQuery = this.orders;

    this.fetchData();
  },
  methods: {
    search(form) {
      if (form.archivedStatus != undefined) {
        this.listQuery["filters"].isArchived = form.archivedStatus
          ? form.archivedStatus
          : {
              $ne: true
            };
      } else {
        this.listQuery["filters"]=form;
      }
      this.fetchData();
    },
    sortChange(val) {
      this.listQuery["sort"] =
        val.order === "descending" ? "-" + val.prop : val.prop;
      this.currentPage = 1;
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      this.tableData = [];
      this.$store.dispatch("setOrders", this.listQuery);
      getOrderList(this.listQuery).then(response => {
        this.tableData = response.data.results;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      // this.currentPage = val;
      // this.listQuery["page"] = this.currentPage;
      this.listQuery["page"] = val;
      this.fetchData();
    },
    getPer(value) {},
    getShopById(id) {
      this.$router.push({ path: `/example/shop/${id}` });
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    handleClick(e) {}
  },
  computed: {
    ...mapGetters(["orders"])
  },
  components: {
    myTable
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
}
.block {
  margin: 20px 10%;
  float: right;
}
</style>
