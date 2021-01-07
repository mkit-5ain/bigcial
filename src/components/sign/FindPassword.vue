<template>
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="form-wrap">
        <p class="section_title">임시비밀번호 발급받기</p>
        <p class="middle_prologue">입력하신이메일로 임시비밀번호가 발급됩나다.<br/>임시비밀번호로 로그인 하신 후 반드시 비밀번호를 변경해 주세요</p>
        <form class="form_style">
          <div class="form-group">
            <label for="username">이메일</label>
            <input type="text" class="form-control" id="username" placeholder="이메일" v-model="username" autocomplete="off">
          </div>
          <div class="form-group">
            <label for="name">이름</label>
            <input type="text" class="form-control" id="name" placeholder="이름" v-model="name" autocomplete="off">
          </div>
        </form>
      </div>
      <button class="btn btn-success" @click="confirm()">임시비밀번호 발급</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      name: ''
    }
  },
  methods: {
    confirm () {
      this.$http.put('/users/find_password', {
        username: this.username,
        name: this.name
      }).then(res => {
        const success = res.data.success
        if (success === 'NO') {
          this.$router.push({ name: 'SignFail' })
        } else {
          this.$router.push({ name: 'FindPasswordComplete' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.right_wrap{margin-top:67px;
  .right_inner_wrap{
    .form-wrap{
      .section_title{margin-bottom:35px!important;}
      .middle_prologue{color:#000; font-size:14px; text-align:center; line-height:1.4;}
      .form_style{margin-top:41px!important;}
    }
  }
  .btn-success{font-size:12px;}
}
</style>
