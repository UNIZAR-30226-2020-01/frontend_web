<template>

  <control-player
      :loop="loop"
      :shuffle="shuffle"
      @playtrack="play"
      @pausetrack="pause"
      @stoptrack="stop">
    </control-player>

</template>

<script>
    //import {Howl} from 'howler'
    import Controlplayer from './controlPlayer.vue'
    export default {
      components: {
        'control-player' : Controlplayer
      },
      data () {
      return {
        playlist: [
          {title: "micenicienta.mp3", artist: "Ask Again", howl: null, display: true},
        ],
        selectedTrack: null,
        index: 0,
        playing: false,
        loop: false,
        shuffle: false,
        seek: 0
      }
    },
    // computed: {
    //   currentTrack () {
    //     return this.playlist[this.index]
    //   },
    //   progress () {
    //     if (this.currentTrack.howl.duration() === 0) return 0
    //     return this.seek / this.currentTrack.howl.duration()
    //   },
    //   getTrackInfo () {
    //     let artist = this.currentTrack.artist,
    //         title = this.currentTrack.title,
    //         seek = this.seek,
    //         duration = this.currentTrack.howl.duration()
    //     return {
    //       artist,
    //       title,
    //       seek,
    //       duration,
    //     }
    //   }
    // },
    created: function () {
      this.playlist.forEach( (track) => {
        let file = track.title
        track.howl = new Howl({
          src: [`./assets/playlist/${file}.mp3`],
          onend: () => {
            if (this.loop) {
              this.play(this.index)
            } else {
              this.skip('next')
            }
          }
        })
      })
    },
    methods: {
      selectTrack (track) {
        this.selectedTrack = track
      },
      play (index) {
        let selectedTrackIndex = this.playlist.findIndex(track => track === this.selectedTrack)

        if (typeof index === 'number') {
           index = index
        } else if (this.selectedTrack) {
          if (this.selectedTrack != this.currentTrack) {
            this.stop()
          }
          index = selectedTrackIndex
        } else {
          index = this.index
        }

        let track = this.playlist[index].howl

        if (track.playing()) {
          return
        } else {
          track.play()
        }

        this.selectedTrack = this.playlist[index]
        this.playing = true
        this.index = index
      },
      pause () {
        this.currentTrack.howl.pause()
        this.playing = false
      },
      stop () {
        this.currentTrack.howl.stop()
        this.playing = false
      },
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
