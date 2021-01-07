<template>
  <div class="hashtag_hover_wrap">
    <div class="hashtag_title">맞춤 해시태그</div>
    <div>
      <div class="hover"><img src="../../assets/images/icon/hashtag_i.jpg" alt=""></div>
      <div class="hover_view">
        <div class="hover_inner_view">
          <div>해시태그를 직접 입력하시거나</div>
          <div>아래 추천 해시태그를 설명 입력란에 드래그 할 수 있습니다.</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hashtag',
  components: {

  }
}
</script>
<style lang="scss" scoped>
.hashtag_hover_wrap{position:relative; float:left; padding:3.5px 0px;
  div{display:inline-block; vertical-align:middle;}
  .hashtag_title{color:#2c2c2c; font-weight:bold; display:inline-block; vertical-align:middle;}
  .hover{cursor:pointer;
    &:hover{
      & + .hover_view{display:block;}
    }
  }
  .hover_view{display:none; width:280px; position:absolute; top:-80px; left:85px; z-index:1; background:url(../../assets/images/icon/view_bg.png) 0 66px no-repeat; color:#fff; font-size:12px; padding-bottom:15px;
    .hover_inner_view{background:#464160; height:66px; padding:14px;}
  }
}
</style>
