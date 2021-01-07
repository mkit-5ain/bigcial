<template>
  <div class="post_contents_wrap">
    <div class="post_contents">
      <div class="contents_left_wrap">
        <!-- 게시물 이미지-->
        <div class="contents_widget first_contents">
          <div class="post_view_img">
              <ui-post-thumbnail :media="media"/>
          </div>
        </div>
      </div>
      <div class="contents_right_wrap">
        <!-- 게시물 내용-->
        <div class="content_wrap scroll">
          <div>
            <pre>{{media.caption}}</pre>
          </div>
        </div>
        <!-- 게시물 댓글-->
        <div class="reply_wrap">
          <div class="post_content_inner_reply scroll">
            <ul v-if="media.comments">
              <li v-for="(comment, index) in comments" :key="'comment-' + index">
                <strong @click="onClickBlacklist(comment.username)" v-text="comment.username"></strong>
                <span>{{comment.text}}</span>
                <transition name="modal">
                  <popup-blacklist v-if="isShow" @cancel="isShow = false" :user="blackUser" :media="media"/>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="post_info">
        <div class="left_info" v-text="'업로드: ' + this.$moment(media.timestamp).format('YYYY-MM-DD A hh:mm')"></div>
        <div class="right_info">댓글을 클릭하면 블랙리스트를 만들 수 있습니다.</div>
      </div>
    </div>
  </div>
</template>

<script>
import Blacklist from '@/components/popup/Blacklist'
import PostThumbnail from '@/components/ui/PostThumbnail'

export default {
  components: {
    'popup-blacklist': Blacklist,
    'ui-post-thumbnail': PostThumbnail
  },
  data () {
    return {
      isShow: false,
      blackUser: null
    }
  },
  props: [
    'media',
    'comments'
  ],
  methods: {
    onClickBlacklist (user) {
      this.isShow = true
      this.blackUser = user
    }
  }
}
</script>

<style lang="scss" scoped>
  .post_figure{overflow:hidden; height:56px; line-height:56px;
    .post_like{background:none; padding-right:0px;}
    .mean_figure{display:inline-block; vertical-align:middle; padding-left:12px; letter-spacing:0px;}
  }
  .contents_left_wrap{float:left;
    .contents_widget{float:left;
      .post_view_img{width:390px;}
    }
  }
  .contents_right_wrap{float:left;
    .content_wrap {width:390px; height:390px; float:left; overflow-y:scroll; margin-left:35px; padding-right:35px;
      pre{white-space: pre-wrap; font-family: "NanumBarunGothic"; line-height:2;}
    }
    .reply_wrap{float:left; position:relative;
      .post_content_inner_reply{width:390px; height:390px;  overflow-y:scroll; margin-left:35px; padding-right:35px;
        strong{cursor:pointer;}
        span{line-height:2;}
      }
    }
  }
  .post_info{width:100%; text-align:right; clear:both; color:#000; height:56px; line-height:56px;
    .left_info{float:left;}
    .right_info{float:right; background:url(../../assets/images/icon/hashtag_i.jpg) 0 center no-repeat; padding-left:20px;}
  }
  @media all and (max-width: 1916px){
    .contents_left_wrap{width:100%; float:none;
      .contents_widget{width:100%; text-align:center; margin-bottom:50px;
        .post_img{display: inline-block; vertical-align: middle;}
        .post_figure{display: inline-block; vertical-align: middle; margin-left:50px;}
        .post_view_img{
          margin:0 auto;
        }
      }
    }
    .contents_right_wrap{width:100%; float:none;
      .content_wrap{width:45%;}
      .reply_wrap{width:45%;
        .post_content_inner_reply{width:100%;}
      }
    }
  }
</style>
