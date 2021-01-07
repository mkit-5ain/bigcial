<template>
  <div id="app" class="sign_wrap">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import Constant from './constant'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      fullHeight: document.documentElement.clientHeight
    }
  },
  created () {
    if (localStorage.getItem('local-access-token')) {
      Vue.prototype.$http.defaults.headers.common['x-access-token'] = localStorage.getItem('local-access-token')
      const solutionAccount = this.parseJwt(localStorage.getItem('local-access-token'))
      this.$store.commit(Constant.SET_SOLUTION_ACCOUNT, solutionAccount)
    }
  },
  mounted () {
  // Register an event listener when the Vue component is ready
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    parseJwt (token) {
      let base64Url = token.split('.')[1]
      let base64 = base64Url.replace('-', '+').replace('_', '/')
      return JSON.parse(window.atob(base64))
    },
    onResize (event) {
      console.log('window has been resized', event)
      this.$eventBus.$emit('mainWindowResize', event)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/sass/main.scss'
</style>
