<template>

  <nav class="navbar navbar-dark navbar-expand-md sticky-top" style="background-color:#101010;" id="barra-nav">
        <div class="container-fluid"><router-link class="navbar-brand" to="/discoverPodcast">
          <img id="spoti_logo_podcast" v-if="mostrarPodcast" src="./../assets/img/Sin_titulo-1.png">
          </router-link>
        <router-link class="navbar-brand" to="/playlists">
          <img id="spoti_logo" v-if="!mostrarPodcast" src="./../assets/img/Sin_titulo-2.png">
        </router-link><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span>

          </button>
            <div
                class="collapse navbar-collapse" id="navcol-1">
                <ul v-if="mostrarPodcast" class="nav navbar-nav mx-auto">
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/subscriptionsPodcasts/">Subscription</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/discoverPodcast">Discover</router-link></li>
                </ul>
                <ul v-else class="nav navbar-nav mx-auto">
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/following">Following</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/artists/">Artists</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/albums/">Albums</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/discoverSongs">Popular</router-link></li>
                </ul>
                <!-- TODO: esto es provisional. Quitar o mejorar -->
                <div><button type="button" class="btn btn-primary" @click="cerrarSesion()" v-show="isLoggedIn">Log out</button></div>
        </div>
        </div>
    </nav>

</template>

<script>

  export default {
    props: {
      mostrarModoPodcast:{
        type: Object
      }
    },
    data() {
      return {}
    },
    methods: {
      cerrarSesion: function(){
        localStorage.clear()
        this.$emit('logout')
        this.$router.push({
          path: '/login'
        });
      }
    },
    computed: {
      mostrarPodcast: function(){
        return this.mostrarModoPodcast.boolean;
      },
      isLoggedIn: function() {
        return localStorage.getItem('token') !== null;
      }
    },
    // created(){
    //   console.log('prueba');
    //   bus.$on('MenuChanged', (data) => {
    //     this.mostrarMenuPodcasts = data;
    //   });
    // },
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/navbar.css';
  @import './../assets/css/bootstrap.min.css';

  #barra-nav{
	background-color: black;
	color: white;
  }

</style>
