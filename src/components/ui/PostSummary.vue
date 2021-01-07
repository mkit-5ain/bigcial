<template>
  <div class="post_figure_wrap">
    <div class="figure_inner_wrap">
      <div class="upload">
        <p>업로드</p>
        <p v-if="summaryMedias">{{summaryMedias.media_count}}</p>
        <p v-else>0</p>
      </div>
      <div class="like">
        <p>좋아요</p>
        <p v-if="summaryMedias">{{summaryMedias.like_count}}</p>
        <p v-else>0</p>
      </div>
      <div class="reply">
        <p>댓글</p>
        <p v-if="summaryMedias">{{summaryMedias.comments_count}}</p>
        <p v-else>0</p>
      </div>
      <div class="save">
        <p>저장</p>
        <p v-if="summaryMedias">{{summaryMedias.saved}}</p>
        <p v-else>0</p>
      </div>
    </div>
    <div class="popularity_wrap">
      <!-- TODO: 인기 게시물 수정-->
      <div class="popularity_title">인기 게시물</div>
      <ui-PostSummary></ui-PostSummary>
      <!-- 데이터 없을 경우 활성화 -->
      <!-- <div class="unknown_img"><img src="../../assets/images/icon/unknown_i.png" alt=""></div> -->
      <!-- // 데이터 없을 경우 활성화-->
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
.post_figure_wrap{width:100%; display:table; margin-top:35px; margin-bottom:37px;
  .post_img_wrap{position:relative; cursor:pointer;
    &:hover{
      .post_view{display:block; padding-top:41px; padding-left:24px;
        span{display:inline-block; *display:inline; vertical-align:middle;}
        .post_like{padding:6px 0px;
          span{background:url(../../assets/images/icon/popularity_hover_01.png) left 0 no-repeat; font-size:20px; padding-left:35px; background-size:25px 21px;}
        }
        .post_reply{padding:6px 0px;
          span{background:url(../../assets/images/icon/popularity_hover_02.png) left center no-repeat;  font-size:20px; padding-left:35px; background-size:25px 21px;}
        }
      }
    }
    .post_view{display:none; width:150px; height:150px; position: absolute; top: 0px; z-index: 1; background: rgba(0, 0, 0, 0.7); color: #fff;}
  }
  .unknown_img{width:150px; height:150px; padding:47.5px 0px; background:#f2f1f1;}
  .figure_inner_wrap{display:table; float:left; padding:47px 0px;
    > div{width:250px; float:left; text-align:center; border-right:2px solid #f2f1f1;
      &:last-child{border-right:0px;}
    }
    p{
      &:first-child{font-size:16px; font-weight:bold;}
      &:last-child{font-size:31px; padding-top:25px;}
    }
    .upload{
      p{
        &:first-child{width:75px; margin:0 auto; height:20px; line-height:20px; background:url(../../assets/images/icon/post_up_i.png) 0 0 no-repeat; padding-left:26px;}
      }
    }
    .like{
      p{
        &:first-child{width:75px; margin:0 auto; height:20px; line-height:20px; background:url(../../assets/images/icon/post_like_i.png) 0 0 no-repeat; padding-left:31px;}
      }
    }
    .reply{
      p{
        &:first-child{width:65px; margin:0 auto; height:21px; line-height:21px; background:url(../../assets/images/icon/post_re_i.png) 0 0 no-repeat; padding-left:33px;}
      }
    }
    .save{
      p{
        &:first-child{width:50px; margin:0 auto; height:17px; line-height:17px; background:url(../../assets/images/icon/post_save_i.png) 0 0 no-repeat; padding-left:20px;}
      }
    }
  }
  .popularity_wrap{display:table; float:right;
    .popularity_title{height:16px; line-height:16px; padding-left:23px; background:url(../../assets/images/icon/popularity_i.png) 0 center no-repeat; font-weight:bold; font-size:15px; margin-bottom:10px;}
    .popularity_image{
      ul{
        li{display:none;}
      }
    }
  }
}
</style>
