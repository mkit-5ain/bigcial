<template>
  <div id="container">
    <div id="container_wrap">
      <div id="container_inner_wrap">
        <div class="section_widget section_bottom">
          <competitor-list
            :competitorData="competitorData"
            :deleted="deleteCompetitor"
            :added="companyShow"/>
        </div>
        <div class="section_widget section_bottom section_company">
          <div class="section_left">
            <div class="section_title">팔로워</div>
            <div class="scheduler-box-prologue">
              <div class="hover"><img src="../../assets/images/icon/hashtag_i.jpg" alt=""></div>
              <div class="hover_view type01">
                <div class="hover_inner_view">
                  <div>최근 30일간 계정의 팔로워 증감추이입니다.</div>
                </div>
              </div>
            </div>
            <div class="chart">
              <column-chart
                v-if="followerVariationCols.length > 0"
                :mColumns="followerVariationCols"
                :mRows="followerVariationRows"
                :mOptions="followerRowsOption"/>
            </div>
          </div>
          <div class="section_right">
            <div class="section_title">참여도</div>
            <div class="scheduler-box-prologue">
              <div class="hover"><img src="../../assets/images/icon/hashtag_i.jpg" alt=""></div>
              <div class="hover_view type02">
                <div class="hover_inner_view">
                  <div>최근 30일간 계정의 참여도(좋아요+댓글) 증감추이입니다.</div>
                </div>
              </div>
            </div>
            <div class="chart">
              <column-chart
                v-if="participationDegreeVariationCols.length > 0"
                :mColumns="participationDegreeVariationCols"
                :mRows="participationDegreeVariationRows"
                :mOptions="participationDegreeOption"/>
            </div>
          </div>
          <div v-if="isCompany" class="section_widget section_bottom company_pop">
            <competitor-search
              :companyData="competitor"
              :searchAction="searchCompetitor"
              :companySave="createCompetitor"
              :companyClose="companyClose" />
          </div>
        </div>
        <div class="section_widget section_bottom">
          <div class="section_title">팔로워 트렌드</div>
          <div class="scheduler-box-prologue">
              <div class="hover"><img src="../../assets/images/icon/hashtag_i.jpg" alt=""></div>
              <div class="hover_view type03">
                <div class="hover_inner_view">
                  <div>일자별 팔로워 증감추이입니다.</div>
                </div>
              </div>
            </div>
          <div class="chart">
            <multi-line-chart
              v-if="followerTrendCols.length > 0"
              :multiColumns="followerTrendCols"
              :multiRows="followerTrendRows"/>
          </div>
        </div>
        <div class="section_widget section_bottom">
          <div class="section_title">일일 참여도</div>
          <div class="scheduler-box-prologue">
              <div class="hover"><img src="../../assets/images/icon/hashtag_i.jpg" alt=""></div>
              <div class="hover_view type04">
                <div class="hover_inner_view">
                  <div>일자별 참여도(좋아요+댓글) 증감추이입니다.</div>
                </div>
              </div>
            </div>
          <div class="chart">
            <multi-line-chart
              v-if="participationDegreeTrendCols.length > 0"
              :multiColumns="participationDegreeTrendCols"
              :multiRows="participationDegreeTrendRows"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompetitorList from '@/components/ui/competitor/CompetitorList'
import CompetitorSearch from '@/components/ui/competitor/CompetitorSearch'
import MultiLineChart from '@/components/chart/MultiLineChart'
import ColumnChart from '@/components/chart/ColumnChart'

