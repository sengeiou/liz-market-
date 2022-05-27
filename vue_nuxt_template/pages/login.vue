<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="email" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },{validator: checkMail, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="邮箱" v-model="user.email"/>
            <i class="iconfont icon-qq" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://localhost:8160/api/ucenter/wx/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import loginApi from "@/api/login";
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import cookie from 'js-cookie'

export default {
  layout: 'sign',

  data () {
    return {
      //封装登录的邮箱和密码
      user:{
        email:'',
        password:''
      },
      loginInfo:{}
    }
  },
  methods: {
    //登录提交
    submitLogin() {
      loginApi.submitLoginUser(this.user)
        .then(response => {
          //获取token的字符串
          cookie.set("liz_token", response.data.token, {domain: 'localhost'})
          loginApi.getLoginUserInfo()
            .then(response => {
              //获取用户信息
              this.loginInfo = response.data.userInfo
              cookie.set("liz_ucenter", JSON.stringify(this.loginInfo), {domain: 'localhost'})
            })
          this.$message({
            type: 'success',
            message: "登录成功"
          })
          this.$router.push({path: '/'})
        })
    },
    //邮箱验证
    checkMail (rule, value, callback) {
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!regEmail.test(value)) {
        // 合法的邮箱
        return callback(new Error('请输入合法的邮箱'))
      }
      return callback()
    }
  }
}



</script>
<style>
.el-form-item__error{
  z-index: 9999999;
}
</style>
