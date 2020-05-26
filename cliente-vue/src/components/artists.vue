<template>

  <div class="col">
    <div class="container-fluid">
      <ul class="list-inline text-center">
        <li class="list-inline-item artist-item" v-for="artist in artists" :key="artist.name">
          <router-link v-bind:to="'/artists/' + artist.id ">
          <div class="card text-center p-2 artist-card" style="background-color: #101010;">
            <header class="card-header">
              <h3 class="card-title artist-name" style="font-size: 16px">{{artist.name}}</h3>
              <h6 class="card-subtitle">Artist</h6>
            </header>
            <div class="card-body"><img id="artist-pic" class="m-auto mx-auto d-block" v-bind:src="artist.image">
              <p id="artist-songs" class="card-text artist-songs d-inline">{{artist.number_songs}} songs</p>
              <p class="card-text artist-albums d-inline">&nbsp;{{artist.number_albums}} albums</p>
            </div>
          </div>
        </router-link>
        </li>
      </ul>
      <button @click="getMoreArtists" class="btn btn-primary white"><i class="fas fa-chevron-circle-down" style="font-size: 22px;"></i></button>
    </div>
  <!-- <player></player> -->
</div>

</template>

<script>
  // import Player from './player.vue'
  import artistMixins from '../mixins/artistMixin'
  export default {
    data() {
      return {
        artists: [],
        indexArt: 1,
      }
    },
    // components:{
    //   'player': Player,
    // },
    mixins: [artistMixins],
    created() {
      this.getAllArtists
    },
    methods: {
      getId: function(artist) {
        let list = artist.url.split('/')
        console.log(list)
        let id = list[list.length - 1]
        return id
      },
      getMoreArtists: function() {
        this.indexArt += 8;
        this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/artists/?limit=8&offset=' + this.indexArt, {
          headers: {
                Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
          }
        }).then(
          function(response){
            if(response.status == 200){
              // Todo ok
              var moreArtist = response.body.results
              moreArtist.forEach((art) => {
                this.artists.push(art);
              });
              console.log(this.artists);
            }
          }
        );
      }
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/artists.css';

</style>
