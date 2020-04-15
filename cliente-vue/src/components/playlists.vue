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
<div>
  <div class="col">
    <div class="container-fluid">
      <div class="genre">
        <ul class="list-inline text-center">
          <li class="list-inline-item artist-item" v-for="playlist in playlists" :key="playlist.name">
            <router-link v-bind:to="'/playlists/' + playlist.id ">
            <div class="card text-center p-2 artist-card" >
              <header class="card-header">
                <h3 class="card-title artist-name">{{ playlist.title }}</h3>
                <h6 class="card-subtitle">Artist</h6>
              </header>
              <div class="card-body"><img id="artist-pic" class="m-auto mx-auto d-block" v-bind:src="playlist.icon">
                <p id="artist-songs" class="card-text artist-songs d-inline">{{ playlist.number_songs }} songs</p>
                <!-- <p class="card-text artist-albums d-inline">&nbsp;{{artist.number_albums}} albums</p> -->
              </div>
            </div>
          </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <player></player> -->
</div>
</template>

<script>
  // import Player from './player.vue'
  import playlistMixin from '../mixins/playlistMixin'
  export default {
    data() {
      return {
        playlists: []
      }
    },
    // components:{
    //   'player': Player,
    // },
    mixins: [playlistMixin],
    created() {
      this.getAllPlaylists
    },
    methods: {
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/artists.css';

</style>
