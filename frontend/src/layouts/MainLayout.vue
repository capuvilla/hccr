<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="text-red">
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
    </q-header>

    <q-drawer
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Docs',
          caption: 'quasar.dev',
          icon: 'school',
          link: 'https://quasar.dev'
        },
        {
          title: 'Github',
          caption: 'github.com/quasarframework',
          icon: 'code',
          link: 'https://github.com/quasarframework'
        },
        {
          title: 'Discord Chat Channel',
          caption: 'chat.quasar.dev',
          icon: 'chat',
          link: 'https://chat.quasar.dev'
        },
        {
          title: 'Forum',
          caption: 'forum.quasar.dev',
          icon: 'record_voice_over',
          link: 'https://forum.quasar.dev'
        },
        {
          title: 'Twitter',
          caption: '@quasarframework',
          icon: 'rss_feed',
          link: 'https://twitter.quasar.dev'
        },
        {
          title: 'Facebook',
          caption: '@QuasarFramework',
          icon: 'public',
          link: 'https://facebook.quasar.dev'
        },
        {
          title: 'Quasar Awesome',
          caption: 'Community Quasar projects',
          icon: 'favorite',
          link: 'https://awesome.quasar.dev'
        }
      ]
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
