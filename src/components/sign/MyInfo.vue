<template>
  <!-- 입력 폼 -->
  <div id="container">
    <div id="container_wrap" class="scroll">
      <div id="container_inner_wrap">
        <div class="signchange_wrap section_widget">
          <div class="user_board_wrap">
            <!-- 탭 네비 -->
            <div class="pick_tab">
              <router-link :to="{ name: 'ChangeInfo' }">개인정보 변경</router-link>
              <router-link :to="{ name: 'ChangePassword' }">비밀번호 변경</router-link>
              <router-link :to="{ name: 'ChangeAccount' }">연결계정 변경</router-link>
            </div>
            <div class="signchange_inner_wrap">
              <div class="pick_tab_contents">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  created () {
    this.$router.push({ name: 'ChangeInfo' })
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.pick_tab{width:100%; display:table; text-align:center; border-bottom:1px solid #f2f1f1; margin-bottom:60px;
  a{display:inline-block; vertical-align:middle; padding:0px 60px; font-weight:bold; color:#a6a6a6; font-weight:bold; cursor:pointer; padding-bottom:14px;}
  .router-link-active{color: #000; border-bottom: 2px solid #000; padding-bottom: 12px;}
}
.signchange_wrap{width:800px; margin:119px auto;
  .signchange_inner_wrap{width:410px; margin:0 auto;}
}
</style>
