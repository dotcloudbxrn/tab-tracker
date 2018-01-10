<template>
  <panel
    title="Lyrics"
    class="ml-2">
    <textarea
      readonly
      v-model="lyrics">
    </textarea>
  </panel>
</template>

<script>
export default {
  props: [
    'lyrics'
  ]
}
</script>
<style scoped>
  textarea {
    width: 100%;
    font-family: monospace;
    height: 800px;
    border: none;
    border-style: none;
    border-color: transparent;
    overflow: auto;
    padding: 40px;
  }
</style>
