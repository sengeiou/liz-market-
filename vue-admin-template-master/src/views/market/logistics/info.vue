<template>
  <div class="Page Confirm">

    <form name="flowForm" id="flowForm" method="post" action="">
      <!-- 数据表格 -->
      <el-descriptions class="margin-top" title="订单信息" v-model="orderInfo"
                       :column="3" :size="size" border :content-style="CS" :label-style="LS">
        <template slot="extra">
          <el-button type="danger" size="small">移除</el-button>
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
            订单号
          </template>
          <el-tag>{{orderInfo.orderNo}}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-loading"></i>
            支付类型
          </template>
          <el-tag>{{ orderInfo.payType === 0 ? '支付宝' : '余额' }}</el-tag>
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
            收件人
          </template>
          <el-tag>{{orderInfo.userName}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            收获地址
          </template>
          <el-tag>{{orderInfo.receiverAddress}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            邮箱地址
          </template>
          <el-tag>{{orderInfo.userMail}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            用户ID
          </template>
          <el-tag>{{orderInfo.userId}}</el-tag>
        </el-descriptions-item>
      </el-descriptions><br/>
      <el-row>
        <router-link :to="'/logistics/'">
          <el-button type="primary"  icon="el-icon-back" style="float: right">返回</el-button>
        </router-link>

      </el-row>
    </form>
  </div>
</template>

<script>
import orderApi from '../../../api/market/order'

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
      active: 2
    }
  },
  created() {
    console.log("树脂666")
    if (this.$route.params) {
      this.orderNo = this.$route.params.orderNo
    }
    this.initOrderInfo()
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
    handleChange(value) {
      this.orderInfo.totalFee = parseFloat(this.singleFee * value).toFixed(2)
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

