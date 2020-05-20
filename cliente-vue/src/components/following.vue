<template>

  <div class="col">
    <div class="container-fluid">
      <ul class="list-inline text-center">
        <li class="list-inline-item artist-item" v-for="playlist in playlistFollowed" :key="playlist.name">
          <router-link v-bind:to="'/playlists/' + playlist.id ">
          <div class="card text-center p-2 artist-card" >
            <header class="card-header">
              <h3 class="card-title artist-name" style="font-size: 100%">{{playlist.title}}</h3>
              <h6 class="card-subtitle">Playlist</h6>
            </header>
            <div class="card-body"><img id="artist-pic" class="m-auto mx-auto d-block" v-bind:src="playlist.icon">
              <p id="artist-songs" class="card-text artist-songs d-inline">{{playlist.number_songs}} songs</p><br>
              <p class="card-text artist-albums d-inline"> User: {{playlist.user.username}}</p>
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
  import followingMixin from '../mixins/followingActions';
  export default {
    data() {
      return {
        playlistFollowed: []
      };
    },
    // components:{
    //   'player': Player,
    // },
    mixins: [followingMixin],
    created() {
      this.getFollowingPlaylists
      console.log("yaaaaaaaaaaaaaaaa")
      console.log(this.playlistFollowed);
    },
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/artists.css';

</style>
