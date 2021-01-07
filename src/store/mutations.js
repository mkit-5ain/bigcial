import Constant from '../constant'

export default {
  [Constant.SET_SOLUTION_ACCOUNT]: (state, payload) => {
    state.solutionAccount.id = payload.id
    state.solutionAccount.username = payload.username
    state.solutionAccount.email = payload.email
    state.solutionAccount.name = payload.name
    state.solutionAccount.role = payload.role
    state.solutionAccount.language = payload.language
    state.solutionAccount.active = payload.active
    state.solutionAccount.company = payload.company
    state.solutionAccount.contact_number = payload.contact_number
    state.solutionAccount.valid = payload.valid
  },

  [Constant.SET_FB_ACCOUNT]: (state, payload) => {
    state.fbAccount.id = payload.id
    state.fbAccount.name = payload.name
    state.fbAccount.email = payload.email
    state.fbAccount.picture_url = payload.picture_url
    state.fbAccount.fb_access_token = payload.fb_access_token
  },

  [Constant.CHANGE_ACCOUNT]: (state, payload) => {
    localStorage.setItem('account_id', payload.id)

    state.account.biography = payload.biography
    state.account.followers_count = payload.followers_count
    state.account.follows_count = payload.follows_count
    state.account.id = payload.id
    state.account.ig_id = payload.ig_id
    state.account.media_count = payload.media_count
    state.account.name = payload.name
    state.account.profile_picture_url = payload.profile_picture_url
    state.account.username = payload.username
    state.account.website = payload.website
  },

  [Constant.CHANGE_ACCOUNT_BEST_MEDIA]: (state, payload) => {
    state.accountBestMedia.best_media = payload.best_media === undefined ? [] : payload.best_media.slice()
    state.accountBestMedia.best_comments_avg = payload.best_comments_avg
    state.accountBestMedia.best_like_avg = payload.best_like_avg
    state.accountBestMedia.diff_best_comments_avg = payload.diff_best_comments_avg
    state.accountBestMedia.diff_best_like_avg = payload.diff_best_like_avg
  },

  [Constant.CHANGE_ACCOUNT_SUMMARY_MEDIAS]: (state, payload) => {
    state.accountSummaryMedias.media_count = payload.media_count
    state.accountSummaryMedias.like_count = payload.like_count
    state.accountSummaryMedias.comments_count = payload.comments_count
    state.accountSummaryMedias.saved = payload.saved
    state.accountSummaryMedias.best_media = payload.best_media
    state.accountSummaryMedias.medias = payload.medias.slice()
  },

  [Constant.CHANGE_ACCOUNT_FOLLOWER_INSIGHT]: (state, payload) => {
    state.accountFollowerInsight.rows = payload.slice()
  },

  [Constant.CHANGE_ACCOUNT_PROFILE_VIEWS]: (state, payload) => {
    const impressions = payload['impressions']
    const reach = payload['reach']
    state.accountProfileViews.rows = []

    // console.log(impressions.length)
    for (let i = 0; i < impressions.length; i++) {
      // console.log(impressions[i]['value'], reach[i]['value'])
      state.accountProfileViews.rows.push([impressions[i]['end_time'].substring(0, 10), impressions[i]['value'], reach[i]['value']])
    }
  },

  [Constant.CHANGE_ACCOUNT_FOLLOWER_DEMOGRAPHICS]: (state, payload) => {
    state.accountFollowerDemographics.rows = [
      ['13-17', payload['F.13-17'] * -1, payload['F.13-17'], payload['M.13-17'], payload['M.13-17']],
      ['18-24', payload['F.18-24'] * -1, payload['F.18-24'], payload['M.18-24'], payload['M.18-24']],
      ['25-34', payload['F.25-34'] * -1, payload['F.25-34'], payload['M.25-34'], payload['M.25-34']],
      ['35-44', payload['F.35-44'] * -1, payload['F.35-44'], payload['M.35-44'], payload['M.35-44']],
      ['45-54', payload['F.45-54'] * -1, payload['F.45-54'], payload['M.45-54'], payload['M.45-54']],
      ['55-64', payload['F.55-64'] * -1, payload['F.55-64'], payload['M.55-64'], payload['M.55-64']],
      ['65+', payload['F.65+'] * -1, payload['F.65+'], payload['M.65+'], payload['M.65+']]
    ]
  },

  [Constant.CHANGE_ACCOUNT_BUZZ_CONTENT_INSIGHT]: (state, payload) => {
    state.accountBuzzContentInsight.rows = []

    payload.forEach(buzzContentInsight => {
      state.accountBuzzContentInsight.rows.push([
        buzzContentInsight['insight_date'],
        buzzContentInsight['tag_media_count'],
        buzzContentInsight['mentioned_media_count'],
        buzzContentInsight['mentioned_comment_count']
      ])
    })
  },

  [Constant.ADD_ACCOUNT_MEDIAS]: (state, payload) => {
    if (payload.status === 'init') {
      state.accountMedias.data = payload.medias.slice()
      state.accountMedias.next = true
    } else {
      state.accountMedias.data = state.accountMedias.data.concat(payload.medias).slice()
    }
    state.accountMedias.after = payload.after
  }
}
