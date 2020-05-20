<template>

  <div class="col">
    <div class="container-fluid">
      <ul class="list-inline text-center">
        <li class="list-inline-item artist-item" v-for="playlist in playlistFollowed" :key="playlist.name">
          <router-link v-bind:to="'/playlist/' + playlist.id ">
          <div class="card text-center p-2 artist-card" >
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
    </div>
  <!-- <player></player> -->
</div>

</template>

<script>
  // import Player from './player.vue'
  import followingMixin from '../mixins/followingActions'
  export default {
    data() {
      return {
        playlistFollowed: []
      }
    },
    // components:{
    //   'player': Player,
    // },
    mixins: [followingMixin],
    created() {
      this.playlistFollowed = this.getFollowingPlaylists
      console.log(this.getFollowingPlaylists)
      console.log("yaaaaaaaaaaaaaaaa")
      console.log(this.playlistFollowed);
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
