<template>
  <div class="Page Confirm">
    <el-steps :active="3" finish-status="success">
      <el-step title="我的购物车"></el-step>
      <el-step title="完善订单信息"></el-step>
      <el-step title="提交订单信息"></el-step>
    </el-steps>

    <form name="flowForm" id="flowForm" method="post" action="">

      <el-container>
        <el-aside width="400px">
          <img :src="payDetailInfo.goodsCover">

        </el-aside>
        <el-main>
          <el-form ref="form" :model="payDetailInfo" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="payDetailInfo.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="收货人">
              <el-input v-model="payDetailInfo.userName"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址">
              <el-input v-model="payDetailInfo.userMail"></el-input>
            </el-form-item>
            <el-form-item label="收货地址">
              <el-select v-model="payDetailInfo.receiverAddress" placeholder="请选择收货地址">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="余额支付">
              <el-switch v-model="payDetailInfo.payType" :inactive-value="0" :active-value="1"></el-switch>
            </el-form-item>
            <!-- "物流方式 0-货车, 1-高铁, 2-飞机"-->
            <el-form-item label="物流方式">
              <el-radio-group v-model="payDetailInfo.logisticsType">
                <el-radio value="0" :label="0">货车</el-radio>
                <el-radio value="1" :label="1">高铁</el-radio>
                <el-radio value="2" :label="2">飞机</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 物流公司 0-荔枝快递, 1-油饼速递, 2-树脂快递-->
            <el-form-item label="物流公司">
              <el-radio-group v-model="payDetailInfo.logisticsCompany">
                <el-radio-button :label="0" value="0" >荔枝快递</el-radio-button>
                <el-radio-button :label="1" value="1" >油饼快递</el-radio-button>
                <el-radio-button :label="2" value="2" >树脂快递</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="所需运费">

              <el-tag type="success" v-model="payDetailInfo.logisticsFee">￥{{ (payDetailInfo.logisticsType + 1) * 10}}</el-tag>
            </el-form-item>
            <el-form-item label="其它备注">
              <el-input type="textarea" v-model="payDetailInfo.otherAttributes"></el-input>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">

          <label for="Agree"><p class="on"><input type="checkbox" checked="checked">我已阅读并同意<a href="javascript:" target="_blank">《荔枝商城购买协议》</a></p></label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">

          <div class="fl">
<!--            <a :href="'/goods/'+orderInfo.goodsId">返回商品详情</a>-->
          </div>
          <div class="fr">
            <p>共 <strong class="red">{{payDetailInfo.goodsNum}}</strong> 件商品，合计<span class="red f20">￥<strong
              id="AllPrice">{{payDetailInfo.totalFee}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <button class="fr redb" type="button" id="submitPay" @click="payNow()">立即支付</button>
        <div class="clear"></div>
      </div>
    </form>
  </div>

</template>

<script>
import orderApi from "@/api/market/order/order";
import userApi from "@/api/market/ucenter/user";

export default {

  data() {
    return {
      orderNo: '',
      payDetailInfo: {
        orderNo: '',
        goodsId: '',
        goodsName: '',
        goodsCover: '',
        goodsNum: '',
        userName: '',
        userMail: '',
        totalFee: 0.00,
        payType: 0, //
        receiverAddress: '', //收货地址
        logisticsType: 0, //物流方式
        logisticsCompany: 0, //物流公司
        logisticsFee: 0.00, //运费
        otherAttributes: '' //其他属性
      },
      userInfo: {
        id: '',
        nikename: '',
        email: '',
        isVip: false,
        accountBalance: 0.00
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.pid) {
      this.orderNo = this.$route.params.pid
    }
    this.initPayDetailInfo()
    this.initUserInfo()
  },
  methods: {
    initPayDetailInfo() {
      orderApi.initPayDetailInfo(this.orderNo)
        .then(response => {
          this.payDetailInfo = response.data.detailInfo
        })
    },
    initUserInfo() {
      userApi.getUserInfo()
        .then(response => {
          this.userInfo = response.data.userInfo
        })
    },
    //支付逻辑
    payNow() {
      this.$confirm('当前账户余额: ' + this.userInfo.accountBalance + "￥, 是否立即支付?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {

        this.$message({
          type: 'success',
          message: '支付成功!'
        })
        this.submitPay()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消支付'
        });
      });
    },
    //真正的支付方法
    submitPay() {
      this.payDetailInfo.logisticsFee = (this.payDetailInfo.logisticsType + 1) * 10
      orderApi.submitPay(this.payDetailInfo)
        .then(response => {
          this.$router.push({path: '/'})
        })
    }
  }
}
</script>

<style scoped>
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #DDD;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}

.ccInfo .main {
  margin-left: 520px;
}

.ccInfo .main h2 {
  font-size: 20px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}

.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main h3 {
  right: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>
