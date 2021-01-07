<template>
  <div>
    <table class="board_wrap">
      <colgroup>
        <!-- 1293 -->
        <col width="">
        <col width="">
        <col width="">
        <col width="100px">
        <col width="100px">
        <col width="100px">
        <col width="100px">
        <col width="100px">
      </colgroup>
      <tr>
        <th>날짜</th>
        <th>인스타그램 아이디</th>
        <th>댓글</th>
        <th>친구소환</th>
        <th>좋아요</th>
        <th>블랙리스트</th>
        <th>기본당첨자</th>
        <th>선정</th>
      </tr>
      <tr>
        <td>2018-04-03 10:37</td>
        <td>asdfasdf</td>
        <td>멋지네요 멋지네요 멋지네요 멋지네요 멋지네요</td>
        <td>1명</td>
        <td><img src="../../assets/images/icon/v_icon.png" alt="브이모양버튼"></td>
        <td><img src="../../assets/images/icon/x_icon.png" alt="엑스모양버튼"></td>
        <td><img src="../../assets/images/icon/v_icon.png" alt="브이모양버튼"></td>
        <td><button id="pick" v-on:click="pick">PICK</button></td>
      </tr>
    </table>
    <div class="board_paging">
      <div class="paging">
        <button><img src="../../assets/images/icon/page_prev.png" alt=""></button>
        <ul>
          <li class="now">1</li>
          <li>2</li>
          <li>3</li>
        </ul>
        <button><img src="../../assets/images/icon/page_next.png" alt=""></button>
      </div>
      <div class="page_select">
        <p>ROWS PER PAGE</p>
        <ui-select class="draw_select"/>
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
  created () {
    this.$http.get('/ig_blacklist/', {
      params: {
        instagram_business_account_id: this.$store.state.account.id
      }
    }).then(res => {
      const data = res.data
      console.log(res)

      data.forEach(blackUser => {
        blackUser.created_at = this.$moment(blackUser.created_at).format('YYYY-MM-DD HH:mm:ss')
        this.blacklist.push(blackUser)
      })
    })
  },
  data () {
    return {
      blacklist: []
    }
  },
  methods: {
    pick () {
      let btn = document.getElementById('pick')
      btn.classList.toggle('change_btn')
    },
    moveToMedia (mediaId) {
      this.$emit('moveToMedia', mediaId)
    }
  }
}
</script>

<style lang="scss" scoped>
.board_wrap{border-bottom:1px dotted #e4e4e4; margin-top:10px; border-width:2px;
  .change_btn{border:1px solid #8c7fd9; color:#8c7fd9;}
  td{border-top:1px dotted #e4e4e4; border-bottom:0px; border-width:2px;}
  th{border-top:1px dotted #e4e4e4; border-bottom:0px; border-width:2px;}
}
</style>
