<template>
  <div>
    <div class="search_wrap">
      <div class="input_wrap">
        <div class="left_switch">
          <label class="switch">
            <input type="checkbox" v-model="checkedPick">
            <span class="slider round"></span>
          </label>
        </div>
        <div class="right_search"><input type="text" placeholder="SEARCH" v-model="searchText"></div>
      </div>
    </div>
    <div class="board_wrap">
      <div class="board_head">
        <ul>
          <li class="line-01">날짜</li>
          <li class="line-02">아이디</li>
          <li class="line-03">댓글</li>
          <li class="line-04">친구소환</li>
          <li class="line-05">블랙리스트</li>
          <li class="line-06">기존당첨자</li>
          <li class="line-07">선정</li>
        </ul>
      </div>
      <div class="board_body" v-if="fComments.length" >
        <paginate class="paginate-list board_inner_body"
                  name="comments"
                  ref="paginator"
                  :list="fComments"
                  :per="5">
          <li v-for="comment in paginated('comments')" v-bind:key="comment.id">
            <div class="line-01">{{comment.datetime}}</div>
            <div class="line-02">{{comment.username}}</div>
            <div class="line-03">{{comment.text}}</div>
            <div class="line-04">{{comment.tag_friends}}</div>
            <div class="line-05" v-if="comment.is_black">
              <img src="../../assets/images/icon/v_icon.png" alt="">
            </div>
            <div class="line-05" v-else>
              <img src="../../assets/images/icon/x_icon.png" alt="">
            </div>
            <div class="line-06" v-if="comment.is_winner">
              <img src="../../assets/images/icon/v_icon.png" alt="">
            </div>
            <div class="line-06" v-else>
              <img src="../../assets/images/icon/x_icon.png" alt="">
            </div>
            <div class="line-07">
              <template v-if="comment.is_comment_winner">당첨</template>
              <template v-else>
                <button class="pick" @click="pickComment(comment)">PICK</button>
              </template>
            </div>
          </li>
        </paginate>
        <paginate-links for="comments" :limit="2" :show-step-links="true"></paginate-links>
      </div>
    </div>
  </div>
</template>

<script>
import Select from '@/components/ui/Select'

export default {
  components: {
    'ui-select': Select
  },
  computed: {
    fComments () {
      // 검색 필터링
      const re = new RegExp(this.searchText, 'i')
      let filteredComments = this.comments.filter(comment => comment.text.match(re))

      // 날짜 필터링
      filteredComments = filteredComments.filter(comment => {
        let commentDate = this.$moment(comment.datetime).format('YYYY-MM-DD')
        let sinceDate = this.$moment(this.dateRange[0]).format('YYYY-MM-DD')
        let untilDate = this.$moment(this.dateRange[1]).format('YYYY-MM-DD')

        // since ~ until 기간의 댓글 목록 반환
        if (sinceDate <= commentDate && commentDate <= untilDate) {
          return comment
        }
      })

      // 친구소환 필터링
      filteredComments = filteredComments.filter(comment => {
        if (this.checkedFriend) {
          if (comment.tag_friends > 0) {
            return comment
          }
        } else {
          return comment
        }
      })

      // 블랙리스트 필터링
      filteredComments = filteredComments.filter(comment => {
        if (this.checkedBlack) {
          if (!comment.is_black) {
            return comment
          }
        } else {
          return comment
        }
      })

      // 기존당첨자 필터링
      filteredComments = filteredComments.filter(comment => {
        if (this.checkedWinner) {
          if (!comment.is_winner) {
            return comment
          }
        } else {
          return comment
        }
      })

      // 현재 당첨여부 필터링
      filteredComments = filteredComments.filter(comment => {
        if (this.checkedPick) {
          if (comment.is_comment_winner) {
            return comment
          }
        } else {
          return comment
        }
      })

      // 해시태그 필터링
      filteredComments = filteredComments.filter(comment => {
        if (this.hashData.length > 0) {
          return this.hashData.some(hashtag => {
            return comment.text.includes(hashtag)
          })
        } else {
          return comment
        }
      })

      this.$emit('filteredComments', filteredComments)
      return filteredComments
    }
  },
  data () {
    return {
      paginate: ['comments'],
      searchText: '',
      checkedPick: false
    }
  },
  methods: {
    pickComment (comment) {
      this.$http.post('/ig_winnerlist/', {
        instagram_business_account_id: this.$store.state.account.id,
        // API 변경으로 인해서 null 값으로 저장
        ig_id: null,
        ig_username: comment.username,
        ig_media_id: this.mediaId,
        ig_comment_id: comment.id,
        description: comment.text,
        created_by: this.$store.state.account.username,
        updated_by: this.$store.state.account.username
      }).then(res => {
        console.log('pick!!')
        comment.is_comment_winner = true
      })
    }
  },
  props: [
    'mediaId',
    'checkedFriend',
    'checkedBlack',
    'checkedWinner',
    'hashData',
    'dateRange',
    'comments'
  ]
}
</script>

<style lang="scss" scoped>
.board_wrap{margin-top:10px; border-width:2px;
  .paginate-list{border-bottom:2px dotted #e4e4e4;}
  .line-01{width:20%;}
  .line-02{width:10%;}
  .line-03{width:30%; text-overflow: ellipsis; word-wrap: normal; overflow: hidden;}
  .line-04{width:10%;}
  .line-05{width:10%;
    img{padding:21.5px 0px;}
  }
  .line-06{width:10%;
    img{padding:21.5px 0px;}
  }
  .line-07{width:10%;}
  .board_head{
    ul{width:100%; display:table;
      li{display:inline-block; vertical-align:middle; border-top: 1px dotted #e4e4e4; border-bottom: 0px; border-width: 2px; text-align: center; color: #999; height: 63px; line-height:63px;}
    }
  }
  .board_body{
    .board_inner_body{
      li{width:100%; display:table;
        > div{height:62px; line-height:62px; display:inline-block; vertical-align:middle; border-top: 1px dotted #e4e4e4; border-bottom: 0px; border-width: 2px; text-align: center; color: #999;}
      }
    }
  }
}
.search_wrap{margin-top:25px; overflow:hidden;
  .input_wrap{
    .left_switch{float:left;
      .switch { position: relative; display: inline-block; width: 60px; height: 34px;}
      .switch input {display:none;}
      .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #8c7fd9; -webkit-transition: .4s; transition: .4s; border-radius: 4px;}
      .slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; -webkit-transition: .4s; transition: .4s; border-radius: 4px;}
      input:checked + .slider { background:#65ba91; border-radius: 4px;}
      input:checked + .slider:before {-webkit-transform: translateX(26px); -ms-transform: translateX(26px); transform: translateX(26px); border-radius: 4px;}
    }
    .right_search{float:right;
      input{width: 162px; height: 34px; border: 2px solid #ebebeb; border-radius: 4px; background: #fff; letter-spacing:-4px; display:inline-block; letter-spacing:0px; vertical-align:top; text-indent:14px; padding:0 5px;}
      button{width:24px; height:31px; display:inline-block; letter-spacing:0px; vertical-align:top;}
    }
  }
}
</style>
