<template>
  <div class="app-container">

    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="goodsQuery.goodsName" placeholder="商品名称"/>
      </el-form-item>

      <el-form-item label="选择品牌">
        <el-select v-model="goodsQuery.brandId" placeholder="全部品牌">
          <el-option
            v-for="brand in brandList"
            :key="brand.id"
            :label="brand.brandName"
            :value="brand.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择类别">
        <el-select v-model="goodsQuery.cateId" placeholder="全部类别">
          <el-option
            v-for="categories in categoriesList"
            :key="categories.id"
            :label="categories.cateName"
            :value="categories.id">
          </el-option>
        </el-select>
      </el-form-item><br/>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="goodsQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM dd-HH:mm:ss"
          default-time="00:00:00">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="goodsQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM dd-HH:mm:ss"
          default-time="00:00:00">
        </el-date-picker>
      </el-form-item>


      <el-button type="primary" icon="el-icon-search" @click="getGoodsListByCondition">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 数据表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1}}
        </template>
      </el-table-column>

      <el-table-column header-align="center" align="center" label="商品图片" width="180">
        <template width="40" slot-scope="scope">
          <el-image :src="scope.row.cover" style="width: 100px; height: 100px" :fit="fill">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column prop="goodsName" label="商品名称" align="center" width="150"/>
      <el-table-column prop="price" label="价格(元)" align="center" width="110"/>
      <el-table-column label="商品状态" width="80">
        <template slot-scope="scope">
          {{scope.row.isSale === 0 ? '未上架' : '已上架'}}
        </template>
      </el-table-column>

      <el-table-column prop="brandName" label="品牌" width="120" align="center"/>
      <el-table-column prop="cateName" label="所属分类" align="center" width="150"/>
      <el-table-column prop="viewCount" label="浏览数量" align="center" width="120"/>
      <el-table-column prop="buyCount" label="购买数量" align="center" width="110"/>
      <el-table-column prop="stock" label="库存(件)" align="center" width="110"/>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/goods/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改商品</el-button>
          </router-link><br/><br/>
          <el-button type="danger" size="mini" icon="el-icon-delete"
                     @click="removeGoods(scope.row.id)">删除商品</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--     分页条 -->
    <el-pagination background
                   :current-page="page"
                   :page-size="limit"
                   :total="total"
                   style="padding: 30px 0; text-align: center;"
                   layout="total, prev, pager, next, jumper"
                   @current-change="getGoodsList"
    />
  </div>
</template>

<script>
import goodsApi from '../../../api/market/goods'
import categoriesApi from '../../../api/market/categories'
import brandApi from '../../../api/market/brand'

export default {
  data() {
    return {
      brandId: '',
      categoriesId: '',
      list: null,
      page: 1,
      limit: 6,
      total: 0,
      categoriesList: [],
      brandList: [],
      goodsQuery: {
        goodsName: '',
        brandId: '',
        cateId: '',
        begin: '',
        end: '',
      }
    }
  },
  created() {
    this.getGoodsList()
    this.getCategoriesList()
    this.getBrandList()
  },
  methods: {
    //获取全部类别
    getCategoriesList() {
      categoriesApi.getCategoriesList()
        .then(response => {
          this.categoriesList = response.data.categoriesList
        })
    },
    //获取全部品牌
    getBrandList() {
      brandApi.getBrandList()
        .then(response => {
          this.brandList = response.data.brandList
        })
    },
    //点击品牌改变菜单名称
    changeMenuName(value) {
      for (let i = 0; i < this.brandList.length; i++) {
        if (value === this.brandList[i].id) {
          this.brandName = this.brandList[i].brandName
        }
      }
    },
    getGoodsList(page = 1) {
      this.page = page
      goodsApi.getGoodsList(this.page, this.limit)
        .then(response => {
          this.list = response.data.rows
          this.total = Number.parseFloat(response.data.total)
          console.log("记录数: " + this.total)
        })
    },
    //条件查询带分页
    getGoodsListByCondition() {
      goodsApi.getGoodsListQuery(this.page, this.limit, this.goodsQuery)
        .then(response => {
          this.total = response.data.total
          this.list = response.data.rows
        })
    },
    //删除课程方法
    removeGoods(id) {
      this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        goodsApi.removeGoods(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getGoodsList()
          })
      })
    },
    resetData() { //清空查询表单
      this.goodsQuery = {}
      this.getGoodsList()
    }
  }
}
</script>

<style>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
