<template>
  <div id="app">
    <!-- Cuando nos llegue el logout -> Stop reproduction -->
    <barra-superior v-if="checkRouter" v-bind:mostrarModoPodcast="mostrarPodcastObject" @logout="logout()"></barra-superior>
      <barra-lateral v-bind:checkRouterObject="checkRouterObject" v-bind:showButtonPlayer="showButtonPlayer" @showPlayer="showPlayer" @MenuChanged="changePodcast_Songs">
        <router-view slot="router" @selectPlaylist="setPlaylist" @playnext="addToQueue" @playnow="playIndSong" @playSong="playSong"/>

        <div class="col-3 align-self-baseline sticky-top animate__animated animate__fadeInRightBig animate__faster" id="player-col" v-show="visible" slot="repro">
            <div class="wrapper">
              <div class="player__container" >
                <div class="player__body">
                  <div class="body__cover">
                    <transition name="animated" enter-active-class="animated flipInY delay" leave-active-class="animated flipInY">
                    <img v-if="animated" class=song__cover :src="currentTrack.album.icon" alt="Album cover">
                    </transition>
                    <img v-if="!animated" class=song__cover :src="currentTrack.album.icon" style="opacity: 15%" alt="Album cover">
                    <div v-if="!animated">{{currentTrack.lyrics}}</div>
                    <div class="body__info">
                      <div class="info__album">{{ album }}</div>

                      <div class="info__song">{{ currentTrack.title }}</div>

                      <div class="info__artist">{{ artist }}</div>
                    </div>

                    <div class="body__buttons">
                      <ul class="list list--buttons">
                        <!--<li @click="loop = !loop" v-show="!loop"><a class="list__link"><i class="fa fa-retweet"></i></a></li>-->
                        <!--<li @click="loop = !loop" v-show="loop"><a class="list__link list__link__active"><i class="fa fa-retweet"></i></a></li>-->
                        <li @click="previous()"><a class="list__link"><i class="fa fa-step-backward"></i></a></li>
                        <li @click="play()"  v-show="!playing"><a class="list__link"><i class="fa fa-play"></i></a></li>
                        <li @click="pause()" v-show="playing"><a class="list__link"><i class="fa fa-pause"></i></a></li>
                        <li @click="next()"><a class="list__link"><i class="fa fa-step-forward"></i></a></li>
                        <!--<li @click="loop = !loop" v-show="!loop"><a class="list__link"><i class="fa fa-retweet"></i></a></li>-->
                        <!--<li @click="loop = !loop" v-show="loop"><a class="list__link list__link__active"><i class="fa fa-retweet"></i></a></li>-->
                      </ul>
                    </div>
                  </div>

                  <div class="player__footer">
                    <ul class="list list--footer">
                      <li @click="loadLyrics">
                        <a href="#" class="list__link"><i class="fa fa-list-alt"></i></a>
                      </li>
                      <li @click="loop = !loop" v-show="!loop">
                        <a class="list__link"><i class="fa fa-retweet"></i></a>
                      </li>
                      <li @click="loop = !loop" v-show="loop"><a class="list__link"><i class="fa fa-retweet"></i></a></li>
                      <!-- <li><a class="list__link" @click="loop = !loop"><i class="fa fa-plus"></i></a></li> -->
                      <li><a class="list__link">
                      <div v-if="currentTrack.is_fav != undefined" @click="setFavorite(currentTrack,!currentTrack.is_fav)" >
                        <i v-if="currentTrack.is_fav" class="fa fa-star" style="color: rgb(181,146,20);"></i>
                        <i v-else class="fa fa-star"></i>
                      </div>
                      </a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </barra-lateral>
      <div class="footer-dark">
          <footer>
              <div class="container">
                  <div class="row">
                      <div class="col-sm-6 col-md-3 item">
                          <h3>Services</h3>
                          <ul>
                              <li><a href="#">Web Player</a></li>
                              <li><a href="#">Development</a></li>
                              <li><a href="#">Hosting</a></li>
                          </ul>
                      </div>
                      <div class="col-sm-6 col-md-3 item">
                          <h3>About</h3>
                          <ul>
                              <li><a href="#">SpotySeven is a&nbsp;</a></li>
                              <li><a href="#">Team</a></li>
                              <li><a href="#">Careers</a></li>
                          </ul>
                      </div>
                      <div class="col-md-6 item text">
                          <h3>SpotySeven</h3>
                          <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                      </div>
                      <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
                  </div>
                  <p class="copyright">SpotySeven Ã‚Â© 2020</p>
              </div>
          </footer>
      </div>
      <!-- <keep-alive> -->

      <!-- </keep-alive> -->
          <!-- <player-component
          @playtrack="play"
          @pausetrack="pause"
          @nextTrack="skip"
          @previousTrack="skip"
          v-model="playlist[index]"></player-component> -->



  </div>
