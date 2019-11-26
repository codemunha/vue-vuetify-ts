<template>
  <div>
    <v-app id="app">
      <HeaderLayout @menu-toggle="handleMenuToggle" />
      <MenuLayout :drawer="drawer" :mini="mini" />
      <v-content>
        <v-container fluid class="grey lighten-5">
          <v-row no-gutters>
            <v-col class="d-flex" :offset-lg="11" :lg="1">
              <v-select
                v-model="$i18n.locale"
                :items="langs"
                :label="$t('message.language')"
                dense
                outlined></v-select>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col :lg="12">
              <Breadcrumbs />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col :lg="12">
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
      <FooterLayout />

    </v-app>
    <v-overlay :value="overlay" style="z-index: 6;">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderLayout from './HeaderLayout.vue'
import MenuLayout from './MenuLayout.vue'
import FooterLayout from './FooterLayout.vue'
import { Getter } from 'vuex-class'
@Component({
  components: {
    HeaderLayout,
    MenuLayout,
    FooterLayout
  }
})
export default class MainLayout extends Vue {
  @Getter('requests') _requests!: number
  langs: Array<string> = ['th', 'en']
  drawer: boolean
  mini: Boolean
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
  get overlay() {
    return this._requests !== 0
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