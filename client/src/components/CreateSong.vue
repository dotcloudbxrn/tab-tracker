<template>
  <v-layout>
    <v-flex xs4>
    <panel title="Song Metadata">
      <v-text-field
        label="Title"
        name="email"
        required
        :rules="[required]"
        v-model="song.title"
      ></v-text-field>

      <v-text-field
        label="Artist"
        name="artist"
        required
        :rules="[required]"
        v-model="song.artist"
      ></v-text-field>

      <v-text-field
        label="Album"
        name="album"
        required
        :rules="[required]"
        v-model="song.album"
      ></v-text-field>

      <v-text-field
        label="Genre"
        name="genre"
        required
        :rules="[required]"
        v-model="song.genre"
      ></v-text-field>

      <v-text-field
        label="Album Image Url"
        name="albumImageUrl"
        required
        :rules="[required]"
        v-model="song.albumImageUrl"
      ></v-text-field>

      <v-text-field
        label="Youtube ID"
        name="youtubeId"
        required
        :rules="[required]"
        v-model="song.youtubeId"
      ></v-text-field>
    </panel>
    </v-flex>

    <v-flex xs-8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field
          label="Lyrics"
          name="lyrics"
          required
          :rules="[required]"
          multi-line
          v-model="song.lyrics"
        ></v-text-field>

        <v-text-field
          label="Tab"
          name="tab"
          multi-line
          required
          :rules="[required]"
          v-model="song.tab"
        ></v-text-field>
      </panel>

      <div class="danger-alert" v-if="error">
        {{error}}
      </div>
      <v-btn
        dark
        class="cyan"
        @click="create">
        Create Song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        album: null,
        genre: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      // helllllllllooooooooooooooooo... (It's defined, yo.)
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create (song) {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])

      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        await SongsService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log('Error trying to create song!', err)
      }
    }
  }
}
</script>
<style scoped>

</style>
