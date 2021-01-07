<template>
  <div id="sign_wrap">
    <div id="sign">
      <!-- 로고 -->
      <sign-logo/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import SignLogo from '@/components/sign/SignLogo'

export default {
  created () {
    this.$router.push({ name: 'SignWrap' })
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    SignLogo
  },
  methods: {
    signIn () {
      this.$http.post('/users/signin', {
        username: this.username,
        password: this.password
      }).then((res) => {
        const data = res.data.data
        const success = res.data.success

        if (success === 'YES' && data.active === true) {
          // 로컬 액세스 토큰 저장
          localStorage.setItem('local-access-token', data.token)
          this.$router.push({name: 'Description'})
        } else if (success === 'YES' && data.active === false) {
          alert('이메일 인증을 확인해주세요')
        } else {
          alert('아이디 또는 비밀번호를 확인해주세요')
        }
      })
    },
    signPassword () {
      this.$router.push({name: 'FindPassword'})
    },
    signUp () {
      this.$router.push({name: 'SignUp'})
      console.log('signup')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
