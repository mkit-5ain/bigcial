<template>
  <li>
    <div class="img_inner_wrap">
      <img v-if="media.thumbnail_url" :src="media.thumbnail_url" alt="">
      <img v-else :src="media.media_url" alt="">
      <div class="post_view" @click="clickMedia(media)">
        <div class="post_inner_view">
          <div class="post_inner_contents">
            <div class="post_like">
              <span
                v-if=media.like_count
                v-text="setComma(media.like_count)"></span>
              <span v-else>0</span>
            </div>
            <div class="post_reply">
              <span
                v-if=media.comments_count
                v-text="setComma(media.comments_count)"></span>
              <span v-else>0</span>
            </div>
            <div class="post_save">
              <span
                v-if=media.saved
                v-text="setComma(media.saved)"></span>
              <span v-else>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  methods: {
    clickMedia (media) {
      const id = media['id']
      if (this.type === 'drawlots_detail') {
        this.$router.push({
          name: 'DrawlotsDetail',
          params: {id}
        })
      } else {
        this.$router.push({
          name: 'PostDetail',
          params: {id}
        })
      }
    },
    setComma (str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    }
  },
  props: [
    'media', 'type'
  ]
}
</script>
<style lang="scss" scoped>
li{position:relative;
  &:hover{
    .post_view{display:block; cursor:pointer;
    }
  }
  // display: table-cell; vertical-align: middle;
  .img_inner_wrap{
    .post_inner_view{width:100%; height:100%; position:relative;
      .post_inner_contents{position:absolute; top:50%; left:50%; transform:translate(-50% ,-50%);
        span{display:inline-block; *display:inline; vertical-align:middle;}
        .post_like{padding:8px 0px;
          span{padding-left:36px; background:url(../../../assets/images/icon/popularity_hover_01.png) 2px 0 no-repeat; font-size:20px;}
        }
        .post_reply{padding:8px 0px;
          span{padding-left:36px; background:url(../../../assets/images/icon/popularity_hover_02.png) left center no-repeat; font-size:20px;}
        }
        .post_save{padding:8px 0px; font-size:20px; cursor:pointer;
          span{padding-left:36px; background:url(../../../assets/images/icon/popularity_hover_03.png) 2px center no-repeat; font-size:20px;}
        }
      }
    }
  }
  .post_view{display:none; width:100%; height:100%; position: absolute; top: 0px; z-index: 1; background: rgba(0, 0, 0, 0.7); color: #fff;}
}
</style>
