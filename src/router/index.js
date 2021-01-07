import Vue from 'vue'
import Router from 'vue-router'
import Sign from '@/components/sign/Sign'
import SignFail from '@/components/sign/SignFail'
import SignIn from '@/components/sign/SignIn'
import SignUp from '@/components/sign/SignUp'
import SignWrap from '@/components/sign/SignWrap'
import SignUpComplete from '@/components/sign/SignUpComplete'
import SignActivationComplete from '@/components/sign/SignActivationComplete'
import EmailAuth from '@/components/sign/EmailAuth'
import ChangeInfo from '@/components/sign/ChangeInfo'
import ChangePassword from '@/components/sign/ChangePassword'
import ChangeAccount from '@/components/sign/ChangeAccount'
import MyInfo from '@/components/sign/MyInfo'
import FindPassword from '@/components/sign/FindPassword'
import FindPasswordComplete from '@/components/sign/FindPasswordComplete'
import UserManagement from '@/components/menu/UserManagement'
import Drawlots from '@/components/menu/Drawlots'
import DrawlotsDetail from '@/components/menu/DrawlotsDetail'
import Post from '@/components/menu/Post'
import Competitor from '@/components/menu/Competitor'
import Account from '@/components/menu/Account'
import PostDetail from '@/components/menu/PostDetail'
import SignInFacebook from '@/components/sign/SignInFacebook'
import Reservation from '@/components/menu/Reservation'
import ReservationUpload from '@/components/menu/ReservationUpload'
import ReservationScheduler from '@/components/menu/ReservationScheduler'
import Winnerlist from '@/components/ui/Winnerlist'
import Blacklist from '@/components/ui/Blacklist'
import Main from '@/components/Main'
import Admin from '@/components/admin/Admin'
import AdminUser from '@/components/admin/User'
import AdminAccount from '@/components/admin/Account'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
  // console.log(localStorage.getItem('local-access-token'))
  // console.log(from)
  // console.log(to)
  // console.log(next)
  var isAuthenticated = false
  if (localStorage.getItem('local-access-token') !== null) {
    isAuthenticated = true
  }
  if (isAuthenticated) return next()
  next('/signin?returnPath=' + from.name)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Sign'
      }
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign,
      children: [
        {
          path: '/signin_facebook',
          name: 'SignInFacebook',
          component: SignInFacebook
        },
        {
          path: '/signactivation',
          name: 'SignActivationComplete',
          component: SignActivationComplete
        },
        {
          path: '/email_auth',
          name: 'EmailAuth',
          component: EmailAuth
        },
        {
          path: '/signwrap',
          name: 'SignWrap',
          component: SignWrap,
          children: [
            {
              path: '/signup',
              name: 'SignUp',
              component: SignUp
            },
            {
              path: '/signin',
              name: 'SignIn',
              component: SignIn
            },
            {
              path: '/signup/complete',
              name: 'SignUpComplete',
              component: SignUpComplete
            },
            {
              path: '/find_password',
              name: 'FindPassword',
              component: FindPassword
            },
            {
              path: '/find_password/complete',
              name: 'FindPasswordComplete',
              component: FindPasswordComplete
            },
            {
              path: '/sign_fail',
              name: 'SignFail',
              component: SignFail
            }
          ]
        }
      ]
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      beforeEnter: requireAuth(),
      children: [
        {
          path: 'my_info',
          name: 'MyInfo',
          component: MyInfo,
          children: [
            {
              path: 'change_info',
              name: 'ChangeInfo',
              component: ChangeInfo
            },
            {
              path: 'change_password',
              name: 'ChangePassword',
              component: ChangePassword
            },
            {
              path: 'change_account',
              name: 'ChangeAccount',
              component: ChangeAccount
            }
          ]
        },
        {
          path: 'account',
          name: 'Account',
          component: Account
        },
        {
          path: 'user_management',
          name: 'UserManagement',
          component: UserManagement,
          children: [
            {
              path: 'winnerlist',
              name: 'Winnerlist',
              component: Winnerlist
            },
            {
              path: 'blacklist',
              name: 'Blacklist',
              component: Blacklist
            }
          ]
        },
        {
          path: 'drawlots',
          name: 'Drawlots',
          component: Drawlots
        },
        {
          path: 'drawlots/:id',
          name: 'DrawlotsDetail',
          component: DrawlotsDetail
        },
        {
          path: 'post',
          name: 'Post',
          component: Post
        },
        {
          path: 'competitor',
          name: 'Competitor',
          component: Competitor
        },
        {
          path: 'post/:id',
          name: 'PostDetail',
          component: PostDetail
        },
        {
          path: 'reservation',
          name: 'Reservation',
          component: Reservation,
          children: [
            {
              path: 'scheduler',
              name: 'ReservationScheduler',
              component: ReservationScheduler
            },
            {
              path: 'upload/:id',
              name: 'ReservationUploadModify',
              component: ReservationUpload
            },
            {
              path: 'upload',
              name: 'ReservationUpload',
              component: ReservationUpload
            }
          ]
        },
        {
          path: 'admin',
          name: 'Admin',
          component: Admin,
          children: [
            {
              path: 'user',
              name: 'AdminUser',
              component: AdminUser
            },
            {
              path: 'account',
              name: 'AdminAccount',
              component: AdminAccount
            }
          ]
        }
      ]
    }
  ]
})