</template>

<script>
import BarraSuperior from './components/barraSuperior.vue'
import BarraLateral from './components/barraLateral.vue'
import favoriteMixin from './mixins/favoriteMixin.js'

// import Player from './components/controlPlayer.vue'
import {Howl, Howler} from 'howler'
export default {
  name: 'App',
  components: {
    'barra-superior': BarraSuperior,
    'barra-lateral': BarraLateral,
    // 'player-component': Player,
  },
  mixins: [favoriteMixin],
  data(){
    return {
      animated: true,
      key: 0,
      visible: false,
      playlist: [],
      index: 0,
      playing: false,
      audio: undefined,
      // currentTrack: null,
      // Aspectos de la reproduccion
      loop: false,
      mostrarPodcast: false,
    }
  },
  created: function () {

    this.mostrarPodcast = this.$route.path.toString().toLowerCase().match(/^.*podcast.*$/ig) != null;
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
    if(localStorage.getItem('token') !== null ){ // tenemos token o refresh_token
      if (localStorage.getItem('refresh_token') !== null) { // tenemos refresh_token
      //////////////////////////////////// REFRESCAR TOKEN (con refresh_token):
      this.$http.post('https://s7-rest.francecentral.cloudapp.azure.com/auth/token/', {
          grant_type: 'refresh_token',
          client_id: 'rPllY8pG9tdFdROaiX7ZwIsCdQ4xzwhskdW1oCaH',
          client_secret: 'GSBMVcRbAjz6C3l2QbfNhXs0jIF3uvBXGqNTdJ27d0fhuGeAJg4YoTMaqOeMS9HqDJtk9Kd8yar8ZVMZOOG5PZJKaRPQwvMnhnp7R1H3TixGA1ZYWPigRUUx2uOv9FkW',
          refresh_token: localStorage.getItem('refresh_token'),
        }).then(function(response) {
          console.log(response.body);
          if (response.status == 200) {
            // TODO: Comprobacion adicional para ver si el token es valido?
            console.log(response.body.access_token)
            // En este caso en vez de "Token [el token]", la cadena sera "Bearer [el token]"
            localStorage.setItem('token', response.body.access_token);
            localStorage.setItem('refresh_token', response.body.refresh_token);
            localStorage.setItem('type', response.body.token_type);
          }
        });
      }
      ////////////////////////////////////

      // El usuario tiene la sesión iniciada. Obtenemos la playlist del remoto
      this.obtainSongFromRemote();
    }
  },
  methods:{
    obtainSongFromRemote: function() {
      this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/current-user/',{
        headers: {
           Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(
        function(response) {
          console.log(response);
          // Analizamos la respuesta
          if(response.status == 200){
            // Ha ido bien -> Obtenemos el estado de la cancion
            if(response.body[0]['playing'] !== null && response.body[0]['timestamp']){
              // Preparamos la cancion para reproducirse
              this.initPlaylist([response.body[0]['playing']]);
              // Asignamos la cancion del remoto a la actual
              this.playlist = [response.body[0]['playing']];
              // Actualizamos a https
              this.playlist.forEach(function(s) {
                s.url = s.url.toString().replace('http://', 'https://');
              } );
              // Avanzamos la reproducción al punto actual
              this.currentTrack.howl.seek(response.body[0]['timestamp']);
            }else{
              console.log('El usuario no tenía song seleccionada en el remoto');
            }
          }
        }
      );
    },
    initPlaylist: function(songList) {
      songList.forEach(song => song.howl = new Howl({
        src: [song.file],
        onload: function () {
            console.log("LOADED");
        },
        onend: () => {
            if(!this.loop){
              this.audio = undefined;
              this.next();
            }
            else {
              this.audio = this.currentTrack.howl.play();
            }
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
      // this.playNew(0);
      // this.play();
    },
    addToQueue: function(songs){
      songs.howl = new Howl({
        src: [songs.file],
        onload: function () {
            console.log("LOADED");
        },
        onend: () => {
            if(!this.loop){
              this.audio = undefined;
              this.next();
            }
            else {
              this.audio = this.currentTrack.howl.play();
            }
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
      })
      this.playlist[this.index] = songs
    },
    playIndSong: function(songs){
      this.stop()
      this.index = 0;
      songs.howl = new Howl({
        src: [songs.file],
        onload: function () {
            console.log("LOADED");
        },
        onend: () => {
            if(!this.loop){
              this.audio = undefined;
              this.next();
            }
            else {
              this.audio = this.currentTrack.howl.play();
            }
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
      })
      this.playlist[0] = songs
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
      if(this.audio != undefined){
        this.audio = this.currentTrack.howl.play();
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
      this.saveSongStatusToRemote();
    },
    stop: function() {
      if(this.audio != undefined){
        this.currentTrack.howl.stop(this.audio);
      }else{
        this.audio = this.currentTrack.howl.stop();
      }
    },
    next() {
      this.currentTrack.howl.stop(this.audio);
      console.log('Index: ' + ((this.index + 1) % this.playlist.length));
      this.index = (this.index + 1) % this.playlist.length;
      // this.audio = undefined;
      this.audio = this.currentTrack.howl.play();
      this.saveSongStatusToRemote();
    },
    previous() {
      this.currentTrack.howl.stop(this.audio);
      console.log('Index: ' + ((this.index - 1 ) % this.playlist.length));
      this.index = (this.index - 1 + this.playlist.length) % this.playlist.length;
      // this.audio = undefined;
      this.audio = this.currentTrack.howl.play();
      this.saveSongStatusToRemote();
    },
    showPlayer() {
      if(this.hasSongs){
        this.visible = !this.visible;
      }
    },
    logout() {
      this.stop()
      this.visible = false
      this.playlist = []
    },
    lyrics: function(){
        console.log('cositas');
        let x = document.getElementById("song__cover");
        //let y = document.getElementById("letra");
        if (x.style.transform === "rotateY(180deg)") {
          x.style.transform = "rotateY(0deg)";
          x.style.opacity = 1;
          //y.style.display = "none";
        }else { //caso inicial
          x.style.transform = "rotateY(180deg)";
          x.style.opacity = 0.25;
          //y.style.display = "block";
        }
      },
      changePodcast_Songs: function(){
        this.mostrarPodcast  = !this.mostrarPodcast;
        console.log(this.mostrarPodcast);
      },
      saveSongStatusToRemote: function() {
        // Para guardar el estado de la reproducción en el backend
        console.log('Sending song to backend');
        let time = Number(this.currentTrack.howl.seek());
        if (isNaN(time)) {
          console.log('El seek no funciona');
          time = parseInt(this.currentTrack.howl._sounds[0]._seek, 10);
        }else{
          console.log('El seek funciona????');
          time = parseInt(time.toString(), 10);
        }
        console.log(time);
        this.$http.get(this.currentTrack.url + 'set_playing?t=' + time, {
          headers: {
            Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
          }
        }).then(
          function(response) {
            if (response.status == 200) {
              // Todo ha ido bien
              console.log(response.body);
            }else{
              // Ha habido un fallo
              console.log('Error al guardar en el remoto');
            }
          }
        );
      },
      loadLyrics: function() {
        if(this.animated){
          // No tienes las lyrics -> Las cargas
          this.$http.get(this.currentTrack.url, {
            headers: {
              Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
            }
          }).then(
            function(response){
              if(response.status == 200){
                // Ha ido bien -> Cargamos las lyrics
                if(response.body.lyrics.toString().trim() != ""){
                  // Nos aseguramos de que no es vacia
                  this.currentTrack.lyrics = response.body.lyrics;
                }else{
                  // No tiene lyrics
                  this.currentTrack.lyrics = "La cancion no dispone de letra";
                }
                this.animated = !this.animated
              }
            }
          );
        }else{
          // Esconder el reproductor
          this.animated = !this.animated;
        }

      },
      playSong: function(song) {
        let i = this.playlist.indexOf(song)
        if(i != -1){
          // Existe el elemento a reproducir en la playlist.
          console.log("La cancion existe");
          this.index = i;
          this.playNew(i);
        }
      }
  },
  computed: {
    checkRouter: function(){
      console.log(this.$route.path);
      return  ((this.$route.path != '/register') && (this.$route.path != '/login'))
    },
    checkShowButtonPlayer: function(){
      return  this.playlist.length != 0
    },
    mostrarPodcastObject: function(){
      return {
        boolean: this.mostrarPodcast,
      }
    },
    checkRouterObject: function(){
      console.log(this.checkRouter);
      return {
        boolean: this.checkRouter,
      }
    },
    showButtonPlayer: function(){
      console.log(this.checkShowButtonPlayer);
      return {
        boolean: this.checkShowButtonPlayer,
      }
    },
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
