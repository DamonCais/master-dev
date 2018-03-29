<template>
  <div style="width:100%;">
    <el-form label-position="right" label-width="30%">
        <el-row v-for="(items,index) in forms" :key="index">
            <el-col :span="item.span | fitSize(scale)"  v-for="(item,index) in items" :key="index">
                <el-form-item :label="item.label">
                    <span class="span" v-if="!edit">{{item.value}}</span>
                    <div v-if="edit">
                        <el-input v-if="item.type==='input'" v-model="item.value"></el-input>
                        <el-select v-if="item.type==='select'" v-model="item.value" placeholder="请选择">
                            <el-option
                            v-for="option in item.options"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  created() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  data() {
      return{
        screenWidth: document.body.clientWidth,
        scale:1
      }
  },
  props: {
    forms: {
      type: Array,
      default: []
    },
    width: {
      type: Number,
      default: 400
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSubmit() {
        let obj = {};
        this.forms.forEach(items => {
            items.forEach(item => {
                obj[item.key]=item.value
            });
        });
      this.$emit("onSubmit", obj);
    }
  },
  filters:{
      fitSize(val,scale){
        return Math.min(24,val*scale);
      }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        if(this.screenWidth<800){
            this.scale=10;
        }else{
            this.scale = 1;
        }
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    },
    edit(){
        if(!this.edit){
            this.$emit('onSubmit',this.forms);
        }
    }
  },
  components:{

  }
};
</script>

<style lang="scss" scoped>
.span {
  padding: 0 20px;
}
.btn{
    margin:0 auto;
    text-align:center;
}
</style>

