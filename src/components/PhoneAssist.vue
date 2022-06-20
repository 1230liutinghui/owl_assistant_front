<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }" class="el-icon-s-home"></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/#/Main/phoneAssist">电话辅销</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row><br></el-row>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="translationStart">开始对话</el-button>
        <i class="el-icon-microphone"></i></el-col>
      <el-col :span="4">
        <el-button type="danger" @click="translationEnd">结束对话</el-button>
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <br>
    <div class="communicate_box">
      <el-scrollbar style="height:100%">
        <el-card class="box-card">
          <el-card v-for="(item, index) in list" :key="item">
            <div v-if="index % 2 ==0" style="text-align: right">{{ item }}</div>
            <div v-else style="text-align: left">
              <div>{{ item }}</div>
              <div v-for="(key, index_3) in keywords[(index-1)/2]" :key="key">
                {{key}}
                {{contents[(index-1)/2][index_3]}}
              </div>
            </div>
          </el-card>
        </el-card>
      </el-scrollbar>
    </div>

    <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="70%" >

      <div class="communicate_box_in_dialog">
        <el-row :gutter="20">
          <el-col :span="6">销售人员工号:</el-col>
          <el-col :span="6">{{form.job_id}}</el-col>
          <el-col :span="6">客户联系方式</el-col>
          <el-col :span="6">{{form.phone}}</el-col>
        </el-row>
        <br>
        <el-row :gutter="20">
          <el-col :span="6">开始时间:</el-col>
          <el-col :span="6">{{form.start_time}}</el-col>
          <el-col :span="6">结束时间:</el-col>
          <el-col :span="6">{{form.end_time}}</el-col>
        </el-row>
        <br>
        <el-scrollbar style="height:100%">
          <el-card class="box-card">
            <el-card v-for="(item, index) in list" :key="item">
              <div v-if="index % 2 ==0" style="text-align: right">{{ item }}</div>
              <div v-else style="text-align: left">
                <div>{{ item }}</div>
                <div v-for="(key, index_3) in keywords[(index-1)/2]" :key="key">
                  {{key}}
                  {{contents[(index-1)/2][index_3]}}
                </div>
              </div>
            </el-card>
          </el-card>
        </el-scrollbar>
      </div>
      <div class="rate">
        <el-rate
          v-model="form.score">
        </el-rate>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import IatRecorder from '@/assets/js/IatRecorder.js'
import axios from "axios";

var text_time = []          //保存每一句话的内容
var text_list = []          //每一句话的开始时间

var keyword = []            //关键字
var content = []               //提示内容
//初始化iatRecorder
const iatRecorder = new IatRecorder({
  accent: 'mandarin',
  onTextChange: function (text) {
    let voice = text.split('\t')[0]
    let start_time = text.split('\t')[1]
    if (start_time == undefined)
      return
    text_time.push(start_time)
    if (voice == '')
      return
    if (text_list.length >= 1) {
      //获取第一个字符是否为标点符号
      let punctuation = voice.charAt(0)
      let reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
      if (reg.test(punctuation)) {
        //获取list中最后一个元素
        let last = text_list.pop()
        text_list.push(last + punctuation)
        voice = voice.substring(1, voice.length)
      }
    }
    if (voice == undefined)
      return
    text_list.push(voice)
    if (text_list.length % 2 == 0) {
      axios.get('/recommend?str=' + voice, {
        headers: {
          'token': localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data);
        }
      })
    }
  }
})

export default {
  name: 'PhoneAssist',
  data() {
    return {
      list: text_list,
      time: text_time,
      dialogVisible: false,
      form: {
        job_id: 2019,
        phone: '18900000000',
        score: 0,
        start_time: '',
        end_time: '',
        content: ''
      },
      keywords: [
        [
          "关键字1_1",
          "关键字2_1",
          "关键字3_1",
        ],
        [
          "关键字1_2",
          "关键字2_2",
          "关键字3_2",
        ]
      ],
      contents: [
        [
          "内容1_1",
          "内容2_1",
          "内容3_1",
        ],
        [
          "内容1_2",
          "内容2_2",
          "内容3_2",
        ]
      ]
    }
  },
  methods: {
    translationStart() {
      //启动语音识别
      iatRecorder.start()
      let start_date = new Date()
      this.form.start_time = start_date.toISOString().slice(0, 10) + ' ' + start_date.toLocaleTimeString()
    },
    translationEnd() {
      //结束对话
      iatRecorder.stop()
      this.dialogVisible = true
      let end_date = new Date()
      this.form.end_time = end_date.toISOString().slice(0, 10) + ' ' + end_date.toLocaleTimeString()
      for (let i = 0; i < text_time.length; i++) {
        this.form.content += text_list[i] + '\t' + text_time[i] + '\n'
      }
    },
    submit() {
      this.dialogVisible = false
      this.$http.post('/record/addRecord', this.form,{
        headers: {
          'token': localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        }else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
}
</script>

<style>
.communicate_box {
  overflow: hidden;
  width: auto;
  height: 570px;
  color: #B3C0D1;
  /*margin: 0 auto;*/
}
.communicate_box_in_dialog{
  overflow: hidden;
  width: auto;
  height: 300px;
  color: #B3C0D1;
  /*margin: 0 auto;*/
}
/*.scrollMenuBox {*/
/*  height: 200px;*/
/*  width: 100px;*/
/*  border: 1px solid red;*/
/*}*/
.rate{
  text-align:center;
}

/* 需要在外层套一个div,切记命名特殊一点,防止因缺少scoped，对其他页面会有冲突 */
.center .el-scrollbar__wrap {
  overflow-x: hidden;
}

.formItem {
  display: inline-block;
}
</style>
