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
        v-model="playlist[index]"></player-component>
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
      key: 0,
      playlist: [{title: "micenicienta.mp3", artist: "Ask Again", album: "Tuputamadre", howl: null, display: true},],
      index: 0,
      playing: false,
      // currentTrack: null,
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
    setPlaylist: function(playlist){
      // Paramos la reproduccion actual
      this.currentTrack.howl.stop();
      // Setteamos la playlist
      console.log("Setting playlist: " + playlist);
      this.playlist = playlist;
      this.playNew(0);
    },
    playNew: function(index){
      if(index >= 0 && index < this.playlist.length){
        // Reproducimos la cancion con el indice seleccionado
        this.currentTrack.howl.play();
      }
    },
    play: function() {
      // if (this.currentTrack == null){
      //   // Establecemos el track al actual
      //   this.currentTrack = this.playlist[this.index].howl;
      // }
      this.currentTrack.howl.play();
    },
    pause: function() {
      // if (this.currentTrack == null){
      //   // Establecemos el track al actual
      //   this.currentTrack = this.playlist[this.index].howl;
      // }
      this.currentTrack.howl.pause();
    },
    // next() {
    //
    // }
  },
  computed: {
    currentTrack: function() {
      return this.playlist[this.index];
    }
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
