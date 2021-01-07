<template>
  <div id="container">
    <div id="container_wrap">
      <div id="container_inner_wrap">
        <div class="user_board_wrap">
          <!-- 탭 네비 -->
          <div class="pick_tab">
            <router-link v-bind:to="{ name: 'AdminUser' }">유저관리</router-link>
            <router-link v-bind:to="{ name: 'AdminAccount' }">계정관리</router-link>
          </div>
        </div>
        <!-- 탭 네비 컨텐츠 -->
        <div class="pick_tab_contents">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  created () {
    this.$router.push({ name: 'AdminUser' })
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#container_inner_wrap{
  .user_board_wrap{background:#fff; padding:40px;
    .pick_tab{width:100%; display:table; text-align:center; border-bottom:1px solid #f2f1f1;
      a{display:inline-block; vertical-align:middle; padding:0px 60px; font-weight:bold; color:#a6a6a6; font-weight:bold; cursor:pointer; padding-bottom:14px;}
      .router-link-active{color: #000; border-bottom: 2px solid #000; padding-bottom: 12px;}
    }
    .pick_tab_contents{margin-top:36px;}
  }
}
</style>
