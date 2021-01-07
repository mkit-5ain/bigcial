<template>
  <div class="reply_pop">
    <div class="close_btn" @click="onCancel"><img src="../../assets/images/icon/pop_close_btn.jpg" alt=""></div>
    <div class="pop_content">
      <p class="pop_prologue">선정을 원하는 당첨자의 수를 헌택해주세요</p>
      <div class="pop_select_wrap">
        <ui-select class="pop_select" :selectData="this.selectData" :onClick="clickSelect"/>
        <button type="button" @click="pickUser">PICK</button>
      </div>
    </div>
    <div class="reply_pop_content" v-show="isPick">
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
        <div class="board_body">
          <paginate class="paginate-list" name="pickComments" ref="paginator"
            :list="pickComments"
            :per="5">
            <li v-for="comment in paginated('pickComments')" v-bind:key="comment.id">
              <div class="line-01">{{comment.datetime}}</div>
              <div class="line-02">{{comment.username}}</div>
              <div class="line-03">{{comment.text}}</div>
              <div class="line-04">{{comment.tag_friends}}</div>
              <!-- <div class="line-05">{{comment.is_black}}</div>
              <div class="line-06">{{comment.is_winner}}</div> -->
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
        </div>
      </div>
      <paginate-links for="pickComments" :limit="2" :show-step-links="true"></paginate-links>
    </div>
  </div>
</template>

<script>

import Select from '@/components/ui/common/Select'
export default {
  name: 'Popup',
  components: {
    'ui-select': Select
  },
  props: {
    mediaId: {
      type: String,
      default: ''
    },
    comments: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      selectData: {
        emptyText: '인원선택',
        textList: [
          '1',
          '3',
          '5',
          '10'
        ]
      },
      isPick: false,
      paginate: ['pickComments'],
      pickComments: []
    }
  },
  methods: {
    pickUser () {
      if (this.selectData.emptyText === '인원선택') {
        alert('인원선택을 해주세요.')
      } else {
        let filterComments = this.comments
        filterComments = filterComments.filter(function (comment) {
          if (comment.is_comment_winner) {
            // PASS
          } else {
            return comment
          }
        })

        if (this.selectData.emptyText > filterComments.length) {
          alert('당첨자 수가 너무 많습니다.')
        } else {
          this.pickComments = this.getRandomValues(filterComments, this.selectData.emptyText)
          this.isPick = true
        }
      }
    },
    pickComment (comment) {
      this.$http.post('/ig_winnerlist/', {
        instagram_business_account_id: this.$store.state.account.id,
        // API 변경으로 인해서 null 값으로 저장
        ig_id: null,
        ig_username: comment.username,
        ig_media_id: this.mediaId,
        description: comment.text,
        created_by: this.$store.state.account.username,
        updated_by: this.$store.state.account.username
      }).then(res => {
        console.log('pick!!')
        comment.is_comment_winner = true
      })
    },
    getRandomValues (arr, count) {
      let result = []
      let _tmp = arr.slice()
      for (let i = 0; i < count; i++) {
        let index = Math.ceil(Math.random() * 10) % _tmp.length
        result.push(_tmp.splice(index, 1)[0])
      }
      return result
    },
    clickSelect (value) {
      this.selectData.emptyText = value
    },
    onCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
  .reply_pop{
    .reply_pop_content{background:#fff;
      .board_wrap{border-bottom:1px dotted #e4e4e4; margin-top:10px; border-width:2px;
        .line-01{width:20%;}
        .line-02{width:10%;}
        .line-03{width:30%;}
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
          ul{
            li{width:100%; display:table;
              > div{height:62px; line-height:62px; display:inline-block; vertical-align:middle; border-top: 1px dotted #e4e4e4; border-bottom: 0px; border-width: 2px; text-align: center; color: #999; text-overflow: ellipsis; word-wrap: normal; overflow: hidden;}
            }
          }
        }
      }
    }
    .close_btn{position:absolute; top:-18px; right:0px; z-index:10; cursor:pointer;}
    .pop_content{width:258px; margin:35px auto;
      .pop_prologue{font-size:15px; font-weight:bold; padding-bottom:20px; border-bottom:3px solid #000;}
      .pop_select_wrap{width:100%; display:table; margin-top: 22px;
        .select_btn{height: 30px; line-height: 30px; width: 168px; float:left;}
        button{width:80px; height:30px; line-height:30px; color:#fff; background:#000; float:right; border-radius:4px; font-size:15px;}
      }
    }
  }
</style>
