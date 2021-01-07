<template>
  <div class="search_wrap">
    <div class="input_wrap">
      <input type="text" placeholder="SEARCH">
      <button><img src="../../../assets/images/icon/search_btn.png" alt=""></button>
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
.search_wrap{margin-top:25px; overflow:hidden;
  .input_wrap{width: 190px; height: 34px; border: 2px solid #ebebeb; border-radius: 4px; background: #fff; letter-spacing:-4px; float:right;
    input{width:162px; height:30px; display:inline-block; letter-spacing:0px; vertical-align:top; text-indent:14px; padding:0 5px;}
    button{width:24px; height:31px; display:inline-block; letter-spacing:0px; vertical-align:top;}
  }
}
</style>
