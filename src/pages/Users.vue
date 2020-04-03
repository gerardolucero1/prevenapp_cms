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
                        <div class="col-12" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
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
                    </section>
                </q-card-section>
            </q-card>
        </q-dialog>

        <!-- <section class="row">
            <div class="col-6">
                <q-card class="my-card">
                    <q-card-section>
                        <div class="text-h6">{{ userSelect.name }}</div>
                        <div class="text-subtitle2">{{ userSelect.email }}</div>
                        <q-badge v-if="userSelect.infected" color="red" text-color="white" label="Expuesto" style="padding: 10px; font-size: 20px;" />
                        <q-badge v-else color="red" text-color="white" label="No Expuesto" style="padding: 10px; font-size: 20px;" />
                    </q-card-section>
                    <q-card-section>
                        ID de Usuario: {{ userSelect.uid }}
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-6">
                <q-card class="my-card">
                    <vue-qr :logoSrc='bgImage' :dotScale="0.30" text="ola bb 2" :size="800" :logoScale="0.2" :margin="20" :logoMargin="6" :logoCornerRadius="8"></vue-qr>
                    <vue-qr :text="userSelect.uid" :callback="getQR" :size="800" qid="testid"></vue-qr>
                </q-card>
            </div>
        </section> -->
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
            userSelect: '',

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
                { name: 'actions', label: 'Actions', field: '', align:'center' }
            ],

            //Modal
            dialog: false,
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
    }
}
</script>

<style>

</style>