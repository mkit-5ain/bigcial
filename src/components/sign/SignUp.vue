<template>
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="form-wrap">
        <form>
          <div class="form-group">
            <input type="email"
                   class="form-control"
                   id="email"
                   v-model="email"
                   autocomplete="off"
                   @blur="duplicateCheck()">
            <label for="email">이메일<span>{{emailValidationMessage}}</span></label>
            <span v-if="email === ''"></span>
            <span v-else-if="isValidEmail === true" class="input_icon"><img src="../../assets/images/sign/icon_possible.png" alt="가능"></span>
            <span v-else class="input_icon"><img src="../../assets/images/sign/icon_impossible.png" alt="불가능"></span>
          </div>
          <div class="form-group">
            <input type="password"
                   class="form-control"
                   id="password"
                   v-model="password"
                   autocomplete="off">
            <label for="password">비밀번호<span v-show="!isValidPassword">영문, 숫자, 특수문자를 조합하여 8~16자리로 설정해 주세요</span></label>
            <span v-if="password === ''"></span>
            <span v-else-if="isValidPassword" class="input_icon"><img src="../../assets/images/sign/icon_possible.png" alt="가능"></span>
            <span v-else class="input_icon"><img src="../../assets/images/sign/icon_impossible.png" alt="불가능"></span>
          </div>
          <div class="form-group">
            <input type="password"
                   class="form-control"
                   id="passwordCheck"
                   v-model="passwordCheck"
                   autocomplete="off">
            <label for="passwordCheck">비밀번호 확인<span v-show="!isValidPasswordCheck">비밀번호를 다시 입력해 주세요</span></label>
            <span v-if="passwordCheck === ''"></span>
            <span v-else-if="isValidPasswordCheck" class="input_icon"><img src="../../assets/images/sign/icon_possible.png" alt="가능"></span>
            <span v-else class="input_icon"><img src="../../assets/images/sign/icon_impossible.png" alt="불가능"></span>
          </div>
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   id="name"
                   v-model="name"
                   autocomplete="off"
                   placeholder="최대 8글자 까지 입력 가능합니다.">
            <label for="name">이름<span v-show="!isValidName">이름을 입력해 주세요</span></label>
            <span v-if="name === ''"></span>
            <span v-else-if="isValidName" class="input_icon"><img src="../../assets/images/sign/icon_possible.png" alt="가능"></span>
            <span v-else class="input_icon"><img src="../../assets/images/sign/icon_impossible.png" alt="불가능"></span>
          </div>
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   id="company"
                   v-model="company"
                   autocomplete="off"
                   placeholder="최대 24글자 까지 입력 가능합니다.">
            <label for="company">회사<span v-show="!isValidCompany">회사명을 입력해 주세요</span></label>
            <span v-if="company === ''"></span>
            <span v-else-if="isValidCompany" class="input_icon"><img src="../../assets/images/sign/icon_possible.png" alt="가능"></span>
            <span v-else class="input_icon"><img src="../../assets/images/sign/icon_impossible.png" alt="불가능"></span>
          </div>
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   id="contactNumber"
                   v-model="contactNumber"
                   autocomplete="off"
                   placeholder="연락 가능한 전화번호를 입력해 주세요.">
            <label for="contactNumber">연락처<span v-show="!isValidContactNumber">연락처를 입력해 주세요</span></label>
            <span v-if="contactNumber === ''"></span>
            <span v-else-if="isValidContactNumber" class="input_icon"><img src="../../assets/images/sign/icon_possible.png" alt="가능"></span>
            <span v-else class="input_icon"><img src="../../assets/images/sign/icon_impossible.png" alt="불가능"></span>
          </div>
        </form>
      </div>
      <button class="btn btn-success" @click="signUp()">회원가입</button>
    </div>
  </div>
</template>

