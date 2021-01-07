<template>
  <div class="calendar_wrap">
    <!--좌측 레이아웃-->
    <div class="contents_left">
      <!--업로드 일정-->
      <div class="upload_calendar">
        <div class="upload_calendar_inner_wrap">
          <div class="calendar_title">업로드 일정</div>
          <div class="calendar">
            <div class="vue-calendar">
              <datetime v-model="datetime" type="datetime" :minute-step="10" placeholder="날짜 선택"></datetime>
            </div>
          </div>
        </div>
      </div>
      <!--이미지 업로드-->
      <div class="file_upload">
        <div><img :src="image" id="uploaded_img"></div>
        <input type="file" accept="image/*" id="uploaded_file" name="uploaded_file" @change="onFileChange()">
        <label for="uploaded_file" class="black_btn">파일 업로드</label>
        <div class="scheduler-box-prologue">
          <div class="hover"><img src="../../assets/images/icon/hashtag_i.jpg" alt=""></div>
          <div class="hover_view">
            <div class="hover_inner_view">
              <div>최대 8MB의 JPEG, PNG, BMP, 움직이지 않는 GIF 이미지만 업로드 가능합니다.</div>
            </div>
          </div>
        </div>
      </div>
      <!--내용-->
      <div class="file_text">
        <textarea class="noresize" v-model="caption" placeholder="내용을 입력해주세요" @dragover="dragOver()" @drop="dragDrop(caption)"></textarea>
      </div>
      <!--해시태그-->
      <div class="hashtag_wrap">
        <div class="hashtag_prologue">
          <ui-hash-tag/>
          <button class="black_btn" @click="allClick()">모두사용</button>
        </div>
        <div class="hashtag">
          <ul>
            <li draggable="true" v-for="(customHashTag, index) in customHashTags" :key="index" @dragstart="dragStart()" @click="dragClick()">#{{ customHashTag.ig_hashtag__name }}</li>
          </ul>
        </div>
      </div>
      <!--버튼-->
      <div class="btn_wrap">
        <button type="button" class="black_btn" @click="cancel()">취소</button>
        <button type="button" class="black_btn" @click="upload()">저장</button>
      </div>
    </div>
    <!--우측 레이아웃-->
    <div class="contents_right">
      <div class="contents_inner_wrap">
        <div class="insta_top">
          <div class="left"><img src="../../assets/images/icon/instar_camera.png" alt=""></div>
          <div class="center"><img src="../../assets/images/icon/instar_logo.png" alt=""></div>
          <div class="right"><img src="../../assets/images/icon/instar_arrow.png" alt=""></div>
        </div>
        <!--인스타그램 헤더-->
        <div class="insta_img">
          <img :src="image" id="preview_img">
        </div>
        <!--인스타그램 내용-->
        <div class="insta_contents">
          <div class="contents_option">
            <div class="left_option">
              <div><img src="../../assets/images/icon/instar_like.png" alt=""></div>
              <div><img src="../../assets/images/icon/instar_reply.png" alt=""></div>
              <div><img src="../../assets/images/icon/instar_arrow.png" alt=""></div>
            </div>
            <div class="right_option"><img src="../../assets/images/icon/instar_favorite.png" alt=""></div>
          </div>
          <textarea class="contents" v-text="caption"></textarea>
        </div>
        <!--인스타그램 푸터-->
        <div class="insta_option">
          <ul>
            <li><img src="../../assets/images/icon/instar_home.png" alt=""></li>
            <li><img src="../../assets/images/icon/instar_reply.png" alt=""></li>
            <li><img src="../../assets/images/icon/instar_add.png" alt=""></li>
            <li><img src="../../assets/images/icon/instar_like.png" alt=""></li>
            <li><img src="../../assets/images/icon/instar_bullet.png" alt=""></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HashTag from '@/components/ui/reservation/HashTag'
import Draggable from 'Vuedraggable'
import MiniCalendar from '@/components/ui/reservation/MiniCalendar'

