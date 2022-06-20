<template>
  <el-container>
    <el-header>
      <el-col :span="4">
        <el-image :src="require('@/assets/Group 1.png')" style="width: 2vh; height: 2vh;top: 1vh;left: 0.5vh">
        </el-image><b class="top_left_text" style="margin-top:0.6vh;left: 4vh">猫头鹰助理</b>
      </el-col>
    </el-header>
    <el-main style="line-height: 30vh;">
      <el-row>
        <el-col :span="10">
          <div class="grid-content bg-white"></div>
        </el-col>
        <el-col :span="4" style="margin-top: 80px">
          <div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item>
                <br>
                <el-row style="text-align: center">
                  <b style="font-size: 32px; margin-bottom: 0"> 登录 </b>
                </el-row>
                <br>
              </el-form-item>
              <el-form-item label="工号" prop="userName" style="font-weight: 600;">
                <el-input style="width: 100%" placeholder="请输入内容" v-model="ruleForm.userName"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" style="font-weight: 600;">
                <el-input style="width: 100%" placeholder="请输入内容" type="password" v-model="ruleForm.password"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <br>
                <el-row style="text-align: center">
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row style="text-align: center">
                  <router-link to="/OA" style="text-decoration: none;color: dodgerblue">OA登录</router-link>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="10"><el-image :src="require('@/assets/7.png')"
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
        userName: [
          {validator: validateId, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ]
      },
      pass: {
        user_id: '',
        isSucceed: '1',
        token: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 向后端请求用户认证
          this.$http.post('/user/login', this.ruleForm).then(res => {
            // console.log(res.data)
            if (res.data.code === 200) {
              // alert(res.data.msg)
              localStorage.setItem('token', res.data.data.token)
              localStorage.setItem('userName', this.ruleForm.userName)
              this.$router.push('/main')
            } else if (res.data.code === 401) {
              alert('用户名或密码错误，请重试')
            } else {
              alert('请勿重复登录')
            }
          })
        } else {
          alert('用户名或密码不能为空')
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

.router-link-active {
  text-decoration: none;
  color: blue;
}

.el-form-item__label {
  font-weight: 200;
}

.el-header, .el-footer {
  background-color: #FFFFFF;
  color: #333;
  line-height: 5vh;
  border-bottom:1px solid #D3DCE6
}

.el-row {
  margin-bottom: 0px;
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
