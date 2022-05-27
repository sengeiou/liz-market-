<template>
  <div class="app-container">
    <h2 style="text-align: center;">添加新商品</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="编写商品基本信息"></el-step>
      <el-step title="编写商品进阶信息"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="商品名">
        <el-input v-model="goodsInfo.goodsName" placeholder="示例: 可口可乐"/>
      </el-form-item>
      <!-- 所属分类 TODO -->
      <el-form-item label="商品分类">
        <el-select v-model="goodsInfo.oneCategoriesId" placeholder="一级分类" @change="categoriesLevelOneChange">
          <el-option
            v-for="categories in categoriesOneList"
            :key="categories.id"
            :label="categories.cateName"
            :value="categories.id">
          </el-option>
        </el-select>

        <!-- 二级分类 -->
        <el-select  v-model="goodsInfo.twoCategoriesId" placeholder="二级分类" @change="categoriesLevelTwoChange">
          <el-option
            v-for="categories in categoriesTwoList"
            :key="categories.id"
            :label="categories.cateName"
            :value="categories.id">
          </el-option>
        </el-select>
        <!-- 三级分类 -->
        <el-select v-model="goodsInfo.cateId" placeholder="三级分类">
          <el-option
            v-for="categories in categoriesThreeList"
            :key="categories.id"
            :label="categories.cateName"
            :value="categories.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品品牌">
        <el-select v-model="goodsInfo.brandId" placeholder="请选择">
          <el-option selected="selected"
                     v-for="brand in brandList"
                     :key="brand.id"
                    :label="brand.brandName"
                    :value="brand.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品简介">
        <tinymce :height="200" v-model="goodsInfo.description"/>
      </el-form-item>

      <el-form-item label="商品图片">
        <el-upload
          class="upload-demo"
          :action="BASE_API + '/marketoss/fileoss'"
          :on-success="handleAvatarSucces"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <img :src="goodsInfo.cover"/>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品价格">
        <el-input-number :min="0" v-model="goodsInfo.price" controls-position="right" placeholder="完善价格请设置为0元"/>元
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce/'
import courseApi from '@/api/edu/course'
import categoriesApi from '../../../api/market/categories'
import brandApi from '../../../api/market/brand'
import goodsApi from '../../../api/market/goods'

export default {
    components: { Tinymce }, //富文本组件
    data() {
      return {
        saveBtnDisabled: false,
        goodsInfo: {
          id: 0,
          goodsName: '',
          oneCategoriesId: '',
          twoCategoriesId: '',
          threeCategoriesId: '',
          brandId: '',
          cateId: '',
          price: 0,
          description: '',
          isSale: 0,
          cover: '', //图片
          stock: 0 //库存
        },
        goodsId: 0,
        BASE_API: process.env.BASE_API, //接口地址
        brandList: [], //品牌
        categoriesOneList: [], //一级分类
        categoriesTwoList: [], //二级分类
        categoriesThreeList: [], //三级分类,
        fileList: []
        }
    },
    created() {
        //获取路由的id值
        if (this.$route.params && this.$route.params.id) {
          this.goodsId = this.$route.params.id
          this.getGoodsBaseInfo()
        }else {
          this.getBrandList()
          this.getOneCategories()
        }
    },
    watch: {
      $route(to, form) {
        this.init()
      }
    },
    methods: {
      // 根据监听器，判断路由中是否存在id值，没有则清空数据
      init() {
        if (!this.$route.params || !this.$route.params.id) {
          this.goodsInfo = {}
        }
      },
      getGoodsBaseInfo() {
        goodsApi.getGoodsBaseInfo(this.goodsId)
          .then(response => {
            this.goodsInfo = response.data.goodsInfo
            categoriesApi.getAllCategories()
              .then(response => {
                this.categoriesOneList = response.data.list
                for (let i = 0; i < this.categoriesOneList.length; i++) {
                  let oneCategories = this.categoriesOneList[i]
                  if (this.goodsInfo.oneCategoriesId === oneCategories.id) {
                    this.categoriesTwoList = oneCategories.children
                  }
                }
                for (let j = 0; j < this.categoriesTwoList.length; j++) {
                  let twoCategories = this.categoriesTwoList[j];
                  if (this.goodsInfo.twoCategoriesId === twoCategories.id) {
                    this.categoriesThreeList = twoCategories.children
                  }
                }
              })
            this.getBrandList()
          })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      // 上传封面成功调用
      handleAvatarSucces(res, file) {
        this.goodsInfo.cover = res.data.url
      },
      categoriesLevelOneChange(value) {
        for (let i = 0; i < this.categoriesOneList.length; i++) {
          let oneCategories = this.categoriesOneList[i]
          if (value === oneCategories.id) {
            this.categoriesTwoList = oneCategories.children
            // 把二,三级分类的id值清空
            this.goodsInfo.twoCategoriesId = ''
            this.goodsInfo.cateId = ''
          }
        }
      },
      categoriesLevelTwoChange(value) {
        for (let i = 0; i < this.categoriesTwoList.length; i++) {
          let twoCategories = this.categoriesTwoList[i]
          if (value === twoCategories.id) {
            this.categoriesThreeList = twoCategories.children
            // 把三级分类id值清空
            this.goodsInfo.cateId = ''
          }
        }
      },
      //查询商品一级分类
      getOneCategories() {
        categoriesApi.getAllCategories()
          .then(response => {
            this.categoriesOneList = response.data.list
          })
      },
      //查询所有的品牌
      getBrandList() {
        brandApi.getBrandList()
          .then(response => {
            this.brandList = response.data.brandList
          })
      },
      //添加商品
      addGoods() {
        goodsApi.addGoods(this.goodsInfo)
          .then(response => {
            this.$message({
              type: 'success',
              message: '添加商品基本信息成功'
            })
            this.$router.push({path: '/goods/incr/' + response.data.goodsId})
          })
      },
      //修改商品
      updateGoods() {
        goodsApi.updateGoodsInfo(this.goodsInfo)
          .then(response => {
            this.$message({
              type: 'success',
              message: '修改商品信息成功'
            })
            this.$router.push({path: '/goods/incr/' + this.goodsId})
          })
      },
      saveOrUpdate() {
        if (!this.goodsId) {
          this.addGoods();
        }else {
          this.updateGoods()
        }
      }
    }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 15px;
}
</style>
