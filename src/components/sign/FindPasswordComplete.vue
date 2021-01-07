<template>
  <!-- 로고 -->
  <div class="right_wrap">
    <div class="right_inner_wrap">
       <div class="form-wrap">
        <p class="section_title">임시비밀번호 발급 완료</p>
        <p class="middle_prologue">입력하신이메일로 임시비밀번호가 발급되었습니다.<br/>로그인 후 반드시 비밀번호를 변경해 주세요</p>
       </div>
      <button class="confirm_btn black_btn" @click="confirm()">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirm () {
      this.$router.push({ name: 'SignIn' })
    }
  }
}
</script>

<style lang="scss" scoped>
.right_wrap{margin-top:67px;
  .right_inner_wrap{
    p{font-size:24px; font-weight:bold;text-align:center;}
    .form-wrap{
      .section_title{margin-bottom:35px!important;}
      .middle_prologue{color:#000; font-size:14px; text-align:center; line-height:1.4;}
    }
  }
}
</style>
