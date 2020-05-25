<template>
  <div class="col">
    <div
      class="text-center"
      id="searchBar"
      style="font-size: 34px;padding: 4px;height: 154px;"
    >
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
        v-model="search"
        @keyup.enter="
          searchAlbums(search);
          searchArtists(search);
          searchPlaylist(search);
          searchSongs(search);
          searchUsers(search);
        "
      />
    </div>

    <div v-if="this.checkSongs" class="container-fluid">
      <div class="jumbotron">
        <h1>Songs</h1>
      </div>
      <ul class="lista" style="filter: blur(0px) contrast(200%) grayscale(0%);">
        <li>
          <div>
            <div class="row">
              <div class="col-lg-6">
                <div class="col">
                  <p class="name-song">TITLE</p>
                </div>
              </div>
              <div class="col-lg-2 offset-lg-0">
                <div class="tiempo"><i class="far fa-clock"></i></div>
              </div>
              <div class="col-lg-4 tres">
                <div></div>
              </div>
            </div>
            <hr />
          </div>
        </li>
      </ul>
      <ul
        class="lista"
        v-for="songs in songs"
        :key="songs.title"
        style="filter: blur(0px) contrast(200%) grayscale(0%);"
        @click="playSong(songs)"
      >
        <!-- TODO: Cambiar esto. es para pruebas -->
        <li style="filter: contrast(200%);">
          <div>
            <div class="row">
              <div class="col-lg-6">
                <div
                  @click="setFavorite(songs, !songs.is_fav)"
                  style="display: inline;"
                >
                  <i
                    v-if="songs.is_fav"
                    class="fa fa-star"
                    style="color: rgb(181,146,20);"
                  ></i>
                  <i v-else class="fa fa-star"></i>
                </div>
                <p class="name-song-list" style="display: inline;">
                  {{ songs.title }}
                </p>
              </div>
              <div class="col-lg-2">
                <div class="tiempo">
                  <p>{{ songs.duration }}</p>
                </div>
              </div>
              <div class="col tres">
                <div>
                  <div class="dropdown desp">
                    <button
                      class="btn btn-primary white dropdown-toggle points"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      type="button"
                    >
                      <i class="fa fa-ellipsis-v dropdown show"></i>
                    </button>
                    <div role="menu" class="dropdown-menu">
                      <a
                        role="presentation"
                        class="dropdown-item"
                        href="#"
                        @click="playNext(songs)"
                        >Play Next</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </li>
      </ul>
    </div>

    <div v-if="this.checkArtists" class="container-fluid">
      <div class="jumbotron">
        <h1>Artists</h1>
      </div>
      <ul class="list-inline text-center">
        <li
          class="list-inline-item artist-item"
          v-for="artist in artists"
          :key="artist.name"
        >
          <router-link v-bind:to="'/artists/' + artist.id">
            <div class="card text-center p-2 artist-card">
              <header class="card-header">
                <h3 class="card-title artist-name" style="font-size: 16px">
                  {{ artist.name }}
                </h3>
                <h6 class="card-subtitle">Artist</h6>
              </header>
              <div class="card-body">
                <img
                  id="artist-pic"
                  class="m-auto mx-auto d-block"
                  v-bind:src="artist.image"
                />
                <p id="artist-songs" class="card-text artist-songs d-inline">
                  {{ artist.number_songs }} songs
                </p>
                <p class="card-text artist-albums d-inline">
                  &nbsp;{{ artist.number_albums }} albums
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="this.checkAlbums" class="container-fluid">
      <div class="jumbotron">
        <h1>Albums</h1>
      </div>
      <ul class="list-inline text-center">
        <li
          class="list-inline-item album-item"
          v-for="album in albums"
          :key="album.title"
        >
          <router-link v-bind:to="'/albums/' + album.id">
            <div class="card text-center p-2 album-card">
              <header class="card-header">
                <h3 class="card-title" style="font-size: 90%">
                  {{ album.title }}
                </h3>
                <h6 class="card-subtitle">Album</h6>
              </header>
              <div class="card-body">
                <img
                  id="album-pic"
                  class="m-auto mx-auto d-block"
                  v-bind:src="album.icon"
                />
                <p id="card-text album-songs d-inline" style="font-size: 16px">
                  {{ album.artist.name }}
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="this.checkPlaylists" class="container-fluid">
      <div class="jumbotron">
        <h1>Playlists</h1>
      </div>
      <ul class="list-inline text-center">
        <li
          class="list-inline-item artist-item"
          v-for="playlist in playlists"
          :key="playlist.name"
        >
          <router-link v-bind:to="'/playlists/' + playlist.id">
            <div class="card text-center p-2 artist-card">
              <header class="card-header">
                <h3 class="card-title artist-name" style="font-size: 90%">
                  {{ playlist.title }}
                </h3>
                <h6 class="card-subtitle">Playlist</h6>
              </header>
              <div class="card-body">
                <img
                  id="artist-pic"
                  class="m-auto mx-auto d-block"
                  v-bind:src="playlist.icon"
                />
                <p id="artist-songs" class="card-text artist-songs d-inline">
                  {{ playlist.number_songs }} songs
                </p>
                <!-- <p class="card-text artist-albums d-inline">&nbsp;{{artist.number_albums}} albums</p> -->
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="this.checkUsers" class="container-fluid">
      <div class="jumbotron">
        <h1>Users</h1>
      </div>
      <ul class="list-inline text-center">
        <li
          class="list-inline-item artist-item"
          v-for="user in users"
          :key="user.username"
        >
          <router-link v-bind:to="'/user/' + user.id">
            <div class="card text-center p-2 artist-card">
              <header class="card-header">
                <h3 class="card-title artist-name" style="font-size: 90%">
                  {{ user.username }}
                </h3>
                <h6 class="card-subtitle">User</h6>
              </header>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <p v-if="this.checkSomething">No results</p>

    <!-- <player></player> -->
  </div>
