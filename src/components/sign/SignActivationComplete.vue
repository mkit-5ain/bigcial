<template>
  <!-- 로고 -->
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="form-wrap">
        <p class="section_title">계정 활성화 완료</p>
        <p class="prologue">계정 활성화가 완료되었으며<br/>담당자 확인을 통해 솔루션 사용 처리를 진행중입니다.</p>
        <p class="warning_prologue">* 바로 사용처리를 원하시면, 02-2287-3259 으로 연락해주세요.</p>
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
.right_wrap{float:left; width:550px; height:100%; position:relative;
  .right_inner_wrap{width:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    .form-wrap{text-align:center;
      .section_title{margin-bottom:35px!important;}
      .prologue{color:#000; font-size:14px; text-align:center; line-height:1.4;}
      .warning_prologue{color:#8c7fd9; font-size:12px; margin-top:38px; margin-bottom:58px;}
    }
  }
}
</style>
