<template>
  <div class="reservation_wrap">
    <div class="scheduler-btn-box">
      <div class="scheduler-box-inner">
        <div class="scheduler-box-prologue">
          <div class="hover"><img src="../../assets/images/icon/hashtag_i.jpg" alt=""></div>
          <div class="hover_view">
            <div class="hover_inner_view">
              <div>업로드는 광고가 아닌 일반게시물만 가능하며,<br/>현재는 싱글이미지 형태만 지원합니다.</div>
            </div>
          </div>
        </div>
        <div class="scheduler-create-btn"><router-link class="black_btn" v-bind:to="{ name: 'ReservationUpload' }">신규생성</router-link></div>
      </div>
    </div>
    <div class="reservation section_widget">
      <ui-scheduler :events="reservedMediaList"></ui-scheduler>
    </div>
  </div>
</template>

<script>
import Scheduler from '@/components/ui/reservation/Scheduler'

export default {
  components: {
    'ui-scheduler': Scheduler
  },
  created () {
    this.$http.get('/instagram/' + this.$store.state.account.id + '/media/reservation', {
      params: {
        fb_access_token: localStorage.getItem('fb-access-token')
      }
    }).then(res => {
      const data = res.data.data
      data.forEach(reservedMedia => {
        let isUnique = true

        this.reservedMediaList.forEach(media => {
          if (media.id === this.$moment(reservedMedia.reserved_at).format('YYYY-MM-DD-HH:00')) {
            media.imageData.push({
              id: reservedMedia.id,
              imageSrc: reservedMedia.image_url,
              complete: reservedMedia.is_published ? '완료' : '예정',
              colorCode: reservedMedia.is_published ? 'complete_class' : 'schedule_class',
              date: this.$moment(reservedMedia.reserved_at).format('YYYY-MM-DD HH:mm')
            })
            isUnique = false
          }
        })

        if (isUnique) {
          this.reservedMediaList.push({
            id: this.$moment(reservedMedia.reserved_at).format('YYYY-MM-DD-HH:00').toString(),
            start: this.$moment(reservedMedia.reserved_at).format('YYYY-MM-DD HH:00'),
            end: this.$moment(reservedMedia.reserved_at).add(1, 'hours').format('YYYY-MM-DD HH:00'),
            imageData: [{
              id: reservedMedia.id,
              imageSrc: reservedMedia.image_url,
              complete: reservedMedia.is_published ? '완료' : '예정',
              colorCode: reservedMedia.is_published ? 'complete_class' : 'schedule_class',
              date: this.$moment(reservedMedia.reserved_at).format('YYYY-MM-DD HH:mm')
            }]
          })
        }
      })
    })
  },
  data () {
    return {
      reservedMediaList: []
    }
  }
}
</script>

<style lang="scss" scoped>
#container_inner_wrap{
  .reservation{position:relative;}
  .reservation_prologue{
    p{
      &:first-child{float:left;}
      &:last-child{float:right; padding:5px 0px; color:#6c6c6c;}
    }
  }
  .scheduler-btn-box { position:relative; background:#f2f1f1; margin-bottom:20px; float:right; letter-spacing:-5px;
    .scheduler-box-prologue{display:inline-block; vertical-align:middle; letter-spacing:0px;
      .hover{cursor:pointer;
        &:hover{
          & + .hover_view{display:block;}
        }
      }
      .hover_view{display:none; width:258px; position:absolute; top:-60px; right:118px; z-index:1; background:url(../../assets/images/icon/block_btn.png) right 56px no-repeat; color:#fff; font-size:12px; padding-bottom:15px;
        .hover_inner_view{background:#464160; padding:14px;}
      }
    }
    .scheduler-create-btn{display:inline-block; vertical-align:middle; letter-spacing:0px; margin-left:10px;}
    a { float:right; display:block; text-align:center; width: 102px; height: 37px; line-height: 37px; font-size: 15px; }
  }
  .scheduler-box-inner{}
}
</style>
