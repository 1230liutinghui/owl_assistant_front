<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }" class="el-icon-s-home"></el-breadcrumb-item>
      <el-breadcrumb-item><a href="/#/Main/phoneAssist">电话辅销</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row><br></el-row>
    <el-row>
      <el-col :span="4"><el-button type="primary" @click="translationStart">开始对话</el-button>  <i class="el-icon-microphone"></i></el-col>
      <el-col :span="4"><el-button type="primary" @click="translationEnd">结束对话</el-button></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <br>
    <div>
      <el-card v-for="(item, index) in list" :key="item">
        <div v-if="index % 2 ==0" style="text-align: right">{{item}}</div>
        <div v-else style="text-align: left">
          <div>{{item}}</div>
          <div>关键词:</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import IatRecorder from '@/assets/js/IatRecorder.js'
import axios from "axios";
var text_time = []          //保存每一句话的内容
var text_list = []          //每一句话的开始时间
//初始化iatRecorder
const iatRecorder = new IatRecorder({
  accent:'mandarin',
  onTextChange: function (text) {
    let voice = text.split('\t')[0]
    let start_time = text.split('\t')[1]
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
    text_list.push(voice)
    if (text_list.length % 2 == 0) {
      axios.get('http://localhost:8989/recommend?str=' + voice, {
        headers: {
          'token': localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data);
        }
      })
    }
}})

export default {
  name: 'PhoneAssist',
  data () {
    return {
      list: text_list,
      time: text_time
    }
  },
  methods: {
    translationStart() {
      //启动语音识别
      iatRecorder.start()
    },
    translationEnd() {
      //结束对话
      iatRecorder.stop()
    }
  },
}
</script>

<style>
.communicate_box{
  overflow: hidden;
  width: auto;
  height: 570px;
  color: #B3C0D1;
  /*margin: 0 auto;*/
}

/*.scrollMenuBox {*/
/*  height: 200px;*/
/*  width: 100px;*/
/*  border: 1px solid red;*/
/*}*/

/* 需要在外层套一个div,切记命名特殊一点,防止因缺少scoped，对其他页面会有冲突 */
.center .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
