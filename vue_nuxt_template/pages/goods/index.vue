<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部商品</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">商品类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="searchWithNoQuery()">全部</a>
                </li>
                <li v-for="(item, index) in oneCategoriesList" :key="index" :class="{active:oneIndex === index}">
                  <a :title="item.cateName" href="#" @click="searchOneCategories(item.id, index)">{{ item.cateName }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(item, index) in twoCategoriesList" :key="index" :class="{active:twoIndex === index}">
                  <a :title="item.cateName" href="#" @click="searchTwoCategories(item.id, index)">{{ item.cateName }}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(item, index) in threeCategoriesList" :key="index" :class="{active:threeIndex === index}">
                  <a :title="item.cateName" href="#" @click="searchThreeCategories(item.id, index)">{{ item.cateName }}</a>
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
                      <li v-for="goods in data" :key="goods.id">
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
                          <div class="mt15 i-q-txt">
                            <p v-if="goods.description != null"
                              class="c-999 f-fA"
                            >{{delHtmlTag(goods.description)}}</p>
                          </div>

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
                         @current-change="getGoodsListWithQuery"
          />
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import categoriesApi from "@/api/market/categories/categories";
import goodsApi from "@/api/market/goods/goods";


export default {

  data() {
    return {
      queryGoodsName: '',
      page:1, //当前页
      limit: 8,
      data: {}, //商品列表
      total: 0,

      oneCategoriesList: [],
      twoCategoriesList: [],
      threeCategoriesList: [],

      queryObj: {
        cateId: '',
        sortType: 'tb_goods.gmt_create',
      }, // 查询表单对象

      oneIndex: -1,
      twoIndex: -1,
      threeIndex: -1,
      buy_count: "", //购买数量排序
      gmt_create: "", //时间排序
      price: "" //价格排序
    }
  },
  created() {
    this.initOneCategories()
    this.getGoodsList()
  },
  methods: {
    initOneCategories() {
      categoriesApi.getAllCategories()
        .then(response => {
          this.oneCategoriesList = response.data.list
          console.log(this.oneCategoriesList)
        })
    },
    //不带条件的分页查询
    getGoodsList(page = 1) {
      this.page = page
      goodsApi.queryAllGoodsFront(this.page, this.limit)
        .then(response => {
          this.data = response.data.goodsList
          this.total = Number.parseInt(response.data.total)
        })
    },
    //带条件的分页查询
    getGoodsListWithQuery(page = 1) {
      this.page = page
      goodsApi.getFrontGoodsWithQuery(this.page, this.limit, this.queryObj)
        .then(response => {
          this.data = response.data.goodsList
          this.total = Number.parseInt(response.data.total)
        })
    },

    //点击全部触发
    searchWithNoQuery() {
      this.oneIndex = -1
      this.twoIndex = -1
      this.threeIndex = -1
      this.buy_count = ''
      this.gmt_create = ''
      this.price = ''
      this.twoCategoriesList = []
      this.threeCategoriesList = []
      this.getGoodsList()
    },
    //点击一级分类触发
    searchOneCategories(id, index) {
      this.oneIndex = index
      this.twoIndex = -1
      this.threeIndex = -1
      this.twoCategoriesList = []
      this.threeCategoriesList = []

      this.queryObj.cateId = id
      this.getGoodsListWithQuery(1)

      for (let i = 0; i < this.oneCategoriesList.length; i++) {
        if (this.oneCategoriesList[i].id === id) {
          this.twoCategoriesList = this.oneCategoriesList[i].children
        }
      }
    },
    //点击二级分类触发
    searchTwoCategories(id, index) {
      this.twoIndex = index
      this.threeIndex = -1
      this.threeCategoriesList = []

      this.queryObj.cateId = id
      this.getGoodsListWithQuery(1)
      for (let i = 0; i < this.twoCategoriesList.length; i++) {
        if (this.twoCategoriesList[i].id === id) {
          this.threeCategoriesList = this.twoCategoriesList[i].children
        }
      }
    },
    //点击三级分类触发
    searchThreeCategories(id, index) {
      this.threeIndex = index
      this.queryObj.cateId = id
      this.getGoodsListWithQuery(1)
    },

    searchViewCount() {
      //设置对应的变量中的值【样式生效】
      this.buy_count = "1"
      this.gmt_create = ''
      this.price = ''

      //把值赋值到searchObj
      this.queryObj.sortType = "view_count";
      this.getGoodsListWithQuery(1)
    },
    //7 根据最新进行排序
    searchGmtCreate() {
      this.buy_count = "";
      this.gmt_create = "1";
      this.price = "";

      this.queryObj.sortType = "tb_goods.gmt_create";
      this.getGoodsListWithQuery(1)
    },
    //价格排序
    searchPrice() {
      this.buy_count = "";
      this.gmt_create = "";
      this.price = "1";

      this.queryObj.sortType = "price";
      this.getGoodsListWithQuery(1)
    },
    delHtmlTag (str) {
      return str.replace(/<[^>]+>/g, '')
    },

    queryGoodsLikeName() {
      goodsApi.queryGoods(this.queryGoodsName)
        .then(response => {
          this.data = response.data.goodsList
        })
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
