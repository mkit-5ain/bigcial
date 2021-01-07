<template>
  <header>
    <ul>
      <li class="user_name">
        <span v-text="this.$store.state.solutionAccount.name"></span>님
      </li>
      <li>
        <p @click="myInfo()">
          <img src="../../assets/images/icon/header_i_02.png" alt="">
          <span>내정보</span>
        </p>
      </li>
      <li>
        <p @click="logout()">
          <img src="../../assets/images/icon/header_i_03.png" alt="">
          <span>로그아웃</span>
        </p>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  methods: {
    myInfo () {
      this.$router.push({name: 'MyInfo'})
    },
    logout () {
      localStorage.clear()
      this.$router.replace({name: 'SignIn'})
    }
  }
}
</script>

<style lang="scss" scoped>
header{position:absolute; left:0; top:0; z-index:10; width:100%; display:table; top:0px; text-align:center; background:#fff;
  ul{letter-spacing:-4px; text-align: right; padding-right: 8.7%;
    .user_name{
      span{font-weight:bold; font-size:18px; color:#000; padding-right:8px;}
    }
    li{display:inline-block; *display:inline; vertical-align:middle; letter-spacing:0px; padding:24.5px 0px; padding-left:38px;
      p{cursor:pointer;
        img{display: inline-block; vertical-align: middle;}
        span{display: inline-block; vertical-align: middle; padding-left:8px; font-size:14px; color:#000;}
      }
    }
  }
}
</style>
