<template>
  <el-container>
    <el-header style="line-height: 45px; height: 45px;">
      <el-row >
        <el-col :span="4">
          <el-image :src="require('@/assets/7.png')" style="width: 60px; height: 60px; position: fixed">
          </el-image><b class="top_left_text">猫头鹰助理</b>
        </el-col>
        <el-col :span="4"><br></el-col>
        <el-col :span="4"><br></el-col>
        <el-col :span="4"><br></el-col>
        <el-col :span="4"><br></el-col>
        <el-col :span="4">
          <el-image :src="require('@/assets/8.png')" style="width: 60px; height: 60px; float: right; left: 100px">
          </el-image>
          <el-popover
            placement="top-start"
            title="Shawn"
            width="200"
            trigger="hover"
            class="right">
            <div>
              this is Shawn
            </div>
            <br>
            <el-button type="danger" @click="LogOutNotification">Log out</el-button>
            <el-button slot="reference" style="vertical-align: middle">Shawn</el-button>
          </el-popover>
        </el-col>
      </el-row>
    </el-header>
    <el-divider class="el-divider--horizontal"></el-divider>
    <el-main style="line-height: 400px;">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-white"></div>
        </el-col>
        <el-col :span="8" style="margin-top: 80px">
          <div>
            <el-form>
              <el-form-item>
                <el-row style="text-align: center">
                  <b style="font-size: 32px;"> 登录 </b>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row style="text-align: center">
                  <b style="font-size: 20px;"> 抱歉，您当前无访问权限 </b>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8">
          <el-image :src="require('@/assets/7.png')"
                    style="width: 343px; height: 450px" class="bg_picture">
          </el-image>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Error',
  data () {
    return {
      activeIndex: this.$route.path
    }
  },
  methods: {
    LogOutNotification () {
      this.$confirm('Are you sure to log out?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'log out success!'
        })
        this.$router.push({path: '/'})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'log out canceled'
        })
      })
    },
    handleSelect (key, keyPath) {
      if (key === this.$route.path) {
        return
      }
      this.$router.push(key)
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 60px;
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

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 20px 0px;
}

.right {
  position: absolute;
  right: 25px;
  margin: 5px;
  /*width: 300px;*/
  /*border: 3px solid #73AD21;*/
  /*padding: 10px;*/
}

.top_left_text{
  position: absolute;
  left: 70px;
  margin: 10px;
}
</style>
