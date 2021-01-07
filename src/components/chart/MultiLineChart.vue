<template>
  <div>
    <vue-chart
      :chart-type="chartType"
      :columns="columns"
      :rows="rows"
      :options="options"
      ref="multiLineChart"
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
      this.$refs.multiLineChart.drawChart()
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('mainWindowResize')
  },
  data () {
    return {
      arr: [],
      chartType: 'LineChart',
      columns: this.multiColumns,
      rows: this.multiRows,
      options: {
        height: 300,
        colors: ['#42b883', '#8c7fd9', '#ffec83'],
        focusTarget: 'category',
        legend: {
          position: 'top'
        },
        pointSize: 5,
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  watch: {
    multiRows: function (newData, oldData) {
      this.$data.rows = newData
    },
    multiColumns: function (newData, oldData) {
      this.$data.columns = newData
    }
  },
  props: [
    'multiRows',
    'multiColumns'
  ]
}
</script>

<style lang="scss" scoped>
</style>
