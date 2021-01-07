<template>
  <div class="reply_pop">
    <div class="close_btn" @click="onCancel"><img src="../../assets/images/icon/pop_close_btn.jpg" alt=""></div>
    <div class="pop_content">
      <div class="pop_title">{{user}}</div>
      <p class="pop_prologue">해당 유저를 블랙리스트에<br>추가 하시겠습니까?</p>
      <ui-select class="pop_select" :selectData="selectData"/>
      <div class="pop_btn_wrap">
        <button @click="onSubmit(user, media)">예</button>
        <button type="button" @click="onCancel">아니오</button>
      </div>
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
  data () {
    return {
      selectData: {
        emptyText: '불건전한 댓글 기재(욕설, 유해성)',
        textList: [
          '불건전한 댓글 기재(욕설, 유해성)',
          '도배, 스팸행위(홍보, 스팸성)',
          '기타'
        ]
      }
    }
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
    },
    onSubmit (user, media) {
      this.$http.post('/ig_blacklist/', {
        instagram_business_account_id: this.$store.state.account.id,
        // API 변경으로 인해서 null 값으로 저장
        ig_id: null,
        ig_username: user,
        ig_media_id: media.id,
        description: this.selectData.emptyText,
        created_by: this.$store.state.account.username,
        updated_by: this.$store.state.account.username
      }).then(res => {
        this.$eventBus.$emit('loadComments')
        this.$emit('cancel')
      })
    }
  },
  props: [
    'user', 'media'
  ]
}
</script>

<style lang="scss" scoped>
  .reply_pop{position: absolute; top: 0px; left: 0px; z-index: 10; background: #fff; width: 100%; height: 100%; border:2px solid #f5f5f5; padding:39px 45px; border-left:1px;
    .close_btn{position:absolute; top:-22px; right:-2px; z-index:10; cursor:pointer;}
    .pop_content{
      .select_btn{margin:27px 0px; height:30px; line-height:30px;}
      .pop_title{font-size: 24px; font-weight: bold; text-align: center; padding-bottom:30px; border-bottom:2px solid #000; line-height:1.5;}
      .pop_prologue{text-align:center; font-weight:bold; font-size:20px; padding-top:30px; line-height:1.5;}
      .pop_btn_wrap{text-align:center;
        button{width:82px; height:32px; line-height:32px; fon-size:12px; color:#fff; text-align:center; background:#000; border-radius:4px;}
      }
    }
  }
  .board_body{
    ul{
      li{width:100%; display:table;
        > div{height:62px; line-height:62px; display:inline-block; vertical-align:middle; border-top: 1px dotted #e4e4e4; border-bottom: 0px; border-width: 2px; text-align: center; color: #999;}
        span{white-space: normal; word-wrap: break-word; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow:hidden;}
      }
    }
  }
</style>
