<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"><a href="/#/Main/" class="el-icon-s-home"></a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/#/Main/phoneAssist">电话辅销</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row><br></el-row>
    <el-row>
      <el-col :span="16">
        <el-button type="primary" @click="translationStart" :loading="ConfirmLoading">{{loadingbuttext}}</el-button>
        <el-button type="danger" @click="translationEnd" style="" v-if="showclose">结束对话</el-button>
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <br>
    <div class="communicate_box" style="padding-right: 2vh;height: 80vh">
      <el-scrollbar ref="leftScrollbar" style="height:100%">
        <div class="box-card" style="margin-bottom: 20px">
          <div v-for="(item, index) in list" :key="item" style="padding: 5px">
            <div v-if="index % 2 ==0" style="text-align: right">
              <div>
              <el-card :body-style="{padding:'10px'}" style="display: inline-block;">
                {{item}}
              </el-card>
              <el-image :src="require('@/assets/8.png')" style="width: 2.4em;margin-bottom: 0.2em"></el-image>
              </div>
            </div>
            <div v-else style="text-align: left">
              <div>
              <el-image :src="require('@/assets/client.png')" style="width: 2.4em;margin-bottom: 0.2em"></el-image>
              <el-card :body-style="{padding:'10px'}" style="display: inline-block;">
                {{item}}
              </el-card>
              </div>
              <div><br></div>
              <el-card>
                <div v-for="(key, index_3) in keywords[(index-1)/2]" :key="key" style="line-height: 2em">
                  <b>{{key}}</b>
                  {{contents[(index-1)/2][index_3]}}
                </div>
              </el-card>
            </div>
            <br>
          </div>
          <br>
        </div>
      </el-scrollbar>
    </div>

    <el-dialog title="对话记录" :visible.sync="dialogVisible" width="60%" height="100%">

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
        <div class="communicate_box" style="padding-right: 2vh;height: 40vh">
          <el-scrollbar ref="leftScrollbar" style="height:100%">
            <div class="box-card" style="margin-bottom: 20px">
              <el-card v-for="(item, index) in list" :key="item" style="padding: 5px">
                <div v-if="index % 2 ==0" style="text-align: right">
                  <div>
                  <el-card :body-style="{padding:'10px'}" style="display: inline-block;">
                    {{item}}
                  </el-card>
                  <el-image :src="require('@/assets/8.png')" style="width: 2.4em;margin-bottom: 0.2em"></el-image>
                  </div>
                </div>
                <div v-else style="text-align: left">
                  <div>
                  <el-image :src="require('@/assets/client.png')" style="width: 2.4em;margin-bottom: 0.2em"></el-image>
                  <el-card :body-style="{padding:'10px'}" style="display: inline-block;">
                    {{item}}
                  </el-card>
                  </div>
                  <div><br></div>
                  <el-card>
                    <div v-for="(key, index_3) in keywords[(index-1)/2]" :key="key" style="line-height: 2em">
                      <b>{{key}}</b>
                      {{contents[(index-1)/2][index_3]}}
                    </div>
                  </el-card>
                </div>
                <br>
              </el-card>
              <br>
            </div>
          </el-scrollbar>
        </div>

      </div>
      <br>
      <br>
      <div class="rate">
        <el-rate
          v-model="form.score">
        </el-rate>
      </div>
      <span slot="footer" class="dialog-footer">
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
    if (voice === '' || voice === undefined)
      return
    if (start_time === undefined)
      return
    text_time.push(start_time)
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
    if (voice === undefined || voice ==='')
      return
    text_list.push(voice)
    if (text_list.length % 2 === 0) {
      axios.get('/recommend?str=' + voice, {
        headers: {
          'token': localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          keyword.push(res.data.data.key_word)
          content.push(res.data.data.content)
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
      ConfirmLoading: false,
      loadingbuttext:'开始对话',
      showclose: false,
      form: {
        job_id: 0,
        phone: '',
        score: 0,
        start_time: '',
        end_time: '',
        content: ''
      },
      keywords: keyword,
      contents: content
    }
  },
  //监听list变化
  watch: {
    'list': {
      handler : function (newValue, oldValue) {
        this.$nextTick(function () {
          this.scrollDown()
        })
      },
      deep: true
    }
  },
  created() {
    this.form.job_id = parseInt(localStorage.getItem('userName'))
    let phone = Math.floor(Math.random() * 9 ) + 1            //随机生成1~9之间的整数
    this.form.phone = phone.toString() + '1230'
  },
  methods: {
    translationStart() {
      //启动语音识别
      iatRecorder.start()
      this.ConfirmLoading = true
      this.loadingbuttext = '对话中'
      this.showclose = true
      let start_date = new Date()
      this.form.start_time = start_date.toISOString().slice(0, 10) + ' ' + start_date.toLocaleTimeString()
    },
    translationEnd() {
      //结束对话
      iatRecorder.stop()
      this.dialogVisible = true
      this.ConfirmLoading = false
      this.loadingbuttext = '开始对话'
      this.showclose = false
      let end_date = new Date()
      this.form.end_time = end_date.toISOString().slice(0, 10) + ' ' + end_date.toLocaleTimeString()
      for (let i = 0; i < text_time.length; i++) {
        //将每一句话的内容和开始时间存入数据库
        this.form.content += text_list[i] + '\t' + text_time[i] + '\n'
        if (i % 2 !== 0) {
          for (let j = 0; j < 3; j++) {
            this.form.content += this.keywords[(i-1)/2][j] + ':\t' + this.contents[(i-1)/2][j] + '\n'
          }
        }
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
          this.list = []
          this.$router.go(0)   //刷新页面
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        }else if (res.data.code === 401) {
          this.$message.error('登录过期，请重新登录');
          this.$router.push('/login')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    scrollDown() {
      this.$refs['leftScrollbar'].wrap.scrollTop = this.$refs['leftScrollbar'].wrap.scrollHeight
    }
  }
}
</script>

<style>

element.style {
  margin-top: 15vh;
  width: 70%;
  height: 65%;
}

.communicate_box {
  overflow: hidden;
  width: auto;
  color: #B3C0D1;
  /*margin: 0 auto;*/
}
.communicate_box_in_dialog{
  overflow: hidden;
  width: auto;
  height: 40vh;
  color: #575757;
  margin-left: 2vh;
  /*margin: 0 auto;*/
}

div.el-dialog__body {
  padding-bottom: 0px;
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
