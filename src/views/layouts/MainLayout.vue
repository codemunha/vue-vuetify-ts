<template>
  <v-app id="inspire" class="app dashboard">
    <AppDrawer class="app--drawer" :show-drawer="showDrawer"></AppDrawer>
    <AppToolbar class="app--toolbar" :show-drawer="showDrawer" @side-icon-click="handleDrawerVisiable"></AppToolbar>
    <v-content>
      <div class="page-wrapper" style="margin-top: 64px;padding: 10px 40px;">
        <!-- Page Header -->
        <PageHeader style="padding: 0 !important;"></PageHeader>
        <router-view></router-view>
      </div>
      <!-- App Footer -->
      <v-footer height="auto" class="white pa-3 app--footer">
        <span class="caption">isocked.com Design &copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-content>
    <!-- Go to top -->
    <AppFab></AppFab>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppDrawer from '@/components/AppDrawer.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import AppFab from '@/components/AppFab.vue'
import PageHeader from '@/components/PageHeader.vue'

@Component({
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader
  }
})
export default class MainLayout extends Vue {
  showDrawer: boolean = true

  handleDrawerVisiable() {
    this.showDrawer = !this.showDrawer
  }
}

</script>

<style>
.page-wrapper {
  min-height: calc(100vh - 64px - 50px);
}
</style>