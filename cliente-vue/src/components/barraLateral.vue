<template>

  <div>
    <div class="row" id="player-col">
      <div class="col-2" id="sidebar">
        <ul class="list-unstyled">
          <li>Home</li>
          <li>Search</li>
          <li>Your library
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
          </li>
        </ul>
        <button class="btn btn-primary fixed-bottom" type="button" v-on:click="open_player_btn"><i class="fas fa-music" style="color: rgb(0,0,0);"></i></button>
        <player-component v-show="this.mostrarRepro"></player-component>
      </div>
      <!-- Codigo de los artistas (de momento) -->
      <router-view/>
    </div>
  </div>

</template>

<script>

  import Player from './player.vue'
  export default {
    components: {
      'player-component': Player,
    },
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
          console.log('cosita');
          this.mostrarRepro = !this.mostrarRepro;
        }
      }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/sidebar.css';

</style>
