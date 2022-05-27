<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>

        <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="创建课程大纲"></el-step>
            <el-step title="最终发布"></el-step>
        </el-steps>

      <el-button type="text" @click="dialogFormVisible=true">添加章节</el-button>

      <!-- 章节-->
      <ul class="chanpterList">
        <li v-for="chapter in chapterVideoList" :key="chapter.id">
          <p>
            {{chapter.title}}

            <span class="acts">
              <el-button style="" type="text" @click="openVideo(chapter.id)">添加小节</el-button>
<!--              <el-button type="text">添加课时</el-button>-->
              <el-button style="" type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
              <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
            </span>
          </p>
          <ul class="chanpterList videoList">
            <li v-for="video in chapter.children" :key="video.id">
              <p>
                {{video.title}}
                <span class="acts">
                  <el-button style="" type="text" @click="openEditVideo(video.id)">编辑</el-button>
                  <el-button style="" type="text" @click="removeVideo(video.id)">删除</el-button>
                </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <div>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </div>
<!--      章节弹框-->
      <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
        <el-form :model="chapter" label-width="120px">
          <el-form-item label="章节标题">
            <el-input v-model="chapter.title"></el-input>
          </el-form-item>
          <el-form-item label="章节排序">
            <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
      </el-dialog>
      <!--      小节弹框-->
      <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课程">
        <el-form :model="video" label-width="120px">
          <el-form-item label="课时标题">
            <el-input v-model="video.title"/>
          </el-form-item>
          <el-form-item label="课时排序">
            <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
          </el-form-item>
          <el-form-item label="是否免费">
            <el-radio-group v-model="video.isFree">
              <el-radio :label="true">免费</el-radio>
              <el-radio :label="false">默认</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="上传视频">
          <!--TODO-->
            <el-upload
              :on-success="handleVodUploadSuccess"
              :on-remove="handleVodRemove"
              :before-remove="beforeVodRemove"
              :on-exceed="handleUploadExceed"
              :file-list="fileList"
              :action="BASE_API + '/eduvod/video/uploadAlyVideo'"
              :limit="1"
              class="upload-demo">
              <el-button size="small" type="primary">上传视频</el-button>
              <el-tooltip placement="right-end">
                <div slot="content">文件最大大小限制1G, <br>
                  支持3GP, ASF, AVI, DAT, DV, FLV, FAV.....等等很多
                </div>
                <i class="el-icon-question"/>
              </el-tooltip>
            </el-upload>
          </el-form-item>
        </el-form>;
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import chapterApi from '../../../api/edu/chapter'
import videoApi from '../../../api/edu/video'

