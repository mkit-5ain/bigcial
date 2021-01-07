<template>
  <div id="container">
    <div id="container_wrap">
      <div id="container_inner_wrap">
        <div class="post_view_wrap section_widget section_bottom">
          <ui-post-view v-if="media !== null" :media="media" :comments="comments"/>
        </div>
        <div class="calender_chart section_widget section_bottom">
          <div class="profile_title_inner">
            <div class="section_title">참여도</div>
          </div>
          <div class="chart">
            <stacked-column-chart v-if="participationDegreeRows !== null"
              :stackedColumnChartRows="participationDegreeRows"
              :stackedColumnChartType="stackedColumnChartType"/>
          </div>
        </div>
        <div class="calender_chart section_widget section_bottom">
          <div class="profile_title_inner">
            <div class="section_title">참여율</div>
            <div class="chart_select_wrap">
              <div>
                <input type="radio" value="impressions" id="impressions" v-model="selectedParticipationRate"><label for="impressions">노출</label>
                <input type="radio" value="reach" id="reach" v-model="selectedParticipationRate"><label for="reach">도달</label>
                <!-- <input type="radio" value="followers" id="followers" v-model="selectedParticipationRate"><label for="followers">팔로워 수</label> -->
              </div>
            </div>
          </div>
          <div class="chart">
            <line-chart v-if="participationRateRows !== null" :participationRateRows="participationRateRows"/>
          </div>
        </div>
        <div class="post_carousel section_bg">
          <p class="carousel_prologue">현재 게시물과 비교하고 싶은 게시물을 선택해주세요.</p>
          <div class="post_inner_carousel">
            <slick ref="slick" :options="slickOptions">
              <slide v-for="(carouselMedia, index) in carouselMedias" :key="'carousel-' + index">
                <img v-if="carouselMedia.thumbnail_url"
                     :src="carouselMedia.thumbnail_url"
                     @click="compareMedia(carouselMedia.id)">
                <img v-else
                     :src="carouselMedia.media_url"
                     @click="compareMedia(carouselMedia.id)">
              </slide>
            </slick>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PostView from '@/components/ui/post/PostView'
import StackedColumnChart from '@/components/chart/StackedColumnChart'
import LineChart from '@/components/chart/LineChart'
import Slick from 'vue-slick'

