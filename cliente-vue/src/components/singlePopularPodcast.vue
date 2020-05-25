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
    props: {
      podcast_episode:{
        type: Object
      }
    },
    data() {
      return {
        id: this.$route.params.id,
      }
    },
    methods: {
    },
    created(){
      console.log('EEEEEEEEEEEEEEEEEE');
      console.log(this.podcast_episode)
    },
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/singlePodcasts.css';

</style>
