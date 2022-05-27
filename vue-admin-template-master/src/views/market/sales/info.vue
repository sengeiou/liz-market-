<template>
  <div class="Page Confirm">

    <form name="flowForm" id="flowForm" method="post" action="">
      <!-- 数据表格 -->
      <el-descriptions class="margin-top" title="退货信息" v-model="salesInfo"
                       :column="3" :size="size" border :content-style="CS" :label-style="LS">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            图片
          </template>
          <a target="_blank" :href="'/goods/'+ salesInfo.goodsId">
            <el-image :src="salesInfo.goodsCover" style="width: 150px; height: 120px" :fit="fill">
            </el-image>
          </a>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-goods"></i>
            商品名
          </template>
          {{ salesInfo.goodsName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-info"></i>
            数量
          </template>
          <el-tag>{{salesInfo.goodsCount}} 件</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-coin"></i>
            金额
          </template>
          <el-tag type="danger">￥{{salesInfo.refundAmount}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-order"></i>
            订单号
          </template>
          {{salesInfo.orderNo}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-loading"></i>
            进度
          </template>
          <el-tag type="danger" v-if="salesInfo.isAccept === 0">未通过</el-tag>
          <el-tag v-if="salesInfo.isAccept === 1">审核中</el-tag>
          <el-tag type="success" v-if="salesInfo.isAccept === 2">已通过</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-loading"></i>
            状态
          </template>
          <el-tag v-if="salesInfo.isRevoke === 0">未撤回</el-tag>
          <el-tag type="danger" v-if="salesInfo.isRevoke === 1">已撤回</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            申请人
          </template>
          <el-tag>{{salesInfo.userName}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-chat-dot-round"></i>
            退货原因
          </template>
          {{salesInfo.reason}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            邮箱地址
          </template>
          <el-tag>{{salesInfo.userMail}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            收货时间
          </template>
          {{salesInfo.completeTime}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            用户ID
          </template>
          <el-tag>{{salesInfo.userId}}</el-tag>
        </el-descriptions-item>
      </el-descriptions><br/>
      <el-row>
        <router-link :to="'/sales/'">
          <el-button type="primary"  icon="el-icon-back" style="float: right">返回</el-button>
        </router-link>

      </el-row>
    </form>
  </div>
</template>

<script>
import salesApi from '../../../api/market/sales'
export default {
  data() {
    return {
      salesId: '',
      salesInfo: {},
    }
  },
  created() {
    if (this.$route.params && this.$route.params.salesId) {
      this.salesId = this.$route.params.salesId
      this.getSalesDetail()
    }
  },
  methods: {
    getSalesDetail() {
      salesApi.getSalesDetail(this.salesId)
        .then(response => {
          this.salesInfo = response.data.salesInfo
        })
    }
  }
}
</script>

<style scoped>

</style>
