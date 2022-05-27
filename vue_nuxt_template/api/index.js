import request from "~/utils/request";

export default {

  //查询热门商品和品牌
  getHotBrandAndGoods() {
    return request({
      url: '/front/index/getHotBrandAndGoods',
      method: 'get'
    })
  }
}
