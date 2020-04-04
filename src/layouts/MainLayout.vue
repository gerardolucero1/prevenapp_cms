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
            <q-item to="/home" v-if="user.user.userType == 'admin'">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="dashboard" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Dashboard</q-item-label>
                    <q-item-label caption lines="2">Información general</q-item-label>
                </q-item-section>
            </q-item>

            <q-item to="/users" v-if="user.user.userType == 'admin'">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="supervisor_account" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Usuarios</q-item-label>
                    <q-item-label caption lines="2">Información de usuarios App</q-item-label>
                </q-item-section>
            </q-item>

            <q-item to="/state" v-if="user.user.userType == 'admin'">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="bar_chart" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Mapa App</q-item-label>
                    <q-item-label caption lines="2">Información Aplicación</q-item-label>
                </q-item-section>
            </q-item>

            <q-item to="/registroscc">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="supervisor_account" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Seguimiento</q-item-label>
                    <q-item-label caption lines="2">Lista de registros call center</q-item-label>
                </q-item-section>
            </q-item>

            <q-item to="/calls" v-if="user.user.userType == 'admin'">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="explore" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Mapa Call Center</q-item-label>
                    <q-item-label caption lines="2">Informacion call center</q-item-label>
                </q-item-section>
            </q-item>

            <q-item style="display:none" to="/tracing" v-if="user.user.userType == 'admin' || user.user.userType == 'seguimiento'">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="transfer_within_a_station" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Seguimiento</q-item-label>
                    <q-item-label caption lines="2">Informacion de seguimiento</q-item-label>
                </q-item-section>
            </q-item>

            <q-item to="/form" v-if="user.user.userType == 'admin' || user.user.userType == 'doctor'">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="assignment" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Formulario</q-item-label>
                    <q-item-label caption lines="2">Formulario</q-item-label>
                </q-item-section>
            </q-item>

            <q-item style="cursor: pointer;">
                <q-item-section top avatar>
                    <q-avatar text-color="black" icon="exit_to_app" />
                </q-item-section>
                <q-item-section @click="exit">
                    <q-item-label>Salir</q-item-label>
                    <q-item-label caption lines="2">Cerrar sesion</q-item-label>
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
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
    }
  },

  created(){

  },

  computed: {
      ...mapState([
          'user',
      ])
  },

  methods: {
    ...mapActions([
        'closeSesion',
      ]),
    
    exit(){
      this.$store.dispatch('user/closeSesion')
      this.$router.push({ path: '/' })
    }
  }
}
</script>
