<template>
  <el-table
    :data="brandList"
    style="width: 100%">
    <el-table-column
      label="注册日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="品牌名称"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>品牌名称: {{ scope.row.brandName }}</p>
          <p>品牌描述: {{ scope.row.brandDesc }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.brandName }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <router-link :to="'/brand/edit/' + scope.row.id">
          <el-button type="primary" size="mini">编辑</el-button>
        </router-link>

        <el-button
          size="mini"
          type="danger"
          @click="removeBrand(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import brandApi from '../../../api/market/brand'

export default {

  created() {
    this.getBrandList()
  },
  data() {
    return {
      brandList: [],
    }
  },
  methods: {
    getBrandList() {
      brandApi.getBrandList()
        .then(response => {
          this.brandList = response.data.brandList
        })
    },
    removeBrand(id) {
      this.$confirm('此操作将永久删除品牌, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        brandApi.removeBrandById(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getBrandList()
          })
      })
    },
  }
}
</script>
