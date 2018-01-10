<template>
  <panel
    title="Song Metadata"
    class="mb-2">
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
            name: 'song-edit',
            params () {
              return {
                songId: song.id
              }
            }
          }">
          Edit
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && !bookmark"
          dark
          class="cyan"
          @click="setBookmark">
          Set Bookmark
        </v-btn>

        <!-- instead of v-if $store.state.isUserLoggedIn -->
        <v-btn
          dark
          v-if="isUserLoggedIn && bookmark"
          class="cyan"
          @click="unsetBookmark">
          Unset Bookmark
        </v-btn>

      </v-flex>
      <v-flex xs6>
        <img class="album-image" :src="song.albumImageUrl" /><br>
        {{song.album}}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  props: [
    'song'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    // if you pass this whatever state variables you want,
    // it will put them on this computed function
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      const bookmarks = (await BookmarksService.index({
        songId: this.song.id
      })).data
      if (bookmarks.length) {
        this.bookmark = bookmarks[0]
      }
    }
  },
  methods: {
    async setBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id
        })).data
      } catch (error) {
        console.log('Error trying to set user bookmark', error)
      }
    },
    async unsetBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (error) {
        console.log('Error Unsetting Bookmark', error)
      }
    }
  }
}
</script>
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
