<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated class="text-red desktop-only">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <img alt="Meu Trecho" src="statics/img/logop.svg">
        </q-toolbar-title>

        <div>
          <q-btn flat dense round @click="onLogout" aria-label="Logout">
            <q-icon name="logout" title="Logout" />
          </q-btn>
          <q-btn flat dense round
            @click="onfullScreen" aria-label="FullScreen">
            <q-icon
            :name="this.fullScreen ? 'expand' : 'expand'"
            :title="this.fullScreen ? 'Contrair' : 'Expandir'" />
          </q-btn>
          <q-btn
            :icon="$q.dark.isActive ? 'mdi-brightness-5' : 'mdi-brightness-4'"
            flat
            dense
            round
            @click="$q.dark.isActive ? $q.dark.set(false) : $q.dark.set(true)"
            no-caps
          />
        </div>

      </q-toolbar>
    </q-header> -->

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      elevated
      >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      //
    }
  },
  methods: {
    onfullScreen: function () {
      this.fullScreen = !this.fullScreen
      if (this.fullScreen) {
        this.$q.fullscreen.request()
      } else {
        this.$q.fullscreen.exit()
      }
    }
  }
}
</script>
