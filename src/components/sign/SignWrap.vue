<template>
  <div class="sign_widget">
    <div class="sign_tab_wrap">
      <router-link to="/signin/">로그인</router-link>
      <router-link to="/signup/">회원가입</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import SignIn from '@/components/sign/SignIn'
import SignUp from '@/components/sign/SignUp'
export default {
  name: 'SignWrap',
  data () {
    return {
    }
  },
  components: {
    SignIn,
    SignUp
  },
  created () {
    this.$router.push({ name: 'SignIn' })
  }
}
</script>

<style lang="scss" scoped>
.sign_widget{width:400px; margin:60px 75px; float:left; margin-bottom:35px;
  .sign_tab_wrap{letter-spacing:-4px;
    a{width:200px; display:inline-block; vertical-align:middle; letter-spacing:0px; text-align:center; border-bottom:4px solid #ebebeb; padding-bottom:10px; color:#808080;
      &.router-link-active{border-bottom:4px solid #000; color:#000; font-weight:bold;}
    }
  }
}
</style>