export default {
  name: 'Competitor',
  components: {
    CompetitorList,
    CompetitorSearch,
    ColumnChart,
    MultiLineChart
  },
  created () {
    this.callIgCompetitorListAPI()
    this.callIgCompetitorFollowerInsightAPI()
    this.callIgCompetitorParticipationDegreeInsightAPI()
    this.$eventBus.$on('IgAccountChanged', this.refreshData)
  },
  beforeDestroy () {
    this.$eventBus.$off('IgAccountChanged')
  },
  data () {
    return {
      // 내 계정
      companyData: {
        searchKeyword: null,
        isSearch: false,
        statusCode: 0,
        data: {
          'profile_picture_url': this.$store.state.account.profile_picture_url,
          'username': this.$store.state.account.username,
          'media_count': this.$store.state.account.media_count,
          'followers_count': this.$store.state.account.followers_count,
          'follows_count': this.$store.state.account.follows_count
        }
      },
      // 경쟁사
      competitorData: {
        addedBoxCount: 0,
        maxLength: 3,
        data: [{
          'profile_picture_url': this.$store.state.account.profile_picture_url,
          'username': this.$store.state.account.username,
          'media_count': this.$store.state.account.media_count,
          'followers_count': this.$store.state.account.followers_count,
          'follows_count': this.$store.state.account.follows_count
        }]
      },
      isCompany: false,
      addedBoxClickIndex: 0,
      // 경쟁사 팔로워 인사이트
      followerVariationCols: [],
      followerVariationRows: [],
      followerTrendCols: [],
      followerTrendRows: [],
      followerRowsOption: {
        height: 400,
        colors: ['#42b883', '#8c7fd9', '#ffec83'],
        focusTarget: 'category',
        legend: {
          position: 'top'
        }
      },
      // 경쟁사 참여도 인사이트
      participationDegreeVariationCols: [],
      participationDegreeVariationRows: [],
      participationDegreeTrendCols: [],
      participationDegreeTrendRows: [],
      participationDegreeOption: {
        height: 400,
        colors: ['#42b883', '#8c7fd9', '#ffec83'],
        focusTarget: 'category',
        legend: {
          position: 'top'
        },
        series: {
          0: { targetAxisIndex: 0 },
          1: { targetAxisIndex: 1 }
        }
      }
    }
  },
  computed: {
    competitor () {
      return this.companyData
    }
  },
  methods: {
    refreshData (event) {
      this.callIgCompetitorListAPI()
      this.callIgCompetitorFollowerInsightAPI()
      this.callIgCompetitorParticipationDegreeInsightAPI()
    },
    // (1) 경쟁사 팔로워 인사이트 API
    callIgCompetitorFollowerInsightAPI () {
      this.$http.get('/ig_compete_account_insight/follower_count', {
        params: {
          instagram_business_account_id: this.$store.state.account.id
        }
      }).then(res => {
        const data = res.data.data
        this.setFollowerVariation(data)
        this.setFollowerTrend(data)
      })
    },
    // (1-1) 한달간 팔로워 변화량
    setFollowerVariation (data) {
      let variationCols = [{
        'type': 'string',
        'label': '계정'
      }, {
        'type': 'number',
        'label': '팔로워'
      }]
      let variationRows = []
      data.forEach(competitor => {
        variationRows.push([competitor.username, competitor['follower_variation_for_a_month']])
      })
      this.followerVariationCols = variationCols
      this.followerVariationRows = variationRows
    },
    // // (1-1) 한달간 팔로워 변화량
    // setFollowerVariation (data) {
    //   let variationCols = [{
    //     'type': 'string',
    //     'label': '구분'
    //   }]
    //   let variationRows = ['팔로워 수']
    //   data.forEach(competitor => {
    //     variationCols.push({
    //       'type': 'number',
    //       'label': competitor.username
    //     })
    //     variationRows.push(competitor['follower_variation_for_a_month'])
    //   })
    //   this.followerVariationCols = variationCols
    //   this.followerVariationRows.push(variationRows)
    // },
    // (1-2) 한달간 팔로워 트렌드
    setFollowerTrend (data) {
      let trendCols = [{
        'type': 'string',
        'label': '날짜'
      }]
      let trendRows = []
      data.forEach((competitor, index) => {
        trendCols.push({
          'type': 'number',
          'label': competitor.username
        })
        competitor['follower_trend_for_a_month'].forEach((insight, i) => {
          if (index === 0) {
            trendRows.push([insight['insight_date'], insight['follower_variation']])
          } else {
            trendRows[i].push(insight['follower_variation'])
          }
        })
      })
      this.followerTrendCols = trendCols
      this.followerTrendRows = trendRows
    },
    // (2) 경쟁사 참여도 인사이트 API
    callIgCompetitorParticipationDegreeInsightAPI () {
      this.$http.get('/ig_compete_account_insight/participation_degree', {
        params: {
          instagram_business_account_id: this.$store.state.account.id
        }
      }).then(res => {
        const data = res.data.data
        this.setParticipationDegreeVariation(data)
        this.setParticipationDegreeTrend(data)
      })
    },
    // (2-1) 한달간 참여도 변화량
    setParticipationDegreeVariation (data) {
      let variationCols = [{
        'type': 'string',
        'label': '계정'
      }, {
        'type': 'number',
        'label': '좋아요'
      }, {
        'type': 'number',
        'label': '댓글'
      }]
      let variationRows = []
      data.forEach(competitor => {
        variationRows.push([
          competitor.username,
          competitor['like_variation_for_a_month'],
          competitor['comment_variation_for_a_month']])
      })
      this.participationDegreeVariationCols = variationCols
      this.participationDegreeVariationRows = variationRows
    },
    // (2-2) 한달간 참여도 트렌드
    setParticipationDegreeTrend (data) {
      let trendCols = [{
        'type': 'string',
        'label': '날짜'
      }]
      let trendRows = []
      data.forEach((competitor, index) => {
        trendCols.push({
          'type': 'number',
          'label': competitor.username
        })
        competitor['participation_degree_trend_for_a_month'].forEach((insight, i) => {
          if (index === 0) {
            trendRows.push([insight['insight_date'], insight['participation_degree_variation']])
          } else {
            trendRows[i].push(insight['participation_degree_variation'])
          }
        })
      })
      this.participationDegreeTrendCols = trendCols
      this.participationDegreeTrendRows = trendRows
    },
    // 경쟁사 리스트 API
    callIgCompetitorListAPI () {
      this.$http.get('/ig_account_competitors/', {
        params: {
          instagram_business_account_id: this.$store.state.account.id,
          fb_access_token: localStorage.getItem('fb-access-token')
        }
      }).then(res => {
        const data = res.data.data
        this.setCompetitorList(data)
      })
    },
    setCompetitorList (data) {
      if (this.competitorData.data[1]) {
        this.competitorData.data.splice(1, 4)
      }

      this.competitorData.data.splice(0, 1)
      this.competitorData.data.push({
        'profile_picture_url': this.$store.state.account.profile_picture_url,
        'username': this.$store.state.account.username,
        'media_count': this.$store.state.account.media_count,
        'followers_count': this.$store.state.account.followers_count,
        'follows_count': this.$store.state.account.follows_count
      })

      data.forEach(competitor => {
        this.competitorData.data.push({
          'profile_picture_url': competitor.profile_picture_url,
          'username': competitor.username,
          'media_count': competitor.media_count,
          'followers_count': competitor.followers_count,
          'follows_count': competitor.follows_count
        })
      })
      this.contentsAddedBoxCounted()
    },
    // 경쟁사 생성
    createCompetitor (competitor) {
      const me = this
      const addedData = {
        'profile_picture_url': competitor.profile_picture_url,
        'username': competitor.username,
        'media_count': competitor.media_count,
        'followers_count': competitor.followers_count,
        'follows_count': competitor.follows_count
      }
      this.$http.post('/ig_account_competitors/?instagram_business_account_id=' + this.$store.state.account.id, {
        username: competitor.username
      }).then(res => {
        me.competitorData.data.push(addedData)
        me.contentsAddedBoxCounted()
        this.refreshData()
      })
      this.isCompany = false
    },
    // 경쟁사 삭제
    deleteCompetitor (item, index) {
      const me = this
      me.$delete(me.competitorData.data, index)
      me.contentsAddedBoxCounted()

      this.$http.delete('ig_account_competitors', {
        params: {
          ig_account_username: this.$store.state.account.username,
          ig_competitor_account_username: item.username
        }
      }).then(res => {
        this.refreshData()
      })
    },
    // 경쟁사 검색
    searchCompetitor () {
      this.$http.get('/instagram/' + this.$store.state.account.id + '/business_discovery/' + this.companyData.searchKeyword, {
        params: {
          fb_access_token: localStorage.getItem('fb-access-token')
        }
      }).then(res => {
        const status = res.status
        const data = res.data.data
        // 200, 201
        this.companyData.statusCode = status
        this.companyData.data = data
        this.companyData.isSearch = true
      }).catch(err => {
        // 500
        this.companyData.statusCode = err.status
      })
    },
    // 경쟁사 추가 박스 열기
    companyShow (index) {
      this.addedBoxClickIndex = index
      this.isCompany = true
    },
    // 경쟁사 추가 박스 닫기
    companyClose () {
      this.isCompany = false
    },
    // 컨텐츠 추가 박스 카운트
    contentsAddedBoxCounted () {
      const me = this
      me.competitorData.addedBoxCount = me.competitorData.maxLength - me.competitorData.data.length
    }
  }
}
</script>

