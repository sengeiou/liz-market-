<template>
  <div id="aCoursesList" class="bg-fa of">

    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="/goods" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">{{ goodsInfo.cateOneName }}</a>
        \
        <a href="#" title class="c-999 fsize14">{{ goodsInfo.cateTwoName }}</a>
        \
        <span class="c-333 fsize14">{{ goodsInfo.cateName }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img :src="goodsInfo.cover" :alt="goodsInfo.goodsName" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ goodsInfo.goodsName }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{goodsInfo.price}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">品牌: {{goodsInfo.brandName}}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span class="c-fff fsize14">
                <el-input-number size="mini" v-model="num" :min="1" :max="10"></el-input-number>
                <el-button type="primary" plain @click="addCart()">加入购物车</el-button>
              </span>
            </section>
            <section class="c-attr-mt">
              <a @click="createOrder()" href="#" title="立即购买" class="comm-btn c-btn-3">立即购买</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{goodsInfo.buyCount}}次</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{goodsInfo.viewCount}}次</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>

      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="商品详情">商品详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>商品描述</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="goodsInfo.description">
                        {{goodsInfo.description}}
                      </p>
                    </section>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">{{brandInfo.brandName}}</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img :src="brandInfo.brandImg" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="#">{{brandInfo.brandName}}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{brandInfo.brandDesc}}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
        <div class="mt50 commentHtml"><div>
          <h6 class="c-c-content c-infor-title" id="i-art-comment">
            <span class="commentTitle">商品评论</span>
          </h6>
          <section class="lh-bj-list pr mt20 replyhtml">
            <ul>
              <li class="unBr">
                <aside class="noter-pic">
                  <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif">
                </aside>
                <div class="of">
                  <section class="n-reply-wrap">
                    <fieldset>
                      <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字" id="commentContent"></textarea>
                    </fieldset>
                    <p class="of mt5 tar pl10 pr10">
                      <el-rate
                        v-model="comment.starLevel"
                        show-text>
                      </el-rate>
                      <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
                      <input type="button" @click="addComment()" value="回复" class="lh-reply-btn">
                    </p>
                  </section>
                </div>
              </li>
            </ul>
          </section>
          <section class="">
            <section class="question-list lh-bj-list pr">
              <ul class="pr10">
                <li v-for="(comment,index) in data" v-bind:key="index">
                  <aside class="noter-pic">
                    <img width="50" height="50" class="picImg" :src="comment.avatar">
                  </aside>
                  <div class="of">
                    <span class="fl">
                    <font class="fsize16 c-blue">
                      {{comment.nickname}}</font>
                    <font class="fsize14 c-999 ml5">评论: </font>
                     <el-rate
                       v-model="comment.starLevel"
                       disabled
                       show-score
                       text-color="#ff9900"
                       score-template="{value} 分">
                    </el-rate>
                    </span>

                  </div>
                  <div class="noter-txt mt5">
                    <p>{{comment.content}}</p>
                  </div>
                  <div class="of mt5">
                    <span class="fr"><font class="fsize16 c-999 ml5">{{comment.gmtCreate}}</font></span>
                  </div>
                </li>

              </ul>
            </section>
          </section>

          <el-pagination background
                         :current-page="page"
                         :page-size="limit"
                         :total="total"
                         style="padding: 30px 0; text-align: center;"
                         layout="total, prev, pager, next, jumper"
                         @current-change="gotoPage"
          />
        </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "assets/css/reset.css";
import "assets/css/theme.css";
import "assets/css/global.css";
import "assets/css/web.css";
import cookie from 'js-cookie'
import goodsApi from "@/api/market/goods/goods";
import orderApi from "@/api/order";
import brandApi from "@/api/market/brand/brand";
import commentApi from "@/api/market/comment/comment";
import shopcartApi from "~/api/market/cart/shopcart";

export default {
  data() {
    return {
      num: 1,
      data: {},
      page: 1,
      limit: 6,
      total: 10,
      goodsId: '',
      orderNo: '',
      goodsInfo: {
        id: '',
        goodsName: '',
        brandName: '',
        cateOneName: '',
        cateTwoName: '',
        cateName: '',
        price: 0,
        description: '',
        cover: '',
        viewCount: '',
        buyCount: '',
        stock: 0,
      },
      commentList: [],
      brandInfo: {},
      comment: {
        id: '',
        goodsId: '',
        content: '',
        starLevel: 5 //星级
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.goodsId = this.$route.params.id
    }
    this.initGoodsDetailInfo()
    this.initComment()
    // this.updateGoodsViewCount()
  },
  methods: {
    //点进商品详情页增加缓存中此商品的viewCount TODO
    // updateGoodsViewCount() {
    //   goodsApi.updateCacheData(this.goodsId)
    //     .then(response => {
    //       this.$message({
    //         type: 'success',
    //         message: '更新缓存成功'
    //       })
    //     })
    // },

    //初始化商品详情
    initGoodsDetailInfo() {
      goodsApi.initGoodsDetailInfo(this.goodsId)
        .then(response => {
          this.goodsInfo = response.data.goodsInfo
          this.initBrandInfo()
        })
    },
    //初始化品牌信息
    initBrandInfo() {
      console.log('打印品牌信息: ' + this.goodsInfo.brandName)
      brandApi.getBrandInfo(this.goodsInfo.brandName)
        .then(response => {
          this.brandInfo = response.data.brandInfo
        })
    },
    //添加评论
    addComment() {
      const isLogin = cookie.get('liz_ucenter');
      if (!isLogin) {
        this.$message({
          type: 'warning',
          message: '请您先登录!'
        })
        return
      }
      this.comment.goodsId = this.goodsId
      commentApi.addComment(this.comment)
        .then(response => {
          if (response.success) {
            this.$message({
              type: 'success',
              message: '发送评论成功'
            })
            //移除当前用户在可评论表的关系
            commentApi.removeCanComment(this.goodsId)
              .then(response => {})
          }
          this.comment = {}
          this.initComment()
        })
    },
    //初始化评论信息
    initComment(page = 1) {
      this.page = page
      commentApi.getGoodsCommentList(this.page, this.limit, this.goodsId)
        .then(response => {
          this.data = response.data.commentList
          this.total = Number.parseInt(response.data.total)
        })
    },
    //去指定页
    gotoPage(page = 1) {
      this.page = page
      commentApi.getGoodsCommentList(page, this.limit, this.goodsId)
        .then(response => {
          this.data = response.data.commentList
          this.total = Number.parseInt(response.data.total)
        })
    },
    //生成订单方法
    createOrder() {
      console.log('商品库存 : ' + this.goodsInfo.stock)
      if (this.goodsInfo.stock < 1) {
        this.$notify({
          title: '警告',
          message: '非常抱歉,该商品的库存不足!',
          type: 'warning'
        })
        return
      }
      orderApi.createOrder(this.goodsInfo.id)
        .then(response => {
          //获取返回的订单号
          this.orderNo = response.data.orderNo
          this.$router.push({path: '/orders/' + this.orderNo})
        })
    },
    toLogin() {
      this.$router.push({path: '/login'})
    },
    //添加进购物车
    addCart() {
      if (!cookie.get('liz_ucenter')) {
        this.$message({
          type: 'warning',
          message: '请登录后再进行操作'
        })
        return
      }
      shopcartApi.addToCart(this.goodsId, this.num)
        .then(response => {
          this.$confirm('添加购物车成功, 立即查看?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.$router.push({path: '/shopcart'})
          }).catch(() => {});
        })
    }
  }
};
</script>


<style scoped>

</style>
