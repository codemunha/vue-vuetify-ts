<template>
  <v-navigation-drawer
    v-model="_drawer"
    :clipped="false"
    :mini-variant="_mini"
    :disable-resize-watcher="true" :hide-overlay="true" :stateless="true" :touchless="true"
    app>
    <v-list dense>
      <template v-for="item in items">
        <v-row
          v-if="item.heading"
          :key="item.heading"
          align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col
            cols="6"
            class="text-center">
            <a
              href="#!"
              class="body-2 black--text">EDIT</a>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon="">
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.to ? child.to : '/'"
            link>
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :key="item.text"
          :to="item.to ? item.to : ''"
          link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class MenuLayout extends Vue {
  @Prop({ default: true }) drawer!: boolean
  @Prop({ default: false }) mini!: boolean
  items: Array<any>

  constructor() {
    super()

    this.items = [
      { icon: 'mdi-home', text: 'Home', to: 'home' },
      { icon: 'mdi-information', text: 'About', to: 'about' }
    ]
  }

  get _drawer() {
    return this.drawer
  }

  set _drawer(value: boolean) {
    this.drawer = value
  }

  get _mini() {
    return this.mini
  }

  set _mini(value: boolean) {
    this.mini = value
  }
}

</script>
