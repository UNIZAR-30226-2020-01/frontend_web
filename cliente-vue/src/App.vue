<template>
  <div id="app">
    <barra-superior></barra-superior>
    <barra-lateral ></barra-lateral>
    <!-- <keep-alive> -->
      <router-view @selectPlaylist="setPlaylist"/>
    <!-- </keep-alive> -->
        <player-component
        @playtrack="play"
        @pausetrack="pause"
        @nextTrack="skip"
        @previousTrack="skip"
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
      audio: undefined,
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
              this.audio = undefined;
              this.skip('next');
          },
          onplay: () => {
              this.playing = true;
          },
          onpause: () => {
              this.playing = false;
          },
      })
      console.log(track.howl)
    })
  },
  methods:{
    initPlaylist: function(songList) {
      songList.forEach(song => song.howl = new Howl({
        src: [song.file],
        onend: () => {
            this.audio = undefined;
            this.skip('next');
        },
        onplay: () => {
            this.playing = true;
        },
        onpause: () => {
            this.playing = false;
        },
        onstop: () => {
            this.playing = false;
        }
      }));
    },
    setPlaylist: function(playlist){
      console.log(playlist);
      // Paramos la reproduccion actual
      if(this.currentTrack.howl){
        this.currentTrack.howl.pause(this.audio);
        this.audio = undefined;
      }
      // Setteamos la playlist
      console.log("Setting playlist: " + playlist);
      this.initPlaylist(playlist);
      this.playlist = playlist;
      this.playNew(0);
    },
    playNew: function(index){
      if(index >= 0 && index < this.playlist.length){
        // Reproducimos la cancion con el indice seleccionado
        this.audio = this.playlist[index].howl.play();
        if(this.playing){
          this.currentTrack.howl.play(this.audio);
        }
      }
    },
    play: function() {
      // if (this.currentTrack == null){
      //   // Establecemos el track al actual
      //   this.currentTrack = this.playlist[this.index].howl;
      // }
      if(this.audio != undefined){
        this.currentTrack.howl.play(this.audio);
      }else{
        this.audio = this.currentTrack.howl.play();
      }
    },
    pause: function() {
      // if (this.currentTrack == null){
      //   // Establecemos el track al actual
      //   this.currentTrack = this.playlist[this.index].howl;
      // }
      if(this.audio != undefined){
        this.currentTrack.howl.pause(this.audio);
      }else{
        this.audio = this.currentTrack.howl.pause();
      }
    },
    skip: function(what) {
      console.log('Skipping what: ' + what);
      if(what == 'next'){
        // this.$emit('nextSong');
        this.currentTrack.howl.stop(this.audio);
        console.log('Index: ' + ((this.index + 1) % this.playlist.length));
        this.index = (this.index + 1) % this.playlist.length;
        // this.audio = undefined;
        this.audio = this.currentTrack.howl.play();
      }else if(what == 'previous'){
        // this.$emit('previousSong');
        this.currentTrack.howl.stop(this.audio);
        console.log('Index: ' + ((this.index + 1) % this.playlist.length));
        this.index = (this.index - 1) % this.playlist.length;
        // this.audio = undefined;
        this.audio = this.currentTrack.howl.play();
      }
    }
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
