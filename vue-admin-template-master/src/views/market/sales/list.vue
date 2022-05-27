<template>
  <div class="app-container">
    <el-table
      :header-cell-style="{background:'#F5F6FA',color:'#666E92'}"
      v-loading="listLoading"
      :data="salesList"
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
      <el-table-column label="申请人" prop="userName">
        <template slot-scope="scope">
          <el-tag>{{scope.row.userName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单号" prop="orderNo">
        <template slot-scope="scope">
          {{scope.row.orderNo}}
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="物品封面" width="180">
        <template width="40" slot-scope="scope">
          <el-image :src="scope.row.goodsCover" style="width: 100px; height: 100px" :fit="fill">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="物品名称">
        <template slot-scope="scope">
          <el-tag>{{scope.row.goodsName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="退货原因"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>退货原因: {{ scope.row.reason }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="进度" prop="isAccept">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.isAccept === 0">未通过</el-tag>
          <el-tag v-if="scope.row.isAccept === 1">审核中</el-tag>
          <el-tag type="success" v-if="scope.row.isAccept === 2">已通过</el-tag>
        </template>

      </el-table-column>
      <el-table-column label="状态" prop="userName">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isRevoke === 0">未撤回</el-tag>
          <el-tag type="danger" v-if="scope.row.isRevoke === 1">已撤回</el-tag>
        </template>

      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-check" @click="acceptApply(scope.row.id)">同意</el-button>
          <br/><br/>
          <el-button type="danger" size="mini" icon="el-icon-close" @click="refuseApply(scope.row.id)">驳回</el-button>
          <br/><br/>
          <router-link :to="'/sales/info/' + scope.row.id">
            <el-button size="mini" icon="el-icon-info">详情</el-button>
          </router-link>

        </template>
      </el-table-column>
    </el-table>
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
import salesApi from '../../../api/market/sales'
export default {

  data() {
    return {
      page: 1,
      limit: 8,
      total: 0,
      salesList: [],
    }
  },
  created() {
    this.getAllSales()
  },
  methods: {
    getAllSales() {
      salesApi.getAllSales(this.page, this.limit)
        .then(response => {
          this.salesList = response.data.salesList
          this.total = Number.parseInt(response.data.total)
        })
    },
    acceptApply(id) {
      salesApi.acceptApply(id)
        .then(response => {
          this.getAllSales()
          this.$message({
            type: 'success',
            message: '更新进度成功'
          })
        })
    },
    refuseApply(id) {
      salesApi.refuseApply(id)
        .then(response => {
          this.getAllSales()
          this.$message({
            type: 'success',
            message: '驳回成功'
          })
        })
    }
  }

}
</script>

<style scoped>

</style>
