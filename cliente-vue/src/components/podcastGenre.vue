<template>

  <div class="col">
    <div class="container-fluid">
      <ul class="list-inline text-center">
        <li data-aos="fade-up" class="list-inline-item artist-item" v-for="podcast in podcasts" :key="podcast.title">
          <router-link v-bind:to="'/subscriptionsPodcasts/' + podcast.id ">
          <div class="card text-center p-2 artist-card" style="background-color: #101010;">
            <header class="card-header">
              <h3 class="card-title artist-name" style="font-size: 16px">{{podcast.title}}</h3>
              <h6 class="card-subtitle">Podcast</h6>
            </header>
            <div class="card-body"><img id="artist-pic" class="m-auto mx-auto d-block" v-bind:src="podcast.image">
              <p id="artist-songs" class="card-text artist-songs d-inline">{{podcast.number_episodes}} episodes</p>
            </div>
          </div>
        </router-link>
        </li>
      </ul>
      <!-- <button @click="getMoreArtists" class="btn btn-primary white"><i class="fas fa-chevron-circle-down" style="font-size: 22px;"></i></button> -->
    </div>
  <!-- <player></player> -->
</div>

</template>

<script>
  // import Player from './player.vue'
  export default {
    data() {
      return {
        podcasts: [],
        id: this.$route.params.id,
      }
    },
    // components:{
    //   'player': Player,
    // },
    created() {
      console.log('creating');
      console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
      var url = "https://s7-rest.francecentral.cloudapp.azure.com/genres/";
      this.$http.get(url + this.id, {
        headers: {
          Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(
        function(response) {
          if(response.status == 200){
            console.log(response.body);
            var loc = response.body;
            loc.podcasts.forEach((pod) => {
              var list = pod.url.split('/');
              console.log(list);
              pod.id = list[list.length - 2];
              pod.url.replace('http://', 'https://');
              this.podcasts.push(pod)
            });

          }
        }
      );
    },
    methods: {
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/artists.css';

</style>
