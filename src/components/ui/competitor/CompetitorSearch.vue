<template>
  <div>
    <div class="company_pop_wrap">
      <div class="company_input">
        <div class="title">분석할 계정 아이디를 입력해주세요.</div>
        <div class="company_input_wrap">
          <form @submit.prevent="searchAction">
            <input type="text" ref="searchFocus" v-model="companyData.searchKeyword">
            <button type="submit">검색</button>
          </form>
        </div>
      </div>
      <div v-if="companyData.statusCode === 500" class="company_text">
        <div>계정이 존재하지 않거나 비즈니스 계정이 아니므로</div>
        <div>데이터 수집이 불가합니다.</div>
      </div>
      <div v-else>
        <div class="company_search_info">
          <div class="search_left"><img :src="companyData.data.profile_picture_url"></div>
          <div class="search_right">
            <div class="company_name">{{companyData.data.username}}</div>
            <div class="compnay_data">
              <div>
                <span>게시물</span>
                <span v-text="setComma(companyData.data.media_count)"></span>
              </div>
              <div>
                <span>팔로워</span>
                <span v-text="setComma(companyData.data.followers_count)"></span>
              </div>
              <div>
                <span>팔로우</span>
                <span v-text="setComma(companyData.data.follows_count)"></span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="companyData.isSearch" class="search-success-box">
          <div class="data_text">
            <div v-if="companyData.statusCode === 200">데이터 수집 여부 <span class="data_whether">YES</span></div>
            <div v-else>해당 계정의 데이터는 익일부터 확인 가능합니다.</div>
          </div>
          <div class="company_btn">
            <button type="button" @click="companySave(companyData.data)">경쟁사 등록</button>
          </div>
        </div>
        <p v-else class="text">계정 아이디는 계정 내 프로필에 기재되어 있습니다.</p>
      </div>
      <div class="close_btn" @click="companyClose"><img src="../../../assets/images/icon/pop_close_btn.jpg" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanySearch',
  components: {
  },
  mounted () {
    this.$refs.searchFocus.focus()
    this.companyData.isSearch = false
    this.companyData.searchKeyword = ''
  },
  computed: {
    today () {
      return this.$moment(new Date()).format('YYYY-MM-DD')
    }
  },
  props: {
    companyData: {
      type: Object
    },
    searchAction: {
      type: Function,
      default () {
        return false
      }
    },
    companySave: {
      type: Function,
      default () {
        return false
      }
    },
    companyClose: {
      type: Function,
      default () {
        return false
      }
    }
  },
  methods: {
    setComma (str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style lang="scss" scoped>
.company_pop_wrap{
  .company_search_info{background:#f2f1f1; width:100%; min-height:130px; margin:0 auto; border-radius:10px; padding:30px; letter-spacing:-4px;
    .search_left{width:70px; height:70px; display:inline-block; vertical-align:middle; margin-right:15px; letter-spacing:0px;
      img{width:100%;}
    }
    .search_right{display:inline-block; vertical-align:middle; letter-spacing:0px;
      .company_name{width:120px; color:#3d3d3d; font-size:16px; font-weight:bold;}
      .compnay_data{width:100%; display:table; color:#979797; padding-top:10px;
        div{float:left; padding-right:20px;
          &:last-child{padding-right:0px;}
        }
      }
    }
  }
  .data_text{ text-align:Center; padding-top:15px;
    .data_whether{color:#119766; padding-left:10px; padding-right:20px;}
  }
  .company_btn{text-align:center; margin-top:15px;
    button{width:135px; height:30px; line-height:30px; background:#000; color:#fff; text-align:center; border-radius:4px; font-weight:bold; font-size:13px;}
  }
  .title{text-align:center; font-size:20px; color:#000; font-weight:bold; margin-bottom:20px;}
  .company_input_wrap{width:422px; margin:0 auto; text-align:center; letter-spacing:-4px; margin-bottom:30px;
    input{width: 268px; height: 30px; line-height: 30px; border: 2px solid #ebebeb; border-radius: 4px; display: inline-block; vertical-align: middle; letter-spacing:0px; margin-right:8px;}
    button{width: 82px; height: 30px; line-height: 30px; background: #000; color: #fff; display: inline-block; vertical-align: middle; letter-spacing:0px;}
  }
  .company_text{text-align:center;}
}
</style>
