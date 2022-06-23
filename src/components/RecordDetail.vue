<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/记录列表' }"><a href="/#/Main/" class="el-icon-s-home"></a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/#/Main/recordList">记录列表</a></el-breadcrumb-item>
      <el-breadcrumb-item><a >记录详情</a></el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-card class="box-card">
        <b style="line-height: 50px">记录信息</b>
      <el-row>
        <el-col :span="8"><div>记录ID：{{this.record.id}}</div></el-col>
        <el-col :span="8"><div>销售人员工号：{{this.record.job_id}}</div></el-col>
        <el-col :span="8"><div>客户联系方式：{{this.record.phone}}</div></el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="8"><div>开始时间：{{this.record.start_time}}</div></el-col>
        <el-col :span="8"><div>结束时间：{{this.record.end_time}}</div></el-col>
        <el-col :span="8">
          <div>销售人员评分：
            <el-rate class="rateStyle"
                     v-model="value"
                     disabled
                     show-score
                     text-color="#ff9900"
                     score-template="{value}">
            </el-rate>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <br>
    <div class="communicate_box">
      <el-scrollbar style="height:100%">
        <el-card class="box-card">
          <el-card class="box-card" v-for="(item, ind) in list" :key="ind">
            <div v-for="(str, index) in item" :key="str">
              <div v-if="index == 0" style="text-align: right">{{ str }}</div>
              <div v-else style="text-align: left">{{ str }}</div>
            </div>
          </el-card>
        </el-card>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordDetail',
  data () {
    return {
      id: 0,
      record: {},
      value: 0,
      list: []
    }
  },
  created() {
    //获取路由跳转的参数
    this.id = this.$route.query.id
    //根据id查询记录详情
    this.$http.get('/record/queryById?id=' + this.id, {
      headers: {
        'token': localStorage.getItem('token')
      }
    }).then(res => {
      this.record = res.data
      this.value = res.data.score
      let test = res.data.content
      let text = test.split('\n')       //存储内容
      let last = text.pop()     //删除最后一个元素，空字符串
      let temp = []             //临时存储一次对话，五个string一组
      for (let i = 0; i < text.length; i++) {
        if (i % 5 == 0) {
          if (i != 0)
            this.list.push(temp)
          temp = []
          temp.push(text[i])
        } else{
          temp.push(text[i])
        }
        if (i == text.length - 1)
          this.list.push(temp)
      }
    })
  }
}
</script>

<style scoped>
.rateStyle{
  display: inline-block;
}
</style>
