<template>
  <v-app-bar
    :clipped-left="false"
    app>
    <v-app-bar-nav-icon
      @click.stop="menuToggle"/>
    <v-toolbar-title>Vuetify</v-toolbar-title>
  </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class HeaderLayout extends Vue {
  menuToggle() {
    this.$emit('menu-toggle')
  }
}

</script>
