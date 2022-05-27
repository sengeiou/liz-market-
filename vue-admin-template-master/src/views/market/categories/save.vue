<template>
    <div class="app-container">
        <el-form label-width="120px">
          <el-form-item label="信息描述">
              <el-tag type="info">
                  excel模板说明
              </el-tag>
              <el-tag>
                  <l class="el-icon-download"/>
                  <a :href="'/static/test01.xlsx'">点击下载模板</a>
              </el-tag>
          </el-form-item>

          <el-form-item label="选择Excel">
              <el-upload
                ref="upload"
                :auto-upload="false"
                :on-success="fileUploadSuccess"
                :on-error="fileUploadError"
                :disabled="importBtnDisabled"
                :limit="1"
                :action="BASE_API+'/lizgoods/categories/addCategories'"
                name="file"
                accept="application/vnd.ms-excel">

                <el-button slot="trigger" size="small" type="primary">
                    选取文件
                </el-button>
                <el-button
                    :loading="loading"
                    style="margin-left: 10px;"
                    size="small"
                    type="success"
                    @click="submitUpload">上传到服务器</el-button>
              </el-upload>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            BASE_API: process.env.BASE_API,
            importBtnDisabled: false, //按钮是否禁用
            loading: false
        }
    },
    created() {
    },
    methods: {
        submitUpload() {
            this.importBtnDisabled = true
            this.loading = true
            this.$refs.upload.submit()
        },
        fileUploadSuccess() {
            // 提示信息
            this.loading = false
            this.$message({
                type: 'success',
                message: '添加商品分类成功'
            })
            this.$router.push({path: '/categories/list'})
        },
        fileUploadError() {
            this.loading = false
            this.$message({
                type: 'error',
                message: '添加商品分类失败'
            })
        }
    }
}
</script>