export default {
    data() {
        return {
          saveBtnDisabled: false,
          chapterVideoList: [],
          courseId: '', //课程id
          chapter: { //封装章节数据
            title: '',
            sort: 0
          },
          dialogFormVisible: false, //章节弹框的值
          video: {
            id: '',
            title: '',
            sort: 0,
            isFree: 0,
            videoSourceId: '',
            videoOriginalName: '' //视频名称
          },
          dialogVideoFormVisible: false, //小节弹框

          BASE_API: process.env.BASE_API,
          fileList: []// 上传文件列表
        }
    },
    created() {
      //获取路由里面的id值
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        //根据课程id查询章节，小节
        this.getChapterVideo()
      }
    },
    methods: {
      //点击x调用此方法
      beforeVodRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }?`);
      },
      //上传视频成功调用的方法
      handleVodUploadSuccess(response, file, fileList) {
        //把上传之后的视频ID赋值
        this.video.videoSourceId = response.data.videoId
        //上传视频名称赋值
        this.video.videoOriginalName = file.name
        fileList = []
      },
      handleUploadExceed() {
        this.$message.warning('想要重新上传视频，请先删除已上传的视频')
      },
      //点击确定的时候调用此方法
      handleVodRemove() {
        //调用删除视频方法
        videoApi.deleteAlyVideo(this.video.videoSourceId)
          .then(response => {
            //提示
            this.$message({
              type: 'success',
              message: '删除视频成功'
            })
            //把文件列表清空 和 video对象里面的视频Id和name清空
            this.fileList = []
            this.video.videoSourceId = ''
            this.video.videoOriginalName = ''
          })
      },

        //==============================小节操作==============================
      openEditVideo(id) { //修改弹框数据回显
        this.dialogVideoFormVisible = true
        this.getVideo(id)
      },
      openVideo(chapterId) {
        //弹框
        this.dialogVideoFormVisible = true
        //设置章节
        this.video.chapterId = chapterId
      },
      //根据id查询小节
      getVideo(id) {
        videoApi.getVideo(id)
          .then(response => {
            this.video = response.data.video
          })
      },
      //删除小节
      removeVideo(id) {
        this.$confirm('此操作将永久删除章节记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { //点击确定执行then
          // 调用删除方法
          videoApi.deleteVideo(id)
            .then(response => { //删除成功
              // 提示信息
              this.$message({
                type: 'success',
                message: '删除小节成功!'
              });
              // 重新刷新页面
              this.getChapterVideo()
            })
        }).catch(() => { //点击取消执行catch
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //修改小节
      updateVideo(video) {
        videoApi.updateVideo(this.video)
          .then(response => {
            this.dialogVideoFormVisible = false
            this.$message({
              type: 'success',
              message: '修改小节成功'
            })
            this.getChapterVideo()
            this.video = {}
        })
      },
      //添加小节
      addVideo() {
        //设置课程id
        this.video.courseId = this.courseId
        videoApi.addVideo(this.video)
          .then(response => {
            //1.关闭弹框
            this.dialogVideoFormVisible = false
            //2.提示信息
            this.$message({
              type: 'success',
              message: '添加小节成功'
            })
            //3.刷新页面数据
            this.getChapterVideo()
            //4.在下次弹框的前清空表单
            this.video = {}
          })
      },
      saveOrUpdateVideo() {
        if (!this.video.id) {
          this.addVideo()
        } else {
          this.updateVideo()
        }
      },
        //===============================章节操作================================
        //删除章节功能
        removeChapter(chapterId) {
          this.$confirm('此操作将永久删除章节记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => { //点击确定执行then
            // 调用删除方法
            chapterApi.deleteChapter(chapterId)
              .then(response => { //删除成功
                // 提示信息
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                // 重新刷新页面
                this.getChapterVideo()
              })
          }).catch(() => { //点击取消执行catch
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //修改章节的方法
        updateChapter() {
          chapterApi.updateChapter(this.chapter)
            .then(response => {
              //1.关闭弹框
              this.dialogFormVisible = false
              //2.提示信息
              this.$message({
                type: 'success',
                message: '修改章节信息成功'
              })
              //3.刷新页面数据
              this.getChapterVideo()
              //4.在下次弹框的前清空表单
              this.chapter = {}
            })
        },
        //修改数据弹框【数据回显】
        openEditChapter(chapterId) {
          //弹框
          this.dialogFormVisible = true
          //调用接口
          chapterApi.getChapter(chapterId)
            .then(response => {
              this.chapter = response.data.chapter
            })
        },
        //添加章节
        addChapter() {
          //设置课程Id到chapter对象中
          this.chapter.courseId = this.courseId
          chapterApi.addChapter(this.chapter)
            .then(response => {
              //1.关闭弹框
              this.dialogFormVisible = false
              //2.提示信息
              this.$message({
                type: 'success',
                message: '添加章节信息成功'
              })
              //3.刷新页面数据
              this.getChapterVideo()
              //4.在下次弹框的前清空表单
              this.chapter = {}
            })
        },
        //添加 or 修改章节
        saveOrUpdate() {
          if (!this.chapter.id) {
            this.addChapter()
          } else {
            this.updateChapter()
          }
        },
        //根据课程id查询章节，小节
        getChapterVideo() {
          chapterApi.addAllChapterVideo(this.courseId)
            .then(response => {
              this.chapterVideoList = response.data.allChapterVideo
            })
        },
        previous() {
            // 跳转到上一步
            this.$router.push({path: '/course/info/' + this.courseId})
        },
        next() {
            // 跳转到第三步
            this.$router.push({path: '/course/publish/' + this.courseId})
        }
    }
}
</script>

<!--CSS样式-->
<style scoped>
.chanpterList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts{
  float: right;
  font-size: 14px;
  position: relative;
  z-index: 1;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>
