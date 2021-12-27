import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    currentMenu: null,
    menu: [],
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  },
  mutations: {
    setMenu(state, val) {
      //vuex添加
      state.menu = val
      //cookie也添加
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      //清除也一样 vuex和cookie都清除
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      //取出cookie数据 给vuex
      let menu = JSON.parse(Cookie.get('menu'))
      console.log(menu);
      state.menu = menu
      // console.log(menu);
      //添加动态路由 主路由为Main.vue
      let currentMenu = [
        {
          path: '/',
          component: () => import(`@/views/Main`),
          name: 'main',
          children: []
        }
      ]
      //如果是一级菜单 那么菜单名称肯定有路由 如果是二级菜单那么一级没有 二级有路由
      console.log(menu);
      let menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          menuArray.push(item)
        }
      })
      // console.log(currentMenu);
      //添加动态路由
      console.log(menuArray);
      // router.addRoute('main', menuArray)

      menuArray.forEach(item => {
        router.addRoute('Main', item)
      })
      console.log(router.getRoutes());
    },
    //选择标签 选择面包屑
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabsList.push(val) : ''
        Cookie.set('tagList', JSON.stringify(state.tabsList))
      } else {
        state.currentMenu = null
      }
      // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
    },
    //获取标签
    getMenu(state) {
      if (Cookie.get('tagList')) {
        let tagList = JSON.parse(Cookie.get('tagList'))
        state.tabsList = tagList
      }
    },
    //关闭标签
    closeTag(state, val) {
      let result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
      Cookie.set('tagList', JSON.stringify(state.tabsList))
    },
    //左侧栏是否水平展开
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
