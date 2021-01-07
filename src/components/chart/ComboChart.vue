<template>
  <div>
    <vue-chart
      :chart-type="chartType"
      :columns="columns"
      :rows="rows"
      :options="options"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartType: 'ComboChart',
      columns: [{
        'type': 'string',
        'label': 'Period'
      }, {
        'type': 'number',
        'label': '좋아요'
      }, {
        'type': 'number',
        'label': '댓글'
      }],
      rows: [
        ['3/13 post', 234131, 600],
        ['3/13 post', 364500, 300],
        ['3/13 post', 123512, 200],
        ['3/13 post', 237485, 100],
        ['3/13 post', 257000, 500]
      ],
      options: {
        height: 400,
        colors: ['#84dab1', '#8c7fd9'],
        seriesType: 'bars',
        series: {
          0: { targetAxisIndex: 0 },
          1: { targetAxisIndex: 1, type: 'line' }
        },
        vAxes: [
          // {
          //   title: 'Like',
          //   minValue: '0'
          // },
          // {
          //   title: 'Comment',
          //   minValue: '0'
          // }
        ],
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<style scoped>

</style>
