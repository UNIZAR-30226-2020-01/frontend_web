<template>

  <div class="col-3 align-self-baseline sticky-top" id="player-col">
    <div class="wrapper">
      <div class="player__container">
        <div class="player__body">
          <div class="body__cover">

            <img class=song__cover :src="value.album.photoUrl" alt="Album cover">

            <div class="body__info">
              <div class="info__album">{{ value.album.title }}</div>

              <div class="info__song">{{ value.title }}</div>

              <div class="info__artist">{{ value.album.artist.name }}</div>
            </div>

            <div class="body__buttons">
              <ul class="list list--buttons">
                <li @click="previousTrack()"><i class="fa fa-step-backward"></i></li>
                <li @click="playTrack()"  v-show="!playing"><i class="fa fa-play"></i></li>
                <li @click="pauseTrack()" v-show="playing"><i class="fa fa-pause"></i></li>
                <li @click="nextTrack()"><i class="fa fa-step-forward"></i></li>
              </ul>
            </div>
          </div>

          <div class="player__footer">
            <ul class="list list--footer">
              <li><a href="#" class="list__link"><i class="fa fa-list-alt"></i></a></li>
              <li>
                <a class="list__link" href=""><i class="fas fa-share-alt"></i></a>
              </li>
              <li><a href="#" class="list__link"><i class="fa fa-plus"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import { Howler } from 'howler'
  export default {
    props: {
      // loop: Boolean,
      // shuffle: Boolean,
      // progress: Number,
      value: Object,
    },
    data() {
      return {
        volume: 0.5,
        muted: false,
        playing: false
      }
    },
    computed: {
      trackProgress() {
        return this.progress * 100
      }
    },
    created: function() {
      Howler.volume(this.volume);
    },
    methods: {
      playTrack() {
        this.$emit('playtrack');
        this.playing = !this.playing;
      },
      pauseTrack() {
        this.$emit('pausetrack');
        this.playing = !this.playing;
      },
      stopTrack() {
        this.$emit('stoptrack');
      },
      nextTrack() {
        console.log('Next Track');
        this.$emit('nextTrack', 'next');
      },
      previousTrack() {
        console.log('Previous Track');
        this.$emit('previousTrack', 'previous');
      }
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/artists.css';
  @import './../assets/css/player.css';
  @import './../assets/css/player_button.css';
  @import './../assets/css/bootstrap.min.css';
  @import './../assets/fonts/fontawesome-all.min.css';

</style>
