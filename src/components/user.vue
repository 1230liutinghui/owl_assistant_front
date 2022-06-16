<template>
  <div>
    <el-table
      :data="search == '' ? tableData : totalData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="id" prop="id"></el-table-column>
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column
        label="生日"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.bir }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住址" prop="address"></el-table-column>
      <el-table-column label="操作">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @input="handleSearch"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row style="margin-top: 10px">
      <el-col :span="8" :offset="14">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :span="8" :offset="10">
        <el-button type="success" round
                   @click="showDialog">添加用户
        </el-button>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px" size="small" style="margin-top: 20px" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="生日" prop="bir">
          <el-date-picker v-model="form.bir" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input type="textarea" v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      tableData: [],
      totalData: [],
      form: {
        name: '',
        address: '',
        bir: new Date(),
        sex: '男'
      },
      show: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      search: '',
      rules: {
        name: [
          {required: true, message: '请填写姓名', trigger: 'blur'},
          {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
        ],
        bir: [
          {required: true, message: '请选择日期', trigger: 'change'}
        ],
        address: [
          {required: true, message: '请填写住址', trigger: 'blur'}
        ]
      },
      currentPage: 1,
      pageSize: 5,
      total: 1
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
          this.$http.post('http://localhost:8989/user/save', this.form).then(res => {
            if (res.data.status) {
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              this.form = {}
              this.getTableData(this.currentPage, this.pageSize)
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getTableData (page, size) {
      page = page == null ? 1 : this.currentPage
      size = size == null ? 5 : this.pageSize
      this.$http.get('http://localhost:8989/user/findByPage?pageCurrent=' + page + '&rows=' + size).then(res => {
        this.tableData = res.data.userList
        this.total = res.data.total
      })
    }
  },
  created () {
    this.$http.get('http://localhost:8989/user/findAll').then(res => {
      this.totalData = res.data
    })
    this.getTableData()
  }
}
</script>

<style scoped>

</style>
