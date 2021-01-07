<template>
  <div class="board_wrap">
    <div class="board_head">
      <ul>
        <li class="line-01">날짜</li>
        <li class="line-02">아이디</li>
        <li class="line-03">게시물</li>
        <li class="line-04">사유</li>
        <li class="line-05">블랙리스트</li>
      </ul>
    </div>
    <div class="board_body">
      <paginate name="blacklist" :list="blacklist" :per="5" class="board_inner_body">
        <li v-for="blackUser in paginated('blacklist')" :key="blackUser.id">
          <div class="line-01">{{blackUser.created_at}}</div>
          <div class="line-02">{{blackUser.ig_username}}</div>
          <div class="line-03" @click="moveToMedia(blackUser.ig_media_id)">{{blackUser.ig_media_id}}</div>
          <div class="line-04">{{blackUser.description}}</div>
          <div class="line-05"><button @click="deleteBlack(blackUser)">삭제</button></div>
        </li>
      </paginate>
      <paginate-links for="blacklist" :limit="2" :show-step-links="true"></paginate-links>
    </div>
  </div>
</template>

<script>
import Select from '@/components/ui/common/Select'

export default {
  name: 'Blacklist',
  components: {
    'ui-select': Select
  },
  created () {
    this.getBlacklist()
    this.$eventBus.$once('IgAccountChanged', this.replaceRoute)
  },
  data () {
    return {
      paginate: ['blacklist'],
      blacklist: []
    }
  },
  methods: {
    replaceRoute () {
      if (this.$route.name === this.$options.name) {
        this.$router.replace({name: 'Account'})
      }
    },
    pick () {
      let btn = document.getElementById('pick')
      btn.classList.toggle('change_btn')
    },
    getBlacklist () {
      this.$http.get('/ig_blacklist/', {
        params: {
          instagram_business_account_id: this.$store.state.account.id
        }
      }).then(res => {
        const data = res.data

        this.blacklist = []
        data.forEach(blackUser => {
          blackUser.created_at = this.$moment(blackUser.created_at).format('YYYY-MM-DD HH:mm:ss')
          this.blacklist.push(blackUser)
        })
      })
    },
    deleteBlack (user) {
      if (confirm(user.ig_username + '를 블랙리스트에서 삭제하시겠습니까?')) {
        this.$http.delete('/ig_blacklist/' + user.id).then(res => {
          this.getBlacklist()
          alert('블랙리스트에서 삭제 되었습니다.')
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
.board_wrap{
  .change_btn{border:1px solid #8c7fd9; color:#8c7fd9;}
  .line-01{width:20%;}
  .line-02{width:20%;}
  .line-03{width:20%;}
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
