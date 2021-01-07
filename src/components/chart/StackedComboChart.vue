<template>
  <div>
    <vue-chart
      :chart-type="chartType"
      :columns="columns"
      :rows="rows"
      :options="options"
      class="chart_test"
      ref="stackedComboChart"
    />
  </div>
</template>

<script>
export default {
  computed: {
    rows () {
      var val = this.$store.state.accountFollowerInsight.rows
      var followsMin = 0
      var followsMax = 0

      for (var i = 0; i < val.length; i++) {
        if (followsMin === 0) {
          followsMin = val[i][3]
        } else {
          if (followsMin >= val[i][3]) {
            followsMin = val[i][3]
          }
        }

        if (followsMax === 0) {
          followsMax = val[i][3]
        } else {
          if (followsMax <= val[i][3]) {
            followsMax = val[i][3]
          }
        }
      }
      this.setFollowsMin(followsMin * 0.99)
      this.setFollowsMax(followsMax * 1.01)

      return this.$store.state.accountFollowerInsight.rows
    }
  },
  created () {
    this.$eventBus.$on('mainWindowResize', this.onReceive)
  },
  methods: {
    onReceive (event) {
      this.$refs.stackedComboChart.drawChart()
    },
    setFollowsMin (val) {
      this.options.vAxes[1].viewWindow.min = val
    },
    setFollowsMax (val) {
      this.options.vAxes[1].viewWindow.max = val
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('mainWindowResize')
  },
  data () {
    return {
      chartType: 'ColumnChart',
      columns: [{
        'type': 'string',
        'label': '날짜'
      }, {
        'type': 'number',
        'label': '증가'
      }, {
        'type': 'number',
        'label': '감소'
      }, {
        'type': 'number',
        'label': '전체 팔로워 수'
      }],
      options: {
        width: '100%',
        height: 400,
        colors: ['#84dab1', '#ffec83', '#8c7fd9'],
        isStacked: 'true',
        seriesType: 'bars',
        series: {
          0: { targetAxisIndex: 0 },
          1: { targetAxisIndex: 0 },
          2: { targetAxisIndex: 1, type: 'line' }
        },
        vAxes: [
          {
            title: '증감'
          },
          {
            title: '전체 팔로워 수',
            gridlines: {color: '#fff'},
            viewWindow: {
            }
          }
        ],
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<style scoped>
.chart_test{transition: opacity .5s;}
</style>
