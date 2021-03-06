<template>
    <div class="app-container">

        <h2 style="text-align: center;">发布新课程</h2>

        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="编写课程基本信息"></el-step>
            <el-step title="创建课程大纲"></el-step>
            <el-step title="最终发布"></el-step>
        </el-steps>

        <el-form label-width="120px">
            <el-form-item label="课程标题">
                <el-input v-model="courseInfo.title" placeholder="示例: 机器学习项目课: 从基础到入门（注意大小写）"/>
            </el-form-item>
            <!-- 所属分类 TODO -->
            <el-form-item label="课程分类">
                <el-select v-model="courseInfo.subjectParentId"
                    placeholder="一级分类" @change="subjectLevelOneChange">
                  <el-option
                    v-for="subject in subjectOneList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id">
                  </el-option>
                </el-select>

                <!-- 二级分类 -->
                <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
                  <el-option
                    v-for="subject in subjectTwoList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id">
                  </el-option>
                </el-select>

            </el-form-item>


            <!-- 课程讲师 TODO -->
            <el-form-item label="课程讲师">
                <el-select v-model="courseInfo.teacherId" placeholder="请选择">
                  <el-option selected="selected"
                    v-for="teacher in teacherList"
                    :key="teacher.id"
                    :label="teacher.name"
                    :value="teacher.id">
                  </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="总课时">
                <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
            </el-form-item>

            <!-- 课程简介 TODO -->
            <el-form-item label="课程简介">
                <tinymce :height="200" v-model="courseInfo.description"/>
            </el-form-item>

            <!-- 课程封面 -->
            <el-form-item label="课程封面">
                <el-upload
                    :show-file-list="true"
                    :on-success="handleAvatarSucces"
                    :before-upload="beforeAvatarUpload"
                    :action="BASE_API + '/eduoss/fileoss'"
                    class="avater-uploader">
                    <img :src="courseInfo.cover"/>
                </el-upload>
            </el-form-item>

            <el-form-item label="课程价格">
                <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="完善课程请设置为0元"/>元
            </el-form-item>

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce/' //引入组件
import courseApi from '@/api/edu/course'
import subjectApi from '@/api/edu/subject'

export default {
    components: { Tinymce }, //声明组件
    data() {
        return {
            saveBtnDisabled: false,
            courseInfo: {
                id: '',
                title: '',
                subjectParentId: '', //一级分类id
                subjectId: '',      //二级分类id
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '/static/01.jpg',
                price: 0
            },
            courseId:'',
            BASE_API: process.env.BASE_API, //接口地址
            teacherList: [], //封装所有讲师的数据
            subjectOneList: [], //一级分类
            subjectTwoList: [], //二级分类

        }
    },
    created() {
        //获取路由的id值
        if (this.$route.params && this.$route.params.id) {
          this.courseId = this.$route.params.id;
          //调用根据id查询课程的方法
          this.getInfo()
        } else {
          // 初始化所有讲师
          this.getListTeacher()
          // 初始化一级分类
          this.getOneSubject()
        }
    },
    watch: {
      $route(to, form) {
        this.init()
      }
    },
    methods: {
        // 根据监听器，判断路由中是否存在id值，没有则清空数据
        init() {
          if (!this.$route.params || !this.$route.params.id) {
            this.courseInfo = {}
          }
        },
        //根据课程id查询
        getInfo() {
          courseApi.getCourseInfoId(this.courseId)
            .then(response => {
              //在courseInfo课程基本信息,包含一级分类id和二级分类id
              this.courseInfo = response.data.courseInfoVo
              //1.查询所有的分类,1级2级
              subjectApi.getSubjectList()
                .then(response => {
                  //2.获取所有的一级分类
                  this.subjectOneList = response.data.list
                  //3.把所有的一级分类数组进行遍历, 比较当前courseInfo里面的一级分类id是否匹配
                  for (let i = 0; i < this.subjectOneList.length; i++) {
                    //获取每一个一级分类
                    let oneSubject = this.subjectOneList[i];
                    if (this.courseInfo.subjectParentId === oneSubject.id) {
                      this.subjectTwoList = oneSubject.children
                    }
                  }
                })
              // 初始化所有讲师
              this.getListTeacher()
            })
        },
        // 上传封面成功调用
        handleAvatarSucces(res, file) {
            this.courseInfo.cover = res.data.url
        },
        // 上传封面前调用
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传图片只能时JPG 格式!')
            }
            if(!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },

        // 点击某个一级分类触发change事件, 显示对应二级分类
        subjectLevelOneChange(value) {
            // value-->一级分类的id值
            // 1.遍历所有的分类[包含一级,二级]
            for (let i = 0; i < this.subjectOneList.length; i++) {
                // 每个一级分类
                var oneSubject = this.subjectOneList[i]
                // 判断当前一级分类id和点击的一级分类id是否一样
                if (value === oneSubject.id) {
                    // 从当前一级分类中获取所有的二级分类
                    this.subjectTwoList = oneSubject.children
                    // 把二级分类的id值清空
                    this.courseInfo.subjectId = ''
                }
            }
        },
        // 查询所有的一级分类
        getOneSubject() {
            subjectApi.getSubjectList()
                .then(response => {
                   this.subjectOneList = response.data.list
                })
        },
        // 查询所有的讲师
        getListTeacher() {
            courseApi.getListTeacher()
                .then(response => {
                    this.teacherList = response.data.items
                })
        },
        //添加课程
        addCourse() {
          courseApi.addCourseInfo(this.courseInfo)
            .then(response => {
              // 提示信息
              this.$message({
                type: 'success',
                message: '添加课程信息成功'
              })
              // 跳转到第二步
              this.$router.push({path: `/course/chapter/${response.data.courseId}`})
            })
        },
        //修改课程
        updateCourse() {
          courseApi.updateCourseInfo(this.courseInfo)
            .then(response => {
              // 提示信息
              this.$message({
                type: 'success',
                message: '修改课程信息成功'
              })
              // 跳转到第二步
              this.$router.push({path: '/course/chapter/' + this.courseId})
          })
        },
        saveOrUpdate() {
          //判断是添加还是修改
          if (!this.courseInfo.id) {
            //添加
            this.addCourse();
          } else {
            this.updateCourse()
          }
        }
    }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
