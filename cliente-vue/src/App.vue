<template>
  <div id="app">
    <barra-superior></barra-superior>
    <barra-lateral @showPlayer="showPlayer"><router-view slot="repro" @selectPlaylist="setPlaylist"/></barra-lateral>
    <!-- <keep-alive> -->

    <!-- </keep-alive> -->
        <!-- <player-component
        @playtrack="play"
        @pausetrack="pause"
        @nextTrack="skip"
        @previousTrack="skip"
        v-model="playlist[index]"></player-component> -->

        <div class="col-3 align-self-baseline sticky-top" id="player-col" v-show="visible">
          <div class="wrapper">
            <div class="player__container">
              <div class="player__body">
                <div class="body__cover">

                  <img class=song__cover :src="currentTrack.album.icon" alt="Album cover">

                  <div class="body__info">
                    <div class="info__album">{{ album }}</div>

                    <div class="info__song">{{ currentTrack.title }}</div>

                    <div class="info__artist">{{ artist }}</div>
                  </div>

                  <div class="body__buttons">
                    <ul class="list list--buttons">
                      <li @click="previous()"><i class="fa fa-step-backward"></i></li>
                      <li @click="play()"  v-show="!playing"><i class="fa fa-play"></i></li>
                      <li @click="pause()" v-show="playing"><i class="fa fa-pause"></i></li>
                      <li @click="next()"><i class="fa fa-step-forward"></i></li>
                    </ul>
                  </div>
                </div>

                <div class="player__footer">
                  <ul class="list list--footer">
                    <li><a href="#" class="list__link"><i class="fa fa-list-alt"></i></a></li>
                    <li>
                      <a class="list__link" href=""><i class="fas fa-share-alt"></i></a>
                    </li>
                    <li><a href="#" class="list__link"><i class="fa fa-plus"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>


  </div>
</template>

<script>
import BarraSuperior from './components/barraSuperior.vue'
import BarraLateral from './components/barraLateral.vue'
// import Player from './components/controlPlayer.vue'
import {Howl, Howler} from 'howler'
export default {
  name: 'App',
  components: {
    'barra-superior': BarraSuperior,
    'barra-lateral': BarraLateral,
    // 'player-component': Player,
  },
  data(){
    return {
      key: 0,
      visible: false,
      playlist: [],
      index: 0,
      playing: false,
      audio: undefined,
      // currentTrack: null,
      // Aspectos de la reproduccion
      loop: false,
    }
  },
  created: function () {
    // TODO: Cambiar si eso
    Howler.volume(0.5);
    // this.playlist.forEach( (track) => {
    //   track.howl = new Howl({
    //     src: [`https://s7-rest.francecentral.cloudapp.azure.com/media/RAP.mp3`],
    //       onend: () => {
    //           this.audio = undefined;
    //           this.next();
    //       },
    //       onplay: () => {
    //           this.playing = true;
    //       },
    //       onpause: () => {
    //           this.playing = false;
    //       },
    //   })
    //   console.log(track.howl)
    // })
  },
  methods:{
    initPlaylist: function(songList) {
      songList.forEach(song => song.howl = new Howl({
        src: [song.file],
        onend: () => {
            this.audio = undefined;
            this.next();
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
      this.visible = true;
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
      console.log('this.audio = ' + this.audio);
      // if(this.audio != undefined){
      //   this.audio = this.currentTrack.howl.play();
      // }else{
        this.audio = this.currentTrack.howl.play();
      // }
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
    next() {
      this.currentTrack.howl.stop(this.audio);
      console.log('Index: ' + ((this.index + 1) % this.playlist.length));
      this.index = (this.index + 1) % this.playlist.length;
      // this.audio = undefined;
      this.audio = this.currentTrack.howl.play();
    },
    previous() {
      this.currentTrack.howl.stop(this.audio);
      console.log('Index: ' + ((this.index + 1) % this.playlist.length));
      this.index = (this.index - 1) % this.playlist.length;
      // this.audio = undefined;
      this.audio = this.currentTrack.howl.play();
    },
    showPlayer() {
      if(this.hasSongs){
        this.visible = !this.visible;
      }
    }
  },
  computed: {
    currentTrack: function() {
      if(this.hasSongs){
        return this.playlist[this.index];
      }else{
        return {
          'title': 'Titulo',
          'album': {
            'title': 'Album',
            'photoUrl': '',
            'artist': {
              'name': 'Artista',
            },
          },
        };
      }
    },
    hasSongs: function() {
      return this.playlist.length > 0;
    },
    album: function() {
      return this.currentTrack.album.title;
    },
    artist: function() {
      return this.currentTrack.album.artist.name;
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
