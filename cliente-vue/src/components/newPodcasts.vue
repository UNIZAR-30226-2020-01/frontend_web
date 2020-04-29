<template>

  <div class="col">
    <div class="container-fluid">
        <ul class="list-inline text-center" id="lista_podcasts">
            <li class="list-inline-item">
                <div class="card" id="podcast">
                    <div id="podcast_header" class="card-header">
                        <h5 class="card-title">Title</h5>
                        <h6 class="text-muted mb-2 card-subtitle">Subtitle</h6>
                    </div>
                    <div class="card-body"><img id="podcast_img" class="card-img" src="./../assets/img/81aBBHak07L._SS500_.jpg">
                        <p class="text-justify card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.&nbsp;<br>Nullam id dolor id nibh ultricies vehicula
                            ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.<br><br></p>
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
  export default {
    data() {
      return {
      }
    },
    methods: {
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/newPodcasts.css';

</style>
