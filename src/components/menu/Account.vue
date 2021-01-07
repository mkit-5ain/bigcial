<template>
  <div id="container">
    <div id="container_wrap" class="scroll">
      <div id="container_inner_wrap">
        <div class="account_wrap section_widget section_bottom">
          <div class="account_left">
            <ui-account class="account_info"/>
          </div>
          <div class="account_right">
            <div class="figure_widget">
              <div>
                <div class="figure_title">게시물</div>
                <div class="figure_value"
                     v-if="this.$store.state.account.media_count"
                     v-text="setComma(this.$store.state.account.media_count)"></div>
                <div class="figure_value" v-else>0</div>
              </div>
              <div>
                <div class="figure_title">팔로잉</div>
                <div class="figure_value"
                     v-if="this.$store.state.account.follows_count"
                     v-text="setComma(this.$store.state.account.follows_count)"></div>
                <div class="figure_value" v-else>0</div>
              </div>
                <div>
                <div class="figure_title">팔로워</div>
                <div class="figure_value"
                     v-if="this.$store.state.account.followers_count"
                     v-text="setComma(this.$store.state.account.followers_count)"></div>
                <div class="figure_value" v-else>0</div>
              </div>
            </div>
          </div>
        </div>
        <div class="post_mean_wrap section_widget section_bottom">
          <div class="section_title">게시물 TOP5 평균</div>
          <div class="scheduler-box-prologue">
            <div class="hover"><img src="../../assets/images/icon/hashtag_i.jpg" alt=""></div>
            <div class="hover_view">
              <div class="hover_inner_view">
                <div>최근 30일 간 내 계정의 Top5 게시물 성과의 평균입니다.</div>
              </div>
            </div>
          </div>
          <div class="section_contents">
            <!-- 게시물 TOP5 평균 -->
            <div class="post_figure">
              <!-- 좋아요 -->
              <div class="post_like">
                <div class="mean_figure"
                     v-if="this.$store.state.accountBestMedia.best_like_avg"
                     v-text="setComma(this.$store.state.accountBestMedia.best_like_avg)"></div>
                <div class="mean_figure" v-else>0</div>
                <div class="present_figure">
                  <p><img src="../../assets/images/icon/instar_i_01.jpg" alt=""></p>
                  <p class="figure"
                     v-if="diffBestLikeAvg"
                     v-text="setComma(diffBestLikeAvg)"></p>
                  <p class="figure" v-else>0</p>
                </div>
              </div>
              <!-- 댓글 -->
              <div class="post_reply">
                <div class="mean_figure"
                     v-if="this.$store.state.accountBestMedia.best_comments_avg"
                     v-text="setComma(this.$store.state.accountBestMedia.best_comments_avg)"></div>
                <div class="mean_figure" v-else>0</div>
                <div class="present_figure">
                  <p><img src="../../assets/images/icon/instar_i_02.jpg" alt=""></p>
                  <p class="figure"
                     v-if="diffBestLikeAvg"
                     v-text="setComma(diffBestCommentsAvg)"></p>
                  <p class="figure" v-else>0</p>
                </div>
              </div>
            </div>
            <!-- 게시물 TOP5 -->
            <div class="post_img_wrap">
              <ul class="post_inner_wrap">
                <ui-post-thumbnail class="account_img average_img" v-for="(media, index) in bestMedias" :key="'top-' + index" :media="media"/>
              </ul>
            </div>
          </div>
        </div>
        <div class="calender_chart section_widget section_bottom">
          <div class="profile_title_inner">
            <div class="section_title">프로필 뷰</div>
          </div>
          <div class="chart">
            <area-chart/>
          </div>
        </div>
        <div class="instagram_chart section_widget section_bottom">
          <div class="section_title">팔로워 트렌드</div>
          <div class="chart">
            <stacked-combo-chart/>
          </div>
        </div>
        <div class="follower_chart section_widget section_bottom">
          <div class="section_title">팔로워 데모그래픽</div>
          <div class="chart">
            <stacked-row-chart/>
          </div>
        </div>
        <div class="buzz_chart section_widget last_section_widget">
          <div class="section_title">버즈량</div>
          <div class="scheduler-box-prologue">
            <div class="hover"><img src="../../assets/images/icon/hashtag_i.jpg" alt=""></div>
            <div class="hover_view">
              <div class="hover_inner_view">
                <div>내 브랜드가 사용자에 의해 얼마나 언급되고 있는지 <br/>나타내는 일자별 지표입니다. 해시태그 목록을 수정하려면<br/> 우측 버튼을 클릭 해주세요.</div>
              </div>
            </div>
          </div>
          <div class="chart">
            <stacked-column-chart v-if="buzzContentInsight" :stackedColumnChartRows="buzzContentInsight" :stackedColumnChartType="stackedColumnChartType"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/ui/common/Calendar'
