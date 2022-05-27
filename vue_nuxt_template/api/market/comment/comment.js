import request from "@/utils/request";

export default {
  getGoodsCommentList(current, limit, goodsId) {
    return request({
      url: `/lizgoods/comment/${current}/${limit}/${goodsId}`,
      method: 'get'
    })
  },
  addComment(comment) {
    return request({
      url: '/lizgoods/comment/addComment',
      method: 'post',
      data: comment
    })
  },
  saveNeedComment(needCommentDto) {
    return request({
      url: '/lizgoods/needcomment/saveNeedComment',
      method: 'post',
      data: needCommentDto
    })
  },
  getCanCommentList() {
    return request({
      url: '/lizgoods/needcomment/getCanCommentList',
      method: 'get'
    })
  },
  removeCanComment(goodsId) {
    return request({
      url: '/lizgoods/needcomment/removeCanComment/' + goodsId,
      method: 'delete'
    })
  },
  getAlreadyCommentList() {
    return request({
      url: '/lizgoods/needcomment/getAlreadyCommentList',
      method: 'get'
    })
  }
}