export default {
  name: 'PostDetail',
  components: {
    'ui-post-view': PostView,
    StackedColumnChart,
    LineChart,
    Slick
  },
  created () {
    this.getMediaDetail(this.mediaId)
    this.getMediaComments(this.mediaId)
    this.setParticipationChart(this.mediaId)
    this.setCarouselMedias()
    this.$eventBus.$once('IgAccountChanged', this.replaceRoute)
  },
  data () {
    return {
      media: {},
      mediaId: this.$route.params.id,
      comments: [],
      mediaInsights: [],
      participationDegreeRows: [],
      stackedColumnChartType: 'participationDegree',
      participationRateRows: [],
      selectedParticipationRate: 'impressions',
      impressionsRows: [],
      reachRows: [],
      // followersRows: [],
      compareImpressionsRows: [],
      compareReachRows: [],
      // compareFollowersRows: [],
      carouselMedias: [],
      carouselMediaList: this.$store.state.accountMedias,
      slickOptions: {
        adaptiveHeight: false,
        draggable: true,
        edgeFriction: 0.30,
        focusOnSelect: true,
        infinite: false,
        slidesToShow: 8,
        slidesToScroll: 8
      }
    }
  },
  watch: {
    selectedParticipationRate () {
      switch (this.selectedParticipationRate) {
        case 'impressions':
          this.participationRateRows = this.impressionsRows
          break
        case 'reach':
          this.participationRateRows = this.reachRows
          break
        // case 'followers':
        //   this.participationRateRows = this.followersRows
        //   break
        default:
          break
      }
    },
    carouselMedias () {
      this.reInit()
    }
  },
  methods: {
    replaceRoute () {
      if (this.$route.name === this.$options.name) {
        this.$router.replace({name: 'Post'})
      }
    },
    getMediaDetail (mediaId) {
      this.$http.get('/instagram/' + mediaId + '/detail', {
        params: {
          fb_access_token: localStorage.getItem('fb-access-token')
        }
      }).then(res => {
        this.media = res.data.data
      })
    },
    getMediaComments (mediaId) {
      this.$http.get('/instagram/' + mediaId + '/all_comments', {
        params: {
          fb_access_token: localStorage.getItem('fb-access-token')
        }
      }).then(res => {
        this.comments = res.data.data
      })
    },
    setParticipationChart (mediaId) {
      this.$http.get('/ig_media_insight/' + mediaId).then(res => {
        const mediaInsights = res.data.data

        mediaInsights.forEach((mediaInsight, index) => {
          const day = 'Day' + (index + 1)
          const engagement = (mediaInsight.engagement === 0 ? mediaInsight.carousel_album_engagement : mediaInsight.engagement)
          const impressions = (mediaInsight.impressions === 0 ? mediaInsight.carousel_album_impressions : mediaInsight.impressions)
          const reach = (mediaInsight.reach === 0 ? mediaInsight.carousel_album_reach : mediaInsight.reach)
          // const follower = mediaInsight.followers_count

          // 참여도
          const participationDegreeRow = [day, mediaInsight.like_count, mediaInsight.comments_count, mediaInsight.saved]
          this.participationDegreeRows.push(participationDegreeRow)

          // 참여율 [날짜, 현재 미디어, 비교 미디어]
          this.impressionsRows.push([day, this.setPercent(engagement / impressions), null])
          this.reachRows.push([day, this.setPercent(engagement / reach), null])
          // this.followersRows.push([day, this.setPercent(engagement / follower), null])
        })
        this.participationRateRows = this.impressionsRows
      })
    },
    setCarouselMedias () {
      this.$http.get('/instagram/' + this.$store.state.account.id + '/media', {
        params: {
          fb_access_token: localStorage.getItem('fb-access-token'),
          except_id: this.mediaId,
          limit: 49
        }
      }).then(res => {
        const data = res.data.data
        this.carouselMedias = data
      })
    },
    setPercent (value) {
      return parseFloat((value * 100).toFixed(2))
    },
    compareMedia (compareMediaId) {
      this.$http.get('/ig_media_insight/' + compareMediaId)
        .then(res => {
          const compareMediaInsights = res.data.data
          this.compareImpressionsRows = []
          this.compareReachRows = []
          // this.compareFollowersRows = []

          // 참여율 [날짜, 현재 미디어, 비교 미디어]
          compareMediaInsights.forEach((compareMediaInsight, index) => {
            const day = 'Day' + (index + 1)
            const engagement = (compareMediaInsight.engagement === 0 ? compareMediaInsight.carousel_album_engagement : compareMediaInsight.engagement)
            const impressions = (compareMediaInsight.impressions === 0 ? compareMediaInsight.carousel_album_impressions : compareMediaInsight.impressions)
            const reach = (compareMediaInsight.reach === 0 ? compareMediaInsight.carousel_album_reach : compareMediaInsight.reach)
            // const follower = compareMediaInsight.followers_count

            this.compareImpressionsRows.push([day, this.impressionsRows[index][1], impressions === 0 ? null : this.setPercent(engagement / impressions)])
            this.compareReachRows.push([day, this.reachRows[index][1], reach === 0 ? null : this.setPercent(engagement / reach)])
            // this.compareFollowersRows.push([day, this.followersRows[index][1], this.setPercent(engagement / follower)])
          })

          switch (this.selectedParticipationRate) {
            case 'impressions':
              this.participationRateRows = this.compareImpressionsRows
              break
            case 'reach':
              this.participationRateRows = this.compareReachRows
              break
            // case 'followers':
            //   this.participationRateRows = this.compareFollowersRows
            //   break
            default:
              break
          }
        })
    },
    next () {
      this.$refs.slick.next()
    },
    prev () {
      this.$refs.slick.prev()
    },
    reInit () {
      let currIndex = this.$refs.slick.currentSlide()
      this.$refs.slick.destroy()
      this.$nextTick(() => {
        this.$refs.slick.create()
        this.$refs.slick.goTo(currIndex, true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#container_inner_wrap{
  label{cursor:pointer;}
  input[type="checkbox"],
  input[type="radio"] { display:none; opacity: 0; filter: alpha(opacity=0); width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;}
  label:before{content:''; display:inline-block; width:18px; height:18px; background: url(../../assets/images/icon/check_btn.png) 0 0 no-repeat; vertical-align:middle; cursor:pointer; margin-right:5px;}
  input[type='checkbox']:checked + label:before,
  input[type="radio"]:checked + label:before{ background: url(../../assets/images/icon/check_btn_on.png) 0 0 no-repeat; cursor:pointer;}
  .post_contents{width:100%; display:table; margin-top:25px; padding:0px 100px;
    ul{width:100%; display:table;
      li{width:347.6px; height:347.6px; float:left; background:#2d363d; margin-right:25px; margin-bottom:25px;
        &:nth-child(3n+3){margin-right:0px;}
      }
    }
    .more_btn{width:100%; height:45px; line-height:45px; text-align:center; font-weight:bold; background:#f2f1f1; cursor:pointer;}
  }
  .profile_title_inner{width:100%; display:table;
    .chart_select_wrap{float:left; padding:8px 0px; margin-left:50px;
      label{margin-right:10px;}
    }
  }
  .post_carousel{width:100%; padding:40px;
    .carousel_prologue{font-weight:bold; color:#000; padding-bottom:10px;}
    .post_inner_carousel{padding: 15px 50px; border: 1px solid #ebebeb; position:relative;
      .VueCarousel-slide{background:#000; color:#fff; line-height:70px; text-align:center; border:10px solid #fff; cursor:pointer;
        &:hover{border:10px solid #8c7fd9;}
        img{width:100%; height:100%;}
      }
    }
    .slick-current{
      .VueCarousel-slide{border:10px solid #8c7fd9;}
    }
  }
}
</style>
