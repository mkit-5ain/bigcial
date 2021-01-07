<template>
  <div>
    <vue-chart
      :chart-type="chartType"
      :columns="mColumns"
      :rows="mRows"
      :options="mOptions"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartType: 'ColumnChart'
    }
  },
  props: [
    'mColumns', 'mRows', 'mOptions'
  ]
}
</script>

<style scoped>

</style>
