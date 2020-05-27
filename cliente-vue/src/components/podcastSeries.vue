<template>
    <div class="col animate__animated animate__fadeIn">
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col m-2"><img id="singlePodcastCover" class="m-2 rounded" :src="podcast.image">
                        <div style="text-align: left;">
                        <br>
                        <h2 style="font-size: 100%">{{podcast.title}}</h2>
                        <h5 style="font-size: 100%">{{podcast.channel.name}}</h5>
                        <h6>{{podcast.number_episodes}} Chapter{{ podcast.number_episodes > 1 ? 's' : ''}}</h6><button class="btn btn-primary black" id="sub_btn" type="button" @click="subscribedPodcast(podcast)">Subscribe&nbsp;<i class="fa fa-plus"></i></button></div>
                        </div>
                </div>
                <div class="row">
                    <div class="col m-2">
                        <div class="jumbotron">
                            <h2>Related genres</h2>
                        </div>
                        <ul class="list-inline">
                            <li class="list-inline-item m-1 animate__animated animate__fadeInLeft" v-for="genre in podcast.genre" :key="genre.name">
                              <router-link v-bind:to="'/genre/' + genre.id ">
                                <div class="card" id="related_podcast_card">
                                    <div class="card-body">
                                        <h5 class="card-title m-2">{{genre.name}}</h5>
                                        <h6 class="text-muted card-subtitle mb-2">Podcast Genre</h6>
                                    </div>
                                </div>
                              </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col m-2 col-8">
                <div class="jumbotron">
                 <h2>Chapter{{ podcast.number_episodes > 1 ? 's' : ''}}</h2>
                </div>
                <ol>
                    <li class="chapter animate__animated animate__fadeInUp" reversed v-for="episode in podcast.episodes" :key="episode.title" @click="selectPodcast(episode)">
                        <div class="row">
                            <div class="col col-4 " id="chapter_cover_col"><img id="chapter_cover" :src="episode.image"></div>
                            <div class="col chapter_content_col">
                            <router-link v-bind:to="'/subscriptionsPodcasts/' + episode.id + '/singlePodcast' ">
                                <h5 class="chapter_title">{{episode.title}}</h5>
                                <h6 class="text-muted mb-2">{{episode.description.substr(0,65)}} ...</h6>
                                <h6 class="text-muted mb-2">{{podcast.channel.name}}</h6>
                                </router-link>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
  // import Player from './player.vue'
  //import artistMixins from '../mixins/artistMixin'
  export default {
    data() {
      return {
        key: 0,
        id: this.$route.params.id,
        podcast: {},
      }
    },
    methods: {
        selectPodcast: function(episode){
            this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/episode/' + episode.id_listenotes, {
                headers: {
                    Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
                }
            }).then(
                function (response) {
                    if (response.status == 200){
                        episode.URI = response.body.real_uri
                        let episodeConverted = this.convertPodcastToSong(episode);
                        this.$emit('selectPlaylist', [episodeConverted]);
                        console.log("Pidiendo la reproducción de: " + episodeConverted.title);
                        this.$emit("playSong", episodeConverted);
                    }
                }
            );
        },
        convertPodcastToSong: function(episode) {
            console.log(episode.image);
            return {
                title: episode.title,
                file: episode.URI,
                album: {
                    title: this.podcast.title,
                    icon: episode.image,
                    artist: {
                        name: this.podcast.channel.name
                    }
                }
            }
        },
        subscribedPodcast: function(podcast) {
          console.log('Token ' + localStorage.getItem('token'));
          console.log(podcast);
          var ruta = 'https://s7-rest.francecentral.cloudapp.azure.com/user/podcasts/followPodcast/?id='
            this.$http.post(ruta + podcast.id_listenotes, {}, {
              headers: {
                Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
              }
            }
            ).then(
                function(response) {
                    // Tratamiento de la respuesta
                    if(response.status != 200){
                        console.log('Error de subscripcion en ' + podcast.title);
                    }
                }
            );
      },
      unsubscribedPodcast: function(podcast) {
        console.log('Token ' + localStorage.getItem('token'));
        var ruta = 'https://s7-rest.francecentral.cloudapp.azure.com/user/podcasts/unfollowPodcast/?id='
          this.$http.post(ruta + podcast.id_listenotes, {}, {
            headers: {
              Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
            }
          }
          ).then(
              function(response) {
                  // Tratamiento de la respuesta
                  if(response.status != 200){
                      console.log('Error de subscripcion en ' + podcast.title);

                  }
                  this.$router.go();
              }
          );
      },
    },
    created() {
      // Llamada para traer los datos del artista
      console.log('creating')
      console.log(this.$route.params)
      var url = 'https://s7-rest.francecentral.cloudapp.azure.com/podcasts/'
      this.$http.get(url + this.id, {
        headers: {
          Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(function(response) {
        if (response.status == 200) {
          console.log(response.body)
          this.podcast = response.body
          this.podcast.episodes.forEach((pod) => {
                var list = pod.url.split('/');
                console.log(list);
                pod.id = list[list.length - 2];
                pod.url.replace('http://', 'https://');
           });
           this.podcast.genre.forEach((genre) => {
             var list = genre.url.split('/');
             console.log(list);
             genre.id = list[list.length - 2];
             genre.url.replace('http://', 'https://');
           });
        // Pensar en hacer un sort
        //   this.podcast.episodes.sort(function(a, b){
        //       return a.title < b.title ? -1 : 1;
        //   })
        }
      })
      // this.updateKey();
    },
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/podcastSeries.css';

  .jumbotron.listjumbo{
      position:relative;
      background-color: white;
      border-color:black;
      color:black;
      box-shadow: 0 0 0 .1rem rgba(0,0,0,1);

  }

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
