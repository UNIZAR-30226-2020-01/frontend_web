<template>
    <div class="row">
      <div class="col-2" id="sidebar">
        <ul class="list-unstyled">
          <li><router-link to="/inicio">Home</router-link></li>
          <li>Search</li>
          <li><router-link to="/playlists">Your library</router-link></li>
        </ul>
        <div>
          <div @click=changeMenu()  v-if="mostrarMenuPodcasts" class="dropdown"><button class="btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="podcasts-dd" type="button"><router-link to="/playlists" id="podcasts-dd">Songs</router-link></button>
            <div class="dropdown-menu" role="menu">
              <a class="dropdown-item" role="presentation" href="#">New Podcasts</a>
              <a class="dropdown-item" role="presentation" href="#">Subscriptions</a>
              <a class="dropdown-item" role="presentation" href="#">Discover</a>
            </div>
          </div>
          <div @click=changeMenu() v-else class="dropdown"><button class="btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="podcasts-dd" type="button"><router-link to="/newPodcasts" id="podcasts-dd">Podcasts</router-link></button>
              <div class="dropdown-menu" role="menu">
                <a class="dropdown-item" role="presentation" href="#">New Podcasts</a>
                <a class="dropdown-item" role="presentation" href="#">Subscriptions</a>
                <a class="dropdown-item" role="presentation" href="#">Discover</a>
              </div>
          </div>
        </div>
        <button class="btn btn-primary fixed-bottom" type="button" v-on:click="open_player_btn"><i class="fas fa-music" style="color: rgb(0,0,0);"></i></button>
      </div>
      <slot name="router"></slot>
      <slot name="repro"></slot>
      <!-- Codigo de los artistas (de momento) -->
      <!-- <router-view/> -->

    </div>

</template>

<script>

  import { bus } from '../main'

  export default {
    data() {
      return {
        mostrarRepro: false,
        mostrarMenuPodcasts: false
      }
    },
    methods:{
    //   open_player_btn: function(){
    //     let x = document.getElementById("player-col");
    //     if (x.style.display === "none") {
    //       x.style.display = "block";
    //     } else {
    //       x.style.display = "none";
    //     }
    //   }
    // }
        open_player_btn: function(){
          this.$emit('showPlayer');
        },
        changeMenu: function(){
          this.mostrarMenuPodcasts = !this.mostrarMenuPodcasts;
          bus.$emit('MenuChanged', this.mostrarMenuPodcasts)
        }
      }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/sidebar.css';

</style>
