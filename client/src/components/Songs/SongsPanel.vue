<template>
  <panel title="Songs">
  <!-- dude, what are slots btw -->
    <v-btn
      :to="{
        name: 'songs-create'
      }"
      slot="action"
      fab
      light
      class="white"
      small
      absolute
      right
      middle>
    <!-- Check out all the other cool material Icons! -->
    <v-icon>add</v-icon>
    </v-btn>
    <div 
      v-for="song in songs"
      class="song"
      :key="song.title">
      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
          <div class="song-artist">
            {{song.artist}}
          </div>
          <div class="song-genre">
            {{song.genre}}
          </div>
          <v-btn
            dark
            class="cyan"
            :to="{
              name: 'song',
              params: {
                songId: song.id
              }
            }">
          View
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="album-image" :src="song.albumImageUrl" />
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      songs: []
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .song {
    padding: 20px;
    height: 330px;
    overflow: hidden;
  }
  .song-title {
    font-size: 30px;
  }
  .song-artist {
    font-size: 24px;
  }
  .song-genre {
    font-size: 18px;
  }
  .album-image {
    width: 70%;
    margin: 0 auto;
  }
</style>
