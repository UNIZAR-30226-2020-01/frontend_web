// Para definir las rutas
// Import de los componentes
import Register from './components/register.vue';
import Login from './components/login.vue';
import Albums from './components/albums.vue';
import Artists from './components/artists.vue';
import SingleArtist from './components/singleArtists.vue';
import SingleAlbum from './components/singleAlbum.vue';
import Playlists from './components/playlists.vue';
import SinglePlaylist from './components/singlePlaylist.vue';
import NewPodcasts from './components/newPodcasts.vue';
import PodcastSeries from './components/podcastSeries.vue';
import SinglePodcast from './components/singlePodcast.vue';
import Inicio from './components/inicio.vue';
import SubscriptionsPodcasts from './components/subscriptionsPodcasts.vue';
import Following from './components/following.vue'
// Exportamos el objeto de rutas
export default [
  // Cada objeto es una ruta
  // {
  //   path: '/',
  //   component: Home
  // }
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
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
  },
  {
    path: '/albums/:id',
    component: SingleAlbum
  },
  {
    path: '/playlists',
    component: Playlists
  },
  {
    path: '/playlists/:id',
    component: SinglePlaylist
  },
  {
    path: '/newPodcasts',
    component: NewPodcasts
  },
  {
    path: '/podcastSeries',
    component: PodcastSeries
  },
  {
    path: '/singlePodcast',
    component: SinglePodcast
  },
  {
    path: '/subscriptionsPodcasts',
    component: SubscriptionsPodcasts
  },

  {
    path: '/inicio',
  component: Inicio
},
  {
    path: '/following',
  component: Following
  }

]
