<template>
    <div>
      <vue-chart
        :chart-type="chartType"
        :columns="columns"
        :rows="rows"
        :options="options"
        ref="stackedRowChart"
      />
    </div>
</template>

<script>
export default {
  computed: {
    rows () {
      return this.$store.state.accountFollowerDemographics.rows
    }
  },
  created () {
    this.$eventBus.$on('mainWindowResize', this.onReceive)
  },
  methods: {
    onReceive (event) {
      this.$refs.stackedRowChart.drawChart()
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('mainWindowResize')
  },
  data () {
    return {
      chartType: 'BarChart',
      columns: [{
        'type': 'string',
        'label': '연령'
      }, {
        'type': 'number',
        'label': '여성'
      }, {
        'type': 'number',
        'role': 'tooltip'
      }, {
        'type': 'number',
        'label': '남성'
      }, {
        'type': 'number',
        'role': 'tooltip'
      }],
      options: {
        width: '100%',
        height: 400,
        colors: ['#84dab1', '#8c7fd9'],
        focusTarget: 'category',
        isStacked: 'true',
        legend: {
          position: 'top'
        },
        vAxis: {
          title: '연령'
        },
        hAxis: {
          format: '#,###;#,###'
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
