<template>
  <div class="sign_widget">
   <div>
     <h2>이메일 인증 필요</h2>
     <p>이메일 주소로 발송된 메일 내 링크를 클릭해 주세요.</p>
     <div class="text-wrap">
       <p>메일이 도착하지 않거나, 인증시간이 만료된 경우</p>
       <p><span @click="emailAuth()">여기</span>를 클릭하시면 인증메일이 다시 발송 됩니다.</p>
     </div>
     <button @click="confirm()">확인</button>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    emailAuth () {
      this.$http.post('/users/email_authentication', {
        username: this.$store.state.solutionAccount.username
      }).then(res => {
        alert('인증 이메일이 발송되었습니다. 이메일을 확인해주세요.')
      })
    },
    confirm () {
      this.$router.replace({'name': 'SignIn'})
    }
  }
}
</script>

<style lang="scss" scoped>
.sign_widget{width: 400px; margin: 156px 75px; float: left; text-align:center; font-size:14px; line-height:1.2;
  h2{font-size:16px; padding-bottom:37px; font-weight:bold;}
  .text-wrap{padding-top:28px;
    span{color:#ed9292; text-decoration:underline; cursor:pointer;}
  }
  button{width:160px; height:35px; line-height:35px; font-size:12px; border-radius:2px; background:#000; color:#fff; margin-top:68px;}
}
</style>
