<template>
  <div class="board_wrap">
    <div class="board_head">
      <ul>
        <li class="line-01">날짜</li>
        <li class="line-02">아이디</li>
        <li class="line-03">게시물</li>
        <li class="line-04">댓글</li>
        <li class="line-05">선정</li>
      </ul>
    </div>
    <div class="board_body">
      <paginate name="winnerlist" :list="winnerlist" :per="5" class="board_inner_body">
        <li v-for="winnerUser in paginated('winnerlist')" :key="winnerUser.id">
          <div class="line-01">{{winnerUser.created_at}}</div>
          <div class="line-02">{{winnerUser.ig_username}}</div>
          <div class="line-03" @click="moveToMedia(winnerUser.ig_media_id)">{{winnerUser.ig_media_id}}</div>
          <div class="line-04">{{winnerUser.description}}</div>
          <div class="line-05"><button @click="deleteWinner(winnerUser)">삭제</button></div>
        </li>
      </paginate>
      <paginate-links for="winnerlist" :limit="2" :show-step-links="true"></paginate-links>
    </div>
  </div>
</template>

<script>
import Select from '@/components/ui/common/Select'

export default {
  components: {
    'ui-select': Select
  },
  created () {
    this.getWinnerlist()
  },
  data () {
    return {
      paginate: ['winnerlist'],
      winnerlist: []
    }
  },
  methods: {
    getWinnerlist () {
      this.$http.get('/ig_winnerlist/', {
        params: {
          instagram_business_account_id: this.$store.state.account.id
        }
      }).then(res => {
        const data = res.data

        this.winnerlist = []
        data.forEach(winnerUser => {
          winnerUser.created_at = this.$moment(winnerUser.created_at).format('YYYY-MM-DD HH:mm:ss')
          this.winnerlist.push(winnerUser)
        })
      })
    },
    deleteWinner (user) {
      if (confirm(user.ig_username + '를 기존 당첨자에서 삭제하시겠습니까?')) {
        this.$http.delete('/ig_winnerlist/' + user.id).then(res => {
          this.getWinnerlist()
          alert('기존 당첨자에서 삭제 되었습니다.')
        })
      }
    },
    moveToMedia (mediaId) {
      this.$emit('moveToMedia', mediaId)
    }
  }
}
</script>

<style lang="scss" scoped>
.board_wrap{margin-top:10px; border-width:2px;
  .change_btn{border:1px solid #8c7fd9; color:#8c7fd9;}
  .line-01{width:20%;}
  .line-02{width:20%;}
  .line-03{width:20%; cursor:pointer;}
  .line-04{width:20%; text-overflow: ellipsis; word-wrap: normal; overflow: hidden;}
  .line-05{width:20%;}
  .board_head{
    ul{width:100%; display:table;
      li{display:inline-block; vertical-align:middle; border-top: 1px dotted #e4e4e4; border-bottom: 0px; border-width: 2px; text-align: center; color: #999; height: 63px; line-height:63px;}
    }
  }
  .board_body{
    .board_inner_body{
      li{width:100%; display:table;
        > div{height:62px; line-height:62px; display:inline-block; vertical-align:middle; border-top: 1px dotted #e4e4e4; border-bottom: 0px; border-width: 2px; text-align: center; color: #999;}
        &:last-child{border-bottom: 1px dotted #e4e4e4; border-width: 2px;}
      }
    }
  }
}
</style>
