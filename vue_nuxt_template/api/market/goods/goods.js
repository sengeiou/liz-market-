import request from "@/utils/request";

export default {
  queryAllGoodsFront(current, limit) {
    return request({
      url: `/front/goods/getAllGoods/${current}/${limit}`,
      method: 'get'
    })
  },
  getFrontGoodsWithQuery(current, limit, queryObj) {
    return request({
      url: `/front/goods/getFrontGoodsWithQuery/${current}/${limit}`,
      method: 'post',
      data: queryObj
    })
  },
  initGoodsDetailInfo(goodsId) {
    return request({
      url: '/front/goods/getGoodsDetailInfo/' + goodsId,
      method: 'get',
    })
  },
  //TODO
  updateCacheData(goodsId) {
    return request({
      url: '/front/goods/updateCacheData/' + goodsId,
      method: 'get'
    })
  },
  queryGoods(goodsName) {
    return request({
      url: '/lizgoods/goods/queryGoods',
      method: 'get',
      data: goodsName
    })
  }
}
