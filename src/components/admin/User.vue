<template>
  <div class="admin_wrap">
    <div class="search_wrap">
      <div class="input_wrap">
        <div class="right_search"><input type="text" placeholder="유저명" v-model="searchText"></div>
      </div>
    </div>
    <div class="board_wrap">
      <div class="board_head">
        <ul>
          <li class="line-01">ID</li>
          <li class="line-02">유저명</li>
          <li class="line-03">이름</li>
          <li class="line-04">회사명</li>
          <li class="line-05">연락처</li>
          <li class="line-06">권한</li>
          <li class="line-07">이메일승인</li>
          <li class="line-08">유저승인</li>
        </ul>
      </div>
      <div class="board_body">
        <paginate name="users" :list="filterUsers" :per="5" class="board_inner_body">
          <li v-for="user in paginated('users')" :key="user.id">
            <div class="line-01">{{user.id}}</div>
            <div class="line-02">{{user.username}}</div>
            <div class="line-03">{{user.name}}</div>
            <div class="line-04">{{user.company}}</div>
            <div class="line-05">{{user.contact_number}}</div>
            <div class="line-06">{{user.role}}</div>
            <div class="line-07">
              <template v-if="user.active">
                <button class="button_true" @click="updateUser(user, 'active')">TRUE</button>
              </template>
              <template v-else>
                <button class="button_false" @click="updateUser(user, 'active')">FALSE</button>
              </template>
            </div>
            <div class="line-08">
              <template v-if="user.valid">
                <button class="button_true" @click="updateUser(user, 'valid')">TRUE</button>
              </template>
              <template v-else>
                <button class="button_false" @click="updateUser(user, 'valid')">FALSE</button>
              </template>
            </div>
          </li>
        </paginate>
        <paginate-links for="users" :limit="2" :show-step-links="true"></paginate-links>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AdminUser',
  components: {
  },
  computed: {
    filterUsers () {
      const re = new RegExp(this.searchText, 'i')
      let filteredUsers = this.users.filter(user => user.username.match(re))
      return filteredUsers
    }
  },
  created () {
    this.getUsers()
  },
  data () {
    return {
      paginate: ['users'],
      users: [],
      searchText: ''
    }
  },
  watch: {
  },
  methods: {
    getUsers () {
      this.$http.get('/users/', {
      }).then(res => {
        const data = res.data
        this.users = data.data
      })
    },
    updateUser (user, updateType) {
      let params = {}
      let msg = '수정 하시겠습니까?'
      if (updateType === 'valid') {
        msg = '유저승인을 변경 하시겠습니까?'
        params = {
          valid: !user.valid
        }
      } else if (updateType === 'active') {
        msg = '이메일 승인을 변경 하시겠습니까?'
        params = {
          active: !user.active
        }
      }
      let btnValue = confirm(msg)
      if (btnValue) {
        this.$http.put('/users/' + user.id, params
        ).then(res => {
          alert('수정 되었습니다.')
          this.getUsers()
        }).catch(err => {
          console.log(err)
          alert('수정이 실패했습니다.')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.admin_wrap{background:#fff;}

.board_wrap{margin-top:10px; border-width:2px;
  .change_btn{border:1px solid #8c7fd9; color:#8c7fd9;}
  .line-01{width:10%;}
  .line-02{width:20%;}
  .line-03{width:10%;}
  .line-04{width:10%; text-overflow: ellipsis; word-wrap: normal; overflow: hidden;}
  .line-05{width:20%;}
  .line-06{width:10%;}
  .line-07{width:10%;}
  .line-08{width:10%;}
  .board_head{
    ul{width:100%; display:table;
      li{display:inline-block; vertical-align:middle; border-top: 1px dotted #e4e4e4; border-bottom: 0px; border-width: 2px; text-align: center; color: #999; height: 63px; line-height:63px;}
    }
  }
  .board_body{padding-bottom:25px;
    .board_inner_body{
      li{width:100%; display:table;
        > div{height:62px; line-height:62px; display:inline-block; vertical-align:middle; border-top: 1px dotted #e4e4e4; border-bottom: 0px; border-width: 2px; text-align: center; color: #999;}
        &:last-child{border-bottom: 1px dotted #e4e4e4; border-width: 2px;}
      }
    }
  }
}

.search_wrap{margin-right:25px; overflow:hidden; margin-bottom:25px;
  .input_wrap{
    .left_switch{float:left;
      .switch { position: relative; display: inline-block; width: 60px; height: 34px;}
      .switch input {display:none;}
      .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #8c7fd9; -webkit-transition: .4s; transition: .4s; border-radius: 4px;}
      .slider:before { position: absolute; content: ""; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: white; -webkit-transition: .4s; transition: .4s; border-radius: 4px;}
      input:checked + .slider { background:#65ba91; border-radius: 4px;}
      input:checked + .slider:before {-webkit-transform: translateX(26px); -ms-transform: translateX(26px); transform: translateX(26px); border-radius: 4px;}
    }
    .right_search{float:right;
      input{width: 162px; height: 34px; border: 2px solid #ebebeb; border-radius: 4px; background: #fff; letter-spacing:-4px; display:inline-block; letter-spacing:0px; vertical-align:top; text-indent:14px; padding:0 5px;}
      button{width:24px; height:31px; display:inline-block; letter-spacing:0px; vertical-align:top;}
    }
  }
}
.button_true{color: #377BB5; border: 1px solid #377BB5;}
.button_false{color: #D75452; border: 1px solid #D75452;}
</style>
