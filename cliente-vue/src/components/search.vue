<template>
  <div class="col">
    <div class="text-center" id="searchBar" style="font-size: 34px;padding: 4px;height: 154px;">
      <h1
        class="display-4 text-center"
        id="headingSearchBar"
        style="font-size: 40px;color: rgb(25,22,22);height: 26px;margin: 17px;padding: 0px;"
      >
        <strong>Search</strong>
      </h1>
      <input
        class="form-control-lg"
        type="text"
        id="textSearchBar"
        placeholder="Songs, artists, albums..."
        style="width: 309px;"
      />
    </div>
    <div class="container-fluid">
      <ul class="list-inline text-center">
        <li class="list-inline-item artist-item" v-for="artist in artists" :key="artist.name">
          <router-link v-bind:to="'/artists/' + artist.id ">
            <div class="card text-center p-2 artist-card">
              <header class="card-header">
                <h3 class="card-title artist-name" style="font-size: 16px">{{artist.name}}</h3>
                <h6 class="card-subtitle">Artist</h6>
              </header>
              <div class="card-body">
                <img id="artist-pic" class="m-auto mx-auto d-block" v-bind:src="artist.image" />
                <p
                  id="artist-songs"
                  class="card-text artist-songs d-inline"
                >{{artist.number_songs}} songs</p>
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
import artistMixins from "../mixins/artistMixin";
export default {
  data() {
    return {
      artists: []
    };
  },
  // components:{
  //   'player': Player,
  // },
  mixins: [artistMixins],
  created() {
    this.getAllArtists;
  },
  methods: {
    getId: function(artist) {
      let list = artist.url.split("/");
      console.log(list);
      let id = list[list.length - 1];
      return id;
    },
    // Busca el parámetro en: título del album o en el nombre del artista
    searchAlbums: function(album) {
      this.$http
        .get(
          "https://s7-rest.francecentral.cloudapp.azure.com/albums/?search=" +
            album,
          {
            Authorization:
              localStorage.getItem("type") + " " + localStorage.getItem("token")
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            return response.body;
          } else {
            console.log(
              "Error al buscar un album. Codigo de error: " + response.status
            );
          }
        });
    },
    // Busca el parámetro en: nombre del artista
    searchArtists: function(artist) {
      this.$http
        .get(
          "https://s7-rest.francecentral.cloudapp.azure.com/artists/?search=" +
            artist,
          {
            Authorization:
              localStorage.getItem("type") + " " + localStorage.getItem("token")
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            return response.body;
          } else {
            console.log(
              "Error al buscar un artist. Codigo de error: " + response.status
            );
          }
        });
    },
    // Busca el parámetro en: título de la cancion o nombre del artista
    searchSongs: function(song) {
      this.$http
        .get(
          "https://s7-rest.francecentral.cloudapp.azure.com/songs/?search=" +
            song,
          {
            Authorization:
              localStorage.getItem("type") + " " + localStorage.getItem("token")
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            return response.body;
          } else {
            console.log(
              "Error al buscar un song. Codigo de error: " + response.status
            );
          }
        });
    },
    // Busca el parámetro en: nombre del usuario y en sus playlists
    searchUsers: function(user) {
      this.$http
        .get(
          "https://s7-rest.francecentral.cloudapp.azure.com/user/?search=" +
            user,
          {
            Authorization:
              localStorage.getItem("type") + " " + localStorage.getItem("token")
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            return response.body;
          } else {
            console.log(
              "Error al buscar un user. Codigo de error: " + response.status
            );
          }
        });
    }
  }
};
</script>

<style>
@import "./../assets/css/searchBar.css";
@import "./../assets/css/styles.css";
@import "./../assets/css/artists.css";
</style>
