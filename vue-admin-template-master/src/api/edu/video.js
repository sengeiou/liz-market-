import request from '@/utils/request'
import vi from 'element-ui/src/locale/lang/vi'

export default {

  //添加小节
  addVideo(video) {
    return request({
      url: '/eduservice/video/addVideo',
      method: 'post',
      data: video
    })
  },
  //删除章节
  deleteVideo(id) {
    return request({
      url: '/eduservice/video/' + id,
      method: 'delete'
    })
  },
  //修改章节 TODO
  updateVideo(video) {
    return request({
      url: '/eduservice/video/updateVideoInfo',
      method: 'post',
      data: video
    })
  },
  //根据id查询小节
  getVideo(id) {
    return request({
      url: '/eduservice/video/' + id,
      method: 'get'
    })
  },
  //删除视频
  deleteAlyVideo(id) {
    return request({
      url: '/eduvod/video/removeAlyVideo/' + id,
      method: 'delete'
    })
  },
}
