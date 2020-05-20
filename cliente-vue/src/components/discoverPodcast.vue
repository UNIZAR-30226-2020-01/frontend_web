<template>

  <div class="col">
    <div class="container-fluid">
      <h1> Genres </h1>
        <ul class="list-inline text-center">
          <li class="list-inline-item album-item" v-for="genre in genres" :key="genre.name">
            <div class="card text-center p-2 album-card">
              <header class="card-header">
                <h3 class="card-title" style="font-size: 90%" >{{genre.name}}</h3>
                <h6 class="card-subtitle">Podcast Genre</h6>
              </header>
            </div>
          </li>
        </ul>
    </div>
</div>

</template>

<script>
  import DiscoverPodcast from '../mixins/discoverPodcastMixin';

  export default {
    data() {
      return {
        genres: []
      };
    },
    mixins: [DiscoverPodcast],
    created(){
      this.getAllGenresPodcasts;
    },
  }

</script>

<style>
  @import './../assets/css/styles.css';
  @import './../assets/css/albums.css';
</style>
