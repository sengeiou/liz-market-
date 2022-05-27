import request from '../../utils/request'

export default {
  //注册品牌
  registerBrand(brand) {
    return request({
      url: '/lizgoods/brand/registerBrand',
      method: 'post',
      data: brand
    })
  },
  //获取所有的品牌
  getBrandList() {
    return request({
      url: '/lizgoods/brand/getBrandList',
      method: 'get'
    })
  },
  //删除品牌
  removeBrandById(brandId) {
    return request({
      url: '/lizgoods/brand/removeBrand/' + brandId,
      method: 'delete'
    })
  },
  //编辑品牌
  updateBrand(brand) {
    return request({
      url: '/lizgoods/brand/updateBrand',
      method: 'post',
      data: brand
    })
  },
  //根据id查询品牌
  getBrandInfo(id) {
    return request({
      url: '/lizgoods/brand/getBrandInfo/' + id,
      method: 'get'
    })
  }
}
