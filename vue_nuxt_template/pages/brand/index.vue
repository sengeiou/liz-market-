<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部品牌</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">品牌类型</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="getBrandList">全部</a>
                </li>
                <li>
                  <a title="自营品牌" href="#" @click="getBrandNormalList">自营品牌</a>
                </li>
                <li>
                  <a title="大型品牌" href="#" @click="getBrandGreatList">大型品牌</a>
                </li>

              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <!--          <section class="fl">-->
          <!--            <ol class="js-tap clearfix">-->
          <!--              <li :class="{'current bg-orange':buy_count!=''}">-->
          <!--                <a title="浏览量" href="javascript:void(0);" @click="searchViewCount()">浏览量-->
          <!--                  <span :class="{hide:buy_count==''}">↓</span>-->
          <!--                </a>-->
          <!--              </li>-->
          <!--              <li :class="{'current bg-orange':gmt_create!=''}">-->
          <!--                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新-->
          <!--                  <span :class="{hide:gmt_create==''}">↓</span>-->
          <!--                </a>-->
          <!--              </li>-->
          <!--              <li :class="{'current bg-orange':price!=''}">-->
          <!--                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;-->
          <!--                  <span :class="{hide:price==''}">↓</span>-->
          <!--                </a>-->
          <!--              </li>-->
          <!--            </ol>-->
          <!--          </section>-->
        </div>

        <div class="aCoursesList">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，荔枝正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <div>
            <section class="container">
              <div>
                <article class="comm-course-list" v-if="total > 0">
                  <ul class="of" id="bna">
                    <li v-for="brand in brandList" :key="brand.id">
                      <div class="cc-l-wrap" v-if="brand != null">
                        <section class="brand-img">
                          <img
                              :src="brand.brandImg"
                              class="img-responsive"
                              :alt="brand.brandName"
                          >
                          <div class="cc-mask">
                            <a :href="'/brand/' + brand.id" title="查看详情" class="comm-btn c-btn-1">查看详情</a>
                          </div>
                        </section>
                        <h3 class="hLh30 txtOf mt10">
                          <a :href="'/brand/' + brand.id" :title="brand.brandName" class="goods-title fsize15 c-333">{{brand.brandName}}</a>
                        </h3>
                        <div class="mt15 i-q-txt">
                          <p v-if="brand.brandDesc != null"
                             class="c-999 f-fA"
                          >{{delHtmlTag(brand.brandDesc)}}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="clear"></div>
                </article>
              </div>
            </section>
          </div>
          <el-pagination background
                         :current-page="page"
                         :page-size="limit"
                         :total="total"
                         style="padding: 30px 0; text-align: center;"
                         layout="total, prev, pager, next, jumper"
                         @current-change="getBrandList"
          />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import brandApi from "@/api/market/brand/brand";

export default {

  data() {
    return {
      page: 1,
      limit: 8,
      total: 0,
      brandList: [],
      oneIndex: 0,
      twoIndex: 0,
    }
  },
  created() {
    this.getBrandList()
  },
  methods: {
    getBrandList(page = 1) {
      this.page = page
      brandApi.getBrandListPage(this.page, this.limit, null)
          .then(response => {
            this.brandList = response.data.brandList
            this.total = Number.parseInt(response.data.total)
          })
    },
    getBrandNormalList(page = 1) {
      this.page = page
      brandApi.getBrandListPage(this.page, this.limit, 0)
          .then(response => {
            this.brandList = response.data.brandList
            this.total = Number.parseInt(response.data.total)
          })
    },
    getBrandGreatList(page = 1) {
      this.page = page
      brandApi.getBrandListPage(this.page, this.limit, 1)
          .then(response => {
            this.brandList = response.data.brandList
            this.total = Number.parseInt(response.data.total)
          })
    },

    delHtmlTag (str) {
      return str.replace(/<[^>]+>/g, '')
    }
  }
}
</script>

<style scoped>
.active {
  background: #bdbdbd;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>
