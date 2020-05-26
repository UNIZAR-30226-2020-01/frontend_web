<template>
  <div class="col">
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
        indexGenre: 1,
      };
    },
    mixins: [DiscoverPodcast],
    created(){
      this.getAllGenresPodcasts;
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
      }
    }
  }

</script>

<style>
  @import './../assets/css/albums.css';
  @import './../assets/css/styles.css';
</style>
