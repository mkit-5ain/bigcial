import axios from 'axios'
import Constant from '../constant'

export default {
  [Constant.CHANGE_ACCOUNT_BEST_MEDIA]: (store, payload) => {
    axios.get('/instagram/' + store.state.account.id + '/media/best', {
      params: {
        fb_access_token: localStorage.getItem('fb-access-token')
      }
    }).then(res => {
      const data = res.data.data
      store.commit(Constant.CHANGE_ACCOUNT_BEST_MEDIA, data)
    })
  },

  [Constant.CHANGE_ACCOUNT_SUMMARY_MEDIAS]: (store, payload) => {
    let params = {
      fb_access_token: localStorage.getItem('fb-access-token')
    }

    if (payload !== undefined) {
      params.since = payload.since
      params.until = payload.until
    }

    axios.get('/instagram/' + store.state.account.id + '/media/summary', {
      params: params
    }).then(res => {
      const data = res.data.data
      if (data === null) {
        console.log('해당기간에 게시물이 없습니다')
      } else {
        store.commit(Constant.CHANGE_ACCOUNT_SUMMARY_MEDIAS, data)
      }
    })
  },

  [Constant.CHANGE_ACCOUNT_FOLLOWER_INSIGHT]: (store, payload) => {
    axios.get('/instagram/' + store.state.account.id + '/followers', {
      params: {
        fb_access_token: localStorage.getItem('fb-access-token')
      }
    }).then(res => {
      const data = res.data.data
      store.commit(Constant.CHANGE_ACCOUNT_FOLLOWER_INSIGHT, data)
    })
  },

  [Constant.CHANGE_ACCOUNT_PROFILE_VIEWS]: (store, payload) => {
    axios.get('/instagram/' + store.state.account.id + '/profile_views', {
      params: {
        fb_access_token: localStorage.getItem('fb-access-token'),
        since: payload.date['since'],
        until: payload.date['until']
      }
    }).then(res => {
      const data = res.data.data
      const impressions = data[0]['values']
      const reach = data[1]['values']
      const profileViews = {
        'impressions': impressions,
        'reach': reach
      }

      store.commit(Constant.CHANGE_ACCOUNT_PROFILE_VIEWS, profileViews)
    })
  },

  [Constant.CHANGE_ACCOUNT_FOLLOWER_DEMOGRAPHICS]: (store, payload) => {
    axios.get('/instagram/' + store.state.account.id + '/demographics', {
      params: {
        fb_access_token: localStorage.getItem('fb-access-token')
      }
    }).then(res => {
      const data = res.data.data
      const audienceGenderAge = data[0]['values'][0]['value']
      store.commit(Constant.CHANGE_ACCOUNT_FOLLOWER_DEMOGRAPHICS, audienceGenderAge)
    })
  },

  [Constant.CHANGE_ACCOUNT_BUZZ_CONTENT_INSIGHT]: (store, payload) => {
    axios.get('/ig_buzz_content/' + store.state.account.id, {
      params: {
        since: '20180101',
        until: '20181231',
        fb_access_token: localStorage.getItem('fb-access-token')
      }
    }).then(res => {
      const data = res.data.data
      store.commit(Constant.CHANGE_ACCOUNT_BUZZ_CONTENT_INSIGHT, data)
    })
  },

  [Constant.ADD_ACCOUNT_MEDIAS]: (store, payload) => {
    if (payload.status === 'init') {
      // 초기 미디어 로드
      console.log('init medias')

      axios.get('/instagram/' + store.state.account.id + '/media', {
        params: {
          fb_access_token: localStorage.getItem('fb-access-token')
        }
      }).then(res => {
        console.log(payload.status)

        const data = {
          medias: res.data.data,
          status: payload.status,
          after: res.data.paging.cursors.after
        }
        store.commit(Constant.ADD_ACCOUNT_MEDIAS, data)

        // 다음 페이지가 없을 경우
        if (!res.data.paging.next) {
          store.state.accountMedias.next = false
        }
      })
    } else {
      // 추가 미디어 로드
      console.log('more medias')

      axios.get('/instagram/' + store.state.account.id + '/media', {
        params: {
          fb_access_token: localStorage.getItem('fb-access-token'),
          after: store.state.accountMedias.after
        }
      }).then(res => {
        const data = {
          medias: res.data.data,
          status: payload.status,
          after: res.data.paging.cursors.after
        }
        store.commit(Constant.ADD_ACCOUNT_MEDIAS, data)

        // 다음 페이지가 없을 경우
        if (!res.data.paging.next) {
          store.state.accountMedias.next = false
        }
      })
    }
  }
}
