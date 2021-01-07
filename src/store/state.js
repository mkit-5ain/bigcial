export default {
  solutionAccount: {
    id: '',
    username: '',
    name: '',
    role: '',
    language: '',
    active: '',
    company: '',
    contact_number: '',
    valid: ''
  },

  fbAccount: {
    id: '',
    name: '',
    email: '',
    picture_url: '',
    fb_access_token: ''
  },

  account: {
    biography: '',
    followers_count: 0,
    follows_count: 0,
    id: '',
    ig_id: 0,
    media_count: 0,
    name: '',
    profile_picture_url: '',
    username: '',
    website: ''
  },

  accountBestMedia: {
    best_media: [],
    best_comments_avg: 0,
    best_like_avg: 0,
    diff_best_comments_avg: 0,
    diff_best_like_avg: 0
  },

  accountSummaryMedias: {
    media_count: 0,
    like_count: 0,
    comments_count: 0,
    saved: 0,
    best_media: {},
    medias: []
  },

  accountFollowerInsight: {
    rows: []
  },

  accountProfileViews: {
    rows: []
  },

  accountFollowerDemographics: {
    rows: []
  },

  accountBuzzContentInsight: {
    rows: []
  },

  accountMedias: {
    data: [],
    after: '',
    next: true
  }
}
