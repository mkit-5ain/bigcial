<template>
  <div class="vue-calendar">
    <datetime v-model="datetime" type="datetime" :minute-step="10" placeholder="Select date"></datetime>
  </div>
</template>

<script>
export default {
  name: 'MiniCalendar',
  data () {
    return {
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
