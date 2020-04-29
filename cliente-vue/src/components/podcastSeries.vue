<template>
    <div class="col">
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col m-2"><img id="singlePodcastCover" class="m-2 rounded" src="./../assets/img/81aBBHak07L._SS500_.jpg">
                        <div style="text-align: left;">
                        <h2>Title</h2>
                        <h5>Author</h5>
                        <h6>10 Caps</h6><button class="btn btn-primary" id="sub_btn" type="button">Subscribe&nbsp;<i class="fa fa-plus"></i></button></div>
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
                <ol reversed="">
                    <li>
                        <div class="card border-0">
                            <div class="card-body border-0">
                                <div class="row">
                                    <div class="col col-4" id="chapter_cover_col"><img id="chapter_cover" src="./../assets/img/81aBBHak07L._SS500_.jpg"></div>
                                    <div class="col" id="chapter_content_col">
                                        <h4>Title</h4>
                                        <h6 class="text-muted mb-2">Subtitle</h6>
                                        <h6 class="text-muted mb-2">Author</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="card border-0">
                            <div class="card-body border-0">
                                <div class="row">
                                    <div class="col col-4" id="chapter_cover_col"><img id="chapter_cover" src="./../assets/img/81aBBHak07L._SS500_.jpg"></div>
                                    <div class="col" id="chapter_content_col">
                                        <h4>Title</h4>
                                        <h6 class="text-muted mb-2">Subtitle</h6>
                                        <h6 class="text-muted mb-2">Author</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="card border-0">
                            <div class="card-body border-0">
                                <div class="row">
                                    <div class="col col-4" id="chapter_cover_col"><img id="chapter_cover" src="./../assets/img/81aBBHak07L._SS500_.jpg"></div>
                                    <div class="col" id="chapter_content_col">
                                        <h4>Title</h4>
                                        <h6 class="text-muted mb-2">Subtitle</h6>
                                        <h6 class="text-muted mb-2">Author</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="card border-0">
                            <div class="card-body border-0">
                                <div class="row">
                                    <div class="col col-4" id="chapter_cover_col"><img id="chapter_cover" src="./../assets/img/81aBBHak07L._SS500_.jpg"></div>
                                    <div class="col" id="chapter_content_col">
                                        <h4>Title</h4>
                                        <h6 class="text-muted mb-2">Subtitle</h6>
                                        <h6 class="text-muted mb-2">Author</h6>
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
      }
    },
    methods: {
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/podcastSeries.css';

</style>
