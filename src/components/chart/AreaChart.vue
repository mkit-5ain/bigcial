<template>
  <div>
    <vue-chart
      :chart-type="chartType"
      :columns="columns"
      :rows="rows"
      :options="options"
      ref="areaChart"
    />
  </div>
</template>

<script>
export default {
  created () {
    this.$eventBus.$on('mainWindowResize', this.onReceive)
  },
  methods: {
    onReceive (event) {
      this.$refs.areaChart.drawChart()
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('mainWindowResize')
  },
  computed: {
    rows () {
      return this.$store.state.accountProfileViews.rows
    }
  },
  data () {
    return {
      chartType: 'AreaChart',
      columns: [{
        'type': 'string',
        'label': '날짜'
      }, {
        'type': 'number',
        'label': '노출'
      }, {
        'type': 'number',
        'label': '도달'
      }],
      options: {
        width: '100%',
        height: 400,
        colors: ['#42b883', '#8c7fd7'],
        legend: {
          position: 'top'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<style scoped>

</style>
