<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
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
            Preven App
            </q-toolbar-title>

            <div>
              <!-- Hola Mundo -->
            </div>
        </q-toolbar>
        </q-header>

        <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-1"
        >
        <q-list>
            <q-item-label
                header
                class="text-grey-8"
                >
                Menu
            </q-item-label>
            <q-item to="/">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="dashboard" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Dashboard</q-item-label>
                    <q-item-label caption lines="2">Informacion general</q-item-label>
                </q-item-section>
            </q-item>

            <q-item to="/users">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="supervisor_account" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Usuarios</q-item-label>
                    <q-item-label caption lines="2">Informacion de usuarios</q-item-label>
                </q-item-section>
            </q-item>

            <q-item to="/state">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="bar_chart" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Estatal</q-item-label>
                    <q-item-label caption lines="2">Informacion del estado</q-item-label>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="explore" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Global</q-item-label>
                    <q-item-label caption lines="2">Informacion global</q-item-label>
                </q-item-section>
            </q-item>
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
          title: 'Dashboard',
          caption: 'Pagina inicial',
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
        }
      ]
    }
  }
}
</script>
