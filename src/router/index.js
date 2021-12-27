import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    // children: [
    //   {
    //     path: '/',
    //     name: 'home',
    //     component: () => import('@/views/Home/Home')
    //   },
    //   {
    //     path: '/mall',
    //     name: 'mall',
    //     component: () => import('@/views/Mall/Mall')
    //   },
    //   {
    //     path: '/user',
    //     name: 'user',
    //     component: () => import('@/views/Login/Login')
    //   }
    // ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



// import Vue from 'vue'
// import Router from 'vue-router'
// const originPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originPush.call(this, location).catch(err => err)
// }
// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'login',
//       component: () => import('@/views/Login/Login')
//     }
//   ]
// })

