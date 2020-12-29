import 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import swiper, { Autoplay } from 'swiper'
import 'swiper/swiper-bundle.css'
import animated from 'animate.css'

import App from './App.vue'
import router from './router'
import store from './store'
import './bus'
import currency from './filters/currency'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW
  } // 這是為了讓使用者離開該欄位時觸發驗證
})
Vue.use(VueAwesomeSwiper)
swiper.use([Autoplay])
Vue.use(animated)
Vue.component('Loading', Loading)
Vue.filter('currency', currency)
new Vue({
  i18n,
  created () {
    AOS.init({
      duration: 2500,
      once: true
    })
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(res => {
      if (res.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
}
)
