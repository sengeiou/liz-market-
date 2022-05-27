<template>
    <div class="app-container">
        <h2 style="text-align: center;">添加新的商品</h2>

        <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写添加商品基本信息"></el-step>
            <el-step title="填写商品的进阶信息"></el-step>
            <el-step title="最终发布"></el-step>
        </el-steps>

      <el-descriptions title="商品主体信息" direction="vertical" :column="4" border v-model="goodsInfo">
        <el-descriptions-item label="商品名">{{ goodsInfo.goodsName }}</el-descriptions-item>
        <el-descriptions-item label="品牌">{{ goodsInfo.brandName }}</el-descriptions-item>
        <el-descriptions-item label="价格" :span="2">{{ goodsInfo.price }} ￥</el-descriptions-item>
        <el-descriptions-item label="分类">
          <el-tag size="small">{{ goodsInfo.cateName }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="商品描述">{{ delHtmlTag(goodsInfo.description) }}</el-descriptions-item>
        <el-descriptions-item label="商品状态">
          <el-radio-group v-model="goodsInfo.isSale">
            <el-radio value="0" :label="0">未上架</el-radio>
            <el-radio value="1" :label="1">已上架</el-radio>
            <el-radio value="2" :label="2">已下架</el-radio>
          </el-radio-group>

        </el-descriptions-item>
        <el-descriptions-item label="库存数量">
          <el-input-number v-model="goodsInfo.stock" @change="handleChange" :min="1" :max="1000" label="描述文字"></el-input-number>
        </el-descriptions-item>
      </el-descriptions><br><br>

      <div class="el-form-item">
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </div>

    </div>
</template>

<script>
import goodsApi from '../../../api/market/goods'

export default {
    data() {
        return {
          goodsId: '',
          saveBtnDisabled: false,
          goodsInfo: {
            id: 0,
            goodsName: '',
            brandName: '',
            cateName: '',
            price: 0,
            description: '',
            isSale: 0, //0-未上架, 1-已上架, 2-已下架
            stock: 0, //库存
            cover: ''
          }
        }
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        this.goodsId = this.$route.params.id
      }
      this.initGoodsInfo()
    },
    methods: {
      initGoodsInfo() {
        goodsApi.queryGoods(this.goodsId)
          .then(response => {
            this.goodsInfo = response.data.goodsInfo
          })
      },

      previous() {
        this.$router.push({path: '/goods/info/' + this.goodsId})
      },
      next() {
        goodsApi.finalSubmitGoods(this.goodsInfo)
          .then(response => {
            this.$message({
              type: 'success',
              message: '最终完善信息成功'
            })
            this.$router.push({path: '/goods/publish/' + this.goodsId})
          })

      },
      handleChange(value) {
        console.log(value);
      },
      delHtmlTag (str) {
        return str.replace(/<[^>]+>/g, '')
      }
    }
}
</script>

<style scoped>
.el-form-item {
  text-align: center;
}
</style>
