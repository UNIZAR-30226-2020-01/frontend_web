<template>
    <div class="col">
        <div id="podcast_container" class="container-fluid">
            <div class="row">
                <div class="col p-2"><img id="singlePodcast_Img" :src="podcast_episode.image">
                    <h1>{{podcast_episode.title}}</h1>
                    <h6>Duration: {{Math.floor(podcast_episode.audio_length_sec/60)}} minutes {{podcast_episode.audio_length_sec%60}} seconds </h6>
                    <h6 v-if="podcast_episode.explicit_content"> Explicit Content </h6>
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
        podcast_episode: {}
      }
    },
    methods: {
    },
    created(){
      console.log('EEEEEEEEEEEEEEEEEE');
      console.log(this.podcast_episode);
      this.podcast_episode = JSON.parse(localStorage.getItem('episode'));
    },
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/singlePodcasts.css';

</style>
