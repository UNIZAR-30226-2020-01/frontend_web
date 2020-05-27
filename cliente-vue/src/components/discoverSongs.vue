<template>
  <div class="col animate__animated animate__fadeIn">
    <br>
    <div class="container-fluid"  style="width:60%;">
      <div class="jumbotron">
        <h1 class="text-center">Most played</h1>
      </div>
      <ul class="lista">
        <li >
          <div>
            <div class="row">
              <div class="col-lg-2">
                <div class="tiempo">
                  <p>Times played</p>
                </div>
              </div>
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
      <ul class="lista" v-for="songs in mostPlayed" :key="songs.title"
        >
        <!-- TODO: Cambiar esto. es para pruebas -->
        <li>
          <div>
            <div class="row">
              <div class="col-lg-2">
                <div class="tiempo">
                  <p>{{songs.times_played}}</p>
                </div>
              </div>
              <div class="col-lg-6">
                <div @click="setFavorite(songs,!songs.is_fav)" style="display: inline;">
                  <i v-if="songs.is_fav" class="fa fa-star amraillo" style="color:  #FFD300;"></i>
                  <i v-else class="fa fa-star"></i>
                </div>
                <p class="name-song-list" @click="selectMostPlayed(); playSong(songs);" style="display: inline;">{{songs.title}} </p>
              </div>
              <div class="col-lg-2">
                <div class="tiempo">
                  <p>{{songs.duration}}</p>
                </div>
              </div>
              <div class="col tres">
                <div>
                  <div class="dropdown desp"><button class="btn btn-primary white dropdown-toggle points"
                            data-toggle="dropdown"
                            aria-expanded="false"
                            type="button"><i class="fa fa-ellipsis-v dropdown show"></i></button>
                    <div role="menu" class="dropdown-menu"><a role="presentation" class="dropdown-item" href="#" @click="playNext(songs)">Play Next</a></div>
                  </div>
                </div>
              </div>

            </div>
            <hr>
          </div>
        </li>
      </ul>
    </div>

    <div class="container-fluid"  style="width:60%;">
      <h1 class="jumbotron disc"> Most liked </h1>
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
      <ul class="lista" v-for="songs in mostLiked" :key="songs.title" 
      >
        <!-- TODO: Cambiar esto. es para pruebas -->
        <li>
          <div>
            <div class="row">
              <div class="col-lg-6">
                <div @click="setFavorite(songs,!songs.is_fav)" style="display: inline;">
                  <i v-if="songs.is_fav" class="fa fa-star yellow"></i>
                  <i v-else class="fa fa-star"></i>
                </div>
                <p class="name-song-list" @click="selectMostLiked(); playSong(songs);" style="display: inline;">{{songs.title}} </p>
              </div>
              <div class="col-lg-2">
                <div class="tiempo">
                  <p>{{songs.duration}}</p>
                </div>
              </div>
              <div class="col tres">
                <div>
                  <div class="dropdown desp"><button class="btn btn-primary white dropdown-toggle points"
                            data-toggle="dropdown"
                            aria-expanded="false"
                            type="button"><i class="fa fa-ellipsis-v dropdown show"></i></button>
                    <div role="menu" class="dropdown-menu"><a role="presentation" class="dropdown-item" href="#" @click="playNext(songs)">Play Next</a></div>
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </div>
        </li>
      </ul>
    </div>
    <!-- <player></player> -->
  </div>
</template>

<script>
  import favoriteMixin from '../mixins/favoriteMixin.js'
export default {
  data() {
    return {
      mostPlayed: {},
      mostLiked: {},
    };
  },
  methods:{
    playSong: function (song) {
      console.log("Pidiendo la reproducción de: " + song.title);
      this.$emit("playSong", song);
    },
    selectMostLiked: function() {
      console.log('selecting')
      this.$emit('selectPlaylist', this.mostLiked)
    },
    selectMostPlayed: function() {
      console.log('selecting')
      this.$emit('selectPlaylist', this.mostPlayed)
    },
    playNext: function(songs) {
      console.log('adding to play next')
      this.$emit('playnext', songs)
    },
  },
  created() {
    // Llamada para traer los datos del artista
    console.log('creating')
    var url = 'https://s7-rest.francecentral.cloudapp.azure.com/songs/?ordering=-times_played&limit=5&offset=0'
    this.$http.get(url, {
      headers: {
        Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
      }
    }).then(function(response) {
      if (response.status == 200) {
        console.log(response.body.results);
        this.mostPlayed = response.body.results;
        this.mostPlayed.forEach((song) => {
          song.howl = null
          song.file = song.file.toString().replace('http://', 'https://')
          song.url = song.url.toString().replace('http://', 'https://');
        });
      }
    })
    // this.updateKey();

    console.log('creating')
    url = 'https://s7-rest.francecentral.cloudapp.azure.com/songs/?ordering=-times_liked&limit=5&offset=0'
    this.$http.get(url, {
      headers: {
        Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
      }
    }).then(function(response) {
      if (response.status == 200) {
        console.log(response.body.results);
        this.mostLiked = response.body.results;
        this.mostLiked.forEach((song) => {
          song.howl = null
          song.file = song.file.toString().replace('http://', 'https://')
          song.url = song.url.toString().replace('http://', 'https://');
        });

      }
    })
  },
  mixins: [favoriteMixin]
};
</script>

<style>
@import "./../assets/css/searchBar.css";
@import "./../assets/css/styles.css";
@import "./../assets/css/artists.css";
@import './../assets/css/album_Indv.css';

.jumbotron.disc{
  position: relative;
  top:20px;
}

.naranja{
  color: #FFD300;
}

</style>
