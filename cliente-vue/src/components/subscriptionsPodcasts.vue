<template>

<div class="col">
    <div class="row">
        <div class="col col-8">
          <div class="jumbotron subscription">
            <h4>Subscriptions</h4>
          </div>
          <ul class="list-inline">
              <li class="list-inline-item m-1" v-for="podcast in podcasts" :key="podcast.title" >
                  <div class="card m-2" id="subscribed-podcast-card">
                      <div class="card-body" id="subscribed_podc"><img id="subscribed_podc_cover" class="m-2 rounded" v-bind:src="podcast.image">
                          <div id="div_subs_text">
                            <router-link v-bind:to="'/subscriptionsPodcasts/' + podcast.id ">
                              <h4 id="links_PodcastsSeries">{{podcast.title}}</h4>
                              <h6 id="links_PodcastsSeries">{{podcast.channel.name}}</h6>
                              <h6 id="links_PodcastsSeries">{{podcast.number_episodes}} episodes</h6>
                            </router-link>
                              <button class="btn btn-primary black subsPodcastSubBtn" id="unsub_btn" type="button">Unsubscribe&nbsp;<i class="fa fa-minus" style="in"></i></button>
                          </div>
                      </div></div>
              </li>
          </ul>
        </div>
        <div class="col col-4">
          <div class="jumbotron subscription" id="jumbo_popular">
            <h4>Popular</h4>
          </div>
          <ul class="list-unstyled">
              <li class="m-2" v-for="tpodcast in trending_podcasts" :key="tpodcast.title" >
                  <div class="card" id="popular_podcast_card">
                      <div class="card-body"><img id="popular_cover" v-bind:src="tpodcast.image">
                        <router-link v-bind:to="'/popularPodcastSeries/' + tpodcast.id ">
                          <h5 id="links_PodcastsSeries" style="font-size: 2vmin;">{{tpodcast.title}}: {{tpodcast.publisher}}</h5>
                        </router-link>
                          <button class="btn btn-primary black" id="sub_btn" type="button">Subscribe&nbsp;<i class="fa fa-plus"></i></button></div>
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
    import podcastMixin from '../mixins/podcastMixin';
    import trendingPodcastMixin from '../mixins/trendingPodcastMixin';
  export default {
    data() {
      return {
          podcasts: [],
          trending_podcasts: []
      }
    },
    mixins: [podcastMixin,trendingPodcastMixin],
    created(){
      this.getAllPodcasts;
      this.getAllTrendingPodcasts;
    },
    methods: {
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/subscriptions.css';

  #sub_btn{
    color:white;
    display:inline-block;
    position:relative;
  }

  .jumbotron.subscription{
    display:block;
    position:relative;
    top:20px;
  }

</style>
