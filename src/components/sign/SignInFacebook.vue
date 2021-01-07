<template>
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="form-wrap">
        <p class="section_title">페이스북 계정 연결</p>
        <p class="prologue">빅셜을 사용하기 위해 페이스북 계정을 연동합니다.<br/>페이스북 로그인 후 앱 권한 요청을 확인해 주세요.</p>
        <p class="warning_prologue">* 반드시 인스타그램 계정과 연결된 페이스북 계정으로 연결해 주세요.</p>
        <button class='btn btn-success' @click='fbLogin()'><img src="../../assets/images/sign/facebook_i.png" alt=""></button>
        <button class="close_btn" @click=cancel()>로그인 취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Constant from '../../constant'

/* eslint-disable */
export default {
  created () {
    this.fbInit()
  },
  methods: {
    fbInit () {
      const self = this
      window.fbAsyncInit = function() {
        FB.init({
          appId: '1456607077970548', // 앱 아이디
          cookie: true,              // 쿠키가 세션을 참조할 수 있도록 허용
          xfbml: true,               // 소셜 플러그인 처리
          version: 'v2.12'           // 그래프 API 버전
        });
        // FB.getLoginStatus(function(response) {
        //   self.statusChangeCallback(response)
        // })
      };
      // SDK를 비동기적으로 호출
      (function(d, s, id){
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return}
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
    },
    fbLogin () {
      const self = this
      FB.login(function(response) {
        self.statusChangeCallback(response)
      }, {
        scope: 'public_profile, email, manage_pages, instagram_basic, instagram_manage_insights, instagram_manage_comments, instagram_content_publish, business_management'
      })
    },
    statusChangeCallback (response) {
      if (response.status === 'connected') {
        // 페이스북 로그인 됨
        this.setFbAccount(response.authResponse.accessToken);
      } else if (response.status === 'not_authorized') {
        // 페이스북 로그인은 했으나, 앱에는 로그인 되어있지 않은 경우
        alert('Please log into this app')
      } else {
        // 페이스북 로그인이 되어있지 않음
        alert('Please log into this Facebook')
      }
    },
    setFbAccount (accessToken) {
      const self = this
      FB.api('/me?fields=id,name,cover,first_name,last_name,age_range,link,gender,locale,picture,timezone,updated_time,verified,email', function(res) {
        // TODO cover undefined 또는 invalid string 체크 (필요없음삭제)
        axios.post('/fb_users/fb_signin', {
          fb_id: res.id,
          name: res.name,
          // cover: res.cover,
          first_name: res.first_name,
          last_name: res.last_name,
          age_range: JSON.stringify(res.age_range),
          link: res.link,
          gender: res.gender,
          locale: res.locale,
          picture_url: res.picture.data.url,
          timezone: res.timezone,
          updated_time: res.updated_time,
          verified: res.verified,
          email: res.email,
          fb_access_token: accessToken
        })
        .then(res => {
          const data = res.data.data
          let success = res.data.success
          if (success === 'YES') {
            localStorage.setItem('fb-access-token', data.fb_access_token)
            self.$store.commit(Constant.SET_FB_ACCOUNT, data)
            self.$router.push({name: 'Main'})
          } else {
            alert(response.msg)
          }
        })
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.right_wrap{width:550px; height:100%; float:left; position:relative;
  .right_inner_wrap{position:absolute; width:100%; top:50%; left:50%; transform:translate(-50%,-50%);
    .form-wrap{text-align:center;
      .section_title{margin-bottom:35px!important;}
      .prologue{color:#000; font-size:14px; text-align:center; line-height:1.4;}
      .form_style{margin-top:41px!important;}
      .close_btn{font-size:12px; color:#000; text-decoration:underline; font-weight:bold; margin-top:18px;}
      .warning_prologue{color:#8c7fd9; font-size:12px; margin-top:38px; margin-bottom:58px;}
      .btn-success{font-size:12px; margin-top:0px;}
    }
  }
}
</style>
