<template>

  <div>
    <div class="row" id="player-col">
      <div class="col-2" id="sidebar">
        <ul class="list-unstyled">
          <li>Home</li>
          <li>Search</li>
          <li><router-link to="/playlists">Your library</router-link></li>
            <div>
              <div class="dropdown"><button class="btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="podcasts-dd" type="button">Podcasts</button>
                <div class="dropdown-menu"
                     role="menu"><a class="dropdown-item"
                     role="presentation"
                     href="#">First Item</a><a class="dropdown-item"
                     role="presentation"
                     href="#">Second Item</a><a class="dropdown-item"
                     role="presentation"
                     href="#">Third Item</a></div>
              </div>
            </div>
        </ul>
        <button class="btn btn-primary fixed-bottom" type="button" v-on:click="open_player_btn"><i class="fas fa-music" style="color: rgb(0,0,0);"></i></button>
      </div>
      <slot name="repro"></slot>
      <!-- Codigo de los artistas (de momento) -->
      <!-- <router-view/> -->
    </div>
  </div>

</template>

<script>


  export default {
    data() {
      return {
        mostrarRepro: false
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
        }
      }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/sidebar.css';

</style>
