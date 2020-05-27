<template>
    <div class="col animate__animated animate__fadeIn">
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col m-2"><img id="singlePodcastCover" class="m-2 rounded" :src="podcast.image">
                        <div style="text-align: left;">
                        <br>
                        <h2 style="font-size: 100%">{{podcast.title}}</h2>
                        <h5 style="font-size: 100%">{{podcast.publisher}}</h5>
                        <h6>{{podcast.total_episodes}} Caps</h6>
                        <button @click="subscribedPodcast(podcast)" class="btn btn-primary black" id="sub_btn" type="button">Subscribe&nbsp;<i class="fa fa-plus"></i></button></div>
                        <!-- <button v-if="isSub" @click="subscribedPodcast(podcast)" class="btn btn-primary black" id="sub_btn" type="button">Subscribe&nbsp;<i class="fa fa-plus"></i></button> -->
                        <!-- <button v-else @click="unsubscribedPodcast(podcast)" class="btn btn-primary black" id="sub_btn" type="button">Unubscribe&nbsp;<i class="fa fa-minus"></i></button> -->
                        </div>
                </div>
            </div>
            <div class="col m-2 col-8">
                <h4 class="border-bottom">Chapters</h4>
                <ol>
                    <li class="chapter animate__animated animate__fadeInUp" reversed v-for="episode in podcast.episodes" :key="episode.title" @click="selectPodcast(episode)">


                                <div class="row">
                                    <div class="col col-4" id="chapter_cover_col"><img id="chapter_cover" :src="episode.image"></div>
                                    <div class="col chapter_content_col">
                                      <router-link v-bind:to="'/popularPodcastSeries/singlePopularPodcast/' + episode.id ">
                                        <h5 class="chapter_title" @click="showEpisode(episode)">{{episode.title}}</h5>
                                        <h6 @click="showEpisode(episode)" class="text-muted mb-2">{{episode.description.substr(0,65)}} ...</h6>
                                        <h6 @click="showEpisode(episode)" class="text-muted mb-2">{{podcast.publisher}}</h6>
                                        </router-link>

                                </div>
<!--
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
-->

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
  import podcastMixin from '../mixins/podcastMixin';
  export default {
    mixins: [podcastMixin],
    data() {
      return {
        key: 0,
        id: this.$route.params.id,
        podcast: {},
        podcasts: [],
        episodeInd: []
      }
    },
    methods: {
        selectPodcast: function(episode){
            let episodeConverted = this.convertPodcastToSong(episode);
            this.$emit('selectPlaylist', [episodeConverted]);
            console.log("Pidiendo la reproducción de: " + episodeConverted.title);
            this.$emit("playSong", episodeConverted);
        },
        convertPodcastToSong: function(episode) {
            console.log(episode.image);
            return {
                title: episode.title,
                file: episode.audio,
                album: {
                    title: this.podcast.title,
                    icon: episode.image,
                    artist: {
                        name: this.podcast.publisher
                    }
                }
            }
        },
        showEpisode: function(episode){
          console.log('AEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAA');
          localStorage.setItem('episode', '');
          localStorage.setItem('episode', JSON.stringify(episode));
          console.log(localStorage.getItem('episode'));
        },
        subscribedPodcast: function(podcast) {
          console.log('Token ' + localStorage.getItem('token'));
          console.log(podcast);
          var ruta = 'https://s7-rest.francecentral.cloudapp.azure.com/user/podcasts/followPodcast/?id='
            this.$http.post(ruta + podcast.id, {}, {
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
              }
          );
      },
    },
    created() {
      // Llamada para traer los datos del artista
      console.log('creating')
      console.log(this.$route.params)
      localStorage.setItem('episode','')
      var url = 'https://s7-rest.francecentral.cloudapp.azure.com/podcast/'
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
        // Pensar en hacer un sort
        //   this.podcast.episodes.sort(function(a, b){
        //       return a.title < b.title ? -1 : 1;
        //   })
        }
      });
      this.getUserPodcasts;
      // this.updateKey();
    },
    computed: {
      isSub: function() {
        if (this.podcasts != [] && this.podcast != null){
          let titulos = [];
          for(let pod in this.podcasts){
            titulos.push(pod.title)
          }
          titulos.forEach((pod) => pod.title);
          let tit = this.podcast.title;
          console.log(titulos)
          console.log(tit)
          return titulos.indexOf(tit) != -1;
        }
        return true;
      }
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/podcastSeries.css';

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
