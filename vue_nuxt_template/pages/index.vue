<template>

  <div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide" style="background: #040B1B;">
          <a target="_blank" :href="'/goods/' + banner.goodsId">
            <img width="60%"
                 :src="banner.imageUrl"
                 :alt="banner.title"/>
          </a>
        </div>

      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </div>
    <!-- 热门品牌和热门商品-->
    <div id="aCoursesList">
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门商品</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="goods in goodsList" :key="goods.id">
                  <div class="cc-l-wrap">
                    <section class="brand-img">
                      <img
                        :src="goods.cover"
                        class="img-responsive"
                        :alt="goods.goodsName"
                      >
                      <div class="cc-mask">
                        <a :href="'/goods/' + goods.id" title="查看详情" class="comm-btn c-btn-1">查看详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10 goods-title fsize18 c-555">
                      ￥{{ goods.price }}
                    </h3>
                    <h3 class="hLh30 txtOf mt10">
                      <a :href="'/goods/' + goods.id" :title="goods.goodsName" class="goods-title fsize15 c-333">{{goods.goodsName}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
<!--                      <span class="fr jgTag bg-green" v-if="Number(course.price) === 0">-->
<!--                        <i class="c-fff fsize12 f-fA">免费</i>-->
<!--                      </span>-->
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ goods.viewCount }}人查看</i>
                        |
                        <i class="c-999 f-fA">{{ goods.buyCount }}次购买</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a :href="'/goods'" title="全部商品" class="comm-btn c-btn-2">全部商品</a>
            </section>
          </div>
        </section>
      </div>

      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门品牌</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="brand in brandList" :key="brand.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/brand/' + brand.id" :title="brand.title">
                        <img :alt="brand.title"
                             :src="brand.brandImg">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a :href="'/brand/' + brand.id" :title="brand.title" class="fsize18 c-666">{{brand.brandName}}</a>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p
                        class="c-999 f-fA"
                      >{{brand.brandDesc}}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/brand" title="全部品牌" class="comm-btn c-btn-2">全部品牌</a>
            </section>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import bannerApi from "@/api/market/front/banner";
import indexApi from '@/api/index'

export default {
  data () {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        },
        autoplay: {
          delay: 3000,
          autoplayStopOnLast: false,
          autoplayDisableOnInteraction: true
        }
      },
      bannerList: [],
      brandList: [],
      goodsList: []
    }
  },
  created() {
    this.initHotBannerData()
    this.initHotBrandAndGoods()
  },
  methods:{
    initHotBrandAndGoods() {
      indexApi.getHotBrandAndGoods()
        .then(response => {
          this.brandList = response.data.hotBrandList
          this.goodsList = response.data.hotGoodsList
        })
    },
    //初始化热门轮播图数据
    initHotBannerData() {
      bannerApi.getHotBannerList()
        .then(response => {
          this.bannerList = response.data.bannerList
        })
    }
  }
}
</script>
