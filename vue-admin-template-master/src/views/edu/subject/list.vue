<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

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
import subjectApi from '@/api/edu/subject'
export default {

    created() {
        this.getAllSubjectList()
    },

    data() {
        return {
        filterText: '',
        data2: [],
        defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    getAllSubjectList() {
        subjectApi.getSubjectList()
            .then(resoponse => {
                this.data2 = resoponse.data.list
            })
            .catch(error => {
            })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>
