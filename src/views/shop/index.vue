
<template>
    <div>
        <el-card class="box-card">
        <div slot="header" class="clearfix" v-if="data['name']">
            <span style="display:block"><el-tag type="success">zh</el-tag>{{data['name'].zh}}</span>
            <span style="display:block"><el-tag type="success">en</el-tag>{{data['name'].en}}</span>
        </div>
        <div class="text item">
            <span class="topic">URL Keyword</span>      
            <span class="topic"  @click="showQrcode =!showQrcode">{{data.slug}}</span>
            <div v-show="showQrcode" id="qrcode"></div>
        </div>
        <div class="text item">
            <span class="topic">Status</span>      
            <span class="topic">{{data.status}}</span>
        </div>
        <div class="text item">
            <span class="topic">Transaction Fee</span>      
            <span class="topic" v-if="data['serviceConfig']">{{data['serviceConfig'].status}}/{{data['serviceConfig'].percentPerOrder}}%</span>
        </div>
        <div class="text item">
            <span class="topic">Permary Language</span>      
            <span class="topic">{{data['primaryLanguage']==='en'?'ENGLISH':'CHINESS'}}</span>
        </div>
        <div class="text item">
            <span class="topic">Cross Border Seller</span>      
            <span class="topic">{{data['isCrossBorderSeller']?'YES':'NO'}}</span>
        </div>
        <div class="text item">
            <span class="topic">Balance</span>      
            <span class="topic">{{data.balance}}</span>
        </div>
        <div class="text item">
            <span class="topic">Billing Balance</span>      
            <span class="topic">{{data.billingBalance}}</span>
        </div>
        <div class="text item">
            <span class="topic">Billing Credit</span>      
            <span class="topic">{{data.billingCredit}}</span>
        </div>
        <div class="text item">
            <div class="btn">
                <el-button type="primary" v-if="!edit" @click="edit=true">EDIT</el-button>
                <el-button type="primary" v-if="edit" @click="edit=false">SAVE</el-button>
                <el-button v-if="showMore" @click="showMore=false" icon="el-icon-arrow-down">SHOW MORE</el-button>
                <el-button v-if="!showMore" @click="showMore=true" icon="el-icon-arrow-up">SHOW LESS</el-button>
            </div>
        </div>
        <div v-show = "!showMore">
            <div class="text item">
                <span class="topic">Billing Credit</span>      
                <span class="topic">{{data.billingCredit}}</span>
            </div>
            <div class="text item">
                <span class="topic">Billing Credit</span>      
                <span class="topic">{{data.billingCredit}}</span>
            </div>
        </div>


        </el-card>
    </div>
</template>



<script>
import QRCode from 'qrcodejs2'; 
import {getShopById} from '@/api/table';
export default {
    created(){
        this.storeId  = this.$route.params.id;
        this.qrcodeUrl = 'http://localhost:9528/#/shop/'+ this.$route.params.id;
        this._getShopById();
    },
    data(){
        return{
            storeId:'',
            data:{},
            qrcodeUrl:'',
            showQrcode:false,
            showMore:true,
            edit:false,
        }
    },
    methods:{
        _getShopById(){
            getShopById(this.storeId).then(res=>{
                this.data = res.data;
                console.log(res.data);
                let qrcode = new QRCode('qrcode', {  
                    width: 100,  
                    height: 100, // 高度  
                    text: this.qrcodeUrl, // 二维码内容  
                    render: 'table' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                    // background: '#f0f'  
                    // foreground: '#ff0'  
                })  
            })
        },
    },
    // components:{
    //     Qrcode
    // }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    
  }
    .topic{
        width:200px;
        display: inline-block;
        line-height: 30px;
        height: 30px;
    }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin:20px 30px;
    width: 500px;

  }
  .btn{
      display: flex;
      justify-content: space-between;
  }
</style>
