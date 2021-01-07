<template>
  <!-- 로고 -->
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="form-wrap">
        <p class="section_title">회원가입 완료</p>
        <p class="prologue">입력하신 이메일로 인증 메일이 전송되었습니다<br>인증 메일의 링크를 통해 계정을 활성화 해 주세요</p>
        <p class="warning_prologue">* 계정 활성화 후 관리자 확인을 통해 솔루션을 사용하실 수 있습니다</p>
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
    .form-wrap{text-align:center;
      .section_title{margin-bottom:35px!important;}
      .prologue{color:#000; font-size:14px; text-align:center; line-height:1.4;}
      .warning_prologue{color:#8c7fd9; font-size:12px; margin-top:38px; margin-bottom:58px;}
    }
  }
}
</style>
