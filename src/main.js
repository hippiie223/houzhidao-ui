import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/fonts/iconfont.css';

import VueVideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css'
import 'video.js/dist/lang/zh-CN'

Vue.use(ElementUI);
Vue.use(VueVideoPlayer);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
