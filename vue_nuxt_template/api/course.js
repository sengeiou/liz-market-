import request from "@/utils/request";

export default {

  //1.条件查询带分页课程方法
  getCourseList(current, limit, searchObj) {
    return request({
      url: `/eduservice/coursefront/getFrontCourseList/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //2. 查询所有分类的方法
  getAllSubject() {
    return request({
      url: '/eduservice/subject/getAllSubject',
      method: 'get'
    })
  },
  //3. 课程详情功能
  getCourseInfo(id) {
    return request({
      url: '/eduservice/coursefront/getFrontCourseInfo/' + id,
      method: 'get'
    })
  }
}
