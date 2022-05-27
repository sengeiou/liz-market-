<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="荔枝商城">
            <img src="~/assets/market/img/logo.png" width="100%" alt="荔枝商城">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/goods" tag="li" active-class="current">
              <a>商品</a>
            </router-link>
            <router-link to="/brand" tag="li" active-class="current">
              <a>品牌</a>
            </router-link>
            <router-link to="/shopcart" tag="li" active-class="current">
              <a>购物车</a>
            </router-link>
            <router-link to="/logistics" tag="li" active-class="current">
              <a>物流</a>
            </router-link>
            <router-link to="/sales" tag="li" active-class="current">
              <a>售后</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a :href="'/ucenter/' + loginInfo.id" title>
                <img :src="loginInfo.avatar" width="30" height="30" class="vam picImg" alt/>
                <span id="userName" class="vam disIb">{{loginInfo.nikename }}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退 出</a
              >
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入商品名" name="queryGoodsName" v-model="queryGoodsName" value>
                <router-link :to="'/goods'">
                  <button type="submit" class="s-btn">
                    <em class="icon18">&nbsp;</em>
                  </button>
                </router-link>

              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->

    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"
import cookie from 'js-cookie'
import {Message} from "element-ui";
import loginApi from "@/api/login";

export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        avatar: '',
        email: '',
        nikename: '',
        isVip: false
      },
      queryGoodsName: '',
    }
  },
  created() {
    this.token = this.$route.query.token
    if (this.token) {

    }
    this.showInfo()
  },
  methods: {
    //退出登录【清空cookie里面的值】
    logout() {
      cookie.set("liz_token", '', {domain: 'localhost'})
      cookie.set("liz_ucenter", '', {domain: 'localhost'})
      window.location.href = '/'
    },
    //从cookie里面获取用户信息
    showInfo() {
      var userStr = cookie.get("liz_ucenter");
      console.log("用户信息：" + userStr)
      //userStr--->转成json对象
      if (userStr) {
        this.loginInfo = JSON.parse(userStr)
      }
    },
  }
}
</script>
