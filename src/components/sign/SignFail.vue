<template>
  <!-- 로고 -->
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="form-wrap">
        <p class="prologue">입력한 정보와 일치하는 회원정보가 없습니다.</p>
        <button class="confirm_btn black_btn" @click="confirm()">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirm () {
      // 한 단계 뒤로 이동
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.right_wrap{ margin-top:67px; border:2px solid #ebebeb; border-radius:2px;
  .right_inner_wrap{padding: 67px 0px; border-radius:2px;
    .form-wrap{text-align:center;
      .section_title{margin-bottom:35px!important;}
      .prologue{color:#000; font-size:14px; text-align:center; line-height:1.4;}
      .form_style{margin-top:41px!important;}
      .close_btn{font-size:12px; color:#000; text-decoration:underline; font-weight:bold; margin-top:18px;}
      .warning_prologue{color:#8c7fd9; font-size:12px; margin-top:38px; margin-bottom:58px;}
      .btn-success{font-size:12px; margin-top:0px;}
    }
  }
}
</style>
