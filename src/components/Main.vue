<template>
  <div>

    <div id="main_section">
      <ui-header/>
      <ui-aside/>
      <router-view/>
      <ui-footer/>
    </div>

  </div>
</template>

<script>

import Header from '@/components/layout/Header'
import Aside from '@/components/layout/Aside'
import Footer from '@/components/layout/Footer'

export default {
  name: 'Main',
  components: {
    'ui-header': Header,
    'ui-aside': Aside,
    'ui-footer': Footer
  },
  watch: {
    '$route' (to, from) {
      window.scrollTo(0, 0)
      // console.log('route watch', this.$el.querySelector('#main_section'))
      // console.log(to, from)
    }
  },
  created () {
    // console.log('created Main', this.$router.currentRoute.path)
    // this.$router.push({ name: 'Account' })
  }
}
</script>

<style lang="scss">

</style>
