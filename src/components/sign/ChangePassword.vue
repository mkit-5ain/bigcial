<template>
  <!-- 입력 폼 -->
  <div>
    <div class="password_wrap">
      <div class="title">비밀번호</div>
      <!-- 적합할 경우 버튼 생성 success-->
      <p><input type="password" placeholder="현재 비밀번호" v-model="currentPassword"></p>
      <p><input type="password" placeholder="새 비밀번호" v-model="newPassword"></p>
      <p><input type="password" placeholder="새 비밀번호 확인" v-model="newPasswordCheck"></p>
    </div>
    <p class="change_btn">
      <button @click="modify()">변경</button>
    </p>
  </div>
</template>

<script>

export default {
  data () {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordCheck: ''
    }
  },
  methods: {
    modify () {
      this.$http.post('/users/' + this.$store.state.solutionAccount.id, {
        password: this.currentPassword
      }).then(res => {
        const success = res.data.success
        if (success === 'YES') {
          if (this.newPassword === this.newPasswordCheck) {
            if (this.newPassword.length >= 8) {
              this.$http.put('/users/' + this.$store.state.solutionAccount.id, {
                username: this.$store.state.solutionAccount.username,
                password: this.newPassword
              }).then(res => {
                alert('비밀번호 변경이 완료되었습니다')
                this.$router.push({name: 'Account'})
              })
            } else {
              alert('비밀번호가 너무 짧습니다')
            }
          } else {
            alert('새 비밀번호가 일치하지 않습니다')
          }
        } else {
          alert('현재 비밀번호가 일치하지 않습니다')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.signchange_wrap{
  .signchange_inner_wrap{width:410px; margin:45px auto;
    .section_title{margin-bottom:74px;}
    .title{font-size:14px; font-weight:bold; margin-bottom:10px; letter-spacing:1px;}
    .success{background:url(../../assets/images/icon/success.png) 384px center no-repeat;}
    .section_prlogue{padding-top:8px;}
    .name_wrap{margin-bottom:18px;}
    .password_wrap{
      p{padding-bottom:10px;
        &:last-child{padding-bottom:0px;}
          input[type="password"]{width:410px; height:32px; line-height:30px; border:2px solid #f5f5f5; border-radius:4px; text-indent:14px;
          &{
            input:-ms-input-placeholder { color: #000;}
            input::-webkit-input-placeholder { color: #000;}
            input::-moz-placeholder { color: #000;}
          }
        }
      }
    }
    .change_btn{text-align:center; margin-top:60px;
      button{width:100px; height:45px; line-height:45px; background:#000; color:#fff; text-align:center; border-radius:4px;}
    }
  }
}
</style>
