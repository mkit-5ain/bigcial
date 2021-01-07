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
    rows () {
      if (this.medias) {
        let arr = []
        const reversedMedias = this.medias.slice(0).reverse()

        reversedMedias.forEach(media => {
          if (media['thumbnail_url']) {
            media['media_url'] = media['thumbnail_url']
          }

          arr.push([
            this.$moment(media.timestamp).format('YYYY-MM-DD'),
            this.createCustomHTMLContent(media['media_url'], media['like_count'], media['comments_count'], media['saved']),
            media['like_count'],
            media['comments_count'],
            media['saved']
          ])
        })

        return arr
      }
    }
  },
  data () {
    return {
      chartType: 'ColumnChart',
      columns: [{
        'type': 'string',
        'label': '날짜'
      }, {
        'type': 'string',
        'role': 'tooltip',
        'p': { 'html': true }
      }, {
        'type': 'number',
        'label': '좋아요'
      }, {
        'type': 'number',
        'label': '댓글'
      }, {
        'type': 'number',
        'label': '저장'
      }],
      options: {
        colors: ['#84dab1', '#8c7fd9', '#ffec83'],
        focusTarget: 'category',
        isStacked: true,
        legend: {
          position: 'top'
        },
        tooltip: {
          isHtml: true
        },
        vAxes: [
          {
            title: '참여도'
          }
        ],
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  props: [
    'medias'
  ],

  methods: {
    createCustomHTMLContent (flagURL, totalLike, totalComment, totalSaved) {
      let total = totalLike + totalComment + totalSaved
      return '<div style="padding:5px 5px 5px 5px;">' +
        '<img src="' + flagURL + '" style="width:75px;height:50px"><br/>' +
        '<table class="medals_layout">' + '<tr>' +
        '<td>TOTAL: </td>' +
        '<td><b>' + total + '</b></td>' + '</tr>' + '<tr>' +
        '<td>좋아요: </td>' +
        '<td><b>' + totalLike + '</b></td>' + '</tr>' + '<tr>' +
        '<td>댓글: </td>' +
        '<td><b>' + totalComment + '</b></td>' + '</tr>' + '<tr>' +
        '<td>저장: </td>' +
        '<td><b>' + totalSaved + '</b></td>' + '</tr>' + '<tr>'
    }
  }
}
</script>

<style scoped>

</style>
