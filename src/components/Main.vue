<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4">
          <el-image :src="require('@/assets/7.png')" style="width: 60px; height: 60px;">
          </el-image><b class="top_left_text">猫头鹰助理</b>
        </el-col>
        <el-col :span="4"><br></el-col>
        <el-col :span="4"><br></el-col>
        <el-col :span="4"><br></el-col>
        <el-col :span="4">
          <el-image :src="require('@/assets/8.png')" style="width: 60px; height: 60px; float: right; left: 100px">
          </el-image>
        </el-col>
        <el-col :span="4">
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
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="activeIndex"
          class="el-menu-vertical-demo"
          @select="handleSelect">
          <el-menu-item index="/Main/Home">
            <i class="el-icon-s-home"> 首页</i>
          </el-menu-item>
          <el-menu-item index="/Main/phoneAssist">
            <i class="el-icon-phone-outline"> 电话辅销</i>
          </el-menu-item>
          <el-menu-item index="/Main/recordList">
            <i class="el-icon-document"> 记录列表</i>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Main',
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
        this.$http.get('http://localhost:8989/user/logout', {
          headers: {
            'token': localStorage.getItem('token')
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: 'log out success!'
            })
            localStorage.removeItem('token')
            this.$router.replace({path: '/'})
          } else {
            alert('注销失败，请重试')
          }
        })
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
  },
  created () {
    this.$http.get('http://localhost:8989/authority', {
      headers: {
        'token': localStorage.getItem('token')
      }
    }).then(res => {
      if (res.data.code === 403) {
        this.$router.push('/Error')
      }
    })
  }
}

</script>

<style scoped>
/*.el-container{height:100%;padding:0;margin:0;width:100%;}*/

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 800px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  height: 700px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.right {
  position: absolute;
  right: 25px;
  /*width: 300px;*/
  /*border: 3px solid #73AD21;*/
  /*padding: 10px;*/
}

.left {
  position: absolute;
  left: 25px;
  /*width: 300px;*/
  /*border: 3px solid #73AD21;*/
  /*padding: 10px;*/
}

.top_left_text{
  position: absolute;
  left: 80px;
}

</style>
