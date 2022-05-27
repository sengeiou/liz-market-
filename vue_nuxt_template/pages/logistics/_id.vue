<template>

  <div class="Page Confirm">

    <form name="flowForm" id="flowForm" method="post" action="">
      <div>
        <el-link icon="el-icon-back" href="/logistics">返回物流列表</el-link>
      </div><br/>
      <el-container>
        <el-aside width="500px">
          <div style="height: 450px;">
            <el-steps direction="vertical" :active="num" finish-status="success">
              <el-step title="仓库发货"></el-step>
              <el-step title="正在备车"></el-step>
              <el-step title="正在派送"></el-step>
              <el-step title="已送达" description="请您及时签收"></el-step>
            </el-steps>
          </div>
        </el-aside>
        <el-main>
          <el-descriptions title="物流详情" direction="vertical" :column="3" border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-picture-outline"></i>
                商品图片
              </template>
              <a target="_blank" :href="'/goods/'+ logisticsInfo.goodsId">
                <el-image :src="logisticsInfo.goodsCover" style="width: 150px; height: 120px" :fit="fill">
                </el-image>
              </a>
            </el-descriptions-item>

            <el-descriptions-item label="商品名称">{{logisticsInfo.goodsName}}</el-descriptions-item>
            <el-descriptions-item label="物流公司" :span="2">
              <el-tag>{{this.company}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="物流方式">
              <el-tag>{{this.type}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="物流费">￥{{logisticsInfo.logisticsFee}}</el-descriptions-item>
            <el-descriptions-item label="收件人">{{logisticsInfo.receiver}}</el-descriptions-item>
            <el-descriptions-item label="收货地址">{{logisticsInfo.receiverAddress}}</el-descriptions-item>
            <el-descriptions-item label="发货时间">{{logisticsInfo.gmtCreate}}</el-descriptions-item>
            <el-descriptions-item label="完成时间">{{logisticsInfo.completeTime === null ? '未完成' : logisticsInfo.completeTime}}</el-descriptions-item>
          </el-descriptions><br/>
          <el-row>
            <el-tag v-if="this.logisticsInfo.completeTime != null" type="success" effect="dark">已收货</el-tag>
            <el-button type="success"
                       v-if="this.logisticsInfo.logisticsStatus === 3 && this.logisticsInfo.completeTime == null"
                       @click="confirmInfo">确认收货</el-button>
            <el-button v-if="this.logisticsInfo.logisticsStatus === 3" type="primary" style="float: right" icon="el-icon-right" @click="goToSalesPage">售后服务</el-button>
          </el-row>
        </el-main>
      </el-container>
    </form>

  </div>
</template>

<script>
import logisticsApi from "@/api/market/logistics/logistics";
import commentApi from "@/api/market/comment/comment";
import salesApi from "@/api/market/sales/sales";

export default {

  data() {
    return {
      num: 0,
      logisticsId: '',
      salesId: '',
      logisticsInfo: {
        id: '',
        orderNo: '',
        goodsId: '',
        goodsName: '',
        goodsCover: '',
        logisticsStatus: '',
        logisticsCompany: '',
        logisticsType: '',
        logisticsFee: '',
        receiverAddress: '',
        completeTime: '',
        receiver: '',
        gmtCreate: '',
      },
      company: '',
      type: '',
      needCommentDto: {
        goodsId: '',
        goodsIdList: []
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.logisticsId = this.$route.params.id
    }
    this.initLogisticsInfo()
  },
  methods: {
    confirmInfo() {
      logisticsApi.confirm(this.logisticsId)
        .then(response => {
          this.needCommentDto.goodsId = this.logisticsInfo.goodsId
          this.needCommentDto.goodsIdList = response.data.goodsIdList
          this.$message({
            type: 'success',
            message: '收货成功'
          })
          //向当前用户的可评价表插入一条【多条】信息
          commentApi.saveNeedComment(this.needCommentDto)
          this.$router.push({path: '/logistics'})
        })
    },
    initLogisticsInfo() {
      logisticsApi.getLogisticsInfoById(this.logisticsId)
        .then(response => {
          this.logisticsInfo = response.data.logisticsInfo
          this.num = this.logisticsInfo.logisticsStatus + 1
          switch (this.logisticsInfo.logisticsCompany) {
            case 0:
              this.company = "荔枝快递"
              break
            case 1:
              this.company = "油饼快递"
              break
            case 2:
              this.company = "树脂快递"
              break
          }
          switch (this.logisticsInfo.logisticsType) {
            case 0:
              this.type = "货车"
              break
            case 1:
              this.type = "高铁"
              break
            case 2:
              this.type = "飞机"
              break
          }
        })
    },
    goToSalesPage() {
      salesApi.createSalesInfo(this.logisticsInfo)
        .then(response => {
          this.$notify({
            type: 'success',
            message: '加载页面中'
          })
          this.salesId = response.data.salesId
          this.$router.push({path: '/sales'})
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
