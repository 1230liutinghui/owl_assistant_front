<template>
  <el-container >
    <el-header>
      <el-col :span="4">
        <el-image :src="require('@/assets/Group 1.png')" style="width: 2vh; height: 2vh;top: 1vh;left: 0.5vh">
        </el-image><b class="top_left_text" style="margin-top:0.6vh;left: 4vh">猫头鹰助理</b>
      </el-col>
    </el-header>
    <el-main style = "line-height: 400px;">
      <el-row>
        <el-col :span="8"><div class="grid-content bg-white"></div></el-col>
        <el-col :span="8" style="margin-top: 80px">
          <div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item>
                <el-row style="text-align: center">
                  <br>
                  <b style="font-size: 32px; margin-bottom: 0"> 登录 </b>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-image :src="require('@/assets/8.png')"
                          style="width: 12vh;margin-left: 2.3vh" class="user_picture">
                </el-image>
              </el-form-item>
              <el-form-item>
                <el-row style="text-align: center">
                  <el-button type="primary" @click="submitForm('ruleForm')"> OA自动登录</el-button>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row style="text-align: center">
                  <router-link to="/login" style="text-decoration: none;color: dodgerblue">账号密码登录</router-link>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8"><el-image :src="require('@/assets/7.png')"
                                    style="margin-top:10vh;width: 36.5vh" class="bg_picture"></el-image>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    var validateId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入工号'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        checkId: [
          { validator: validateId, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          this.$router.push('/main')
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
.el-row {
  margin-bottom: 20px;
}

.el-header, .el-footer {
  background-color: #FFFFFF;
  color: #333;
  line-height: 5vh;
  border-bottom:1px solid #D3DCE6
}

.el-col.last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-white {
  background: #ffffff
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bg_picture {
  left: 30%;
  opacity: 60%;
}
.user_picture {
  left: 35%;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 20px 0px;
}
.top_left_text{
  position: absolute;
  left: 80px;
  margin: 10px;
}
</style>
