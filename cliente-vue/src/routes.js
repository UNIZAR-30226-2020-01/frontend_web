// Para definir las rutas
// Import de los componentes
// import Login from './components/login.vue';
import Albums from './components/albums.vue';
import Artists from './components/artists.vue';
import SingleArtist from './components/singleArtists.vue';

// Exportamos el objeto de rutas
export default [
  // Cada objeto es una ruta
  // {
  //   path: '/',
  //   component: Home
  // }
  // {
  //   path: '/login',
  //   component: Login
  // },
  {
    path: '/albums',
    component: Albums
  },
  {
    path: '/artists',
    component: Artists
  },
  {
    path: '/artists/:id',
    component: SingleArtist
  }
]
