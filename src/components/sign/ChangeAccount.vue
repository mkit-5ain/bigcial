<template>
  <div>
    <div class="text_info">
      <p>현재 연결된 페이스북 계정의 변경을 원하시면</p>
      <p><span>[계정 연결 해제]</span> 버튼을 클릭 해 주세요.</p>
    </div>
    <div class="text_info">
      <p>계정 연결 해제와 함께 로그아웃 되며,</p>
      <p>재 로그인 후 다른 페이스북 계정으로 연결하실 수 있습니다.</p>
    </div>
    <div class="account_wrap">
      <h3>현재 연결된 계정</h3>
      <div class="user_info clearfix">
        <div class="u_logo"><img :src="this.$store.state.fbAccount.picture_url"></div>
        <div class="u_brand">
          <strong>{{ this.$store.state.fbAccount.name }}</strong>
          <p>{{ this.$store.state.fbAccount.email }}</p>
        </div>
      </div>
    </div>
    <p class="change_btn">
      <button @click="logout()">계정 연결 해제</button>
    </p>
  </div>
</template>

<script>
import Account from '@/components/ui/account/Account'
export default {
  name: 'ChangeAccount',
  data () {
    return {
      solutionAccountId: this.$store.state.solutionAccount.id
    }
  },
  components: {
    'ui-account': Account
  },
  methods: {
    logout () {
      const ret = confirm('현재 계정의 연결을 해제하고, 로그인 페이지로 이동합니다.')
      if (ret) {
        this.$http.delete('/users/' + this.solutionAccountId + '/unlink_fb').then(res => {
          localStorage.clear()
          this.$router.replace({name: 'SignIn'})
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.u_logo{
  img{width:50px;}
}
.text_info{text-align:center; margin-bottom:20px; font-size:12px; line-height:1.4;
  span{font-weight:bold;}
}
.account_wrap{margin-top:30px;
  h3{font-size:12px; margin-bottom:5px;}
  .user_info{border:1px solid #f2f1f1; padding:10px;}
}
.change_btn{text-align:center; margin-top:30px;
  button{height:45px; line-height:45px; background:#000; color:#fff; text-align:center; border-radius:4px; padding:0px 10px;}
}
</style>
