import request from "@/utils/request";

export default {

  //1.分页讲师查询方法
  getTeacherList(current, limit) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontList/${current}/${limit}`,
      method: 'post'
    })
  },
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontInfo/${id}`,
      method: 'get'
    })
  }
}
