<template>

  <div class="col">
    <div id="content">
      <div class="container albumfondo" id="content-container" :key="this.key">
        <div class="row">
          <div class="col-lg-4 columna-album1">
            <div class="divimagealbum"><img class="individual-img-album" :src="playlist.icon" @click="selectPlaylist()">
              <h6 class="divimagealbum">{{playlist.title}}</h6>
            </div>
            <div>
              <p class="number-songs">Number of songs: {{playlist.number_songs}}</p>
              <!-- <p class="day-release">Since: Day release: {{playlist.date}}</p> -->
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
                    <div class="col-lg-6">
                      <div class="col">
                        <p class="name-song">TITLE</p>
                      </div>
                    </div>
                    <div class="col-lg-2 offset-lg-0">
                      <div class="tiempo"><i class="far fa-clock"></i></div>
                    </div>
                    <div class="col-lg-4 tres">
                      <div></div>
                    </div>
                  </div>
                  <hr>
                </div>
              </li>
            </ul>
            <ul class="lista" v-for="songs in playlist.songs" :key="songs.title" style="filter: blur(0px) contrast(200%) grayscale(0%);">
              <!-- TODO: Cambiar esto. es para pruebas -->
              <li style="filter: contrast(200%);">
                <div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div @click="setFavorite(songs,!songs.is_fav)" style="display: inline;">
                        <i v-if="songs.is_fav" class="fa fa-star" style="color: rgb(181,146,20);"></i>
                        <i v-else class="fa fa-star"></i>
                      </div>
                      <p class="name-song-list" style="display: inline;">{{songs.title}} </p>
                    </div>
                    <div class="col-lg-2">
                      <div class="tiempo">
                        <p>{{songs.duration}}</p>
                      </div>
                    </div>
                    <div class="col tres">
                      <div>
                        <div class="dropdown desp"><button class="btn btn-primary dropdown-toggle points"
                                  data-toggle="dropdown"
                                  aria-expanded="false"
                                  type="button"><i class="fa fa-ellipsis-v dropdown show"></i></button>
                          <div role="menu" class="dropdown-menu"><a role="presentation" class="dropdown-item" href="#">Play Next</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr>
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
  export default {
    data() {
      return {
        key: 0,
        id: this.$route.params.id,
        playlist: {}
      }
    },
    methods: {
      updateKey: function() {
        this.key = 1 - this.key
      },
      selectPlaylist: function() {
        console.log('selecting')
        this.$emit('selectPlaylist', this.playlist.songs)
      },
      alphOrder: function(){
        return this.playlist.songs.sort(function (a, b) {
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
      artistOrder: function(){
        return this.playlist.songs.sort(function (a, b) {
          if (a.album.artist.name > b.album.artist.name) {
            return 1;
          }
          if (a.album.artist.name < b.album.artist.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      },
      dateOrder: function(){ //De momento no hay
        return this.playlist.songs.sort(function (a, b) {
          if (a.album.artist.name > b.album.artist.name) {
            return 1;
          }
          if (a.album.artist.name < b.album.artist.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      },
    },
    created() {
      // Llamada para traer los datos del artista
      console.log('creating')
      var url = 'https://s7-rest.francecentral.cloudapp.azure.com/playlists/'
      this.$http.get(url + this.id, {
        headers: {
          Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(function(response) {
        if (response.status == 200) {
          console.log(response.body);
          this.playlist = response.body;
          this.playlist.url.replace('http://', 'https://');
          this.playlist.songs.forEach(function(song) {
            console.log(song);
            song.howl = null;
            song.file = song.file.toString().replace('http://', 'https://');
            song.url = song.url.toString().replace('http://', 'https://');
            // song.album = {
            //   title: this.album.title,
            //   photoUrl: this.album.icon,
            //   artist: this.album.artist
            // };
          });
          console.log(response.body);
          this.updateKey()
        }
      })
      // this.updateKey();
    },
    mixins: [favoriteMixin]
  }

</script>


<style>

  @import './../assets/css/album_Indv.css';

</style>
