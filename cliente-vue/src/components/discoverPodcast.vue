<template>
  <div class="col animate__animated animate__fadeIn">
    <br>
    <div class="container-fluid" style="width:60%;">
      <div class="jumbotron">
        <h1> Genres </h1>
      </div>
        <ul class="list-inline text-center">
          <li data-aos="fade-up" class="list-inline-item album-item" v-for="genre in genres" :key="genre.name">
            <div class="card text-center p-2 album-card">
              <header class="card-header">
                <h3 class="card-title" style="font-size: 90%" >{{genre.name}}</h3>
                <h6 class="card-subtitle">Podcast Genre</h6>
              </header>
            </div>
          </li>
        </ul>
        <button @click="getMoreGenres" class="btn btn-primary white"><i class="fas fa-chevron-circle-down" style="font-size: 22px;"></i></button>
      </div>


        <br>
        <div class="container-fluid" style="width:60%;">
          <div class="jumbotron">
            <h1> For you </h1>
          </div>
          <ul class="list-unstyled">
              <li data-aos="fade-up" class="m-2" v-for="tpodcast in foryouPodcast" :key="tpodcast.title" >
                  <div class="card white" id="popular_podcast_card">
                      <div class="card-body"><img id="popular_cover" v-bind:src="tpodcast.image">
                        <router-link v-bind:to="'/popularPodcastSeries/' + tpodcast.id ">
                          <h5 id="links_PodcastsSeries" style="font-size: 2vmin;">{{tpodcast.title}}: {{tpodcast.publisher}}</h5>
                        </router-link>
                          <button class="btn btn-primary black" @click="subscribedPodcast(tpodcast), ()=>{$router.go()}" id="sub_btn" type="button">Subscribe&nbsp;<i class="fa fa-plus"></i></button></div>
                  </div>
              </li>
          </ul>
            <!-- hay que implementarlo -->
        </div>
</div>

</template>

<script>
  import DiscoverPodcast from '../mixins/discoverPodcastMixin';

  export default {
    data() {
      return {
        genres: [],
        foryouPodcast: [],
        indexGenre: 1,
      };
    },
    mixins: [DiscoverPodcast],
    created(){
      this.getAllGenresPodcasts;
      this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/user/recomendedPodcast', {
        headers: {
          Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(
        function(response){
          if(response.status == 200){
            // Todo ok
            this.foryouPodcast = response.body;
            this.foryouPodcast.forEach((podcast) => {
              podcast.url = "https://s7-rest.francecentral.cloudapp.azure.com/podcast/" + podcast.id;
              podcast.URI = podcast.audio;
            });
            console.log(this.foryouPodcast);
          }
        }
      );
    },
    methods:{
      getMoreGenres: function(){
        this.indexGenre += 8;
        var index = this.indexGenre
        this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/genres/?limit=8&offset='+ index, {
          headers: {
            Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
          }
        }).then(
          function(response){
            if(response.status == 200){
              // Todo ok
              var moreGenres = response.body.results
              moreGenres.forEach((gen) => {
                this.genres.push(gen);
              });
              console.log(this.genres);
            }
          }
        );
      },
      subscribedPodcast: function(podcast) {
        console.log('Token ' + localStorage.getItem('token'));
        console.log(podcast);
        var ruta = 'https://s7-rest.francecentral.cloudapp.azure.com/user/podcasts/followPodcast/?id='
          this.$http.post(ruta + podcast.id, {}, {
            headers: {
              Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
            }
          }
          ).then(
              function(response) {
                  // Tratamiento de la respuesta
                  if(response.status != 200){
                      console.log('Error de subscripcion en ' + podcast.title);
                  }
              }
          );
      },
    }
  }

</script>

<style>
  @import './../assets/css/albums.css';
  @import './../assets/css/styles.css';
</style>
