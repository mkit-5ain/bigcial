<template>
  <div class="user_info clearfix">
    <!-- <div>{{fbName}}</div> -->
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
      // fbName: this.$store.state.fbAccount.name
    }
  }
}
</script>

<style lang="scss" scoped>
.u_logo{
  img{width:40px;}
}
.u_brand{text-overflow: ellipsis; white-space: nowrap; width: 137px; overflow: hidden;
  p{text-overflow: ellipsis; white-space: nowrap; width: 137px; overflow: hidden; line-height:1.5;}
  strong{text-overflow: ellipsis; white-space: nowrap; width: 137px; overflow: hidden; line-height:1.5;}
}
</style>
