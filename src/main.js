import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import locale from 'element-ui/lib/locale/lang/vi'

Vue.use(ElementUI);
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false

new Vue({
  router,
  store,
  locale,
  render: h => h(App)
}).$mount('#app')
