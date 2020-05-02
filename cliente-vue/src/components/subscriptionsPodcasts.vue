<template>

<div class="col">
    <div class="row">
        <div class="col col-8">
            <h4 class="border-bottom">Subscriptions</h4>
            <ul class="list-inline">
                <li class="list-inline-item m-1">
                    <div class="card m-2" id="subscribed-podcast-card">
                        <div class="card-body" id="subscribed_podc"><img id="subscribed_podc_cover" class="m-2 rounded" src="./../assets/img/81aBBHak07L._SS500_.jpg">
                            <div id="div_subs_text">
                                <h4>Title</h4>
                                <h6>Author</h6>
                                <h6>10 Caps</h6>
                            </div>
                        </div><button class="btn btn-primary m-2" id="unsub_btn" type="button">Unsubscribe&nbsp;<i class="fa fa-minus"></i></button></div>
                </li>
            </ul>
        </div>
        <div class="col col-4">
            <h4 class="border-bottom">Popular</h4>
            <ul class="list-unstyled">
                <li class="m-2">
                    <div class="card" id="popular_podcast_card">
                        <div class="card-body"><img id="popular_cover" src="./../assets/img/81aBBHak07L._SS500_.jpg">
                            <h5>Title: Author</h5><button class="btn btn-primary" id="sub_btn" type="button">Subscribe&nbsp;<i class="fa fa-plus"></i></button></div>
                    </div>
                </li>
            </ul>
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
  @import './../assets/css/subscriptions.css';

</style>
