<template>
  <div id="content" class="col">
      <div class="container degradado" id="content-container" :key="this.key">
          <div class="artist-display"><img class="individual-img" :src="artist.image">
              <div class="artist-info">
                  <h1>{{ artist.name }}</h1>
                  <p>{{ artist.number_albums }} albums</p>
                  <p>{{ artist.number_songs }} songs</p>
                  <div class="individual-songs">
                    <ul class="list-inline text-center">
                    <li class="list-inline-item album-item" v-for="album in artist.albums" :key="album.title">
                      <router-link v-bind:to="'/albums/' + album.url.substr(55,10) ">
                      <div class="card text-center p-2 album-card">
                        <header class="card-header">
                          <h3 class="card-title" style="font-size: 90%" >{{album.title}}</h3>
                          <h6 class="card-subtitle">Album</h6>
                        </header>
                        <div class="card-body"><img id="album-pic" class="m-auto mx-auto d-block" v-bind:src="album.icon">
                          <!-- <p id="card-text album-songs d-inline" style="font-size: 16px" >{{ album.artist.name }}</p> -->
                        </div>
                      </div>
                      </router-link>
                    </li>
                  </ul>
                  </div>
              </div>
          </div>
          <div class="bio">
              <p><br>{{ artist.biography }}<br><br></p>
          </div>
      </div>
  </div>
</template>


<script>
export default {
  data(){
    return {
      key: 0,
      id: this.$route.params.id,
      artist: {}
    };
  },
  methods: {
    updateKey: function() {
      this.key = 1 - this.key;
    }
  },
  created() {
    // Llamada para traer los datos del artista
    console.log('creating');
    var url = "https://s7-rest.francecentral.cloudapp.azure.com/artists/";
    this.$http.get(url + this.id + "/?format=json", {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
      }
    }).then(
      function(response) {
        if(response.status == 200){
          console.log(response.body);
          this.artist = response.body;
          this.updateKey();
        }
      }
    );
    // this.updateKey();
  }
}
</script>


<style>
  @import './../assets/css/artist_Indv.css';
</style>
