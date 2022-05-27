<template>
  <div class="Page Confirm">
    <form name="flowForm" id="flowForm" method="post" action="">
    <el-table
      ref="multipleTable"
      :header-cell-style="{background:'#F5F6FA',color:'#666E92'}"
      :data="cart.items"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column header-align="center" align="center" label="商品图片" width="180">
        <template width="40" slot-scope="scope">
          <el-image :src="scope.row.image" style="width: 100px; height: 100px" :fit="fill">
          </el-image>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="商品名" width="140"/>

      <el-table-column prop="brandId" label="品牌" width="140"/>
      <el-table-column prop="price" label="单价" width="140">
        <template slot-scope="scope">
          <span class="red">￥{{parseFloat(scope.row.price).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="数量" width="200">
        <template slot-scope="scope">
          <el-input-number size="mini" v-model="scope.row.count" :min="1" :max="10" @change="updateItemNum(scope.row.id, scope.row.count)"></el-input-number>
        </template>

      </el-table-column>
      <el-table-column prop="totalPrice" label="小计" width="140">
        <template slot-scope="scope">
          <span class="red">￥{{parseFloat(scope.row.totalPrice).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete"
                     @click="removeItem(scope.row.id)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </form>

    <div class="Finish">
      <div class="fr" id="AgreeDiv">
        <label for="Agree"><p class="on"><input type="checkbox" checked="checked">我已阅读并同意<a href="javascript:" target="_blank">《荔枝商城购买协议》</a></p></label>
      </div>
      <!-- 支付弹出框-->
      <el-dialog title="购物信息" :visible.sync="dialogTableVisible" append-to-body>
        <el-table :data="checkList">
          <el-table-column property="title" label="名称" width="150"></el-table-column>
          <el-table-column property="count" label="数量" width="200">
            <template slot-scope="scope">
              <sapn>×{{scope.row.count}}</sapn>
            </template>
          </el-table-column>
        </el-table><br/>
        <el-descriptions title="完善相关信息" direction="vertical" :column="3" border>
          <el-descriptions-item label="用户名">{{userInfo.nikename}}</el-descriptions-item>
          <el-descriptions-item label="邮箱地址">{{userInfo.email}}</el-descriptions-item>
          <el-descriptions-item label="商品数量">{{cartOrderInfo.count}} 件</el-descriptions-item>
          <el-descriptions-item label="购物车总价">
            <el-tag size="small">￥{{parseFloat(cartOrderInfo.totalAmount).toFixed(2)}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="收货地址">
            <el-select v-model="cartOrderInfo.receiverAddress" placeholder="选择地址">
              <el-option
                  v-for="detail in userDetailList"
                  :key="detail.id"
                  :label="detail.otherAddress"
                  :value="detail.otherAddress">
              </el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="物流公司">
            <el-select v-model="cartOrderInfo.logisticsCompany" placeholder="快递公司">
              <el-option
                  v-for="(company, index) in logisticsCompanyList"
                  :key="index"
                  :label="company"
                  :value="index">
              </el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item label="物流方式">
            <el-select v-model="cartOrderInfo.logisticsType" placeholder="选择方式">
              <el-option
                  v-for="(type, index) in logisticsTypeList"
                  :key="index"
                  :label="type"
                  :value="index">
              </el-option>
            </el-select>
          </el-descriptions-item>
        </el-descriptions><br/>

        <el-row>
          <el-button @click="cancelPay()">取消</el-button>
          <el-button @click="payNow" type="primary" style="float: right">余额支付</el-button>
        </el-row>
      </el-dialog>

      <div class="clear"></div>
      <div class="Main fl">
        <el-button icon="el-icon-delete" type="danger" size="mini" @click="removeCheckItems">移除所选</el-button>
        <div class="fl">
          <!--            <a :href="'/goods/'+orderInfo.goodsId">返回商品详情</a>-->
        </div>
        <div class="fr">
          <p>共 <strong class="red"></strong> {{cart.count}} 件商品，合计<span class="red f20">￥<strong
            id="AllPrice">{{parseFloat(cart.totalAmount).toFixed(2)}}</strong></span></p>
        </div>
      </div>
      <input name="score" value="0" type="hidden" id="usedScore">
      <button class="fr redb" type="button" id="submitPay" @click="createOrder">立即下单</button>
      <div class="clear"></div>
    </div>
  </div>

</template>

<script>
import shopcartApi from "@/api/market/cart/shopcart";
import brandApi from "@/api/market/brand/brand";
import userApi from "@/api/market/ucenter/user";
import orderApi from "@/api/market/order/order";

export default {
  data() {
    return {
      cart: {
        items: [],
        count: 0,
        countType: 0,
        totalAmount: 0,
        reduce: 0
      },
      brandList: [],
      checkList: [],
      ids: [],
      isInitCheck: false, //标识是否是初始化check回显
      dialogTableVisible: false,
      userDetailList: [],
      userInfo: {
        id: '',
        avatar: '',
        email: '',
        nikename: '',
        isVip: false,
        accountBalance: 0.00
      },
      cartOrderInfo: {
        userId: '',
        userName: '',
        userMail: '',
        receiverAddress: '',
        count: 0,
        totalAmount: 0,
        logisticsType: '',
        logisticsCompany: '',
        goodsIdList: [],
        reduceList: [],
      },
      logisticsTypeList: ['飞机', '高铁', '货车'],
      logisticsCompanyList: ['荔枝快递', '油饼快递', '树脂快递'],
      data: {
        id: '',
        count: 0
      }
    }
  },
  created() {
    this.getCartList()
    // this.initCheckItem()
    this.initUserInfo()
    this.getBrandList()
    this.initDetailList()
  },
  methods: {
    getCartList() {
      shopcartApi.getCartList()
        .then(response => {
          this.cart = response.data.cart
          this.cart.items.forEach(o => {
            if (o.check) {
              this.$nextTick(() => {
                this.$refs.multipleTable.toggleRowSelection(o, true)
              })
            }
          })
        })
    },
    getBrandList() {
      brandApi.getBrandList()
        .then(response => {
          this.brandList = response.data.brandList
        })
    },
    initDetailList() {
      userApi.getDetailList()
          .then(response => {
            this.userDetailList = response.data.detailList
          })
    },
    removeItem(id) {
      this.$confirm('你确定要从购物车移除此项商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shopcartApi.removeItem(id)
          .then(response => {
            this.getCartList()
            this.$message({
              type: 'success',
              message: '移除成功'
            })
          })
      }).catch(() => {});
    },
    removeCheckItems() {
      this.$confirm('你确定要从购物车移除此项商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i].check) {
            this.ids.push(this.checkList[i].id)
          }
        }
        // console.log("需要删除的id集合===============>" + this.ids)
        shopcartApi.removeCheckItems(this.ids)
          .then(response => {
            this.getCartList()
            this.$message({
              type: 'success',
              message: '移除成功'
            })
          })
      })
    },
    updateItemNum(id, num) {
      shopcartApi.updateItemNum(id, num)
        .then(response => {
          this.getCartList()
        })
    },
    // checkItem(id, check) {
    //   shopcartApi.checkItem(id, check)
    //     .then(response => {
    //       this.getCartList()
    //     })
    // },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.checkList = val
      //每次监听到勾选改变就重新计算一下值
      this.cart.count = this.checkList.length
      this.cart.totalAmount = 0.00
      this.checkList.forEach(o => {
        this.cart.totalAmount += o.totalPrice
      })
    },
    initUserInfo() {
      userApi.getUserInfo()
          .then(response => {
            this.userInfo = response.data.userInfo
          })
    },

    //================================支付相关===================================
    payNow() {
      this.$confirm('当前账户余额: ' + this.userInfo.accountBalance + "￥, 是否立即支付?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        if (this.cartOrderInfo.totalAmount > this.userInfo.accountBalance) {
          this.$message({
            type: 'error',
            message: '您的账户余额已不足!'
          })
          return
        }
        this.submitPay()
      }).catch(() => {
        this.cartOrderInfo = {}
        this.data = {}
        this.dialogTableVisible = false
        this.$message({
          type: 'info',
          message: '支付中断【系统异常】取消支付'
        });
      });
    },
    //提交支付调用接口
    submitPay() {
      this.cartOrderInfo.userId = this.userInfo.id
      this.cartOrderInfo.userName = this.userInfo.nikename
      this.cartOrderInfo.userMail = this.userInfo.email
      this.checkList.forEach(o => {
        this.cartOrderInfo.goodsIdList.push(o.id)
        this.cartOrderInfo.reduceList.push(o.count)
      })
      orderApi.createCartOrder(this.cartOrderInfo)
          .then(response => {
            const cartId = response.data.cartId
            this.cartOrderInfo.goodsIdList.push(cartId)
            this.addCartItem(this.cartOrderInfo.goodsIdList, this.cartOrderInfo.reduceList)
            //从缓存中移除已经购买的购物项
            shopcartApi.removeCheckItems(this.cartOrderInfo.goodsIdList)
              .then(response => {
                this.cartOrderInfo = {}
                this.data = {}
                this.dialogTableVisible = false
                this.getCartList()
                this.$message({
                  type: 'success',
                  message: '支付成功!'
                })
              })
          })
    },
    //创建订单
    createOrder() {
      let len = this.checkList.length
      this.cartOrderInfo.count = len
      this.cartOrderInfo.totalAmount = 0.00
      this.checkList.forEach(o => {
        this.cartOrderInfo.totalAmount += o.totalPrice
      })
      this.dialogTableVisible = true
    },
    //取消支付
    cancelPay() {
      this.cartOrderInfo = {}
      this.data = {}
      this.dialogTableVisible = false
    },
    //完善购物项表--cart-order-物流信息进行关联
    addCartItem(ids, counts) {
      console.log(ids)
      shopcartApi.createCartItems(ids, counts)
        .then(response => {})
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
