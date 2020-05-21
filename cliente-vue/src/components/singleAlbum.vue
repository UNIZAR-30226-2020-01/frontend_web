<template>

  <div class="col">
    <div id="content">
      <div class="container albumfondo" id="content-container" :key="this.key">
        <div class="row">
          <div class="col-3 columna-album1">
            <div class="divimagealbum"><img class="individual-img-album" :src="album.icon" @click="selectAlbum()">
              <h6 class="divimagealbum">{{album.title}}</h6>
            </div>
            <div>
              <p class="number-songs">Number of songs: {{album.number_songs}}</p>
              <p class="day-release">Since: Day release: {{album.date}}</p>
            </div>
            <div class="dropdown desp"><button class="btn btn-primary dropdown-toggle points"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      type="button"><i class="fa fa-ellipsis-v dropdown show"></i></button>
              <div role="menu" class="dropdown-menu">
                <a role="presentation" class="dropdown-item" href="#">Share</a>
                <a role="presentation" class="dropdown-item" href="#">Follow</a>
                <a role="presentation" class="dropdown-item" href="#" @click="dateOrder">Order by date</a>
                <a role="presentation" class="dropdown-item" href="#" @click="artistOrder">Order by artist</a>
                <a role="presentation" class="dropdown-item" href="#" @click="alphOrder">Alphabetical order</a>
              </div>
            </div>
          </div>
          <div class="col">
            <ul class="lista" style="filter: blur(0px) contrast(200%) grayscale(0%);">
              <li>
                <div>
                  <div class="row">
                    <div class="col-4">
                        <p class="name-song">TITLE</p>
                    </div>
                    <div class="col-1 offset-lg-0">
                      <div class="tiempo"><i class="far fa-clock"></i></div>
                    </div>
                    <div class="col tres">
                      <div></div>
                    </div>
                  </div>
                  <hr>
                </div>
              </li>
            </ul>
            <ul class="lista" v-for="songs in album.songs" :key="songs.title" style="filter: blur(0px) contrast(200%) grayscale(0%);"
              @click="selectAlbum(); playSong(songs);">
              <!-- TODO: Cambiar esto. es para pruebas -->
              <li style="filter: contrast(200%);">
                <div>
                  <div class="row">
                    <div class="col-4">
                      <div @click="setFavorite(songs,!songs.is_fav)" style="display: inline;">
                        <i v-if="songs.is_fav" class="fa fa-star" style="color: rgb(181,146,20);"></i>
                        <i v-else class="fa fa-star"></i>
                      </div>
                      <p class="name-song-list" @click="playNow(songs)" style="display: inline;">{{songs.title}} </p>
                    </div>
                    <div class="col-1">
                      <div class="tiempo">
                        <p>{{songs.duration}}</p>
                      </div>
                    </div>
                    <div class="col tres">
                      <div style="display: inline;">
                        <div class="dropdown desp" style="display: inline;"><button class="btn btn-primary dropdown-toggle points" data-toggle="dropdown" aria-expanded="false" type="button"><i class="fa fa-ellipsis-v dropdown show"></i></button>
                          <div role="menu" class="dropdown-menu">
                            <a role="presentation" class="dropdown-item" href="#" @click="playNext(songs)">Play Next</a>
                          </div>
                        </div>
                        
                      </div>
                      <div class="btn-group btn-group-sm" style="display: inline;">
                            <button type="button" class="btn btn-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Add to Playlist
                            </button>
                            <div class="dropdown-menu">
                              <a role="presentation" class="dropdown-item" href="#">New Playlist</a>
                              <a role="presentation" class="dropdown-item" href="#" v-for="playlist in playlists" :key="playlist.name" @click="addToPlaylist(songs,playlist)">{{playlist.title}}</a>
                            </div>
                          </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
  import favoriteMixin from '../mixins/favoriteMixin.js'
  import addToPlaylistMixin from '../mixins/addToPlaylist.js'
  import createPlaylistMixin from '../mixins/createPlaylist.js'
  import playlistMixin from '../mixins/playlistMixin'
  export default {
    data() {
      return {
        key: 0,
        id: this.$route.params.id,
        album: {},
        playlists: {}
      }
    },
    methods: {
      updateKey: function() {
        this.key = 1 - this.key
      },
      selectAlbum: function() {
        console.log('selecting')
        this.$emit('selectPlaylist', this.album.songs)
      },
      playNext: function(songs) {
        console.log('adding to play next')
        this.$emit('playnext', songs)
      },
      playNow: function(songs) {
        console.log('play now')
        this.$emit('playnow', songs)
      },
      alphOrder: function(){
        return this.album.songs.sort(function (a, b) {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      },
      artistOrder: function(){ //No tiene sentido
      },
      dateOrder: function(){ //Las canciones de un album salen a la vez
      },
      playSong: function (song) {
        console.log("Pidiendo la reproducción de: " + song.title);
        this.$emit("playSong", song);
      }
    },
    created() {
      // Llamada para traer los datos del artista
      console.log('creating')
      this.getAllPlaylists
      var url = 'https://s7-rest.francecentral.cloudapp.azure.com/albums/'
      this.$http.get(url + this.id, {
        headers: {
          Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(function(response) {
        if (response.status == 200) {
          console.log(response.body)
          this.album = response.body
          this.album.songs.forEach(song => {
            song.howl = null
            song.album = {
              title: this.album.title,
              icon: this.album.icon,
              artist: this.album.artist
            }
            song.file = song.file.toString().replace('http://', 'https://')
            song.url = song.url.toString().replace('http://', 'https://');
          })
          this.updateKey()
        }
      })
      // this.updateKey();
    },
    mixins: [favoriteMixin,addToPlaylistMixin,createPlaylistMixin,playlistMixin]
  }

</script>


<style scoped>
@import './../assets/css/styles.css';
@import './../assets/css/album_Indv.css';

</style>
