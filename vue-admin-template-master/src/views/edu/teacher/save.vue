<template>
    <div class="app-container">
        讲师添加
        <el-form label-width="120px">
          <el-form-item label="讲师名称">
              <el-input v-model="teacher.name"/>
          </el-form-item>
          <el-form-item label="讲师排序">
              <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
          </el-form-item>
          <el-form-item label="讲师头衔">
              <el-select v-model="teacher.level" clearable placeholder="请选择">
                  <!-- 数据类型一定要和取出的json中的一致
                        value使用动态绑定的值，保证其数据类型是Number
                   -->
                <el-option :value="1" label="高级讲师"></el-option>
                <el-option :value="2" label="首席讲师"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="讲师资历">
              <el-input v-model="teacher.career"/>
          </el-form-item>
          <el-form-item label="讲师简介">
              <el-input v-model="teacher.intro" :row="10" type="textarea"/>
          </el-form-item>

          <!-- 讲师头像 TDDO-->
          <el-form-item label="讲师头像">
              <!-- 头像缩略图 -->
              <pan-thumb :image="teacher.avatar"/>
              <!-- 上传按钮 -->
              <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
              </el-button>
                <!-- v-show:是否显示上传组件
                    :key 类似id,一个页面多个图片上传，可作区分
                    :url: 后台上传的url地址
                 -->
              <image-cropper
                            v-show="imagecropperShow"
                            :width="100"
                            :height="100"
                            :key="imagecropperKey"
                            :url="BASE_API+'/eduoss/fileoss'"
                            field="file"
                            @close="close"
                            @crop-upload-success="cropSuccess"/>
          </el-form-item>

          <el-form-item>
              <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher.js'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
    components: {ImageCropper, PanThumb},
    data() {
        return {
            teacher: {
                name: '',
                sort: 0,
                level: 1,
                career: '',
                intro: '',
                avatar: '',
            },
            //上传弹框的值是否显示
            imagecropperShow: false,
            imagecropperKey: 0, //上传组件key的值,
            BASE_API: process.env.BASE_API, //获取dev.env.js里面的ip端口号
            saveBtnDisabled: false //保存是否禁用
        }
    },
    created() { //多次路由跳转都到同一个页面，只会执行第一次
        console.log('created')
        this.init()
    },

    watch: { //监听
        $route(to, from) { //路由变化的方式, 路由发生变化，方法就执行
            this.init()
        }
    },
    
    methods: {
        close() { //关闭上传弹框方法
            this.imagecropperShow = false
            // 上传组件初始化
            this.imagecropperKey = this.imagecropperKey + 1
        },

        cropSuccess(data) { //上传成功的方法
            // 上传之后接口返回图片地址
            console.log("cropSuccess().............")
            this.teacher.avatar = data.url
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
        },

        init() {
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                this.getInfo(id)
            } else { //路径没有id值，那么清空 表单
                this.teacher = {} //双向绑定到表单数据
            }
        },

        // 根据讲师id查询的方法
        getInfo(id) {
            teacherApi.getTeacherInfo(id)
                .then(response => {
                    this.teacher = response.data.teacher
                })
                .catch(error => {
                })
        },
        saveOrUpdate() {
            // 判断是修改还是添加-->根据teacher里面是否有id
            
            if (!this.teacher.id) {
                // 添加
                this.saveTeacher()
            } else {
                this.updateTeacher()
            }
        },

        // 修改讲师
        updateTeacher() {
            teacherApi.updateTeacherInfo(this.teacher)
                .then(response => {
                     // 1.给用户一个成功提示
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    // 2.回到列表页面显示数据---->路由跳转
                    this.$router.push({path: '/teacher/table'})
                })
                .catch(error => {
                })
        },

        // 添加讲师的方法
        saveTeacher() {
            teacherApi.addTeacher(this.teacher)
                .then(response => {
                    // 1.给用户一个成功提示
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                    // 2.回到列表页面显示数据---->路由跳转
                    this.$router.push({path: '/teacher/table'})
                })
                .catch(error => {
                })
        }
    }
}
</script>