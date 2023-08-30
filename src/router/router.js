export const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),

    children: [
      {
        path: 'home',
        //path别名
        alias: '',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'attention',
        name: 'Attention',
        component: () => import('../views/Attention.vue')
      },
      {
        path: 'news',
        name: 'News',
        component: () => import('../views/News.vue')
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue')
      }
    ]
  },
  {
    path: '/videoplayer/:itemId/:actorId',
    name: 'VideoPlayer',
    component: () => import('../views/VideoPlayer.vue')
  },
  {
    path: '/classification',
    name: 'ClassiFication',
    component: () => import('../views/ClassiFication.vue')
  },
  {
    path: '/live/:roomId/:actorId',
    name: 'Live',
    component: () => import('../views/Live.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/detail/:itemId',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/search/:q',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/shoppingcart',
    name: 'ShoppingCart',
    component: () => import('../views/ShoppingCart.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/Pay.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/orderall',
    name: 'OrderAll',
    component: () => import('../views/OrderAll.vue')
  }
]
