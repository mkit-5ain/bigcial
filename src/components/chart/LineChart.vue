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
  computed: {
    rows: {
      get () {
        return this.arr
      },
      set () {
        this.arr = []
        const rows = this.participationRateRows
        rows.forEach(row => {
          this.arr.push([row[0], this.createCustomHTMLContent(row[0], row[1], row[2]), row[1], row[2]])
        })
      }
    }
  },
  data () {
    return {
      arr: [],
      chartType: 'LineChart',
      columns: [{
        'type': 'string',
        'label': '기간'
      }, {
        'type': 'string',
        'role': 'tooltip',
        'p': { 'html': true }
      }, {
        'type': 'number',
        'label': '현재 게시물'
      }, {
        'type': 'number',
        'label': '비교 게시물'
      }],
      options: {
        height: 300,
        colors: ['#42b883', '#8c7fd9'],
        focusTarget: 'category',
        tooltip: { isHtml: true },
        vAxis: {
          minValue: 0,
          maxValue: 50,
          format: '#\'%\''
        },
        legend: {
          position: 'top'
        },
        pointSize: 5,
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  props: [
    'participationRateRows'
  ],
  watch: {
    participationRateRows (newVal, oldVal) {
      this.rows = newVal

      var min = 0
      var max = 0

      for (var i = 0; i < newVal.length; i++) {
        if (newVal[i][1]) {
          min = (min === 0) ? newVal[i][1] : (min >= newVal[i][1]) ? newVal[i][1] : min
          max = (max === 0) ? newVal[i][1] : (max <= newVal[i][1]) ? newVal[i][1] : max
        }

        if (newVal[i][2]) {
          min = (min === 0) ? newVal[i][2] : (min >= newVal[i][2]) ? newVal[i][2] : min
          max = (max === 0) ? newVal[i][2] : (max <= newVal[i][2]) ? newVal[i][2] : max
        }
      }
      this.options.vAxis.maxValue = max
    }
  },
  methods: {
    createCustomHTMLContent (day, currentMedia, compareMedia) {
      return '<div class="chart_info">' +
             '<div class="day">' + day + '</div>' +
             '<div class="currentMedia"><span class="bullet"></span><span>현재 게시물:</span><span>' + currentMedia + '%</span></div>' +
             '<div class="compareMedia"><span class="bullet"></span><span>비교 게시물:</span><span>' + compareMedia + '%</span></div>' +
             '</div>'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
