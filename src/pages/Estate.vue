<style lang="sass" scoped>
    .map_container
        height: 93vh
</style>

<template>
    <q-page>
        <section class="row">
            <div class="col map_container">
                <l-map
                    style="height: 100%; width: 100%"
                    :zoom="zoom"
                    :maxZoom="13"
                    :center="center"
                    @update:zoom="zoomUpdated"
                    @update:center="centerUpdated"
                    @update:bounds="boundsUpdated"
                    >
                    <l-tile-layer :url="url"></l-tile-layer>
                    <l-circle
                        v-for="(item, index) in ubications" :key="index"
                        :lat-lng="item.center"
                        :radius="item.radius"
                        :color="item.color"
                        @click="openModal('bottom', item.data)"
                    />
                </l-map>
            </div>
        </section>

        <q-dialog v-model="dialog" :position="position">
            <q-card>
                <q-toolbar>
                    <q-avatar>
                        <img src="https://i.ibb.co/jfb3LCh/logo.png">
                    </q-avatar>

                    <q-toolbar-title>{{ ubicationInfo.name }}</q-toolbar-title>

                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>

                <q-card-section>
                    Numero de casos registrados: {{ ubicationInfo.records }}
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import {LMap, LTileLayer, LCircle} from 'vue2-leaflet';
import { db } from 'boot/firebase'

export default {
    components: {
        LMap,
        LTileLayer,
        LCircle,
    },

    data () {
        return {
            //Mapa
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 13,
            center: [28.7262262, -106.1216247],
            bounds: null,

            //Ubicaciones
            ubications: [],

            //Modal
            dialog: false,
            position: 'top',
            ubicationInfo: '',
        }
    },

    mounted(){
        this.getUbications()
    },

    methods: {
        zoomUpdated (zoom) {
            this.zoom = zoom;
        },

        centerUpdated (center) {
            this.center = center;
        },

        boundsUpdated (bounds) {
            this.bounds = bounds;
        },

        openModal(position, data) {
            this.position = position
            this.dialog = true

            this.ubicationInfo = data
        },

        async getUbications(){
            try {
                let response = await db.collection('infected_locations')
                                        .get()
                                        .then((query) => {
                                            query.forEach((doc) => {

                                                let ubication = {
                                                    center: [doc.data().origin.V, doc.data().origin.U],
                                                    radius: 100,
                                                    color: 'red',
                                                    data: doc.data()
                                                }

                                                this.ubications.push(ubication)
                                            })
                                        })
                
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