<style lang="scss" scoped>
.section_company{position:relative;}
.company_pop{position: absolute; padding: 108px 0px; top: 0px; left: 0px; height: 100%; margin-bottom: 0px; min-height:526px;
  .close_btn{position:absolute; top:0px; right:0px; z-index:10; cursor:pointer;}
}
.company_contents{width:100%; display:table;}
.company_pop_wrap{width:422px; margin:0 auto;
  .text{text-align:center; padding-top:15px; color:#3d3d3d;}
  .title{text-align:center; font-size:20px; color:#000; font-weight:bold; margin-bottom:20px;}
  .company_input_wrap{width:422px; margin:0 auto; text-align:center; letter-spacing:-4px; margin-bottom:30px;
    input{width: 268px; height: 30px; line-height: 30px; border: 2px solid #ebebeb; border-radius: 4px; display: inline-block; vertical-align: middle; letter-spacing:0px; margin-right:8px;}
    button{width: 82px; height: 30px; line-height: 30px; background: #000; color: #fff; display: inline-block; vertical-align: middle; letter-spacing:0px;}
  }
  .company_search_info{background:#f2f1f1; width:100%; margin:0 auto; border-radius:10px; padding:30px; letter-spacing:-4px;
    .search_left{display:inline-block; vertical-align:middle; padding-right:15px; letter-spacing:0px;}
    .search_right{display:inline-block; vertical-align:middle; letter-spacing:0px;
      .company_name{width:120px; color:#3d3d3d; font-size:16px; font-weight:bold;}
      .compnay_data{width:100%; display:table; color:#979797; padding-top:10px;
        div{float:left; padding-right:20px;
          &:last-child{padding-right:0px;}
        }
      }
    }
  }
}
/* 말풍선 */
.scheduler-box-prologue{display:inline-block; vertical-align:middle; letter-spacing:0px; position:relative; margin-left:5px;
  .hover{cursor:pointer;
    img{width:auto; height:auto; border:0px;}
    &:hover{
      & + .hover_view{display:block;}
    }
  }
  .hover_view{display:none; width:310px; position:absolute; top:-70px; left:5px; z-index:1; background:url(../../assets/images/icon/view_bg.png) left 42px no-repeat; color:#fff; font-size:12px; padding-bottom:15px;
    .hover_inner_view{background:#464160; padding:14px;}
  }
}

/* 타이틀 */
.section_title{display:inline-block; vertical-align:middle;}

/* 타이틀 overview */
.type01{width:240px!important;}
.type03{width:180px!important;}
.type04{width:250px!important;}
</style>
