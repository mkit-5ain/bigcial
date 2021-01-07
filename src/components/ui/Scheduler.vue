<template>
  <div class="scheduler-widget">
    <!-- <button @click="removeEvent">삭제</button> -->
    <full-calendar ref="calendar" :event-sources="eventSources" :config="config" :events="events"></full-calendar>
    <div v-if="isForm" class="write-form">
      <form id="scheduler-form" @submit.prevent="create" accept-charset="utf-8">
        <div class="scheduler-files">
          <div v-for="(item, index) in this.selected.imageData" :key="index" class="file-box">
            <div class="file_left">
              <p class="image-box"><img :src="item.imageSrc" alt=""></p>
              <p class="text-box">
                <span>업로드</span>
                <span class="complete" :class="item.colorCode">{{ item.complete }}</span>
              </p>
            </div>
            <div class="file_right">
              <p>{{ item.date }}</p>
              <div v-if="item.complete !== '완료'" class="file_btn">
                <button type="button" @click="fileModify(item.id, index)"><img src="../../assets/images/icon/adjust_i.png" alt="수정" title="수정"></button>
                <button type="button" @click="fileDelete(item.id, index)"><img src="../../assets/images/icon/delete_i.png" alt="삭제" title="삭제"></button>
              </div>
            </div>
          </div>
        </div>
        <div class="btns">
          <button class="scheduler-btn" type="button" @click="close()">닫기</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    events: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    events (value) {
      this.$refs.calendar.$emit('refetch-events')
    }
  },
  data () {
    return {
      eventId: 0,
      isForm: false,
      config: {
        eventRender: (event, eventElement) => {
          this.renderMethod(event, eventElement)
        },
        eventClick: (event, jsEvent, view) => {
          this.clickMethod(event, jsEvent, view)
        },
        editable: false,
        defaultView: 'agendaWeek',
        nowIndicator: true,
        now: moment(new Date()),
        selectable: false,
        locale: 'ko',
        allDaySlot: false
      },
      selected: {},
      created: {}
    }
  },
  methods: {
    renderMethod (event, eventElement) {
      eventElement.find('div.fc-content')[0].classList.add('schedule-' + event.id)
      if (this.eventId !== event.id) {
        this.eventId = event.id
        if (event.imageData !== null) {
          let imageLength = event.imageData.length
          let imageHtml = ''
          for (let i = 0; i < imageLength; i++) {
            if (i <= 1) {
              imageHtml += "<span class='calendar_img'><img src='" + event.imageData[i].imageSrc + "'></span>"
            } else if (i === 2) {
              imageHtml += "<span class='text-more-count'>..." + (imageLength - 2) + '</span>'
            } else {
              break
            }
          }
          eventElement.find('div.fc-content').append(imageHtml)
        }
      }
      setTimeout(function () {
        let todayLine = document.getElementsByClassName('fc-now-indicator-arrow')
        let moveTop = todayLine[0].offsetTop
        window.scrollTo(0, moveTop)
      }, 500)
    },
    clickMethod (event, jsEvent, view) {
      let targetCheck = jsEvent.target.closest('.fc-content')
      if (targetCheck !== null) {
        let thisClass = jsEvent.target.closest('.fc-content').className.replace('fc-content', '')
        let findContents = document.getElementsByClassName(thisClass)
        let contentsEl = document.querySelectorAll('.fc-content')
        for (let i = 0; i < contentsEl.length; i++) {
          let contentsClass = contentsEl[i].className.replace('fc-content', '')
          if (contentsClass.indexOf('active') > -1) {
            contentsEl[i].classList.remove('active')
          }
        }
        for (let i = 0; i < findContents.length; i++) {
          findContents[i].classList.add('active')
        }
        this.selected = event
        this.selectedItem(this.selected)
      }
    },
    fileModify (id, index) {
      if (confirm('예약 게시글을 수정하시겠습니까?') === true) {
        this.$router.push({
          name: 'ReservationUploadModify',
          params: {id}
        })
      }
    },
    fileDelete (id, index) {
      if (confirm('예약 게시글을 삭제하시겠습니까?') === true) {
        let datas = this.events

        for (let i = 0; i < datas.length; i++) {
          if (datas[i].id === this.selected.id) {
            if (datas[i].imageData.length === 1) {
              this.$delete(datas, i)
              this.close()
              this.$refs.calendar.$emit('refetch-events')
            } else {
              this.$delete(this.selected.imageData, index)
              this.$refs.calendar.$emit('rerender-events')
            }
            this.$http.delete('/instagram/' + this.$store.state.account.id + '/media/reservation/' + id)
              .then(res => {
                alert('삭제가 완료되었습니다')
              })
              .catch(err => {
                console.log(err)
                alert('삭제를 실패했습니다')
              })
            break
          }
        }
      }
    },
    selectedItem (item) {
      this.open()
    },
    open () {
      this.isForm = true
    },
    close () {
      this.isForm = false
    }
  },
  computed: {
    eventSources () {
      const self = this
      return [
        {
          events (start, end, timezone, callback) {
            callback(self.events)
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$schedule-color01:#8c7fd9; // 완료
$schedule-color02:#65ba91; // 예정
.fc-day-grid{display:none;}
.scheduler-widget{position:relative;
  .write-form { position:fixed; transform:translate(-12%,-50%);  top:50%; left:50%; z-index:9999; min-width:420px; background-color:#fff; border:1px solid #000; border:2px solid #f2f1f1; padding:45px 20px;
    .scheduler-files{
      .file-box{width:100%; display:table; padding:7px 0px;
        .file_left{float:left;
          .text-box{display:inline-block; vertical-align:middle; font-size:15px; font-weight:bold; padding-left:10px; letter-spacing:-4px;
            span{letter-spacing:0px;
              &:last-child{padding-left:5px;}
            }
            .complete_class{color:$schedule-color01;}
            .schedule_class{color:$schedule-color02;}
          }
          .image-box{display:inline-block; vertical-align:middle;
            img{width:36px; height:36px;}
          }
        }
        .file_right{float:right; width:220px; margin:0 0 0 15px; padding:10px 0px;
          p { float:left; }
          .btn-box{
            button{
              &:last-child{padding-left:15px;}
            }
          }
          .file_btn { float:right; margin:0 0 0 10px;
            button { margin:0 0 0 5px;
              &:first-child { margin:0; }
            }
          }
        }
      }
    }
    .btns{text-align:center; border-top:2px solid #000; padding-top:30px;
      .scheduler-btn{width:82px; height:31px; line-height:31px; background:#000; border-radius:10px; color:#fff; font-size:12px; display:inline-block; vertical-align:middle;}
    }
  }
}
</style>