<script>
import Select from '@/components/ui/common/Select'
export default {
  name: 'SignUp',
  components: {
    'ui-select': Select
  },
  watch: {
    email (val) {
      const emailValidation = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
      this.isValidEmail = emailValidation.test(val)
      if (this.isValidEmail) {
        this.emailValidationMessage = ''
      } else {
        this.emailValidationMessage = '이메일 주소를 정확히 입력해 주세요'
      }
    },
    password (val) {
      this.isValidPassword = this.checkRegExpPassword(val)
    },
    passwordCheck (val) {
      this.isValidPasswordCheck = (this.password === val)
    },
    name (val) {
      this.isValidName = (val.length <= 8 && val.length > 0)
    },
    company (val) {
      this.isValidCompany = (val.length <= 24 && val.length > 0)
    },
    contactNumber (val) {
      val = val.replace(/[^0-9]/g, '')
      this.contactNumber = val.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
      this.isValidContactNumber = (val.length > 8 && val.length < 12)
    }
  },
  data () {
    return {
      email: '',
      password: '',
      passwordCheck: '',
      name: '',
      company: '',
      contactNumber: '',
      isValidEmail: false,
      isValidPassword: false,
      isValidPasswordCheck: false,
      isValidName: false,
      isValidCompany: false,
      isValidContactNumber: false,
      emailValidationMessage: '이메일 주소를 정확히 입력해 주세요'
    }
  },
  methods: {
    duplicateCheck () {
      const emailValidation = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
      this.isValidEmail = emailValidation.test(this.email)

      if (this.isValidEmail) {
        this.$http.post('/users/duplicate_check', {
          username: this.email
        }).then(res => {
          this.isValidEmail = true
          this.emailValidationMessage = ''
        }).catch(err => {
          const msg = err.data.msg
          this.isValidEmail = false
          this.emailValidationMessage = msg
        })
      }
    },
    signUp () {
      if (!this.isValidEmail) {
        alert('이메일을 확인해주세요.')
      } else if ((!this.isValidPassword && !this.isValidPasswordCheck) || this.password === '') {
        alert('비밀번호를 확인해주세요.')
      } else if (!this.isValidName) {
        alert('이름을 확인해주세요.')
      } else if (!this.isValidCompany) {
        alert('회사명을 확인해주세요.')
      } else if (((!this.isValidContactNumber && !this.checkContactNumber()) || this.contactNumber === '')) {
        alert('연락처를 확인해주세요.')
      } else {
        this.$http.post('/users/signup', {
          username: this.email,
          password: this.password,
          email: this.email,
          name: this.name,
          company: this.company,
          contact_number: this.contactNumber,
          active: false,
          valid: false
        }).then((res) => {
          alert('회원가입 완료')
          this.$router.push({name: 'SignUpComplete'})
        }).catch(err => {
          console.log(err)
          alert('회원가입에 실패 했습니다.')
        })
      }
    },
    checkContactNumber () {
      let contactNumber = this.trim(this.contactNumber)
      return this.checkRegExpContactNumber(contactNumber)
    },
    trim (stringToTrim) {
      return stringToTrim.replace(/^\s+|\s+$/g, '')
    },
    checkRegExpContactNumber (contactNumber) {
      let number = contactNumber.replace(/[^0-9]/g, '')
      if (number.length > 8 && number.length < 12) {
        // 전화번호는 9자리에서 11자리 사이만 가능하다.
        return true
      } else {
        return false
      }
    },
    checkRegExpPassword (password) {
      let num = password.search(/[0-9]/g)
      let eng = password.search(/[a-z]/ig)
      let spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)

      if (password.length < 8 || password.length > 16) {
        return false
      }
      if (password.search(/₩s/) !== -1) {
        return false
      }
      if (num < 0 || eng < 0 || spe < 0) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.right_wrap{margin-top:40px;
  .btn-success{margin-top:30px!important;}
  .form-group{margin-bottom:17px; position:relative;
    .input_icon{position:absolute; bottom:4px; right:0px; z-index:5;}
    &:last-child{margin-bottom:0px;}
    input{width:100%; height:22px; line-height:22px; border:0px; border-bottom:2px solid #ebebeb; font-size:14px; margin-top:16px;
      &:focus{border-bottom:2px solid #000; color:#000;}
    }
    /* input 포커스 되었을때 라벨*/
    input:focus + label{font-weight:bold; color:#000;
      span{font-weight:normal; color:#ed9292; display:inline-block;}
    }
    /* input 포커스 되었을때 라벨*/
    label{color:#999; font-size:12px; position:absolute; top:0px; left:0px; z-index:10;
      span{padding-left:20px; color:#ed9292; display:none;}
    }
  }
}
</style>