export default {
  name: 'ReservationUpload',
  components: {
    'ui-hash-tag': HashTag,
    'ui-mini-calendar': MiniCalendar,
    Draggable
  },
  created () {
    this.callIgAccountPermissionAPI()
    this.$eventBus.$once('IgAccountChanged', this.replaceRoute)
  },
  data () {
    return {
      permission: null,
      customHashTags: [],
      image: require('../../assets/images/common/upload_example.png'),
      caption: '',
      dragText: '',
      datetime: new Date().toString()
    }
  },
  watch: {
    datetime (selectedDatetime) {
      let currentDatetime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm')
      let reservationDatetime = this.$moment(selectedDatetime).format('YYYY-MM-DD HH:mm')

      if (currentDatetime > reservationDatetime) {
        this.datetime = '날짜 선택'
        alert('예약 업로드는 현재 시간 이후에만 가능합니다.')
      }
    }
  },
  methods: {
    replaceRoute () {
      if (this.$route.name === this.$options.name) {
        this.$router.replace({name: 'ReservationScheduler'})
      }
    },
    callIgAccountPermissionAPI () {
      this.$http.get('/instagram/' + this.$store.state.account.id + '/page_perms', {
        params: {
          fb_access_token: localStorage.getItem('fb-access-token')
        }
      }).then(res => {
        const data = res.data.data
        this.permission = data['permission']
        if (this.permission === 'PAGE_ADMIN' || this.permission === 'PAGE_EDITOR') {
          if (this.$route.params.id !== undefined) {
            this.callIgAccountReservedMediaAPI()
          }
          this.callIgAccountCustomHashtagAPI()
        } else {
          alert('게시물 생성 권한이 없습니다')
          this.$router.go(-1)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    callIgAccountReservedMediaAPI () {
      this.$http.get('/instagram/' + this.$store.state.account.id + '/media/reservation/' + this.$route.params.id)
        .then(res => {
          const data = res.data.data
          this.image = data.image_url
          this.caption = data.caption
          this.datetime = data.reserved_at
        })
    },
    callIgAccountCustomHashtagAPI () {
      this.$http.get('/ig_account_hashtag/custom', {
        params: {
          instagram_business_account_id: this.$store.state.account.id
        }
      }).then(res => {
        const data = res.data.data
        this.customHashTags = data
      }).catch(err => {
        console.log(err)
      })
    },
    dragStart () {
      this.dragText = event.srcElement.childNodes[0].data.replace('#', '')
    },
    dragOver () {
      event.preventDefault()
    },
    dragDrop (fileValue) {
      if ((this.caption + ' ').indexOf('#' + this.dragText + ' ') > -1) {
        // pass
        alert('이미 사용한 해시태그 입니다.')
      } else {
        this.caption = fileValue + '#' + this.dragText + ' '
      }
    },
    dragClick () {
      if ((this.caption + ' ').indexOf(event.srcElement.childNodes[0].data + ' ') > -1) {
        // pass
        alert('이미 사용한 해시태그 입니다.')
      } else {
        this.dragText = event.srcElement.childNodes[0].data + ' '
        this.caption = this.caption + this.dragText
      }
    },
    allClick () {
      for (let i = 0; i < this.customHashTags.length; i++) {
        if ((this.caption + ' ').indexOf('#' + this.customHashTags[i]['ig_hashtag__name'] + ' ') > -1) {
          // PASS 기존에 등록된 해시태그는 제외
        } else {
          this.caption += ('#' + this.customHashTags[i]['ig_hashtag__name'] + ' ')
        }
      }
    },
    onFileChange () {
      this.image = event.target.files[0]

      const reader = new FileReader()
      reader.onload = function () {
        document.getElementById('uploaded_img').src = reader.result
        document.getElementById('preview_img').src = reader.result
      }
      reader.readAsDataURL(event.target.files[0])
    },
    cancel () {
      if (confirm('작성을 취소하시겠습니까? 확인을 누르면 현재 작성중인 내용이 삭제됩니다.') === true) {
        this.$router.push({'name': 'ReservationScheduler'})
      }
    },
    upload () {
      if (this.datetime === '') {
        alert('업로드 일정을 선택해 주세요.')
      } else if (typeof this.image === 'string') {
        alert('업로드된 파일이 없습니다.')
      } else if (this.permission === 'PAGE_ADMIN' || this.permission === 'PAGE_EDITOR') {
        if (confirm(this.$store.state.account.username + ' 계정으로 게시물 업로드 예약을 합니다.') === true) {
          let formData = new FormData()

          if (typeof this.image !== 'string') {
            formData.append('image_url', this.image)
          }
          formData.append('fb_access_token', localStorage.getItem('fb-access-token'))
          formData.append('fb_user', this.$store.state.fbAccount.id)
          formData.append('caption', this.caption)
          formData.append('reserved_at', this.$moment(this.datetime).format('YYYY-MM-DD HH:mm'))
          formData.append('user', this.$store.state.solutionAccount.id)

          if (this.$route.params.id === undefined) {
            this.$http.post('/instagram/' + this.$store.state.account.id + '/media/reservation', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': localStorage.getItem('local-access-token')
              }
            }).then(res => {
              const data = res.data
              if (data.success === 'YES') {
                alert(this.$moment(this.datetime).format('YYYY-MM-DD A hh:mm') + '에 게시물 업로드 예약되었습니다.')
              } else {
                throw data.msg
              }
              this.$router.push({name: 'ReservationScheduler'})
            }).catch(err => {
              console.log(err)
              alert('게시물 업로드 예약을 실패했습니다.')
            })
          } else {
            this.$http.put('/instagram/' + this.$store.state.account.id + '/media/reservation/' + this.$route.params.id, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': localStorage.getItem('local-access-token')
              }
            }).then(res => {
              console.log(res)
              alert(this.$moment(this.datetime).format('YYYY-MM-DD A hh:mm') + '에 게시물 업로드 예약되었습니다.')
              this.$router.push({name: 'ReservationScheduler'})
            }).catch(err => {
              console.log(err)
              alert('게시물 업로드 예약을 실패했습니다.')
            })
          }
        }
      } else {
        alert('게시물 생성 권한이 없습니다')
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#container_inner_wrap{
  .calendar_wrap{width:100%; display:table;
    .contents_left{width:45%; float:left; padding:20px; background:#fff; border-radius:10px;
      .file_upload{letter-spacing:-4px; padding-bottom:25px;
        div,button{display:inline-block; vertical-align:middle; letter-spacing:0px;}
        .black_btn{width:102px; height:37px; line-height:37px; font-size:15px; margin:0px 20px; letter-spacing:0px; display: inline-block; text-align: center; cursor: pointer;}
        img{width:71px; height:71px; border:2px solid #f5f5f5;}
        input{position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip:rect(0,0,0,0); border: 0;}
        .scheduler-box-prologue{display:inline-block; vertical-align:middle; letter-spacing:0px; position:relative;
          .hover{cursor:pointer;
            img{width:auto; height:auto; border:0px;}
            &:hover{
              & + .hover_view{display:block;}
            }
          }
          .hover_view{display:none; width:258px; position:absolute; top:-100px; left:5px; z-index:1; background:url(../../assets/images/icon/view_bg.png) left 70px no-repeat; color:#fff; font-size:12px; padding-bottom:15px;
            .hover_inner_view{background:#464160; padding:14px;}
          }
        }
      }
      .file_text{width: 100%; border-bottom: 1px dotted #e9e9e9; border-width: 2px; padding: 20px 0px; border-top: 1px dotted #e9e9e9;
        textarea{width:100%; height:154px; border: 1px solid #e9e9e9; padding: 10px;}
      }
      .hashtag_wrap{border-bottom: 1px dotted #e9e9e9; border-width: 2px; padding-bottom: 20px;
        .hashtag_prologue{width:100%; display:table; padding-top:24px;}
        .hashtag{padding-top:24px;
          ul{
            li{display:inline-block; vertical-align:middle; color:#6c6c6c; font-size:15px; padding:2px 7px 2px 0px; cursor:pointer;}
          }
          input{display: none; opacity: 0; filter: alpha(opacity=0); width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;}
            label:focus{background:red;}
        }
        .black_btn{width:90px; height:24px; line-height:24px; float:right; background:#000 url(../../assets/images/icon/hashtag_up.png) 10px center no-repeat; padding-left:15px;}
      }
      .btn_wrap{text-align:center; margin-top:25px;
        button{width: 102px; height: 37px; line-height: 37px; font-size:15px;}
      }
      .upload_calendar{margin:25px 0px;
        .upload_calendar_inner_wrap{
          .calendar_title{background:url(../../assets/images/icon/reservation_icon.png) 0 0 no-repeat; height: 27px; line-height: 27px; padding-left: 46px; font-weight: bold; display: inline-block; vertical-align: middle; margin-right: 20px;}
          .calendar{border:2px solid #000; display: inline-block; vertical-align: middle; float: none; border-radius:10px;}
        }
      }
    }
    .contents_right{width:45%; float:right; background:#f2f1f1; border-radius:20px;
      .contents_inner_wrap{padding:38px 20px; border-radius:10px; background:#fff;
        .insta_top{background:#fafafa; height:50px; position:relative;
          .left{position:absolute; top:14px; left:12px; z-index:10;}
          .center{padding-top:10px;}
          .right{position:absolute; top:14px; right:12px; z-index:10;}
        }
        .insta_img{
          img{width:100%;}
        }
        .insta_contents{width:100%; display:table; background:#fff; padding:20px 15px;
          .contents{width:100%; height:149px; overflow-y:scroll; margin:10px 0px; resize:none;}
          .contents_option{width:100%; display:table;}
          .left_option{float:left;
            div{float:left; padding-right:10px;
              &:last-child{padding-right:0px;}
            }
          }
          .right_option{float:right;}
        }
        .insta_option{background:#fafafa; padding:10px 0px;
          ul{width:100%; display:table;
            li{display:table-cell;}
          }
        }
      }
    }
  }
}
</style>
