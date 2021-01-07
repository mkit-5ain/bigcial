<template>
  <div class="post_contents_wrap section_widget section_bottom">
    <div class="post_contents">
      <div class="contents_widget">
        <div class="post_img"></div>
        <div class="post_figure">
          <!-- 좋아요 -->
          <div class="post_like">
            <div class="present_figure">
              <p><img src="../../assets/images/icon/instar_i_01.jpg" alt=""></p>
              <div class="mean_figure">42424</div>
            </div>
          </div>
          <!-- 댓글 -->
          <div class="post_reply">
            <!-- 포스트 이미지-->
            <div class="present_figure">
              <p><img src="../../assets/images/icon/instar_i_02.jpg" alt=""></p>
              <div class="mean_figure">2</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 포스트 내용-->
      <div class="post_content contents_widget scroll">
        <div>
          <pre>Team Healcreek권지람 선수와 서연정 선수가 지난 6일에 열린 2018 교촌 허니 레이디스 오픈에 참가해 경기를 펼쳤습니다. 두 선수 모두 수고하셨습니다!
어떤 프로들보다도 스타일리쉬했던 이번 경기 속 팀힐크릭 선수들의 경기 필드 스타일을 함께 확인해보세요:)</pre>
        </div>
      </div>
      <!-- 포스트 댓글-->
      <div class="post_content_reply contents_widget">
        <div class="post_content_inner_reply scroll">
          <ul>
            <li>
              <template>
                <strong>healcreekgolf</strong>
                <span>#한예슬 #한예슬골프웨어 #골프 #골스타그램 #골프스타그램 #healcreek
#힐크릭 #골프웨어 #힐크릭러버 #골프패션 #골프선수 #골프웨어 #라운딩 #골퍼 #golf #golfer
#golfwear #좋아요 #맞팔 #선팔 #봄코디 #데일리룩 #운동 #운동스타그램
#데일리 #일상스타그램 #OOTD #좋아요반사  #권지람 #서연정</span>
                <transition name="modal">
                  <popup-blacklist/>
                </transition>
              </template>
            </li>
          </ul>
        </div>

      </div>
      <div class="post_info">댓글을 클릭하면 블랙리스트를 만들 수 있습니다.</div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@media all and (max-width: 1916px){
  .popularity_wrap{display:none!important;}
  .figure_inner_wrap{width:100%!important;}
}
.post_contents_wrap{
  .post_contents{width:100%; display:table; border-bottom:1px solid #e6e6e6;
    .contents_widget{float:left; width:390px; height:390px; margin-left:35px;
      .post_img{width:390px; height:390px;
        img{width:100%; height:100%;}
      }
      &:first-child{margin-left:0px;}
      pre{white-space: pre-wrap; font-family: "NanumBarunGothic";}
      .post_figure{overflow:hidden; height:56px; line-height:56px;
        .post_like{background:none; padding-right:0px;}
        .mean_figure{display:inline-block; vertical-align:middle; padding-left:12px; letter-spacing:0px;}
      }
    }
    .post_content {overflow-y:scroll; padding-right:60px;}
    .post_content_reply{position:relative;
      .post_content_inner_reply{overflow-y:scroll; height:390px; padding-right:60px;
        li{line-height:2;
          strong{cursor:pointer; padding-right:10px;}
        }
        .user_name{font-weight:bold; cursor:pointer;}
      }
    }
    .post_info{width:100%; text-align:right; clear:both; color:#b7b7b7; height:56px; line-height:56px;}
  }
}
</style>
