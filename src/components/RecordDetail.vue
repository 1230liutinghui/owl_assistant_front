<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/记录列表' }" class="el-icon-s-home"></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/#/Main/recordList">记录列表</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/#/Main/recordList/recordDetail">记录详情</a></el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-card class="box-card">
        <b style="line-height: 50px">记录信息</b>
      <el-row>
        <el-col :span="8"><div>记录ID：{{recordID}}</div></el-col>
        <el-col :span="8"><div>销售人员工号：{{workerId}}</div></el-col>
        <el-col :span="8"><div>客户联系方式：{{phoneNumber}}</div></el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="8"><div>销售人员：{{sellerName}}</div></el-col>
        <el-col :span="8"><div>客户姓名：{{customerName}}</div></el-col>
        <el-col :span="8">
          <div>销售人员评分：
            <el-rate class="rateStyle"
                     v-model="rate"
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
          <el-card class="box-card" v-for="item in list" :key="item">
            <div v-for="o in item" :key="o" class="text item">
              {{'列表内容 ' + o }}
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
      recordID: '2019',
      workerId: 'LANXIANG233',
      phoneNumber: '110',
      sellerName: '张三',
      customerName: '王五',
      rate: 4,
      list: [
        {
          name: 'zjh',
          para: 'xsaxsaxsa'
        }, {
          xsax: 'xsa',
          xsa: '111'
        }, {
          xsax: 'xsa',
          xsa: '111'
        }, {
          xsax: 'xsa',
          xsa: '111'
        }, {
          xsax: 'xsa',
          xsa: '111'
        }, {
          xsax: 'xsa',
          xsa: '111'
        }
      ]
    }
  }
}
</script>

<style scoped>
.rateStyle{
  display: inline-block;
}
</style>
