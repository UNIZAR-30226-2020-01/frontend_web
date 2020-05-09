<template>
    <div class="row">
      <div class="col-2" id="sidebar">
        <ul class="list-unstyled">
          <li><router-link to="/inicio">Home</router-link></li>
          <li>Search</li>
          <li v-if="!mostrarMenuPodcasts"><router-link to="/playlists">Your library</router-link></li>
          <li @click=changeMenu()>
            <div v-if="mostrarMenuPodcasts">
              <router-link to="/newPodcasts">Podcasts</router-link>
            </div>
            <div v-else>
              <router-link to="/playlists">Songs</router-link>
            </div>
          </li>
        </ul>
        <div>
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

  //import { bus } from '../main'

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
          console.log(this.mostrarMenuPodcasts);
          this.mostrarMenuPodcasts = !this.mostrarMenuPodcasts;
          this.$emit('MenuChanged', this.mostrarMenuPodcasts)
        }
      }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/sidebar.css';

</style>
