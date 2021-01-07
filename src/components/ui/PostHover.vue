<template>
  <div class="post_img_wrap">
    <ul>
      <li v-for="bestMedia in bestMedias" v-bind:key="bestMedia.id">
        <img :src="bestMedia['media_url']" alt="">
        <div class="post_view" @click="clickMedia(bestMedia)">
          <div class="post_like">
            <span v-text="bestMedia['like_count']"></span>
          </div>
          <div class="post_reply">
            <span v-text="bestMedia['comments_count']"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'PostHover',
  computed: {
    bestMedias: function () {
      let medias = this.$store.state.accountBestMedia.best_media
      medias.forEach(media => {
        if (media['media_type'] === 'VIDEO') {
          media['media_url'] = media['thumbnail_url']
        }
      })
      return this.$store.state.accountBestMedia.best_media
    }
  },
  methods: {
    clickMedia (media) {
      const id = media['id']
      this.$router.push({
        name: 'PostDetail',
        params: {id}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .post_img_wrap{float:left;
    ul{display:table; min-width:460px;
      li{width:84px; height:84px; float:left; margin-left:10px; position:relative; cursor:pointer;
        img{width:100%; height:100%;}
        &:first-child{margin-left:0px;}
        &:hover{
          .post_view{display:block; padding-top:18px; padding-left:13px;
            span{display:inline-block; *display:inline; vertical-align:middle;}
            .post_like{padding:3px 0px;
              span{background:url(../../assets/images/icon/inster_hover_01.png) left 0 no-repeat; padding-left:22px;}
            }
            .post_reply{padding:3px 0px;
              span{background:url(../../assets/images/icon/inster_hover_02.png) left center no-repeat; padding-left:22px;}
            }
          }
        }
        .post_view{display:none; width:84px; height:84px; position: absolute; top: 0px; z-index: 1; background: rgba(0, 0, 0, 0.7); color: #fff;}
      }
    }
  }
</style>
