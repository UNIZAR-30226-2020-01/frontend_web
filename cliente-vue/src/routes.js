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
import PopularPodcastSeries from './components/popularPodcastSeries.vue';
import Inicio from './components/inicio.vue';
import SubscriptionsPodcasts from './components/subscriptionsPodcasts.vue';
import Following from './components/following.vue'
import Search from './components/search.vue'
import SearchPodcast from './components/searchPodcast.vue'
import DiscoverPodcast from './components/discoverPodcast.vue'
import DiscoverSongs from './components/discoverSongs.vue'
import SinglePodcast from './components/singlePodcast.vue'
import SinglePopularPodcast from './components/singlePopularPodcast.vue'
import User from './components/user.vue'
import PodcastGenre from './components/podcastGenre.vue'
import MyUser from './components/myUser.vue'
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
    path: '/subscriptionsPodcasts',
    component: SubscriptionsPodcasts
  },
  {
    path: '/subscriptionsPodcasts/:id',
    component: PodcastSeries
  },
  {
    path: '/subscriptionsPodcasts/:id/singlePodcast',
    component: SinglePodcast
  },
  {
    path: '/popularPodcastSeries/:id',
    component: PopularPodcastSeries
  },
  {
    path: '/popularPodcastSeries/singlePopularPodcast/:id',
    component: SinglePopularPodcast,
    params: true
  },
  {
    path: '/inicio',
  component: Inicio
  },
  {
    path: '/following',
  component: Following
  },
  {
    path: '/discoverSongs',
  component: DiscoverSongs
  },
  {
    path: '/user/:id',
  component: User
  },
  {
    path: '/myUser',
  component: MyUser
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchPodcast',
    component: SearchPodcast
  },
  {
    path: '/discover',
    component: DiscoverPodcast
  },
  {
    path: '/genre/:id',
    component: PodcastGenre
  },
]
