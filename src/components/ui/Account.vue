<template>
  <div class="user_info clearfix">
    <div class="u_logo"><img :src="this.$store.state.account.profile_picture_url"></div>
    <div class="u_brand">
      <strong>{{ this.$store.state.account.username }}</strong>
      <p>{{ this.$store.state.account.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.u_brand{text-overflow: ellipsis; white-space: nowrap; width: 137px; overflow: hidden;
  p{text-overflow: ellipsis; white-space: nowrap; width: 137px; overflow: hidden; line-height:1.5;}
  strong{text-overflow: ellipsis; white-space: nowrap; width: 137px; overflow: hidden; line-height:1.5;}
}
</style>
