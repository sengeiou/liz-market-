<template>
  <div class="Page Confirm">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-truck"></i>全部物流</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="getLogisticsInfo(0)">未发货</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-3" @click="getLogisticsInfo(1)">已发货</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-4" @click="getLogisticsInfo(2)">运输中</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-5" @click="getLogisticsInfo(3)">已送达</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-comment"></i>待评价</template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="initCanCommentList">未评价</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="2-2" @click="getAlreadyCommentList">已评价</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-table v-if="flag"
                    :header-cell-style="{background:'#F5F6FA',color:'#666E92'}"
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
                {{ scope.$index + 1}}
              </template>
            </el-table-column>

            <el-table-column header-align="center" align="center" label="商品图片" width="180">
              <template width="40" slot-scope="scope">
                <el-image :src="scope.row.goodsCover" style="width: 100px; height: 100px" :fit="fill">
                </el-image>
              </template>
            </el-table-column>

            <el-table-column prop="goodsName" label="商品名称" align="center" width="150"/>
            <el-table-column prop="logisticsFee" label="物流费用" align="center" width="150"/>
            <el-table-column prop="receiverAddress" label="收货地址" align="center" width="140"/>
            <el-table-column prop="receiver" label="收货人" align="center" width="120"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <router-link :to="'/logistics/' + scope.row.id">
                  <el-button type="primary" size="mini" icon="el-icon-search">查看详情</el-button>
                </router-link><br/><br/>
              </template>
            </el-table-column>
          </el-table>

          <el-table v-if="!flag"
            v-loading="listLoading"
            :data="canCommentList"
            element-loading-text="数据加载中"
            border
            fit
            highlight-current-row>

            <el-table-column
              label="序号"
              width="70"
              align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column prop="complateTime" label="送达时间" align="center" width="160">
            </el-table-column>

            <el-table-column header-align="center" align="center" label="商品图片" width="200">
              <template width="150" slot-scope="scope">
                <el-image :src="scope.row.goodsCover" style="width: 100px; height: 100px" :fit="fill">
                </el-image>
              </template>
            </el-table-column>

            <el-table-column prop="goodsName" label="商品名称" align="center" width="150"/>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <router-link :to="'/goods/' + scope.row.goodsId" v-if="alreadyComment === false">
                  <el-button type="primary" icon="el-icon-chat-line-square">立即评价</el-button>
                </router-link><br/><br/>
                <router-link :to="'/goods/' + scope.row.goodsId" v-if="alreadyComment === true">
                  <el-button type="primary" icon="el-icon-info">立即查看</el-button>
                </router-link><br/><br/>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>


<script>
import logisticsApi from "@/api/market/logistics/logistics";
import commentApi from "@/api/market/comment/comment";

export default {
  data() {
    return {
      logisticsList: [],
      canCommentList: [],
      flag: true,
      alreadyComment: false,
    }
  },
  created() {
    this.initLogisticsList()
  },
  methods: {
    initLogisticsList() {
      logisticsApi.getLogisticsList()
        .then(response => {
          this.logisticsList = response.data.logisticsList
        })
    },
    getLogisticsInfo(status) {
      this.flag = true
      logisticsApi.getLogisticsInfo(status)
        .then(response => {
          this.logisticsList = response.data.logisticsList
        })
    },
    initCanCommentList() {
      this.flag = false;
      commentApi.getCanCommentList()
        .then(response => {
          this.alreadyComment = false
          this.canCommentList = response.data.canCommentList
        })
    },
    getAlreadyCommentList() {
      commentApi.getAlreadyCommentList()
        .then(response => {
          this.alreadyComment = true
          this.canCommentList = response.data.canCommentList
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
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
