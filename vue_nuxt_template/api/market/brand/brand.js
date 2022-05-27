import request from "@/utils/request";

export default {

  getBrandInfo(brandName) {
    return request({
      url: '/lizgoods/brand/getBrandInfo',
      method: 'get',
      params: {'brandName' : brandName}
    })
  },
  getBrandList() {
    return request({
      url: '/lizgoods/brand/getBrandList',
      method: 'get'
    })
  },
  getBrandListPage(current, limit, type) {
    return request({
      url: `/lizgoods/brand/getBrandListPage/${current}/${limit}`,
      method: 'get',
      data: type
    })
  },
  getBrandDetailInfo(brandId, current, limit, type) {
    return request({
      url: `/lizgoods/brand/getBrandDetailInfo/${brandId}/${current}/${limit}/${type}`,
      method: 'get'
    })
  }
}
