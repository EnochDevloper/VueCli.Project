import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import list from '@/components/StudentList'
import notFound from '@/components/404'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/view/login/index'),
      meta: {
        title: "用户登录"
      }
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/test',
      name: 'list',
      component: list,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/vTest',
      name: 'vTest',
      component: () => import('@/view/vueTest/index'),
      meta: {
        title: "Vue基础功能"
        // requireAuth: true
      }
    },

    {
      path: '/draw',
      name: 'draw',
      component: () => import('@/view/vueTest/draw'),
      meta: {
        title: "抽屉打开测试"
        // requireAuth: true
      }
    },
    {
      path: '/rate',
      component: () => import('@/view/studnet/rate'),
      meta: {
        title: "测试数据"
        // requireAuth: true
      }
    },
    {
      path: '/crud',
      component: () => import('@/view/studnet/crud'),
      meta: {
        title: "测试表格Crud"
        // requireAuth: true
      }
    },
    {
      path: '/coreList',
      component: () => import('@/view/core/list'),
      meta: {
        title: "测试core"
        // requireAuth: true
      }
    },
    {
      path: '/index',
      component: () => import('@/view/studnet/stuList'),
      meta: {
        // requireAuth: true,
        title: "学生列表"
      }
    },

    {
      path: "/404",
      name: "notFound",
      component: notFound
    },
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404"
    }
  ]
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("token") == 'true') { // 判断本地是否存在token
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/'
      })
    }
  } else {
    if (sessionStorage.getItem("token") == 'true') {
      next();
    } else {
      next();
    }
  }
});

