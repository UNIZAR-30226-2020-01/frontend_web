<template>
    <div class="col">
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col m-2"><img id="singlePodcastCover" class="m-2 rounded" :src="podcast.image">
                        <div style="text-align: left;">
                        <br>
                        <h2 style="font-size: 100%">{{podcast.title}}</h2>
                        <h5 style="font-size: 100%">{{podcast.channel.name}}</h5>
                        <h6>{{podcast.number_episodes}} Caps</h6><button class="btn btn-primary" id="sub_btn" type="button">Subscribe&nbsp;<i class="fa fa-plus"></i></button></div>
                        </div>
                </div>
                <div class="row">
                    <div class="col m-2">
                        <h4 class="border-bottom">Related Podcasts</h4>
                        <ul class="list-inline">
                            <li class="list-inline-item m-1">
                                <div class="card" id="related_podcast_card">
                                    <div class="card-body"><img id="related_podcast_cover" src="./../assets/img/81aBBHak07L._SS500_.jpg">
                                        <h5 class="card-title m-2">Title</h5>
                                        <h6 class="text-muted card-subtitle mb-2">Author</h6>
                                    </div>
                                </div>
                            </li>
                            <li class="list-inline-item m-1">
                                <div class="card" id="related_podcast_card">
                                    <div class="card-body"><img id="related_podcast_cover" src="./../assets/img/81aBBHak07L._SS500_.jpg">
                                        <h5 class="card-title m-2">Title</h5>
                                        <h6 class="text-muted card-subtitle mb-2">Author</h6>
                                    </div>
                                </div>
                            </li>
                            <li class="list-inline-item m-1">
                                <div class="card" id="related_podcast_card">
                                    <div class="card-body"><img id="related_podcast_cover" src="./../assets/img/81aBBHak07L._SS500_.jpg">
                                        <h5 class="card-title m-2">Title</h5>
                                        <h6 class="text-muted card-subtitle mb-2">Author</h6>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col m-2 col-8">
                <h4 class="border-bottom">Chapters</h4>
                <ol>
                    <li reversed="" v-for="episode in podcast.episodes" :key="episode.title" @click="selectPodcast(episode)">

                        <div class="card border-0">
                            <div class="card-body border-0">
                                <div class="row">
                                    <div class="col col-4" id="chapter_cover_col"><img id="chapter_cover" :src="episode.image"></div>
                                    <div class="col" id="chapter_content_col">
                                      <router-link v-bind:to="'/subscriptionsPodcasts/' + episode.id + '/singlePodcast' ">
                                        <h4>{{episode.title}}</h4>
                                        <h6 class="text-muted mb-2">{{episode.description.substr(0,10)}} ...</h6>
                                        <h6 class="text-muted mb-2">{{podcast.channel.name}}</h6>
                                        </router-link>
                                    </div>
                                </div>
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
            let episodeConverted = this.convertPodcastToSong(episode);
            this.$emit('selectPlaylist', [episodeConverted]);
            console.log("Pidiendo la reproducción de: " + episodeConverted.title);
            this.$emit("playSong", episodeConverted);
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
        }
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
                console.log('cosaaaaaaaaaa')
                pod.id = list[list.length - 2];
                pod.url.replace('http://', 'https://');
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

</style>
