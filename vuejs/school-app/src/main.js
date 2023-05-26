import Vue from 'vue'
import App from './App.vue';
import VueMeta from 'vue-meta';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import VueSession from "vue-session";

Vue.use(VueSession);
Vue.use(VueMeta);
Vue.use(axios, VueAxios)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: require('./components/MainHomeComp.vue').default,
  },
  {
    path: '/admin',
    component: require('./components/MainAdminComp.vue').default,
  }, 
  {
    path: '/admin_login',
    component: require('./components/MainAdminLoginComp.vue').default,
  },
  {
    path: '/acc-student',
    component: require('./components/MainAcceptStudentComp.vue').default,
  }
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')

