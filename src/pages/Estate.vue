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
                    <l-marker 
                        v-for="(item, index) in ubications" :key="index"
                        :lat-lng="item.center"
                        :radius="item.radius"
                        :color="item.color"
                        @click="openModal('bottom', item.data)">
                        <l-icon
                                :icon-size="dynamicSize"
                                :icon-anchor="dynamicAnchor"
                                icon-url="https://i.ibb.co/jfb3LCh/logo.png" >
                        </l-icon>
                    </l-marker>
                    <!-- <l-circle
                        v-for="(item, index) in ubications" :key="index"
                        :lat-lng="item.center"
                        :radius="item.radius"
                        :color="item.color"
                        @click="openModal('bottom', item.data)"
                    /> -->
                </l-map>
                <q-fab color="purple" icon="keyboard_arrow_up" direction="up" style="position: absolute; margin-top: -10vh; margin-left: 70vw;">
                    <q-fab-action color="primary" @click="modalAddUbication()" icon="add_location" />
                </q-fab>
            </div>
        </section>

        <q-dialog v-model="dialog_2" position="bottom" width="800px">
            <q-card width="1800px">
                <q-toolbar>
                    <q-avatar>
                        <img src="https://i.ibb.co/jfb3LCh/logo.png">
                    </q-avatar>

                    <q-toolbar-title>Agregar ubicacion manual</q-toolbar-title>

                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>

                <q-card-section>
                    <section class="row">
                        <div class="col">
                            <q-form
                                @submit="addUbication"
                                class="q-gutter-md"
                            >
                                <section class="row">
                                    <div class="col">
                                        <q-input v-model="ubication.name" type="text" label="Nombre de la direccion" />
                                        <q-input v-model="ubication.lat" type="text" label="Latitud de la direccion" />
                                        <q-input v-model="ubication.long" type="text" label="Longitud de la direccion" />
                                    </div>
                                </section>
                                <div>
                                    <q-btn label="Submit" type="submit" color="primary"/>
                                    
                                </div>
                            </q-form>
                        </div>
                    </section>
                </q-card-section>
            </q-card>
        </q-dialog>

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
import {LMap, LTileLayer, LCircle, LMarker, LIcon} from 'vue2-leaflet';
import { db } from 'boot/firebase'

export default {
    components: {
        LMap,
        LTileLayer,
        LCircle,
        LMarker, 
        LIcon,
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
            dialog_2: false,
            position: 'top',
            ubicationInfo: '',

            //Add ubication
            ubication: {
                dates: [],
                name: '',
                origin: [],
                placeId: '',
                records: 1,
                lat: '',
                long: '',
            },

            iconSize: 16
        }
    },

    mounted(){
        this.getUbications()
        this.getAllUbications()
    },

    computed: {
        dynamicSize () {
        return [this.iconSize, this.iconSize * 1.15];
        },
        dynamicAnchor () {
        return [this.iconSize, this.iconSize * 1.15];
        }
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

        async addUbication(){
            try {
                this.ubication.origin = [ this.ubication.lat, this.ubication.long ]

                let response = await db.collection('infected_locations')
                                        .add(this.ubication)

                this.dialog_2 = false
            } catch (error) {
                console.log(error)
            }
            finally{
                this.getUbications()
            }
        },

        async getUbications(){
            try {
                let response = await db.collection('infected_locations')
                                        .get()
                                        .then((query) => {
                                            query.forEach((doc) => {
                                                console.log(Array.isArray(doc.data().origin))
                                                if(Array.isArray(doc.data().origin)){
                                                    let ubication = {
                                                        center: [doc.data().origin[0], doc.data().origin[1]],
                                                        radius: 100,
                                                        color: 'red',
                                                        data: doc.data()
                                                    }

                                                    this.ubications.push(ubication)
                                                }else{
                                                    let ubication = {
                                                        center: [doc.data().origin.V, doc.data().origin.U],
                                                        radius: 100,
                                                        color: 'red',
                                                        data: doc.data()
                                                    }

                                                    this.ubications.push(ubication)
                                                }
                                                
                                            })
                                        })
                
            } catch (error) {
                console.log(error)
            }
        },

        modalAddUbication(){
            this.dialog_2 = true
        },
    }
}
</script>
