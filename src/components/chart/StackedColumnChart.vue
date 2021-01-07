<template>
  <div>
    <vue-chart
      :chart-type="chartType"
      :columns="columns"
      :rows="rows"
      :options="options"
      ref="stackColumnChart"
    />
  </div>
</template>

<script>
export default {
  created () {
    switch (this.stackedColumnChartType) {
      case 'participationDegree':
        this.columns = [{
          'type': 'string',
          'label': '날짜'
        }, {
          'type': 'number',
          'label': '좋아요'
        }, {
          'type': 'number',
          'label': '댓글'
        }, {
          'type': 'number',
          'label': '저장'
        }]
        break
      case 'accountBuzzContentInsight':
        this.columns = [{
          'type': 'string',
          'label': '날짜'
        }, {
          'type': 'number',
          'label': '태그된 게시물'
        }, {
          'type': 'number',
          'label': '언급된 게시물'
        }, {
          'type': 'number',
          'label': '언급된 댓글'
        }]
        break
      default:
        break
    }
    this.$eventBus.$on('mainWindowResize', this.onReceive)
  },
  methods: {
    onReceive (event) {
      this.$refs.stackColumnChart.drawChart()
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('mainWindowResize')
  },
  computed: {
    rows () {
      return this.stackedColumnChartRows
    }
  },
  data () {
    return {
      chartType: 'ColumnChart',
      columns: [],
      options: {
        width: '100%',
        height: 400,
        colors: ['#84dab1', '#8c7fd9', '#ffec83'],
        focusTarget: 'category',
        isStacked: 'true',
        legend: {
          position: 'top'
        },
        vAxis: {
          format: '#,###'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  props: [
    'stackedColumnChartRows',
    'stackedColumnChartType'
  ]
}
</script>

<style scoped>

</style>
