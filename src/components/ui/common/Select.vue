<template>
  <div class="select_btn">
    <div class="select_contents" tabindex="-1" @blur="hide">
      <div class="select" v-on:click="onShow">
        <p :class="this.pArrowUp">{{selectData.emptyText}}</p>
      </div>
      <ul class="select_view" :style="this.selectViewStyle">
        <li v-for="(item, index) in selectData.textList" :key="index" @click="onClick(item)" v-on:click="onShow">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectViewStyle: {
        display: 'none'
      },
      pArrowUp: ''
    }
  },
  props: {
    selectData: {
      type: Object,
      default () {
        return {
          emptyText: '',
          textList: []
        }
      }
    },
    onClick: {
      type: Function,
      required: false,
      default: function (item) {
        this.selectData.emptyText = item
      }
    }
  },
  methods: {
    onShow () {
      if (this.selectViewStyle.display === 'none') {
        this.pArrowUp = 'arrow_up'
        this.selectViewStyle.display = 'block'
      } else {
        this.pArrowUp = ''
        this.selectViewStyle.display = 'none'
      }
    },
    hide () {
      this.pArrowUp = ''
      this.selectViewStyle.display = 'none'
    }
  }
}
</script>

<style lang="css" scoped>
</style>
