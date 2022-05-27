<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="过滤关键字" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import categoriesApi from '../../../api/market/categories'
export default {
  created() {
    this.getAllCategories()
  },
  data() {
    return {
      filterText: '',
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'cateName'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    getAllCategories() {
        categoriesApi.getAllCategories()
            .then(resoponse => {
                this.data2 = resoponse.data.list
            })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.cateName.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>
