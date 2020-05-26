<template>

  <div class="col animate__animated animate__fadeIn">
    <div class="container-fluid">
        <ul class="list-inline text-center" id="lista_podcasts">
            <li class="list-inline-item" v-for="podcast in podcasts" :key="podcast.title">
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
            </li>
        </ul>
    </div>
  <!-- <player></player> -->
</div>

</template>

<script>
  // import Player from './player.vue'
  //import artistMixins from '../mixins/artistMixin'
  import podcastMixin from '../mixins/podcastMixin';
  export default {
    data() {
      return {
        podcasts: []
      }
    },
    mixins: [podcastMixin],
    created(){
      this.getAllPodcasts;
    },
    methods: {
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/newPodcasts.css';

</style>
