<template>
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="form-wrap">
        <form class="form_style">
          <div class="form-group">
            <label for="username">이메일</label>
            <input type="text" class="form-cohttp://dev.ig.pickdata.co.kr:8080/#/signin/ntrol" id="username" v-model="username" autocomplete="off">
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" class="form-control" id="password" v-model="password" @keyup.enter="signIn" autocomplete="off">
          </div>
        </form>
        <button class="btn btn-success" @click="signIn()">LOG IN</button>
      </div>
      <div class="sign_etc">
        <button class="btn btn-info" @click="findPassword()">임시비밀번호 발급받기</button>
      </div>
   <!--    <div class="no1">123</div>
      <div class="no2">123</div>
      <div class="no3">123</div>
      <div class="no4">123</div> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Constant from '../../constant'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    // if (localStorage.getItem('local-access-token')) {
    //   Vue.prototype.$http.defaults.headers.common['x-access-token'] = localStorage.getItem('local-access-token')
    //   if (localStorage.getItem('fb-access-token')) {
    //     this.$router.push({name: 'Main'})
    //   }
    // }
  },
  methods: {
    signIn () {
      const self = this
      this.$http.post('/users/signin', {
        username: this.username,
        password: this.password
      }).then((res) => {
        const data = res.data.data
        const success = res.data.success
        const userId = data.id

        if (success === 'YES' && data.active === true && data.valid === true) {
          // 로컬 액세스 토큰 저장 및 default request header 설정
          localStorage.setItem('local-access-token', data.token)
          Vue.prototype.$http.defaults.headers.common['x-access-token'] = localStorage.getItem('local-access-token')
          // 로컬 로그인 정보
          const solutionAccount = this.parseJwt(localStorage.getItem('local-access-token'))
          this.$store.commit(Constant.SET_SOLUTION_ACCOUNT, solutionAccount)
          // FB 액세스 토큰 확인
          self.checkFbToken(userId)
        } else if (success === 'YES' && data.active === false) {
          this.$store.state.solutionAccount.username = this.username
          this.$router.push({name: 'EmailAuth'})
        } else if (success === 'YES' && data.valid === false) {
          this.$router.push({name: 'SignActivationComplete'})
        }
      // eslint-disable-next-line
      }).catch(err => {
        this.$router.push({name: 'SignFail'})
      })
    },
    findPassword () {
      this.$router.push({name: 'FindPassword'})
    },
    signUp () {
      this.$router.push({name: 'SignUp'})
    },
    parseJwt (token) {
      let base64Url = token.split('.')[1]
      let base64 = base64Url.replace('-', '+').replace('_', '/')
      return JSON.parse(window.atob(base64))
    },
    checkFbToken (userId) {
      this.$http.get('/users/' + userId + '/check_fb_token').then(res => {
        const data = res.data.data
        if (data.is_valid === true) {
          console.log('FB 토큰 유효')
          localStorage.setItem('fb-access-token', data.fb_user.fb_access_token)
          this.$store.commit(Constant.SET_FB_ACCOUNT, data.fb_user)
          this.$router.push({name: 'Main'})
        } else if (data.is_valid === false) {
          console.log('FB 토큰 만료')
          this.$router.push({name: 'SignInFacebook'})
        } else {
          console.log('FB 계정 연동 안됨')
          this.$router.push({name: 'SignInFacebook'})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.right_wrap{margin-top:113px;}
// $color1:#111;
// $color2:#222;
// $color3:#333;
// $color4:#333;
// @for $i from 1 through 4 {
//   .no#{$i} { background:#{$color1}}
// }
</style>
