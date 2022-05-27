<template>
  <div class="personalCenter">
    <el-container>
      <el-header>个人中心</el-header>
      <el-container>
        <el-aside width="400px">
          <el-col :span="12">
            <div class="sub-title"></div>
            <div class="demo-basic--circle">
              <div class="img">
                <el-avatar :size="100" :src="userDetailInfo.avatar" align="center">
                </el-avatar>
              </div>
              <div class="block">
                <span>{{ userDetailInfo.nikename }}</span>
              </div>
            </div>
          </el-col>
          <el-input
            v-model="userDetailInfo.id"
            type="text"
            readonly="true"
            placeholder="用户ID"
            maxlength="20"
            show-word-limit
          >{{ userDetailInfo.id }}</el-input>
          <el-input
            v-model="userDetailInfo.nikename"
            type="text"
            placeholder="用户昵称"
            show-word-limit
          >{{ userDetailInfo.nikename }}</el-input>
          <el-input
            v-model="userDetailInfo.address"
            type="text"
            placeholder="收货地址"
            show-word-limit
          >{{ userDetailInfo.address }}</el-input>
          <el-input
            v-if="userDetailInfo.isVip ? 'Plus会员' : '普通用户'"
            type="text"
            placeholder="Plus会员"
            maxlength="2"
            readonly="true"
            show-word-limit
          ></el-input>
          <el-input v-model="userDetailInfo.email"
                    placeholder="邮箱">
            <template slot="append">@qq.com</template>
          </el-input>
          <el-input
            v-model="userDetailInfo.accountBalance"
            type="text"
            placeholder="账户余额"
            maxlength="20"
            show-word-limit
          >￥{{ userDetailInfo.accountBalance }}</el-input>
          <el-button-group style="float: right; padding: 3px 0" type="text">
            <el-button type="primary" size="medium" round>保存</el-button>
          </el-button-group>
        </el-aside>
        <el-container>
          <el-main>
            <el-card class="box-card">
              <div>
                <span style="float: left" shadow="hover"><b>个人说明</b>
                </span>
                <el-button type="primary"
                           size="medium" round
                           icon="el-icon-circle-plus" @click="dialogFormVisible2=true">
                  新增
                </el-button>
                <el-table
                  :data="userDetailInfo.description"
                  style="width: 100%">
                  <el-table-column
                    label="序号"
                    width="70"
                    align="center">
                    <template slot-scope="scope">
                      {{ scope.$index + 1}}
                    </template>
                  </el-table-column>
                  <el-table-column label="描述">
                    <template slot-scope="scope">
                      {{scope.row}}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button type="primary"
                                 size="mini" round
                                 icon="el-icon-setting" @click="dialogFormVisible=true">
                        编辑
                      </el-button>
                      <el-button type="warning"
                                 size="mini" round
                                 icon="el-icon-delete" @click="removeUserDescDetail(scope.$index)">
                        移除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card><br/>

            <!-- 添加地址弹框-->
            <el-dialog title="新增地址" :visible.sync="dialogFormVisible1">
              <el-form :model="userDetailDto" label-width="120px">
                <el-form-item label="地址详情">
                  <el-input v-model="userDetailDto.otherAddress"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="saveUserDetail">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 添加描述弹出框-->
            <el-dialog title="新增描述" :visible.sync="dialogFormVisible2">
              <el-form :model="userDetailDto" label-width="120px">
                <el-form-item label="描述内容">
                  <el-input v-model="userDetailDto.description"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="saveUserDetail">确 定</el-button>
              </div>
            </el-dialog>

            <el-card class="box-card">
              <div>
                <span style="float: left" shadow="hover"><b>地址管理</b>
                </span>
                <el-button type="primary"
                           size="medium" round
                           icon="el-icon-circle-plus" @click="dialogFormVisible1=true">
                  新增
                </el-button>
                <el-table
                  :data="userDetailInfo.otherAddress"
                  style="width: 100%">
                  <el-table-column
                    label="序号"
                    width="70"
                    align="center">
                    <template slot-scope="scope">
                      {{ scope.$index + 1}}
                    </template>
                  </el-table-column>
                  <el-table-column label="收获地址">
                    <template slot-scope="scope">
                      <span>
                        {{scope.row}}
                      </span>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="primary"
                               size="mini" round
                               icon="el-icon-setting" @click="dialogFormVisible=true">
                      编辑
                    </el-button>
                    <el-button type="warning"
                               size="mini" round
                               icon="el-icon-delete" @click="removeUserAddressDetail(scope.$index)">
                      移除
                    </el-button>
                  </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import userApi from "@/api/market/ucenter/user";
import comment from "@/api/market/comment/comment";

export default {
  data() {
    return {
      userId: '',
      dialogFormVisible1: false, //地址弹框的值
      dialogFormVisible2: false,
      userDetailInfo: {
        id: '',
        nikename: '',
        email: '',
        address: '',
        isVip: false,
        avatar: '',
        otherAddress: [],
        description: [],
        accountBalance: 0.00
      },
      userDetailDto: {
        id: '',
        description: '',
        otherAddress: ''
      },
      detailDescIds: [],
      detailAddressIds: [],

      sizeList: ['large']
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.userId = this.$route.params.id
    }
    this.initUserDetailInfo()
  },
  methods: {
    initUserDetailInfo() {
      userApi.getUserDetailInfo(this.userId)
        .then(response => {
          this.userDetailInfo = response.data.userDetailInfo
        })
    },
    saveUserDetail() {
      this.userDetailDto.id = this.userId
      userApi.addUserDetailInfo(this.userDetailDto)
        .then(response => {
          this.$message({
            type: 'success',
            message: '完善信息成功'
          })
          this.dialogFormVisible1 = false
          this.dialogFormVisible2 = false

          let id = response.data.detailId
          if (this.userDetailDto.description) {
            this.detailDescIds.push(id)
          } else if (this.userDetailDto.otherAddress) {
            this.detailAddressIds.push(id)
          }
          this.userDetailDto = {}
          this.initUserDetailInfo()
        })
    },
    removeUserAddressDetail(index) {
      this.$confirm('此操作将永久删除此条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = this.detailAddressIds[index]
        this.detailAddressIds.splice(index, 1)
        userApi.deleteUserDetail(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '移除成功'
            })
            this.initUserDetailInfo()
          })
      })
    },
    removeUserDescDetail(index) {
      this.$confirm('此操作将永久删除此条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = this.detailDescIds[index]
        this.detailDescIds.splice(index, 1)
        userApi.deleteUserDetail(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '移除成功'
            })
            this.initUserDetailInfo()
          })
      })
    },
    //TODO
    showCurrentLineInfo($index) {
    },
    //TODO
    updateUserDetail() {
      userApi.updateUserDetail(this.userDetailDto)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
    }
  }
}
</script>
<style>
.el-header {
  line-height: 60px;
  text-align: center;
  background-color: #b3c0d1;
}
.el-aside {
  line-height: 44px;
  text-align: center;
  background-color: #d3dce6;
}
.el-main {
  line-height: 36px;
  text-align: center;
  background-color: #e9eef3;
}

.demo-basic--circle {
  align: 'center';
  margin-top: 30px;
  margin-left: 150px;
}
.block {
  margin-left: 25px;
  font-weight: bold;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 1368px;
  border-radius: 30px;
}
</style>
