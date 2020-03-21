<template>
  <v-app-bar
    :clipped-left="true"
    app>
    <v-app-bar-nav-icon
      @click.stop="menuToggle"/>
    <v-toolbar-title>Vuetify</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" depressed>
          <v-icon small left>{{ 'mdi-translate' }}</v-icon>
          {{ language }}
          <v-icon right>{{ 'mdi-menu-down' }}</v-icon>
        </v-btn>
        <!-- <v-btn v-bind="attrs" v-on="on" color="primary" depressed >
          <v-icon>{{ 'mdi-translate' }}</v-icon>
          Delete
        </v-btn> -->
      </template>

      <v-list>
        <v-list-item @click="handleLangs('th')">
          <v-list-item-title>ภาษาไทย</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleLangs('en')">
          <v-list-item-title>English</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class HeaderLayout extends Vue {
  langs: Array<string> = ['th', 'en']
  language: String
  constructor() {
    super()
    this.language = 'ภาษาไทย'
  }
  menuToggle() {
    this.$emit('menu-toggle')
  }
  handleLangs(lang :string):void {
    console.log(1231, lang)
    this.$i18n.locale = lang
    this.language = lang == 'th' ? 'ภาษาไทย' : 'English'
  }
}

</script>
