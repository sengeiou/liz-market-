<template>
 <el-container>
   <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
     <el-menu
         default-active="1"

         class="el-menu-vertical-demo"
         @open="handleOpen"
         @close="handleClose"
         background-color="#545c64"
         text-color="#fff"
         active-text-color="#ffd04b">
       <el-menu-item index="1">
         <i class="el-icon-s-data"></i>
         <span slot="title" @click="initSalesData">申请列表</span>
       </el-menu-item>
       <el-menu-item index="2">
         <i class="el-icon-close"></i>
         <span slot="title" @click="getStatusData(0)">未通过</span>
       </el-menu-item>
       <el-menu-item index="3" >
         <i class="el-icon-loading"></i>
         <span slot="title" @click="getStatusData(1)">审核中</span>
       </el-menu-item>
       <el-menu-item index="4">
         <i class="el-icon-check"></i>
         <span slot="title" @click="getStatusData(2)">已通过</span>
       </el-menu-item>
       <el-menu-item index="5">
         <i class="el-icon-question"></i>
         <span slot="title" @click="getStatusData(3)">已驳回</span>
       </el-menu-item>
     </el-menu>
   </el-aside>
   <el-main>
     <el-table
         :header-cell-style="{background:'#F5F6FA',color:'#666E92'}"
         :data="salesData"
         style="width: 100%">
       <el-table-column type="expand">
         <template slot-scope="props">
           <el-descriptions title="退货信息" class="margin-top" :column="3" border>
             <el-descriptions-item>
               <template slot="label">
                 <i class="el-icon-user"></i>
                 申请人
               </template>
               {{props.row.userName}}
             </el-descriptions-item>
             <el-descriptions-item>
               <template slot="label">
                 <i class="el-icon-mobile-phone"></i>
                 手机号
               </template>
               18100000000
             </el-descriptions-item>
             <el-descriptions-item>
               <template slot="label">
                 <i class="el-icon-location-outline"></i>
                 邮箱地址
               </template>
               {{props.row.userMail}}
             </el-descriptions-item>
             <el-descriptions-item>
               <template slot="label">
                 <i class="el-icon-search"></i>
                 物品名称
               </template>
               {{props.row.goodsName}}
             </el-descriptions-item>
             <el-descriptions-item>
               <template slot="label">
                 <i class="el-icon-search"></i>
                 物品名称
               </template>
               {{props.row.goodsName}}
             </el-descriptions-item>
             <el-descriptions-item>
               <template slot="label">
                 <i class="el-icon-search"></i>
                 订单号
               </template>
               {{props.row.orderNo}}
             </el-descriptions-item>
             <el-descriptions-item>
               <template slot="label">
                 <i class="el-icon-office-building"></i>
                 物流ID
               </template>
               {{props.row.logisticsId}}
             </el-descriptions-item>
             <el-descriptions-item>
               <template slot="label">
                 <i class="el-icon-tickets"></i>
                 状态
               </template>
               <el-tag>{{props.row.isAccept === 0 ? '未通过' : '已通过'}}</el-tag>
             </el-descriptions-item>
             <el-descriptions-item>
               <template slot="label">
                 <i class="el-icon-close"></i>
                 是否撤回
               </template>
               <el-tag>{{props.row.isRevoke === 0 ? '未撤回' : '已撤回'}}</el-tag>
             </el-descriptions-item>
           </el-descriptions>