import account from '@/components/ui/account/Account'
import PostThumbnail from '@/components/ui/post/PostThumbnail'
import StackedColumnChart from '@/components/chart/StackedColumnChart'
import StackedComboChart from '@/components/chart/StackedComboChart'
import AreaChart from '@/components/chart/AreaChart'
import StackedRowChart from '@/components/chart/StackedRowChart'
import Constant from '../../constant'

export default {
  name: 'Account',
  components: {
    'ui-calendar': Calendar,
    'ui-account': account,
    'ui-post-thumbnail': PostThumbnail,
    StackedColumnChart,
    StackedComboChart,
    AreaChart,
    StackedRowChart
  },
  computed: {
    diffBestLikeAvg () {
      if (this.$store.state.accountBestMedia.diff_best_like_avg >= 0) {
        return '+' + this.$store.state.accountBestMedia.diff_best_like_avg
      } else {
        return this.$store.state.accountBestMedia.diff_best_like_avg
      }
    },
    diffBestCommentsAvg () {
      if (this.$store.state.accountBestMedia.diff_best_comments_avg >= 0) {
        return '+' + this.$store.state.accountBestMedia.diff_best_comments_avg
      } else {
        return this.$store.state.accountBestMedia.diff_best_comments_avg
      }
    },
    bestMedias () {
      let medias = this.$store.state.accountBestMedia.best_media
      if (medias.length === 0) {
        return []
      } else {
        medias.forEach(media => {
          if (media['media_type'] === 'VIDEO') {
            media['media_url'] = media['thumbnail_url']
          }
        })
        return this.$store.state.accountBestMedia.best_media
      }
    },
    buzzContentInsight () {
      if (this.$store.state.accountBuzzContentInsight.rows.length > 0) {
        return this.$store.state.accountBuzzContentInsight.rows
      }
    }
  },
  data () {
    return {
      range: [(d => new Date(d.setDate(d.getDate() - 7)))(new Date()), (d => new Date(d.setDate(d.getDate() - 1)))(new Date())],
      stackedColumnChartType: 'accountBuzzContentInsight'
    }
  },
  watch: {
    range () {
      this.getProfileViews()
    }
  },
  methods: {
    getProfileViews () {
      let startDate = this.$moment(this.range[0]).format('YYYYMMDD')
      let endDate = this.$moment(this.range[1]).add(1, 'days').format('YYYYMMDD')

      const date = {
        since: startDate.toString(),
        until: endDate.toString()
      }
      this.$store.dispatch(Constant.CHANGE_ACCOUNT_PROFILE_VIEWS, {date})
    },
    setComma (str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style lang="scss" scoped>
#container_inner_wrap{
  .account_wrap{border-bottom:1px solid #e6e6e6;
    .account_left{float:left;}
    .account_right{float:right; padding:38px 0px;}
  }
  .section_contents{float:right;
    .post_img_wrap{width:100%; display:table;
      .post_inner_wrap{display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; grid-column-gap: 0.5em; grid-row-gap: 0.5em;
        li{display: table;
          .img_inner_wrap{display: table-cell;vertical-align: middle;}
        }
      }
    }
  }
  .post_figure{position:absolute; top:50%; left:22%; transform:translate(0%, -50%);}
  .post_mean_wrap{position:relative; background:#fff; padding:40px;
    .section_title{display:inline-block; vertical-align:middle;}
  }
  .buzz_chart{
    .section_title{display:inline-block; vertical-align:middle;}
    .hover_view{top:-100px; background:url(../../assets/images/icon/view_bg.png) left 70px no-repeat;}
  }
}
@media all and (min-width: 768px) and (max-width: 1730px){
#container_inner_wrap {
  .post_figure{width: 100%; display: table; text-align: center; top:0; left:0; transform:none; position:static; margin:80px 0px;}
  .post_mean_wrap{
    .section_title{float:none; padding-bottom:0px;}
    .post_img_wrap{width:100%; display:table;
      .account_img{width:100%; height:auto; margin-left:0px; display:inline-block!important;
        img{width:100%; height:auto;}
      }
    }
  }
  .section_contents{float:none;}
  }
}
.scheduler-box-prologue{display:inline-block; vertical-align:middle; letter-spacing:0px; position:relative; margin-left:5px;
  .hover{cursor:pointer;
    img{width:auto; height:auto; border:0px;}
    &:hover{
      & + .hover_view{display:block;}
    }
  }
  .hover_view{display:none; width:305px; position:absolute; top:-70px; left:5px; z-index:1; background:url(../../assets/images/icon/view_bg.png) left 42px no-repeat; color:#fff; font-size:12px; padding-bottom:15px;
    .hover_inner_view{background:#464160; padding:14px;}
  }
}
</style>
