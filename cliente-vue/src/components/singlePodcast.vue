<template>
    <div class="col">
        <div id="podcast_container" class="container-fluid">
            <div class="row">
                <div class="col p-2"><img id="singlePodcast_Img" :src="podcast_episode.image">
                    <h1>{{podcast_episode.title}}</h1>
                    <h6>Duration: {{Math.floor(podcast_episode.duration/60)}} minutes {{Math.floor((podcast_episode.duration%1)*60)}} seconds </h6>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p id="single-podcast-info" class="border-top border-white">{{podcast_episode.description}}<br></p>
                </div>
            </div>
        </div>
    </div>
  <!-- <player></player> -->
</template>

<script>
  // import Player from './player.vue'
  //import artistMixins from '../mixins/artistMixin'
  export default {
    data() {
      return {
        id: this.$route.params.id,
        podcast_episode: [],
      }
    },
    methods: {
    },
    created() {
      // Llamada para traer los datos del artista
      console.log('creating')
      var url = 'https://s7-rest.francecentral.cloudapp.azure.com/podcast-episodes/'
      this.$http.get(url + this.id, {
        headers: {
          Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(function(response) {
        if (response.status == 200) {
          this.podcast_episode = response.body;
          console.log(response.body);
        }
        else{
          console.log('Error al traer un episodio podcast');
        }
      })
      // this.updateKey();
    },
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/singlePodcasts.css';

</style>
