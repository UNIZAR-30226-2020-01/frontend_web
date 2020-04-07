import Vue from 'vue'
import App from './App.vue'
// Peticiones HTTP
import VueResource from 'vue-resource'
// Routes
import VueRouter from 'vue-router'
// Rutas personalizadas
import Routes from './routes'

// Recursos globales
Vue.use(VueResource);
Vue.use(VueRouter);

// Rutas
const router = new VueRouter({
  routes: Routes,
  mode: 'hash'
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
