<template>
  <div class="company_contents">
    <div class="company_box" v-for="(item, index) in competitorData.data" :key="index">
      <!-- 경쟁사 컨텐츠 썸네일 -->
      <div class="company_visual"><img :src="item.profile_picture_url"></div>
      <!-- 경쟁사 정보 -->
      <div class="company_info">
        <div class="follower">
          <span>계정명</span>
          <span>{{ item.username }}</span>
        </div>
        <div class="follower">
          <span>팔로워수</span>
          <span v-text="setComma(item.followers_count)"></span>
        </div>
        <div class="post">
          <span>게시물 수</span>
          <span v-text="setComma(item.media_count)"></span>
        </div>
      </div>
      <div v-if="index !== 0" class="close_btn" @click="deleted(item, index)" :key="index.id"><img src="../../../assets/images/icon/pop_close_btn.jpg" alt=""></div>
    </div>
    <div v-for="index in competitorData.addedBoxCount" class="company_added_box"  :key="index.id">
      <div class="add_btn" @click="added(index)">경쟁사 추가</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompetitorList',
  mounted () {
    this.addedBoxCounted()
  },
  props: {
    competitorData: {
      type: Object
    },
    added: {
      type: Function,
      default (item, index) {
        return false
      }
    },
    deleted: {
      type: Function,
      default (item, index) {
        return false
      }
    }
  },
  data () {
    return {
      addedBoxCount: this.competitorData.maxLength - this.competitorData.data.length
    }
  },
  methods: {
    addedBoxCounted () {
      this.addedBoxCount = this.competitorData.maxLength - this.competitorData.data.length
    },
    setComma (str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style lang="scss" scoped>
.company_box{
  .company_visual{width:100px; height:100px; display:inline-block; vertical-align:middle; letter-spacing:0px;
    img{width:100%; height:100%;}
  }
  .company_info{ font-size:15px; color:#000; display:inline-block; vertical-align:middle; letter-spacing:0px; padding-left:23px;
    span{font-weight:bold;
      &:first-child{padding-right:20px;}
    }
    .follower{line-height:1.5;}
    .post{line-height:1.5;}
  }
  .close_btn{position:absolute; top:0px; right:0px; z-index:10; cursor:pointer;}
}
.company_added_box{ min-height:144px; background:#f2f1f1; letter-spacing:0px; position:relative;
  .add_btn{width:144px; height:32px; line-height:34px; font-weight:bold; font-size:15px; color:#9e9e9e; border-radius:10px; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:#fff url(../../../assets/images/icon/company_add_i.png) 20px center no-repeat; text-indent:46px; cursor:pointer;}
}
</style>
