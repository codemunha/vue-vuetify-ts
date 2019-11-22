<template>
  <v-layout
    row
    class="align-center layout px-4 pt-4 app--page-header">
    <div class="page-header-left">
      <h3 class="pr-3">{{ $route.meta.title || '' }}</h3>
    </div>
    <v-breadcrumbs
      divider="-"
      :items="breadcrumbs">
      <template v-slot:item="props">
        <a
          :href="props.item.href"
          :class="[props.item.disabled && 'disabled']">{{ props.item.text }}</a>
      </template>
    </v-breadcrumbs>
    <v-spacer></v-spacer>
    <div class="page-header-right">
      <v-btn icon>
        <v-icon class="text--secondary">refresh</v-icon>
      </v-btn>
    </div>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class PageHeader extends Vue {
  title: string;
  breadcrumbs: any;

  constructor() {
    super()

    this.title = 'Home'
  }

  @Watch('$route.path')
  onPathChange(newVal: string, oldval: string) {
    this.computeBreadcrumbs()
  }

  computeBreadcrumbs () {
    let breadcrumbs = [
      {
        text: 'home',
        href: '/#/home',
        disabled: false
      }
    ]
    let appends: Array<any> = []
    appends = this.$route.matched.filter(item => item.name != undefined && item.name != 'home').map(item => {
      return {
        text: item.name || '',
        href: item.path || '/',
        disabled: item.path === this.$route.path
      }
    })

    if (appends.length == 0) {
      this.breadcrumbs = breadcrumbs.map(item => {
        return {
          text: item.text || '',
          href: item.href || '/',
          disabled: true
        }
      })
    } else {
      this.breadcrumbs = breadcrumbs.concat(appends)
    }
  }

  created () {
    this.computeBreadcrumbs()
  }
}
</script>
<style lang="stylus" scoped>
.disabled {
  color: grey;
  pointer-events: none;
  text-decoration: blink;
}
</style>