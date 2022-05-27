import request from '@/utils/request'

export default {
    //   1.添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },

    // 2.查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduservice/teacher/findAll',
            method: 'get'
        })
    },

//  3.根据课程id查询课程基本信息
    getCourseInfoId(courseId) {
      return request({
        url: '/eduservice/course/getCourseInfo/' + courseId,
        method: 'get'
      })
    },
//  4.修改课程信息
    updateCourseInfo(courseInfo) {
      return request({
        url: '/eduservice/course/updateCourseInfo',
        method: 'post',
        data: courseInfo
      })
    },
  //5.课程确认信息显示
  getPublishCourseInfo(id) {
    return request({
      url: '/eduservice/course/getPublishCourseInfo/' + id,
      method: 'get',
    })
  },
  //课程最终发布
  publishCourse(id) {
    return request({
      url: '/eduservice/course/publishCourse/' + id,
      method: 'post',
    })
  },
  //TODO 课程列表
  getListCourse() {
      return request({
        url: '/eduservice/course',
        method: 'get'
      })
  },
  //【按照条件】查询课程
  getListCourseByCondition(current, limit, courseQuery) {
      return request({
        url: `/eduservice/course/condition/${current}/${limit}`,
        method: 'post',
        data: courseQuery
      })
  },
  //根据id删除课程
  removeCourseById(courseId) {
      return request({
        url: '/eduservice/course/' + courseId,
        method: 'delete'
      })
  }
}
