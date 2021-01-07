<template>
  <!-- 입력 폼 -->
  <div>
    <div class="name_wrap">
      <div class="title">이름</div>
      <div><input type="text" placeholder="이름을 입력해주세요" v-model="accountName" ref="name"></div>
    </div>
    <div class="name_wrap">
      <div class="title">회사</div>
      <div><input type="text" placeholder="회사명을 입력해주세요" v-model="accountCompany" ref="company"></div>
    </div>
    <div class="name_wrap">
      <div class="title">연락처</div>
      <div><input type="text" placeholder="연락처를 입력해주세요" v-model="contactNumber" ref="contact_number"></div>
    </div>
    <div class="pw_wrap">
      <div class="title">비밀번호</div>
      <div><input type="password" placeholder="현재 비밀번호를 입력해주세요" v-model="currentPassword"></div>
    </div>
    <p class="change_btn">
      <button @click="modify">변경</button>
    </p>
  </div>
</template>

<script>
export default {
  created () {
    this.solutionAccount = this.$store.state.solutionAccount
    this.accountName = this.solutionAccount.name
    this.accountCompany = this.solutionAccount.company
    this.contactNumber = this.solutionAccount.contact_number
  },
  data () {
    return {
      accountName: '',
      accountCompany: '',
      contactNumber: '',
      currentPassword: ''
    }
  },
  watch: {
    contactNumber (val) {
      if (val != null) {
        val = val.replace(/[^0-9]/g, '')
        this.contactNumber = val.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
      }
    }
  },
  methods: {
    modify () {
      this.$http.post('/users/' + this.$store.state.solutionAccount.id, {
        password: this.currentPassword
      }).then(res => {
        const success = res.data.success
        if (success === 'YES') {
          this.$http.put('/users/' + this.$store.state.solutionAccount.id, {
            username: this.$store.state.solutionAccount.username,
            password: this.currentPassword,
            name: this.$refs.name.value,
            company: this.$refs.company.value,
            contact_number: this.$refs.contact_number.value
          }).then(res => {
            alert('변경사항 저장이 완료되었습니다.')
            this.$store.state.solutionAccount.name = this.$refs.name.value
            this.$store.state.solutionAccount.company = this.$refs.company.value
            this.$store.state.solutionAccount.contact_number = this.$refs.contact_number.value
            this.$router.push({ name: 'Account' })
          })
        } else {
          alert('현재 비밀번호가 일치하지 않습니다.')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section_title{margin-bottom:74px;}
.title{font-size:14px; font-weight:bold; margin-bottom:10px; letter-spacing:1px;}
input[type="text"]{width:410px; height:32px; line-height:30px; border:2px solid #f5f5f5; border-radius:4px; text-indent:14px;
  &{
    input:-ms-input-placeholder { color: #000;}
    input::-webkit-input-placeholder { color: #000;}
    input::-moz-placeholder { color: #000;}
  }
}
.affiliation_wrap{margin-bottom:60px;
  .affiliation_select{height:32px; line-height:30px;
    input{height:32px; line-height:30px;}
  }
  .select_btn{width: 100%; margin: 0 auto; height: 38px; line-height: 36px; font-size: 16px;}
}
.pw_wrap{
  input{width: 410px; height: 32px; line-height: 30px; border: 2px solid #f5f5f5; border-radius: 4px; text-indent: 14px;}
}
.name_wrap{margin-bottom:18px;}
.section_prlogue{padding-top:8px;}
.change_btn{text-align:center; margin-top:68px;
  button{width:100px; height:45px; line-height:45px; background:#000; color:#fff; text-align:center; border-radius:4px;}
}
</style>
