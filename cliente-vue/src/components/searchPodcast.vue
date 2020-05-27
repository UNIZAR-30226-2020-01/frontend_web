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
          searchPodcast(search);
          searchPodcastEpisode(search);
        "
      />
    </div>

    <div v-if="this.checkPodcasts" class="container-fluid">
      <div class="jumbotron">
        <h1>Podcasts</h1>
      </div>
      <ul class="list-inline text-center" id="lista_podcasts">
          <li class="list-inline-item" v-for="podcast in podcasts" :key="podcast.title">
            <router-link v-bind:to="'/subscriptionsPodcasts/' + podcast.id ">
              <div class="card" id="podcast">
                  <div id="podcast_header" class="card-header">
                      <h5 class="card-title">{{podcast.title}}</h5>
                      <h6 class="text-muted mb-2 card-subtitle">Subtitle</h6>
                  </div>
                  <div class="card-body"><img id="podcast_img" class="card-img"  v-bind:src="podcast.image">
                      <p class="text-justify card-text">{{podcast.description}}<br><br></p>
                  </div>
                  <div class="card-footer podcast_footer">
                      <p id="podcast_duration" class="card-text podcast_footer_info float-left">Duration: 2h</p>
                      <p id="podcast_date" class="card-text podcast_footer_info float-right">Date: 19/12/12</p>
                  </div>
              </div>
            </router-link>
          </li>
      </ul>
    </div>

    <div v-if="this.checkPodcastsEpisodes" class="container-fluid">
      <div class="jumbotron">
        <h1>Podcasts Episodes</h1>
      </div>
      <ol>
          <li class="chapter" reversed v-for="episode in podcastsEpisodes" :key="episode.title" @click="selectPodcast(episode)">

                      <div class="row">
                          <div class="col col-4" id="chapter_cover_col"><img id="chapter_cover" :src="episode.image"></div>
                          <div class="col chapter_content_col">
                            <router-link v-bind:to="'/subscriptionsPodcasts/' + episode.id + '/singlePodcast' ">
                              <h5 class="chapter_title">{{episode.title}}</h5>
                              <h6 class="text-muted mb-2">{{episode.description.substr(0,65)}} ...</h6>
                              </router-link>
                          </div>
                      </div>
          </li>
      </ol>
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
      podcasts: [],
      podcastsEpisodes: [],
      search: "",
      execute: false,
    };
  },
  computed: {
    checkPodcasts: function() {
      return this.podcasts.length != 0;
    },
    checkPodcastsEpisodes: function() {
      return this.podcastsEpisodes.length != 0;
    },
    checkSomething: function() {
      return (
        this.podcasts.length == 0 &&
        this.podcastsEpisodes.length == 0 &&
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
    selectPodcast: function(episode){
        let episodeConverted = this.convertPodcastToSong(episode);
        this.$emit('selectPlaylist', [episodeConverted]);
        console.log("Pidiendo la reproducción de: " + episodeConverted.title);
        this.$emit("playSong", episodeConverted);
    },
    // Busca el parámetro en: título del album o en el nombre del artista
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
            this.podcasts = response.body;
            this.podcasts.forEach((user) => {
              var list = user.url.split("/");
              this.execute = true;
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
    searchPodcastEpisode: function(episode) {
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
            this.podcastsEpisodes = response.body;
            this.podcastsEpisodes.forEach((user) => {
              var list = user.url.split("/");
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
@import './../assets/css/newPodcasts.css';

  .chapter_content_col{
        border-radius: 5px;
        border-style: solid;
        border-color: black;
        border-width: 3px;
        margin-right: 30px;
        margin: 5px;
  }

  .chapter{
      margin: 5px;
  }

  .chapter_title{
      color: black;
  }

  .chapter_title:hover{
      color: #FFD300;
  }
</style>
