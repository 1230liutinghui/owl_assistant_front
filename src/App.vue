<template>
  <div id="app">
<!--    <HelloWorld/>-->
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      activeIndex: this.$route.path
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === this.$route.path) {
        return
      }
      this.$router.push(key)
    }
  }
}
</script>

<style>
  html,body,#app{
  height: 100%;
}
</style>
