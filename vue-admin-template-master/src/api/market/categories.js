import request from '../../utils/request'

export default {

  //获取所有商品分类
  getAllCategories() {
    return request({
      url: '/lizgoods/categories/getAllCategories',
      method: 'get'
    })
  },
  //获取全部类别【不进行封装】
  getCategoriesList() {
    return request({
      url: '/lizgoods/categories/getCategoriesList',
      method: 'get'
    })
  }
}