</template>

<script>
// import Player from './player.vue'
export default {
  data() {
    return {
      artists: [],
      albums: [],
      playlists: [],
      songs: [],
      users: [],
      search: "",
      execute: false,
    };
  },
  computed: {
    checkArtists: function() {
      return this.artists.length != 0;
    },
    checkAlbums: function() {
      return this.albums.length != 0;
    },
    checkSongs: function() {
      return this.songs.length != 0;
    },
    checkPlaylists: function() {
      return this.playlists.length != 0;
    },
    checkUsers: function() {
      return this.users.length != 0;
    },
    checkSomething: function() {
      return (
        this.artists.length == 0 &&
        this.albums.length == 0 &&
        this.songs.length == 0 &&
        this.playlists.length == 0 &&
        this.users.length == 0 &&
        this.execute
      );
    },
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
              localStorage.getItem("type") +
              " " +
              localStorage.getItem("token"),
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            console.log(response.body);
            this.albums = response.body;
            this.albums.forEach((album) => {
              var list = album.url.split("/");
              console.log(list);
              album.id = list[list.length - 2];
              album.url.replace("http://", "https://");
            });
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
              localStorage.getItem("type") +
              " " +
              localStorage.getItem("token"),
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            console.log(response.body);
            this.artists = response.body;
            this.execute = true;
            this.artists.forEach((artist) => {
              var list = artist.url.split("/");
              console.log(list);
              artist.id = list[list.length - 2];
              artist.url.replace("http://", "https://");
            });
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
              localStorage.getItem("type") +
              " " +
              localStorage.getItem("token"),
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            console.log(response.body);
            this.songs = response.body;
          } else {
            console.log(
              "Error al buscar un song. Codigo de error: " + response.status
            );
          }
        });
    },
    // Busca el parámetro en: nombre del usuario y en sus playlists
    searchPlaylist: function(playlist) {
      this.$http
        .get(
          "https://s7-rest.francecentral.cloudapp.azure.com/playlists/?search=" +
            playlist,
          {
            Authorization:
              localStorage.getItem("type") +
              " " +
              localStorage.getItem("token"),
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            console.log(response.body);
            this.playlists = response.body;
            this.playlists.forEach((playlist) => {
              var list = playlist.url.split("/");
              console.log(list);
              playlist.id = list[list.length - 2];
              playlist.url = playlist.url
                .toString()
                .replace("http://", "https://");
              // Para cada cancion del playlist
            });
          } else {
            console.log(
              "Error al buscar un user. Codigo de error: " + response.status
            );
          }
        });
    },
    // Busca el parámetro en: nombre del usuario y en sus playlists
    searchUsers: function(user) {
      this.$http
        .get(
          "https://s7-rest.francecentral.cloudapp.azure.com/s7_user/?search=" +
            user,
          {
            Authorization:
              localStorage.getItem("type") +
              " " +
              localStorage.getItem("token"),
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            console.log(response.body);
            this.users = response.body;
            this.users.forEach((user) => {
              var list = user.url.split("/");
              console.log(list);
              user.id = list[list.length - 2];
              user.url = user.url.toString().replace("http://", "https://");
              // Para cada cancion del playlist
            });
          } else {
            console.log(
              "Error al buscar un user. Codigo de error: " + response.status
            );
          }
        });
    },
    searchPodcast: function(podcast) {
      this.$http
        .get(
          "https://s7-rest.francecentral.cloudapp.azure.com/podcasts/?search=" +
            podcast,
          {
            Authorization:
              localStorage.getItem("type") +
              " " +
              localStorage.getItem("token"),
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            console.log(response.body);
            this.users = response.body;
            this.users.forEach((user) => {
              var list = user.url.split("/");
              console.log(list);
              user.id = list[list.length - 2];
              user.url = user.url.toString().replace("http://", "https://");
              // Para cada cancion del playlist
            });
          } else {
            console.log(
              "Error al buscar un user. Codigo de error: " + response.status
            );
          }
        });
    },
    searchPodcsatEpisode: function(episode) {
      this.$http
        .get(
          "https://s7-rest.francecentral.cloudapp.azure.com/podcast-episodes/?search=" +
            episode,
          {
            Authorization:
              localStorage.getItem("type") +
              " " +
              localStorage.getItem("token"),
          }
        )
        .then(function(response) {
          if (response.status == 200) {
            console.log(response.body);
            this.users = response.body;
            this.users.forEach((user) => {
              var list = user.url.split("/");
              console.log(list);
              user.id = list[list.length - 2];
              user.url = user.url.toString().replace("http://", "https://");
              // Para cada cancion del playlist
            });
          } else {
            console.log(
              "Error al buscar un user. Codigo de error: " + response.status
            );
          }
        });
    },
    playSong: function(song) {
      this.$emit("selectPlaylist", [song]);
      console.log("Pidiendo la reproducción de: " + song.title);
      this.$emit("playSong", song);
    },
  },
};
</script>

<style>
@import "./../assets/css/searchBar.css";
@import "./../assets/css/styles.css";
@import "./../assets/css/artists.css";
</style>
