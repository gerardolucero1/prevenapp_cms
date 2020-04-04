<style lang="sass" scoped>
    .row > div
        padding: 10px 15px
    
    .row + .row
        margin-top: 10px
</style>

<template>
    <q-page>
        <section class="row">
            <div class="col">
                <q-table
                    title="Usuarios"
                    :data="users"
                    :columns="columns"
                    row-key="name"
                >
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <q-btn dense round flat color="grey" @click="getUser(props, 'bottom')" icon="visibility"></q-btn>
                        </q-td>          
                    </template>  
                    
                </q-table>
            </div>
        </section>

        <q-fab color="purple" icon="keyboard_arrow_up" direction="up" style="position: absolute; margin-top: -10vh; margin-left: 70vw;">
                    <q-fab-action color="primary" @click="modalAddUser()" icon="add_location" />
                </q-fab>

        <q-dialog v-model="dialog" :position="position">
            <q-card>
                <q-toolbar>
                    <q-avatar>
                        <img src="https://i.ibb.co/jfb3LCh/logo.png">
                    </q-avatar>

                    <q-toolbar-title style="margin-top: 20px; margin-left: 10px;">{{ userSelect.name }}</q-toolbar-title>

                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>

                <q-card-section>
                    <section class="row">
                        <div class="col-12" style="display: none; justify-content: center; align-items: center; flex-direction: column;">
                            <q-badge v-if="!userSelect.infection" style="font-size: 20px; padding: 10px;" color="green" text-color="white" label="No Expuesto" />
                            <q-badge v-else style="font-size: 20px; padding: 10px;" color="red" text-color="white" label="Expuesto" />
                            <q-btn style="margin-top: 10px;" color="primary" label="Cambiar" @click="updateStatus" />
                        </div>
                    </section>
                    <section class="row">
                        <div class="col-12" width="100%">
                            <!-- <vue-qr :logoSrc='bgImage' :dotScale="0.30" text="ola bb 2" :size="800" :logoScale="0.2" :margin="20" :logoMargin="6" :logoCornerRadius="8"></vue-qr> -->
                            <vue-qr :text="userSelect.uid" :callback="getQR" :size="350" qid="testid"></vue-qr>
                        </div>
                        <q-btn style="margin-top: 10px;" color="primary" label="Usuario Captura" @click="updateCaptura" />
                        <q-btn style="margin-top: 10px;" color="primary" label="Usuario Seguimiento" @click="updateSeguimiento" />
                    </section>
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-dialog v-model="dialog2" :position="position">
            <q-card>
                <q-toolbar>
                    <q-avatar>
                        <img src="https://i.ibb.co/jfb3LCh/logo.png">
                    </q-avatar>

                    <q-toolbar-title style="margin-top: 20px; margin-left: 10px;"></q-toolbar-title>

                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>

                <q-card-section>
                    <section class="row">
                        <div class="col-12" width="100%">
                            <q-input v-model="nombreEmail" type="text" label="" />
                            <q-input v-model="nombreInfeccion" type="text" label="Usuario" />
                            <q-input v-model="nombreName" type="text" label="Usuario" />

                        </div>
                        <q-btn style="margin-top: 10px;" color="primary" label="Guardar Usuario" @click="registrarUsuario" />
                    </section>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
//Firebase
import { db } from 'boot/firebase'

//QR
var QRCode = require('qrcode')
var canvas = document.getElementById('canvas')

import VueQr from 'vue-qr'

export default {
    name: 'Users',

    components: {
        VueQr
    },  

    data(){
        return{
            search: '',
            users: [],
            //datos nuevo usuario
            userEmail: '',
            userInfection: '',
            userName: '',
            userTerms: '',
            userType:'Doctor',

            nombreUsuario: '',

            bgImage: 'https://i.ibb.co/jfb3LCh/logo.png',

            columns: [
                {
                    name: 'name',
                    required: true,
                    label: 'Nombre',
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
                { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
                { name: 'uid', align: 'left', label: 'UID', field: 'uid', sortable: true },
                { name: 'typeUser', align: 'left', label: 'Rol', field: 'userType', sortable: true },
                { name: 'actions', label: 'Actions', field: '', align:'center' }
            ],

            //Modal
            dialog: false,
            dialog2: false,
            position: 'top',
        }
    },

    mounted(){
        this.getUsers()
    },

    methods: {
        async getUsers(){
            this.users = []
            try {
                let response = await db.collection('users')
                                                .get()
                                                .then((doc) => {
                                                    doc.forEach((res) => {
                                                        this.users.push(res.data())
                                                    })
                                                })

                if(this.userSelect != ''){
                    this.userSelect = this.users.find((doc) => {
                        return this.userSelect.uid = doc.uid
                    })

                    console.log(this.userSelect)
                }
            } catch (error) {
                console.log(error)
            }
        },
        modalAddUser(){
            this.dialog2=true;
        },

        getUser(args, position){
            this.userSelect = args.row

            this.position = position
            this.dialog = true

            this.getQR()
        },

        getQR(dataUrl,id){
            // console.log(dataUrl, id)
        },

        //Actualizamos el estado del usuario
        updateStatus(){
            let changeStatus = confirm('¿Seguro quieres actualizar el estatus de este usuario?')
            
            if(changeStatus){
                this.updateStatusUser()
            }
        },

        updateCaptura(){
            let changeStatus = confirm('¿Seguro quieres actualizar el estatus de este usuario?')
            
            if(changeStatus){
                this.updateCapturaUser()
            }
        },
        updateSeguimiento(){
            let changeStatus = confirm('¿Seguro quieres actualizar el estatus de este usuario?')
            
            if(changeStatus){
                this.updateSeguimientoUser()
            }
        },

        async updateStatusUser(){
            try {
                let response = await db.collection('users')
                                        .doc(this.userSelect.uid)
                                        .update({ infection: !this.userSelect.infection })

                this.getUsers()

                

            } catch (error) {
                console.log(error)
            }
        },
        async updateCapturaUser(){
            try {
                let response = await db.collection('users')
                                        .doc(this.userSelect.uid)
                                        .update({ userType: 'doctor' })

                this.getUsers()

                

            } catch (error) {
                console.log(error)
            }
        },
        async updateSeguimientoUser(){
            try {
                let response = await db.collection('users')
                                        .doc(this.userSelect.uid)
                                        .update({ userType: 'Seguimiento' })

                this.getUsers()

                

            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>

<style>

</style>