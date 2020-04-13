<template>

<div class="col-10">
                <div id="content">
                    <div class="container albumfondo" id="content-container" :key="this.key">
                        <div class="row">
                            <div class="col-lg-4 columna-album1">
                                <div class="divimagealbum"><img class="individual-img-album" :src="album.icon">
                                    <h6 class="divimagealbum">{{album.title}}</h6>
                                </div>
                                <div>
                                    <p class="number-songs">Number of songs: {{album.number_songs}}</p>
                                    <p class="day-release">Since: Day release: {{album.date}}</p>
                                </div>
                            </div>
                            <div class="col">
                                <ul class="lista" style="filter: blur(0px) contrast(200%) grayscale(0%);">
                                    <li>
                                        <div>
                                            <div class="row">
                                                <div class="col-lg-6"><div class="col">
                                                    <p class="name-song">TITLE</p>
                                                </div></div>
                                                <div class="col-lg-2 offset-lg-0">
                                                    <div class="tiempo"><i class="material-icons">timer</i></div>
                                                </div>
                                                <div class="col-lg-4 tres">
                                                    <div></div>
                                                </div>
                                            </div>
                                            <hr>
                                        </div>
                                        </li>
                                    </ul>
                                <ul class="lista" v-for="songs in album.songs" :key="songs.title" style="filter: blur(0px) contrast(200%) grayscale(0%);">

                                    <li style="filter: contrast(200%);">
                                        <div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <p class="name-song-list">{{songs.title}}</p>
                                                </div>
                                                <div class="col-lg-2">
                                                    <div class="tiempo">
                                                        <p>{{songs.duration}}</p>
                                                    </div>
                                                </div>
                                                <div class="col tres">
                                                    <div><div class="dropdown desp"><button class="btn btn-primary dropdown-toggle points" data-toggle="dropdown" aria-expanded="false" type="button"><i class="fa fa-ellipsis-v dropdown show"></i></button>
                                                    <div role="menu" class="dropdown-menu"><a role="presentation" class="dropdown-item" href="#">Play Next</a></div>
                                                </div></div>
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
export default {
  data(){
    return {
      key: 0,
      id: this.$route.params.id,
      album: {}
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
    var url = "https://s7-rest.francecentral.cloudapp.azure.com/albums/";
    this.$http.get(url + this.id + "/?format=json").then(
      function(response) {
        if(response.status == 200){
          console.log(response.body);
          this.album = response.body;
          this.updateKey();
        }
      }
    );
    // this.updateKey();
  }
}
</script>


<style>
  @import './../assets/css/album_Indv.css';
</style>
