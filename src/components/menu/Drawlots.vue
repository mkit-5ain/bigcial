<template>
  <div id="container">
    <div id="container_wrap">
      <div id="container_inner_wrap">
        <div class="section_widget">
          <div class="thumbnail_wrap">
            <div class="section_title">댓글 추첨을 원하는 게시물을 선택해주세요.</div>
            <div class="post_contents">
              <div>
                <ul id="inner_content">
                  <template v-if="medias">
                    <ui-post-thumbnail v-for="(media, index) in medias" :key="'drawlots-' + index" :media="media" :type="type"/>
                  </template>
                </ul>
                <button class="more_btn" v-show="hasNext" @click="more()">더보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/ui/common/Calendar'
import CustomChart from '@/components/chart/CustomChart'
import PostThumbnail from '@/components/ui/post/PostThumbnail'

import Constant from '../../constant'

export default {
  components: {
    'ui-calendar': Calendar,
    'ui-post-thumbnail': PostThumbnail,
    CustomChart
  },
  created () {
    this.$store.dispatch(Constant.ADD_ACCOUNT_MEDIAS, {status: 'init'})
  },
  computed: {
    medias () {
      return this.$store.state.accountMedias.data
    },
    hasNext () {
      return this.$store.state.accountMedias.next
    }
  },
  data () {
    return {
      type: 'drawlots_detail'
    }
  },
  methods: {
    more () {
      this.$store.dispatch(Constant.ADD_ACCOUNT_MEDIAS, {status: 'more'})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
