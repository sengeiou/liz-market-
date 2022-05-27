<template>
  <div class="Page Confirm">
    <el-steps :active="active" finish-status="success">
      <el-step title="我的购物车"></el-step>
      <el-step title="完善订单信息"></el-step>
      <el-step title="提交订单信息"></el-step>
    </el-steps>


    <form name="flowForm" id="flowForm" method="post" action="">
      <!-- 数据表格 -->


      <el-descriptions class="margin-top" title="订单信息" v-model="orderInfo"
                       :column="3" :size="size" border :content-style="CS" :label-style="LS">
        <template slot="extra">
          <el-button type="primary" size="small">撤销</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            图片
          </template>
          <a target="_blank" :href="'/goods/'+ orderInfo.goodsId">
            <el-image :src="orderInfo.goodsCover" style="width: 150px; height: 120px" :fit="fill">
            </el-image>
          </a>

        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-goods"></i>
            商品名
          </template>
          {{ orderInfo.goodsName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-order"></i>
            购买数量
          </template>
          <el-input-number v-model="orderInfo.goodsNum" @change="handleChange" :min="1" :max="100" label="购买数量">
          </el-input-number>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-loading"></i>
            订单状态
          </template>
          <el-tag>{{ orderInfo.status === 0 ? '未支付' : '已支付' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            收获地址
          </template>
          <el-select v-model="orderInfo.receiverAddress" placeholder="收获地址">
            <el-option
              v-for="detail in userDetailList"
              :key="detail.id"
              :label="detail.otherAddress"
              :value="detail.otherAddress">
            </el-option>
          </el-select>
        </el-descriptions-item>
      </el-descriptions>

      <div class="Finish">
        <div class="fr" id="AgreeDiv">

          <label for="Agree"><p class="on"><input type="checkbox" checked="checked">我已阅读并同意<a href="javascript:" target="_blank">《荔枝商城购买协议》</a></p></label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/goods/'+orderInfo.goodsId">返回商品详情</a>
          </div>
          <div class="fr">
            <p>共 <strong class="red">{{orderInfo.goodsNum}}</strong> 件商品，合计<span class="red f20">￥<strong
              id="AllPrice">{{orderInfo.totalFee}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <button class="fr redb" type="button" id="submitPay" @click="toPay()">去支付</button>
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
      fill: 'cover',
      CS: {
        'text-align': 'center',  //文本居中
        'min-width': '250px',   //最小宽度
        'word-break': 'break-all'  //过长时自动换行
      },
      LS: {
        'text-align': 'center',
        'font-weight': '600',
        'height': '150px',
        'min-width': '110px',
        'word-break': 'keep-all'
      },
      listLoading: true,
      orderNo: '',
      orderInfo: {
        id: '',
        orderNo: '',
        goodsId: '',
        goodsName: '',
        goodsCover: '',
        userId: '',
        goodsNum: 1,
        userName: '',
        userMail: '',
        totalFee: '',
        payType: 0,
        status: 0,
        receiverAddress: ''
      },
      singleFee: '', //单价
      userDetailList: [],
      active: 2
    }
  },
  created() {
    if (this.$route.params && this.$route.params.oid) {
      this.orderNo = this.$route.params.oid
    }
    this.initOrderInfo()
    this.initDetailList()
  },

  methods: {
    //初始化订单信息
    initOrderInfo() {
      orderApi.getOrderInfo(this.orderNo)
        .then(response => {
          this.orderInfo = response.data.orderInfo
          this.singleFee = this.orderInfo.totalFee
        })
    },
    initDetailList() {
      userApi.getDetailList()
        .then(response => {
          this.userDetailList = response.data.detailList
        })
    },
    handleChange(value) {
      // this.orderInfo.goodsNum = value
      this.orderInfo.totalFee = parseFloat(this.singleFee * value).toFixed(2)
    },
    //支付
    toPay() {
      orderApi.updateOrderInfo(this.orderInfo)
        .then(response => {
          this.$message({
            type: 'success',
            message: '完善订单信息成功'
          })
          this.$router.push({path: '/pay/' + this.orderInfo.orderNo})
        })
    }
  }
}
</script>
