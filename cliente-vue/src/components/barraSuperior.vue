<template>

  <nav class="navbar navbar-dark navbar-expand-md sticky-top bg-dark">
        <div class="container-fluid"><router-link class="navbar-brand" to="/">
          <img id="spoti_logo" src="./../assets/img/spotiseven.png"><p v-if="mostrarMenuPodcasts">Podcasts</p></router-link><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span>
          </button>
            <div
                class="collapse navbar-collapse" id="navcol-1">
                <ul v-if="mostrarMenuPodcasts" class="nav navbar-nav mx-auto">
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/newPodcasts/">NewPodcasts</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/subscriptionsPodcasts/">Subscription</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/">Discover</router-link></li>
                </ul>
                <ul v-else class="nav navbar-nav mx-auto">
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/">Following</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/artists/">Artists</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/">Genres</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/albums/">Albums</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="nav-link" to="/">Discover</router-link></li>
                </ul>
                <!-- TODO: esto es provisional. Quitar o mejorar -->
                <div><button @click="cerrarSesion()" v-show="isLoggedIn">Cerrar sesión</button></div>
        </div>
        </div>
    </nav>

</template>

<script>

  import { bus } from '../main'
 
  export default {
    props:{
      mostrarMenuPodcasts:{
        type: Boolean
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
      isLoggedIn: function() {
        return localStorage.getItem('token') !== null;
      }
    },
    created(){
      bus.$on('MenuChanged', (data) => {
        this.mostrarMenuPodcasts = data;
      });
    },
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/navbar.css';
  @import './../assets/css/bootstrap.min.css';

</style>
