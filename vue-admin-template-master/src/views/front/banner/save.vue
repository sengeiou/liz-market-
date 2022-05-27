<template>
  <el-form ref="bannerInfo" :model="bannerInfo" label-width="80px">
    <el-form-item label="轮播图名">
      <el-input v-model="bannerInfo.title"></el-input>
    </el-form-item>
    <el-form-item label="所属商品">
      <el-select v-model="bannerInfo.goodsId" placeholder="全部商品" >
        <el-option v-for="goods in goodsList"
                   :label=goods.goodsName
                   :value="goods.id"
                   :key="goods.id"></el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="排序字段">
      <el-input-number v-model="bannerInfo.sort" @change="handleChange" :min="1" :max="10" label="排序">
      </el-input-number>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="createBanner">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import goodsApi from '../../../api/market/goods'
import bannerApi from '../../../api/market/banner'

export default {
  data() {
    return {
      bannerInfo: {
        id: '',
        title: '',
        imageUrl: '',
        goodsId: '',
        sort: 0
      },
      goodsList: [],
    }
  },
  created() {
    this.initGoodsList()
  },
  methods: {
    //初始化商品列表
    initGoodsList() {
      goodsApi.getGoodsList(0, 50)
        .then(response => {
          this.goodsList = response.data.rows
        })
    },
    //创建轮播图
    createBanner() {
      bannerApi.createBanner(this.bannerInfo)
        .then(response => {
          this.$message({
            type: 'success',
            message: '创建轮播图成功'
          })
          this.bannerInfo = {}
          this.$router.push({path: '/banner/list'})
        })
    }
  }
}
</script>

<style scoped>

</style>
