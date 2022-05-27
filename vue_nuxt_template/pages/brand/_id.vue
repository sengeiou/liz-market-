<template>

  <div id="aCoursesList" class="bg-fa of">

    <section class="container">

      <header class="comm-title">
        <el-link icon="el-icon-back" type="primary" href="/brand">全部品牌</el-link>
        <div class="ccInfo">
          <img :src="brandDetail.brandImg">
          <div class="main">
            <el-descriptions direction="vertical" :column="1" border>
              <el-descriptions-item label="品牌">{{brandDetail.brandName}}</el-descriptions-item>
              <el-descriptions-item label="品牌类型">
                <el-tag>{{brandDetail.brandType === 0 ? '自营品牌' : '大型品牌'}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="热度排行" :span="2">
                <el-tag type="danger">{{brandDetail.brandSort}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="品牌描述">
                <el-tag>{{delHtmlTag(brandDetail.brandDesc)}}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </header>
      <el-divider content-position="center">品牌热销商品</el-divider>
      <section class="c-sort-box">
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buy_count!=''}">
                <a title="浏览量" href="javascript:void(0);" @click="searchViewCount()">浏览量
                  <span :class="{hide:buy_count==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmt_create!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                  <span :class="{hide:gmt_create==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':price!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:price==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div><br/>

        <div class="aCoursesList">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="brandDetail.goodsList.length === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，荔枝正在努力整理中...</span>
          </section>
<!--           /无数据提示 结束-->
          <div>
            <section class="container">
              <div>
                <article class="comm-course-list" v-if="brandDetail.goodsList.length > 0">
                  <ul class="of" id="bna">
                    <li v-for="goods in brandDetail.goodsList" :key="goods.id">
                      <div class="cc-l-wrap" v-if="goods != null">
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
                          <a :href="'/goods/' + goods.id" :title="goods.goodsName" class="goods-title fsize15 c-333">{{goods.goodsName}}—{{goods.brandName}}</a>
                        </h3>
                        <section class="mt10 hLh20 of">
                          <!--                      <span class="fr jgTag bg-green" v-if="Number(course.price) === 0">-->
                          <!--                        <i class="c-fff fsize12 f-fA">免费</i>-->
                          <!--                      </span>-->
                          <span class="fl jgAttr c-ccc f-fA">
                              <i class="c-999 f-fA">{{goods.viewCount}}人查看</i>
                              |
                              <i class="c-999 f-fA">{{ goods.buyCount }}次购买</i>
                            </span>
                        </section>
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
                         @current-change="getBrandDetail"
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
      brandId: '',
      brandDetail: {
        brandId: '',
        brandName: '',
        brandDesc: '',
        brandSort: 0,
        brandType: 0,
        brandImg: '',
        goodsList: []
      },
      buy_count: '',
      gmt_create: '',
      price: '',
      type: -1,
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.brandId = this.$route.params.id
    }
    this.getBrandDetail()
  },
  methods: {
    getBrandDetail(page = 1) {
      this.page = page
      brandApi.getBrandDetailInfo(this.brandId, this.page, this.limit, this.type)
        .then(response => {
          this.brandDetail = response.data.brandDetail
          this.total = Number.parseInt(response.data.total)
          console.log(this.brandDetail)
        })
    },
    delHtmlTag (str) {
      return str.replace(/<[^>]+>/g, '')
    },

    searchViewCount() {
      //设置对应的变量中的值【样式生效】
      this.buy_count = "1"
      this.gmt_create = ''
      this.price = ''

      this.type = 0
      this.getBrandDetail(1)
    },
    // 根据最新进行排序
    searchGmtCreate() {
      this.buy_count = "";
      this.gmt_create = "1";
      this.price = "";

      this.type = 1
      this.getBrandDetail(1)
    },
    //价格排序
    searchPrice() {
      this.buy_count = "";
      this.gmt_create = "";
      this.price = "1";

      this.type = 2
      this.getBrandDetail(1)
    },
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

