<template>
  <div id="container">
    <div id="container_wrap">
      <div id="container_inner_wrap">
       <div class="calender_chart section_widget section_bottom">
          <div class="profile_title_inner">
            <div class="section_title">게시물 요약</div>
            <ui-calendar v-model="range"/>
          </div>
          <div class="post_figure_wrap">
            <div class="figure_inner_wrap">
              <div class="upload">
                <p>업로드</p>
                <p v-if="summaryMedias.media_count"
                   v-text="setComma(summaryMedias.media_count)"></p>
                <p v-else>0</p>
              </div>
              <div class="like">
                <p>좋아요</p>
                <p v-if="summaryMedias.like_count"
                   v-text="setComma(summaryMedias.like_count)"></p>
                <p v-else>0</p>
              </div>
              <div class="reply">
                <p>댓글</p>
                <p v-if="summaryMedias.comments_count"
                   v-text="setComma(summaryMedias.comments_count)"></p>
                <p v-else>0</p>
              </div>
              <div class="save">
                <p>저장</p>
                <p v-if="summaryMedias.saved"
                   v-text="setComma(summaryMedias.saved)"></p>
                <p v-else>0</p>
              </div>
            </div>
            <div class="popularity_wrap">
              <div class="popularity_title">인기 게시물</div>
              <div class="post_img_wrap">
                <ul>
                  <template v-if="summaryMedias.best_media">
                    <ui-post-thumbnail class="post_img" v-if="summaryMedias" :media="summaryMedias.best_media"/>
                  </template>
                </ul>
              </div>
              <!-- 데이터 없을 경우 활성화 -->
              <!-- <div class="unknown_img"><img src="../../assets/images/icon/unknown_i.png" alt=""></div> -->
              <!-- // 데이터 없을 경우 활성화-->
            </div>

          </div>
          <div class="chart">
            <stacked-custom-chart v-if="summaryMedias" :medias="summaryMedias.medias"/>
          </div>
        </div>
        <div class="section_widget">
          <div class="thumbnail_wrap">
            <div class="section_title">게시물 리스트</div>
            <div class="post_contents">
              <div>
                <ul id="inner_content">
                  <template v-if="medias">
                    <ui-post-thumbnail v-for="(media, index) in medias" :key="'post-' + index" :media="media"/>
                  </template>
                </ul>
                <button class="more_btn" v-show="hasNext" @click="more()">더보기</button>
                <!-- 데이터 없을경우 활성화-->
                <!-- <div class="unknown_data">
                  <img src="../../assets/images/icon/unknown_i.png" alt="">
                  <p>아직 계정에 등록된 게시글이 없습니다.</p>
                </div> -->
                <!-- // 데이터 없을경우 활성화-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/ui/common/Calendar'
import PostThumbnail from '@/components/ui/post/PostThumbnail'
import Constant from '../../constant'
import StackedCustomChart from '@/components/chart/StackedCustomChart'
import StackGrid from 'vue-stack-grid-component'

export default {
  name: 'Post',
  components: {
    'ui-calendar': Calendar,
    'ui-post-thumbnail': PostThumbnail,
    StackGrid,
    StackedCustomChart
  },
  computed: {
    summaryMedias () {
      return this.$store.state.accountSummaryMedias
    },
    medias () {
      return this.$store.state.accountMedias.data
    },
    hasNext () {
      return this.$store.state.accountMedias.next
    }
  },
  data () {
    return {
      range: [(d => new Date(d.setDate(d.getDate() - 7)))(new Date()), (d => new Date(d.setDate(d.getDate() - 1)))(new Date())],
      since: '',
      until: ''
    }
  },
  watch: {
    range () {
      this.since = this.$moment(this.range[0]).format('YYYYMMDD')
      this.until = this.$moment(this.range[1]).add(1, 'days').format('YYYYMMDD')

      this.$store.dispatch(Constant.CHANGE_ACCOUNT_SUMMARY_MEDIAS, {
        since: this.since,
        until: this.until
      })
    }
  },
  methods: {
    more () {
      this.$store.dispatch(Constant.ADD_ACCOUNT_MEDIAS, {status: 'more'})
    },
    switchToPostDetail (id) {
      this.$router.push({
        name: 'PostDetail',
        params: {id}
      })
    },
    setComma (str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style lang="scss" scoped>
@media all and (max-width: 1609px){
  .popularity_wrap{display:none!important;}
  .figure_inner_wrap{width:100%!important;}
}
#container_inner_wrap{
  .calender_chart{
    .profile_title_inner{width:100%; display:table;}
  }
  .unknown_data{text-align:center;
    p{color:#c5c5c5; font-size:15px; font-weight:bold; padding-top:15px;}
  }
  .post_figure_wrap{width:100%; display:table; margin-top:35px; margin-bottom:37px;
    .unknown_img{width:150px; height:150px; padding:47.5px 0px; background:#f2f1f1;}
    .figure_inner_wrap{width:85%; display:table; float:left; padding:60px 0px;
      > div{width:25%; float:left; text-align:center; border-right:2px solid #f2f1f1;
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
}
.thumbnail{
    img{width:100%; height:100%;}
  }
</style>
