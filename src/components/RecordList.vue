<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }" class="el-icon-s-home"></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/#/Main/recordList">记录列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!--input block-->
      <el-form-item label="销售人员工号" prop="workerId" class="formItem">
        <el-input v-model="ruleForm.workerId"></el-input>
      </el-form-item>
      <el-form-item label="记录ID" prop="recordId" class="formItem">
        <el-input v-model="ruleForm.recordId"></el-input>
      </el-form-item>
      <el-form-item label="客户联络方式" prop="phoneNumber" class="formItem">
        <el-input v-model="ruleForm.phoneNumber"></el-input>
      </el-form-item>
      <!--button-->
      <el-form-item class="formItem">
        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

      <!--display table-->
      <el-table :data="search == '' ? tableData : totalData.filter(data => !search || data.index.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
        <el-table-column
          label="序号" prop="index"></el-table-column>
        <el-table-column
          label="记录ID" prop="recordId"></el-table-column>
        <el-table-column
          label="客户联络方式" prop="phoneNumber"></el-table-column>
        <el-table-column
          label="销售人员工号" prop="workerId"></el-table-column>
        <el-table-column
          label="开始时间" prop="startTime"></el-table-column>
        <el-table-column
          label="结束时间" prop="endTime"></el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RecordList',
  data () {
    return {
      tableData: [
        {
          index: ' ',
          recordId: ' ',
          phoneNumber: ' ',
          workerId: ' ',
          startTime: ' ',
          endTime: '2022-6-24'
        }
      ],
      totalData: [],
      ruleForm: {
        phoneNumber: '',
        recordId: '',
        workerId: ''
      },
      search: ''
      // rules: {
      //   name: [
      //     { required: true, message: '请输入活动名称', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ],
      //   region: [
      //     { required: true, message: '请选择活动区域', trigger: 'change' }
      //   ],
      //   date1: [
      //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      //   ],
      //   date2: [
      //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
      //   ],
      //   type: [
      //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
      //   ],
      //   resource: [
      //     { required: true, message: '请选择活动资源', trigger: 'change' }
      //   ],
      //   desc: [
      //     { required: true, message: '请填写活动形式', trigger: 'blur' }
      //   ]
      // }
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
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
    showDialog () {
      this.dialogFormVisible = true
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
