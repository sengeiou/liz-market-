<template>
    <div class="app-container">

      <h2 style="text-align: center;">发布商品</h2>

      <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
        <el-step title="编写商品基本信息"></el-step>
        <el-step title="编写商品进阶信息"></el-step>
        <el-step title="最终发布"></el-step>
      </el-steps>

      <div class="ccInfo">
        <img :src="goodsInfo.cover">
        <div class="main">
          <h2>{{ goodsInfo.goodsName }}</h2>
          <p class="gray">
            <span>品牌: {{ goodsInfo.brandName }}</span>
          </p>
          <p>
            <span>所属分类: {{ goodsInfo.cateName }} </span>
          </p>
          <p>
            <span>
              商品描述: {{ delHtmlTag(goodsInfo.description) }}
            </span>
          </p>
          <p>
            <span>
              库存: {{ goodsInfo.stock }} 件
            </span>
          </p>
          <p v-if="goodsInfo.isSale === 0">
            状态: 未上架
          </p>
          <p v-else-if="goodsInfo.isSale === 1">
            状态: 已上架
          </p>
          <p v-else-if="goodsInfo.isSale === 2">
            状态: 已下架
          </p>
          <h3 class="red">价格: ￥ {{ goodsInfo.price }} </h3>
        </div>
      </div>

      <div>
        <el-button @click="previous">返回修改</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">确认发布</el-button>
      </div>
    </div>
</template>

<script>
import goodsApi from '../../../api/market/goods'

export default {
    data() {
        return {
          saveBtnDisabled: false,
          goodsId: '',
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
      this.getGoodsPublishInfo()
    },
    methods: {
      //根据课程id查询课程确认信息
      getGoodsPublishInfo() {
        goodsApi.getGoodsPublishInfo(this.goodsId)
          .then(response => {
            this.goodsInfo = response.data.goodsInfo
          })
      },
      delHtmlTag (str) {
        return str.replace(/<[^>]+>/g, '')
      },
      previous() {
        this.$router.push({path: '/goods/incr/' + this.goodsId})
      },
      publish() {
        goodsApi.publishGoods(this.goodsId)
          .then(response => {
            this.$message({
              type: 'success',
              message: '发布商品成功'
            })
            this.$router.push({ path: '/goods/list' })
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

