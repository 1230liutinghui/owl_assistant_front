<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }" class="el-icon-s-home"></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/#/Main/recordList">记录列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <br>
    <el-form :model="ruleForm" ref="ruleForm" label-width="7.2em">
      <div style="padding-right: 2vh;display:inline">
      <!--input block-->
      <div style="display:inline">
      <el-form-item label="客户联络方式" prop="phoneNumber" class="formItem">
        <el-input v-model="ruleForm.phoneNumber" style="width: 15em"></el-input>
      </el-form-item>
      <el-form-item label="对话记录ID" prop="recordId" class="formItem">
        <el-input v-model="ruleForm.workerId" style="width: 15em"></el-input>
      </el-form-item>
      </div>
      <!--button-->
      <div style="display:inline;float:right;padding-right: 2vh">
      <el-form-item class="formItem" >
        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      </div>
      </div>
      <div style="padding-right: 2vh">
      <br>
      <!--display table-->
      <el-table :data="search == '' ? tableData : totalData.filter(data => !search || data.index.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
        <el-table-column
          label="记录ID" prop="id"></el-table-column>
        <el-table-column
          label="客户联络方式" prop="phone"></el-table-column>
        <el-table-column
          label="开始时间" prop="start_time"></el-table-column>
        <el-table-column
          label="结束时间" prop="end_time"></el-table-column>
        <el-table-column
          label="评分" prop="score"></el-table-column>
      </el-table>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RecordList',
  data () {
    return {
      job_id: 0,
      tableData: [
        {
          id: 0,
          phone: '',
          start_time: '',
          end_time: '',
          score: 0
        }
      ],
      totalData: [],
      ruleForm: {
        phone: '',
        id: 0
      },
      search: ''
    }
  },
  created() {
    //从本地获取用户工号
    this.job_id = localStorage.getItem("userName")
    //向后端请求当前用户的通话记录
    this.$http.get('/record/queryByUserId?job_id=' + this.job_id, {
      headers: {
        'token': localStorage.getItem('token')
      }
    }).then(res => {
      this.tableData = res.data
      this.totalData = res.data
    })
  },
  methods: {
    handleSearch () {
      this.total = this.totalData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase())).length
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getTableData(this.currentPage, val)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTableData(val, this.pageSize)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.small-font{
  font-size: 12px;
}

.formItem{
  display: inline-block;
}
</style>
