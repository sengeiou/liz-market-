<template>
  <el-form ref="brand" :model="brand" label-width="80px">
    <el-form-item label="品牌名称">
      <el-input v-model="brand.brandName"></el-input>
    </el-form-item>

    <el-form-item label="品牌类型">
      <el-radio-group v-model="brand.brandType">
        <el-radio value="0" :label="0">自营品牌</el-radio>
        <el-radio value="1" :label="1">大型品牌</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="品牌封面">
      <el-upload
        class="upload-demo"
        :action="BASE_API + '/marketoss/fileoss'"
        :on-success="handleAvatarSucces"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <img :src="brand.brandImg"/>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>

    <el-form-item label="排序字段">
     <el-input-number v-model="brand.sort" @change="handleChange" :min="1" :max="10" label="排序">
     </el-input-number>
   </el-form-item>
    <el-form-item label="品牌描述">
      <el-input type="textarea" v-model="brand.brandDesc"></el-input>
    </el-form-item>
    <el-form-item label="注册品牌">
      <el-switch v-model="brand.isRegister" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import brandApi from '../../../api/market/brand'

export default {
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      console.log(this.brandId)
      this.showBrandInfo(id)
    }

  },

  data() {
    return {
      BASE_API: process.env.BASE_API, //接口地址
      brand: {
        brandName: '',
        brandDesc: '',
        brandImg: '',
        sort: 0,
        brandType: '',
        isRegister: ''
      }
    }
  },
  methods: {
    saveOrUpdate() {
      if (this.brand.id) {
        //执行update
        this.updateBrand()
        return
      }
      this.registerBrand()
    },
    showBrandInfo(id) {
      brandApi.getBrandInfo(id)
        .then(response => {
          this.brand = response.data.brand
        })
    },
    registerBrand() {
      brandApi.registerBrand(this.brand)
        .then(response => {
          this.$message({
            type: 'success',
            message: '添加品牌成功'
          })
          this.brand = {}
          this.$router.push({path: "/brand/list"})
        })
    },
    updateBrand() {
      brandApi.updateBrand(this.brand)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.brand = {}
          this.$router.push({path: '/brand/list'})
        })
    },
    handleChange(value) {
      console.log(value);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 上传封面成功调用
    handleAvatarSucces(res, file) {
      this.brand.brandImg = res.data.url
    },
  }
}
</script>
