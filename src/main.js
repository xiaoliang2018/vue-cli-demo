import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import commonJs from './assets/js/common'
import './assets/js/rem';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'lib-flexible/flexible'
Vue.use(ElementUI, {
  size: 'small'
});
Vue.config.productionTip = false;
Vue.prototype.$commonJs = commonJs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
