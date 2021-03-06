import Vue from 'vue'
import Vuetify from 'vuetify'
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
Vue.use(Vuetify);

// Bus de comunicacion
export const bus = new Vue();

// Rutas
const router = new VueRouter({
  routes: Routes,
  mode: 'hash'
});

router.beforeEach(
  function (to, from, next) {
    // console.log(to)
    if (to.path !== "/login" && to.path !== "/register" && to.path !== "/inicio") {
      // Antes de cambiar a cualquier localizacion comprobamos si el usuario esta logueado
      if (localStorage.getItem('token') != null) {
        console.log("Hay token");
        next();
      } else {
        console.log("No hay token");
        console.log("Tiene la sesión iniciada. Redirigiendo al inicio de sesión");
        next({ path: '/login', replace: false });
      }
    } else {
      if (localStorage.getItem('token') !== null) {
        // El usuario esta autentificado. Le redirigimos
        console.log("Tiene la sesión iniciada. Redirigiendo");
        next({ path: "/playlists", replace: true });
      } else {
        // Permitimos el acceso sin token al registro o a iniciar sesion
        next();
      }
    }
  }
);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
