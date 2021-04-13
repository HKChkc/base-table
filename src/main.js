import Vue from 'vue';
import App from './App.vue';
import './assets/normalize.css';
import './assets/iconfont/iconfont.css';
import 'ant-design-vue/dist/antd.css';
import './plugins/utils';
import './plugins/table';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
