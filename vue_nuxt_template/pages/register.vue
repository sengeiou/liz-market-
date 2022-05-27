<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">

        <el-form-item class="input-prepend restyle" prop="niekname" :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="你的昵称" v-model="params.niekname"/>
            <i class="iconfont icon-user"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="email" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' },{validator: checkMail, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="邮箱" v-model="params.email"/>
            <i class="iconfont icon-qq"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input type="text" placeholder="验证码" v-model="params.code"/>
            <i class="iconfont icon-phone"/>
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a href="javascript:" type="button" @click="getCodeFun()" :value="codeTest" style="border: none;background-color: none">{{ codeTest }}</a>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="设置密码" v-model="params.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-up-button" value="注册" @click="submitRegister()">
        </div>
      </el-form>
      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"><i
            class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import registerApi from "@/api/register";
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'

export default {
  layout: 'sign',
  data() {
    return {
      params: {
        email: '', //邮箱
        code: '', //验证码
        niekname: '', //昵称
        password: '' //密码
      },
      sending: true,      //是否发送验证码
      second: 60,        //倒计时间
      codeTest: '获取验证码'
    }
  },
  methods: {
    //注册提交方法
    submitRegister() {
      registerApi.registerUser(this.params)
        .then(response => {
          this.$message({
            type: 'success',
            message: "注册成功"
          })
          this.$router.push({path: '/login'})
        })
    },
    //通过邮箱地址发送验证码
    getCodeFun() {
      console.log("触发发送验证码------------->")
      registerApi.sendCode(this.params.email)
        .then(response => {
          console.log("触发发送验证码------------->")
          this.sending = false
          //调用倒计时方法
          this.timeDown()
        })
    },
    //倒计时
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        this.codeTest = this.second
        if (this.second < 1) {
          clearInterval(result);
          this.sending = true;
          //this.disabled = false;
          this.second = 60;
          this.codeTest = "获取验证码"
        }
      }, 1000);
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
