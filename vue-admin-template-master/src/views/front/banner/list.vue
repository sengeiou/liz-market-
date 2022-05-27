<template>
  <el-table
    v-loading="listLoading"
    :data="bannerList"
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

    <el-table-column header-align="center" align="center" label="轮播图" width="180">
      <template width="40" slot-scope="scope">
        <el-image :src="scope.row.imageUrl" style="width: 100px; height: 100px" :fit="fill">
        </el-image>
      </template>
    </el-table-column>

    <el-table-column prop="title" label="标题" align="center" width="150"/>

    <el-table-column prop="sort" label="热点排序" align="center" width="110"/>

    <el-table-column prop="gmtModified" label="更新日期" width="150">
    </el-table-column>

    <el-table-column label="操作" align="center" width="140">
      <template slot-scope="scope">
        <router-link :to="'/goods/info/' + scope.row.id">
          <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
        </router-link><br/><br/>
        <el-button type="danger" size="mini" icon="el-icon-delete"
                   @click="removeGoods(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import bannerApi from '../../../api/market/banner'
export default {

  data() {
    return {
      bannerList: [],
      limit: 0,
      page: 1,
    }
  },
  created() {
    this.initBannerList()
  },
  methods: {
    initBannerList() {
      bannerApi.getBannerList()
        .then(response => {
          this.bannerList = response.data.bannerList
        })
    }
  }
}
</script>

<style scoped>

</style>
