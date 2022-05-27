<template>
  <div class="app-container">

    <!-- 查询表单 -->
<!--    <el-form :inline="true" class="demo-form-inline">-->
<!--      <el-form-item label="商品名称">-->
<!--        <el-input v-model="goodsQuery.goodsName" placeholder="商品名称"/>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="选择品牌">-->
<!--        <el-select v-model="goodsQuery.brandId" placeholder="全部品牌">-->
<!--          <el-option-->
<!--            v-for="brand in brandList"-->
<!--            :key="brand.id"-->
<!--            :label="brand.brandName"-->
<!--            :value="brand.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="选择类别">-->
<!--        <el-select v-model="goodsQuery.cateId" placeholder="全部类别">-->
<!--          <el-option-->
<!--            v-for="categories in categoriesList"-->
<!--            :key="categories.id"-->
<!--            :label="categories.cateName"-->
<!--            :value="categories.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item><br/>-->

<!--      <el-form-item label="添加时间">-->
<!--        <el-date-picker-->
<!--          v-model="goodsQuery.begin"-->
<!--          type="datetime"-->
<!--          placeholder="选择开始时间"-->
<!--          value-format="yyyy-MM dd-HH:mm:ss"-->
<!--          default-time="00:00:00">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->

<!--      <el-form-item>-->
<!--        <el-date-picker-->
<!--          v-model="goodsQuery.end"-->
<!--          type="datetime"-->
<!--          placeholder="选择截止时间"-->
<!--          value-format="yyyy-MM dd-HH:mm:ss"-->
<!--          default-time="00:00:00">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->


<!--      <el-button type="primary" icon="el-icon-search" @click="getGoodsListByCondition">查询</el-button>-->
<!--      <el-button type="default" @click="resetData()">清空</el-button>-->
<!--    </el-form>-->

    <!-- 数据表格 -->
    <el-table
      v-loading="listLoading"
      :data="logisticsList"
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

      <el-table-column prop="gmtCreate" label="物流开始时间" align="center" width="140"/>
      <el-table-column prop="receiver" label="收货人" align="center" width="140"/>
      <el-table-column prop="receiverAddress" label="收货地址" align="center" width="140"/>
      <el-table-column prop="orderNo" label="订单编号" align="center" width="140"/>

      <el-table-column prop="logisticsStatus" label="物流状态" align="center" width="140">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.logisticsStatus === 0" type=''>
            未发货
          </el-tag>
          <el-tag v-if="scope.row.logisticsStatus === 1" type="primary">
            已发货
          </el-tag>
          <el-tag v-if="scope.row.logisticsStatus === 2" type="info">
            运输中
          </el-tag>
          <el-tag v-if="scope.row.logisticsStatus === 3" type="success">
            已送达
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="logisticsCompany" label="物流公司" align="center" width="140">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.logisticsCompany === 0">荔枝快递</el-tag>
          <el-tag v-if="scope.row.logisticsCompany === 1" type="success">油饼快递</el-tag>
          <el-tag v-if="scope.row.logisticsCompany === 2" type="info">树脂快递</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="logisticsType" label="物流方式" align="center" width="140">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.logisticsType === 0" type='' effect="plain">
            货车
          </el-tag>
          <el-tag v-if="scope.row.logisticsType === 1" type="primary" effect="plain">
            高铁
          </el-tag>
          <el-tag v-if="scope.row.logisticsType === 2" type="success" effect="plain">
            飞机
          </el-tag>

        </template>
      </el-table-column>
      <el-table-column prop="logisticsFee" label="所耗运费" align="center" width="120">
        <template slot-scope="scope">
          <span style="color: red">￥{{scope.row.logisticsFee}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="completeTime" label="物流完成时间" align="center" width="140">
        <template slot-scope="scope">
          {{scope.row.completeTime === null ? '未送达' : '已送达'}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini" icon="el-icon-truck" @click="updateLogisticsStatus(scope.row.id, scope.row.logisticsStatus)">更新物流</el-button><br/><br/>
          <router-link :to="'/logistics/info/' + scope.row.orderNo">
            <el-button type="primary" size="mini" icon="el-icon-view">此单详情</el-button>
          </router-link>
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
                   @current-change="getAllLogisticsList"
    />
  </div>
</template>

<script>
import logisticsApi from '../../../api/market/logistics'
export default {

  data() {
    return {
      page: 1,
      limit: 6,
      total: 0,
      logisticsList: [],
      searchObj: {
        receiver: '',
        logisticsStatus: 0,
        logisticsCompany: 0,
        logisticsType: 0,
        start: ''
      }
    }
  },
  created() {
    this.getAllLogisticsList()
  },
  methods: {
    getAllLogisticsList(page = 1) {
      this.page = page
      logisticsApi.getAllLogistics(this.page, this.limit, this.searchObj)
        .then(response => {
          this.logisticsList = response.data.logisticsList
          this.total = Number.parseInt(response.data.total);
        })
    },
    updateLogisticsStatus(id, status) {
      logisticsApi.updateLogisticsStatus(id, status)
        .then(response => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.getAllLogisticsList()
        })
    }
  }
}
</script>

<style scoped>

</style>
