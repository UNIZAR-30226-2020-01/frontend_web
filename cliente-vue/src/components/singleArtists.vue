<template>
  <div id="content">
      <div class="container degradado" id="content-container" :key="this.key">
          <div class="artist-display"><img class="individual-img" :src="artist.image">
              <div class="artist-info">
                  <h1>{{ artist.name }}</h1>
                  <p>{{ artist.number_albums }} albums</p>
                  <p>{{ artist.number_songs }} songs</p>
                  <div class="individual-songs">
                      <h3>Songs</h3><img class="individual-song" src="assets/img/81aBBHak07L._SS500_.jpg"><img class="individual-song" src="assets/img/81aBBHak07L._SS500_.jpg"><img class="individual-song" src="assets/img/81aBBHak07L._SS500_.jpg"><img class="individual-song" src="assets/img/81aBBHak07L._SS500_.jpg"></div>
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
