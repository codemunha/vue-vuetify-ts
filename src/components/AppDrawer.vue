<template>
  <v-navigation-drawer class="app--drawer" :mini-variant.sync="mini" app v-model="isShowDrawer"
                       :width="drawWidth" :disable-resize-watcher="true" :hide-overlay="true" :stateless="true">
    <v-toolbar color="primary darken-1" dark>
      <img :src="computeLogo" height="36" alt="Vue Material Admin Template" />
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">Vue Material</span>
      </v-toolbar-title>
    </v-toolbar>
    <PerfectScrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list dense expand>
        <template v-for="item in menus">
          <!--group with subitems-->
          <v-list-group
            v-if="item.items"
            :key="item.title"
            :group="item.group"
            :prepend-icon="item.icon"
            no-action="no-action">
            <v-list-tile slot="activator" ripple="ripple">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <template v-for="subItem in item.items">
              <!--sub group-->
              <v-list-group v-if="subItem.items" :key="subItem.name" :group="subItem.group" sub-group="sub-group">
                <v-list-tile slot="activator" ripple="ripple">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                  v-for="grand in subItem.children"
                  :key="grand.name"
                  :to="genChildTarget(item, grand)"
                  :href="grand.href"
                  ripple="ripple">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
              <!--child item-->
              <v-list-tile
                v-else
                :key="subItem.name"
                :to="genChildTarget(item, subItem)"
                :href="subItem.href"
                :disabled="subItem.disabled"
                :target="subItem.target"
                ripple="ripple">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span>{{ subItem.title }}</span>
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action v-if="subItem.action">
                  <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list-group>
          <v-subheader v-else-if="item.header" :key="item.name">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="item.name"></v-divider>
          <!--top-level link-->
          <v-list-tile
            v-else
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="item.name">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </PerfectScrollbar>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { menuService } from '@/api/MenuService'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IMenu } from '../interfaces'

@Component({
  components: {
    PerfectScrollbar
  }
})
export default class AppDrawer extends Vue {
  mini: boolean
  menus: Array<IMenu>
  scrollSettings: any
  _isShowDrawer: boolean = false

  @Prop({ default: true }) expanded!: boolean
  @Prop({ default: '260' }) private drawWidth!: string
  @Prop({ default: true }) private showDrawer!: boolean

  constructor() {
    super()

    this.mini = false
    this.menus = menuService.getMenuList()
    this.scrollSettings = {
      maxScrollbarLength: 160
    }
  }

  get isShowDrawer() {
    this._isShowDrawer = this.showDrawer
    return this._isShowDrawer
  }

  set isShowDrawer(value: boolean) {
    this._isShowDrawer = value
  }

  get _showDrawer(): boolean {
    return this.showDrawer
  }

  set _showDrawer(value: boolean) {
    this.showDrawer = value
  }

  get _drawWidth(): string {
    return this.drawWidth
  }

  set _drawWidth(value: string) {
    this._drawWidth = value
  }

  get _expanded(): boolean {
    return this.expanded
  }

  set _expanded(value: boolean) {
    this.expanded = value
  }

  get computeGroupActive() {
    return true
  }

  get computeLogo() {
    return '/static/m.png'
  }

  get sideToolbarColor() {
    return 'this.$vuetify.options.extra.sideNav'
  }

  genChildTarget(item: any, subItem: any) {
    if (subItem.href) return
    if (subItem.component) {
      return {
        name: subItem.component
      }
    }
    return { name: `${item.group}/${subItem.name}` }
  }
}
</script>

<style lang="stylus" scoped>
.app--drawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: auto
</style>
