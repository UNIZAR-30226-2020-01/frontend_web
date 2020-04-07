<template>
  <div id="content">
      <div class="container" id="content-container">
          <div class="artists">
              <ul class="list-unstyled">
                  <li class="artist-item">
                      <div class="artist-div" v-for="artist in artists" :key="artist.name">
                        <router-link v-bind:to="'/artists/' + artist.id ">
                          <img class="artist-pic" alt="artist_pic" v-bind:src="artist.image"/>
                          <div id="x">
                              <h2 class="artist-name">{{artist.name}}</h2>
                              <h6>Artist</h6>
                              <p>{{artist.number_albums}} albums</p>
                              <p>{{artist.number_songs}} songs</p>
                          </div>
                        </router-link>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import artistMixins from '../mixins/artistMixin';
export default {
  data(){
    return {
      artists: []
    };
  },
  mixins: [artistMixins],
  created(){
    this.getAllArtists;
  },
  methods: {
    getId: function(artist) {
      let list = artist.url.split('/');
      console.log(list);
      let id = list[list.length - 1];
      return id;
    }
  }
}
</script>

<style>
      @import './../assets/css/styles.css';
      @import './../assets/css/artists.css';
</style>
