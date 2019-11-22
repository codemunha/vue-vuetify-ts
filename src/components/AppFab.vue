<template>
  <v-fab-transition>
    <v-btn
      fab="fab"
      small
      dark="dark"
      fixed="fixed"
      bottom="bottom"
      right="right"
      color="red"
      v-show="fab"
      @click="toTop">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AppFab extends Vue {
  fab: boolean

  constructor() {
    super()

    this.fab = false
  }

  onScroll() {
    if (typeof window === 'undefined') return

    const top = window.pageYOffset || document.documentElement.offsetTop || 0
    this.fab = top > 300
  }

  toTop() {
    this.$router.push({ hash: '' })
    this.$vuetify.goTo(0)
  }
}
</script>
