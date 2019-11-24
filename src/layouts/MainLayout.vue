<template>
  <v-app id="app">
    <HeaderLayout @menu-toggle="handleMenuToggle" />
    <MenuLayout :drawer="drawer" :mini="mini" />
    <v-content>
      <v-container
        class="fill-height"
        fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <FooterLayout />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderLayout from './HeaderLayout.vue'
import MenuLayout from './MenuLayout.vue'
import FooterLayout from './FooterLayout.vue'

@Component({
  components: {
    HeaderLayout,
    MenuLayout,
    FooterLayout
  }
})
export default class MainLayout extends Vue {
  drawer: boolean
  mini: boolean

  constructor() {
    super()

    this.drawer = true
    this.mini = false
  }

  handleMenuToggle():void {
    let w = window.innerWidth

    if (w >= 1200) {
      this.mini = !this.mini
    } else {
      this.drawer = !this.drawer
    }
  }

  created() {
    window.addEventListener('resize', this.onResize)
  }

  onResize() {
    let w = window.innerWidth

    if (w >= 1200) {
      this.drawer = true
    } else {
      this.mini = false
    }
  }
}

</script>
