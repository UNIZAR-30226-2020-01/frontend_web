<template>

  <!-- <div id="content">
    <div class="container" id="content-container">
      <div class="artists">
        <ul class="list-unstyled">
          <li class="artist-item">
            <div class="artist-div" v-for="artist in artists" :key="artist.name">
              <router-link v-bind:to="'/artists/' + artist.id ">
                <img class="artist-pic" alt="artist_pic" v-bind:src="artist.image" />
                <div id="x">
                  <h2 class="artist-name">{{artist.name}}</h2>
                  <h6>Artist</h6>
                  <p>{{artist.number_albums}} albums</p>
                  <p>{{artist.number_songs}} songs</p>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div> -->

  <div class="col-10">
    <div class="container-fluid">
      <div class="genre">
        <ul class="list-inline text-center">
          <li class="list-inline-item artist-item" v-for="artist in artists" :key="artist.name">
            <div class="card text-center p-2 artist-card" >
              <header class="card-header">
                <h3 class="card-title artist-name">{{artist.name}}</h3>
                <h6 class="card-subtitle">Artist</h6>
              </header>
              <div class="card-body"><img id="artist-pic" class="m-auto mx-auto d-block" v-bind:src="artist.image">
                <p id="artist-songs" class="card-text artist-songs d-inline">{{artist.number_songs}} songs</p>
                <p class="card-text artist-albums d-inline">&nbsp;{{artist.number_albums}} albums</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>

  import artistMixins from '../mixins/artistMixin'
  export default {
    data() {
      return {
        artists: []
      }
    },
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
      }
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/artists.css';

</style>
