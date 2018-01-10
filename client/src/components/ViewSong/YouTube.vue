<template>
  <panel
    title="Youtube Video"
    class="ml-2">
    <youtube
      :videoId="youtubeId"
      :player-width="700"
      :player-height="280">
    </youtube>
  </panel>
</template>

<script>
export default {
  props: [
    'youtubeId'
  ]
}
</script>
<style scoped>

</style>
