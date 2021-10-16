import {routerMenu} from 'libcolla'

export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: false,
      search: '',
      tab: null,
      tabs: [],
      cachedViews: ['basecode'],
      apps: routerMenu.menu,
      bgNo: 1
    }
  },
  methods: {
    changeBackground() {
      let count = 12
      if (this.bgNo === count) {
        this.bgNo = 1
      } else {
        this.bgNo++
      }
    },
    setTabSelected(tab, status) {
      let name = tab.name
      let index = -1
      for (let i = 0; i < this.tabs.length; i++) {
        let t = this.tabs[i]
        if (t.name === name) {
          index = i
        }
      }
      if (status === true) {
        if (index <= -1) {
          this.tabs.push(tab)
        }
        this.tab = name
      } else {
        if (index > -1) {
          this.tabs.splice(index, 1)
        }
      }
    },
    openFunction(menu) {
      let name = menu.name
      let tab = {name: name, icon: 'mail', label: menu.label}
      this.setTabSelected(tab, true)
      this.$router.push(menu.path)
    }
  },
  computed: {
    layoutStyle() {
      let name = (this.$q.dark.isActive ? 'wd-' : 'wl-') + this.bgNo
      return 'background:url("/login-bg-' + name + '.jpg") no-repeat center; background-size: cover;'
    }
  },
  created() {
  }
}
