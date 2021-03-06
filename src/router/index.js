import Vue from 'vue'
import Router from 'vue-router'
// 引进nprogress第三方包
import nprogress from 'nprogress'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',
    //   // @表示src目录，无论你当前文件在哪里，@都是src
    //   component: () => import('@/views/home')
    // },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      // name: 'layout',
      // name: 'layout', 由于它右默认子路由，所以它的名字没有意义，否则VUE发黄色警告
      path: '/',
      component: () => import('@/views/layout'),
      // 嵌套路由：所有children路由都显示到父路由的router-view中
      children: [
        {
          name: 'home',
          // 设置layout的默认子路由
          path: '',
          component: () => import('@/views/home')
        },
        // 发布文章
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        // 编辑文章
        {
          name: 'publish-edit',
          path: '/publish/:id',
          component: () => import('@/views/publish')
        },
        // 加载文章列表
        {
          name: 'article-list',
          path: '/article',
          component: () => import('@/views/article')
        },
        // 文章评论列表
        {
          name: 'article-comment',
          path: '/comment',
          component: () => import('@/views/comment')
        },
        // 账户设置
        {
          name: 'account-setting',
          path: '/account',
          component: () => import('@/views/account')
        },
        // 素材管理
        {
          name: 'image',
          path: '/image',
          component: () => import('@/views/images')
        },
        // 粉丝数据
        {
          name: 'fans-overflow',
          path: '/fans/overflow',
          component: () => import('@/views/fans')
        }
      ]
    }
  ]
})

// 所有路由导航都要经过这里
// to 去哪儿
// from 来自哪里
// next 允许通过的方法

router.beforeEach((to, from, next) => {
  // 进度条nprogress使用start方法
  nprogress.start()

  const userInfo = window.localStorage.getItem('user_info')

  // 如果是非 /login页面，判断其登陆状态
  if (to.path !== '/login') {
    // 如果没有登录，让其跳转到登录页面
    if (!userInfo) {
      next({ name: 'login' })
    } else {
      // 如果登陆了，这允许通过
      next()
    }
  } else {
    // 如果登录了，就不允许访问登录页了
    if (userInfo) {
      next(false)
    } else {
      // 没有登录，才允许访问登录页
      next()
    }
  }
})

// 路由导航完成的时候会进入这里
router.afterEach((to, from) => {
  nprogress.done()
})

export default router
