import request from '../../utils/request'

export default {

  addGoods(goodsInfo) {
    return request({
      url: '/lizgoods/goods/addGoods',
      method: 'post',
      data: goodsInfo
    })
  },
  queryGoods(goodsId) {
    return request({
      url: '/lizgoods/goods/queryGoods/' + goodsId,
      method: 'get'
    })
  },
  //提交最后的商品信息
  finalSubmitGoods(goodsInfo) {
    return request({
      url: '/lizgoods/goods/finalSubmitGoods',
      method: 'post',
      data: goodsInfo
    })
  },
  //更新商品基本信息
  updateGoodsInfo(goodsInfo) {
    return request({
      url: '/lizgoods/goods/updateGoods',
      method: 'post',
      data: goodsInfo
    })
  },
  //根据id获取商品基本信息
  getGoodsBaseInfo(goodsId) {
    return request({
      url: '/lizgoods/goods/getGoodsBaseInfo/' + goodsId,
      method: 'get'
    })
  },
  //获取商品发布信息
  getGoodsPublishInfo(goodsId) {
    return request({
      url: '/lizgoods/goods/getGoodsPublishInfo/' + goodsId,
      method: 'get'
    })
  },
  //发布商品
  publishGoods(goodsId) {
    return request({
      url: '/lizgoods/goods/publishGoods/' + goodsId,
      method: 'get'
    })
  },
  //获取所有商品信息
  getGoodsList(current, limit) {
    return request({
      url: `/lizgoods/goods/getGoodsList/${current}/${limit}`,
      method: 'get'
    })
  },
  //根据条件查询商品
  getGoodsListQuery(current, limit, goodsQueryVo) {
    return request({
      url: `/lizgoods/goods/getGoodsListQuery/${current}/${limit}`,
      method: 'post',
      data: goodsQueryVo
    })
  },
  //删除商品信息
  removeGoods(goodsId) {
    return request({
      url: '/lizgoods/goods/removeGoods/' + goodsId,
      method: 'delete'
    })
  }
}
