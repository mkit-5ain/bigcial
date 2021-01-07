<template>
  <div class="container">
    <StackGrid
      :columnWidth="200"
      :gutterX="20"
      :gutterY="20">
        <!-- you component like this -->
        <div class="stack-item"
          v-for="(item, index) in dataset" :key="index"
        >
        <ul id="inner_content">
          <li v-for="(item, index) in medias" :key="index">
            <img v-if="media.thumbnail_url" :src="media.thumbnail_url" @click="switchToPostDetail(media.id)">
            <img v-else :src="media.media_url" @click="switchToPostDetail(media.id)">
          </li>
        </ul>
          <!-- some thing have fixed height-->
        </div>
    </StackGrid>
  </div>
</template>

<script>
import StackGrid from 'vue-stack-grid-component'
export default {
  components: {
    StackGrid
  }
}
</script>

<style lang="scss" scoped>
</style>
