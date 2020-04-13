<template>
  <div id="app">
    <barra-superior></barra-superior>
    <barra-lateral></barra-lateral>
    <!-- <keep-alive> -->
      <!-- <router-view/> -->
    <!-- </keep-alive> -->
        <player-component
        @playtrack="play"
        @pausetrack="pause"
        :currentTrack="currentTrack"></player-component>
  </div>
</template>

<script>
import BarraSuperior from './components/barraSuperior.vue'
import BarraLateral from './components/barraLateral.vue'
import Player from './components/controlPlayer.vue'
import {Howl} from 'howler'
export default {
  name: 'App',
  components: {
    'barra-superior': BarraSuperior,
    'barra-lateral': BarraLateral,
    'player-component': Player,
  },
  data(){
    return {
      playlist: [{title: "micenicienta.mp3", artist: "Ask Again", howl: null, display: true},],
      index: 0,
      playing: false,
      currentTrack: null,
      // Aspectos de la reproduccion
      loop: false,
    }
  },
  created: function () {
    this.playlist.forEach( (track) => {
      track.howl = new Howl({
        src: [`https://s7-rest.francecentral.cloudapp.azure.com/media/RAP.mp3`],
        onend: () => {
          if (this.loop) {
            this.play(this.index)
          } else {
            this.skip('next')
          }
        }
      })
      console.log(track.howl)
    })
  },
  methods:{
    play: function() {
      if (this.currentTrack == null){
        // Establecemos el track al actual
        this.currentTrack = this.playlist[this.index].howl;
      }
      this.currentTrack.play();
    },
    pause: function() {
      if (this.currentTrack == null){
        // Establecemos el track al actual
        this.currentTrack = this.playlist[this.index].howl;
      }
      this.currentTrack.pause();
    },
    // next() {
    //
    // }
  }
}
</script>

<style>

@import './assets/css/styles.css';
@import './assets/css/artists.css';
@import './assets/css/player.css';
@import './assets/css/player_button.css';
@import './assets/css/bootstrap.min.css';
@import './assets/fonts/fontawesome-all.min.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
