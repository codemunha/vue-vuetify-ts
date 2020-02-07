<template>
  <v-app-bar
    :clipped-left="true"
    app>
    <v-app-bar-nav-icon
      @click.stop="menuToggle"/>
    <v-toolbar-title>Vuetify</v-toolbar-title>
    <v-spacer/>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-menu
      v-model="value"
      :disabled="disabled"
      :absolute="absolute"
      :open-on-hover="openOnHover"
      :close-on-click="closeOnClick"
      :close-on-content-click="closeOnContentClick"
      :offset-x="offsetX"
      :offset-y="offsetY">
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on">
          <v-icon>{{ $t('message.language') }}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="lang(item)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class HeaderLayout extends Vue {
      items: Array<any> = [
        { title: 'th' },
        { title: 'en' }
      ]
        disabled: boolean = false
        absolute: boolean = false
        openOnHover: boolean = false
        value: boolean = false
        closeOnClick: boolean = true
        closeOnContentClick: boolean = true
        offsetX: boolean = false
        offsetY: boolean = true
        menuToggle() {
          this.$emit('menu-toggle')
        }
        lang (data: any) {
          this.$i18n.locale = data.title
        }
}

</script>
