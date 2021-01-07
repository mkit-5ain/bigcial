<template>
  <div id="container">
    <div id="container_wrap">
      <div id="container_inner_wrap">
        <div class="drawlots_view_wrap section_widget section_bottom">
          <ui-post-view v-if="media !== null" :media="media" :comments="comments"/>
        </div>
        <div class="section_widget">
          <div class="section_title">선정조건</div>
          <div class="selection_wrap">
            <div v-if="isShow === false">
              <!-- 댓글 추첨 캘린더-->
              <ui-calendar v-model="range" class="draw_calendar"/>
              <!-- 인풋박스 -->
              <div class="check_wrap">
                <div>
                  <ul>
                    <li><input type="checkbox" id="sort2" v-model="checkedFriend"><label for="sort2">친구소환</label></li>
                    <li><input type="checkbox" id="sort3" v-model="checkedBlack"><label for="sort3">블랙리스트 제외</label></li>
                    <li><input type="checkbox" id="sort4" v-model="checkedWinner"><label for="sort4">기존당첨자 제외</label></li>
                  </ul>
                </div>
              </div>
              <!-- 해시태그 작성 -->
              <div class="tag_input">
                <div class="tag_input_inner">
                  <span v-for="(item, index) in hashData" class="hash-tag" v-bind:key="index">
                    <strong>{{ item }}</strong>
                    <span class="hash-delete" @click="hashDelete(index)">x</span>
                  </span>
                  <input type="text" placeholder="해시태그를 작성후 Enter를 입력하세요. (#제외)" v-on:keydown="keyEvent()" v-model="hashValue">
                </div>
              </div>
              <div class="pick_btn">
                <button @click="isShow = true">랜덤픽</button>
              </div>
            </div>
            <transition name="modal">
              <random-pick v-if="isShow" @cancel="isShow = false" :mediaId="this.mediaId" :comments="filteredComments"/>
            </transition>
          </div>
        </div>
        <div class="section_widget">
          <div class="section_title">당첨자 확인</div>
          <ui-comment v-if="comments.length > 0"
            :mediaId="mediaId"
            :checkedFriend="checkedFriend"
            :checkedBlack="checkedBlack"
            :checkedWinner="checkedWinner"
            :hashData="hashData"
            :dateRange="range"
            :comments="comments"
            @filteredComments="changeComments" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/ui/common/Calendar'
import PostView from '@/components/ui/post/PostView'
import Search from '@/components/ui/common/Search'
import Comment from '@/components/ui/drawlots/Comment'
import RandomPick from '@/components/popup/RandomPick'

export default {
  name: 'DrawlotsDetail',
  components: {
    RandomPick,
    'ui-calendar': Calendar,
    'ui-post-view': PostView,
    'ui-search': Search,
    'ui-comment': Comment
  },
  created () {
    window.scrollTo(0, 0)
    // 게시물 데이터
    this.$http.get('/instagram/' + this.mediaId + '/detail', {
      params: {
        fb_access_token: localStorage.getItem('fb-access-token')
      }
    }).then(res => {
      this.media = res.data.data
      this.range = [new Date(this.media.timestamp), new Date()]
    })
    // 전체 댓글 목록
    this.loadComments()
    this.$eventBus.$on('loadComments', this.loadComments)
    this.$eventBus.$once('IgAccountChanged', this.replaceRoute)
  },
  beforeDestroy () {
    this.$eventBus.$off('loadComments')
  },
  data () {
    return {
      hashValue: '',
      media: {},
      comments: [],
      hashData: [],
      isShow: false,
      mediaId: this.$route.params.id,
      range: [],
      checkedFriend: false,
      checkedBlack: false,
      checkedWinner: false,
      checkedPick: false,
      filteredComments: []
    }
  },
  methods: {
    replaceRoute () {
      if (this.$route.name === this.$options.name) {
        this.$router.replace({name: 'Drawlots'})
      }
    },
    changeComments (comments) {
      this.filteredComments = comments
    },
    keyEvent () {
      if (event.keyCode === 9 || event.keyCode === 13) {
        if (this.hashValue.indexOf('#') >= 0) {
          alert('#를 제외한 단어만 입력해 주세요.')
        } else if (this.hashValue !== '') {
          this.hashData.push('#' + this.hashValue)
          this.hashValue = ''
        }
        event.preventDefault()
      }
    },
    hashDelete (index) {
      this.$delete(this.hashData, index)
    },
    loadComments () {
      this.$http.get('/instagram/' + this.mediaId + '/all_comments', {
        params: {
          fb_access_token: localStorage.getItem('fb-access-token')
        }
      }).then(res => {
        this.comments = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 인풋박스 */
label{cursor:pointer;}
input[type="checkbox"],
input[type="radio"] { display:none; opacity: 0; filter: alpha(opacity=0); width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;}
label:before{content:''; display:inline-block; width:18px; height:18px; background: url(../../assets/images/icon/check_btn.png) 0 0 no-repeat; vertical-align:middle; cursor:pointer; margin-right:5px;}
input[type='checkbox']:checked + label:before,
input[type="radio"]:checked + label:before{ background: url(../../assets/images/icon/check_btn_on.png) 0 0 no-repeat; cursor:pointer;}

#container_inner_wrap{
  .selection_wrap{margin-top:40px; position:relative;}
    .reply_pop{border:2px solid #f5f5f5;}
    .pick_btn{width:100%; text-align:center; margin-top:50px;
      button{width:105px; height:34px; line-height:34px; text-align:center; color:#fff; background:#000; border-radius:4px;}
    }
    .draw_calendar{float:left; margin-right:35px;}
    .check_wrap{height:34px; line-height:34px; float:left; overflow:hidden;
      ul{
        li{float:left; margin-right:35px;}
      }
    }
    .tag_input{clear:both; padding-top:20px;
      .tag_input_inner{width:100%; height:39px; line-height:39px; background: #fff url(../../assets/images/icon/tag_i.png) 15px center no-repeat; border:2px solid #f5f5f5; text-indent:40px;
        .hash-tag{background: #f2f1f1; color: #000; padding: 5px 10px; border-radius: 10px; margin-right:5px;}
        input{width:320px;}
      }
    }
}
.hash-delete { cursor:pointer; }
</style>