<!--           <el-form label-position="left" inline class="demo-table-expand">-->
<!--             <el-form-item label="商品名称">-->
<!--               <span>{{ props.row.goodsName }}</span>-->
<!--             </el-form-item>-->
<!--             <el-form-item label="所属店铺">-->
<!--               <span>{{ props.row.shop }}</span>-->
<!--             </el-form-item>-->
<!--             <el-form-item label="商品 ID">-->
<!--               <span>{{ props.row.id }}</span>-->
<!--             </el-form-item>-->
<!--             <el-form-item label="店铺 ID">-->
<!--               <span>{{ props.row.shopId }}</span>-->
<!--             </el-form-item>-->
<!--             <el-form-item label="商品分类">-->
<!--               <span>{{ props.row.category }}</span>-->
<!--             </el-form-item>-->
<!--             <el-form-item label="店铺地址">-->
<!--               <span>{{ props.row.address }}</span>-->
<!--             </el-form-item>-->
<!--             <el-form-item label="商品描述">-->
<!--               <span>{{ props.row.desc }}</span>-->
<!--             </el-form-item>-->
<!--           </el-form>-->
         </template>
       </el-table-column>
       <el-table-column header-align="center" align="center" label="商品封面" width="180">
         <template width="40" slot-scope="scope">
           <el-image :src="scope.row.goodsCover" style="width: 100px; height: 100px" :fit="fill">
           </el-image>
         </template>
       </el-table-column>
       <el-table-column
           label="商品名称"
           prop="goodsName">
       </el-table-column>
       <el-table-column label="购买数量" prop="goodsCount">
         <template slot-scope="scope">
           <el-tag>{{scope.row.goodsCount}} 件</el-tag>
         </template>
       </el-table-column>
       <el-table-column label="总金额" prop="refundAmount">
         <template slot-scope="scope">
           <el-tag type="danger">￥{{scope.row.refundAmount}}</el-tag>
         </template>
       </el-table-column>
       <el-table-column label="操作" align="center">
         <template slot-scope="scope">
           <el-button type="primary" size="mini" icon="el-icon-thumb" @click="ApplyReturn(scope.row)" v-if="scope.row.reason === '未知'">申请退货</el-button><br/><br/>
           <el-button type="danger" size="mini" icon="el-icon-close"
                      @click="removeGoods(scope.row.id)" v-if="scope.row.isAccept != 2">撤销申请</el-button>
         </template>
       </el-table-column>
     </el-table>
     <!-- 退货申请弹出框-->
     <el-dialog title="退货申请" :visible.sync="dialogFormVisible">
       <el-form ref="salesInfo" :model="salesInfo" label-width="80px">
         <el-form-item label="申请人">
           <el-input v-model="salesInfo.userName" readonly></el-input>
         </el-form-item>
         <el-form-item label="商品详情">
           <i class="el-icon-info"></i>
           <template>
             <el-image :src="salesInfo.goodsCover" style="width: 100px; height: 100px" :fit="fill">
             </el-image>
           </template>
           <el-tag>{{salesInfo.goodsName}}</el-tag>
         </el-form-item>
         <el-form-item
             prop="email"
             label="邮箱"
             :rules="[
                 { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                 { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
           <el-input v-model="salesInfo.userMail"></el-input>
         </el-form-item>

         <el-form-item label="退货原因">
           <el-input type="textarea" v-model="salesInfo.reason"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="submitApply" style="float: right" v-if="isSubmit===false">提交申请</el-button>
           <el-button style="float: left" @click="cancelSubmit">取消</el-button>
         </el-form-item>
       </el-form>
     </el-dialog>

     <el-pagination background
                    :current-page="page"
                    :page-size="limit"
                    :total="total"
                    style="padding: 30px 0; text-align: center;"
                    layout="total, prev, pager, next, jumper"
                    @current-change="initSalesData"
     />
  </el-main>
 </el-container>
</template>

<script>
import salesApi from "@/api/market/sales/sales";
export default {
  data() {
    return {
      isSubmit: false,
      salesId: '',
      salesData: [],
      page: 1,
      limit: 8,
      total: 0,
      isApply: false,
      dialogFormVisible: false,
      salesInfo: {},
    }
  },
  created() {
    this.initSalesData()
  },
  methods: {
    initSalesData() {
      salesApi.getSalesList()
        .then(response => {
          this.salesData = response.data.salesList
        })
    },
    //申请退货数据回显填写完整信息
    ApplyReturn(salesInfo) {
      this.isApply = true
      this.dialogFormVisible = true
      this.salesInfo = salesInfo
      this.salesInfo.reason = ''

    },
    //提交申请
    submitApply() {
      salesApi.submitApply(this.salesInfo)
        .then(response => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.isSubmit = true
          this.salesInfo = {}
          this.dialogFormVisible = false
        })
    },
    //取消申请
    cancelSubmit() {
      this.salesInfo = {}
      this.dialogFormVisible = false
      this.isApply = false
    },
    //获取未通过的数据
    getStatusData(status) {
      console.log('status:' + status)
      salesApi.getStatusData(status)
        .then(response => {
          this.salesData = response.data.salesList
        })
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
