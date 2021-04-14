import Vue from 'vue';
import App from './App.vue';
import '../lib/sum-comp.css';
import './assets/normalize.css';
import './assets/iconfont/iconfont.css';
import 'ant-design-vue/dist/antd.css';
import './plugins/utils';
import './plugins/table';
import router from './router';
// import SumComp from '../lib/sum-comp.umd.min';
// console.log(`SumComp`, SumComp);
// Vue.use(SumComp);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
