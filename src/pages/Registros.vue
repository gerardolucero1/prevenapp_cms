<style lang="sass" scoped>
    .row > div
        padding: 10px 15px
    
    .row + .row
        margin-top: 10px

    .box
        margin-top: 20px
        background-color: #FAFAFA
        border: 1px solid #C2C2C2

    .title
        font-size: 18px
        padding: 10px
        background-color: white
        border: 1px solid black
</style>

<template>
    <q-page>
        <section class="row">
            <div class="col">
                <q-btn color="blue" style="margin:10px" @click="getUsers()">Todos</q-btn>
                <q-btn color="blue" style="margin:10px" @click="getHospitalarios()">Hospitalarios</q-btn>
                <q-btn color="blue" style="margin:10px" @click="getSospechosos()">Sospechoso</q-btn>
                <q-btn color="blue" style="margin:10px" @click="getSinRiesgo()">Sin Riesgo</q-btn>
                <!-- <q-input type="text" placeholder="Buscar" @keyup.enter="getNombre()" v-model="buscadorNombre"></q-input> -->
                <q-table
                            title="Registros"
                            :data="users"
                            :columns="columns"
                            row-key="name"
                            :filter="filter"
                        >
                            <template v-slot:top>
                                <q-space />
                                <q-input borderless dense debounce="300" color="primary" v-model="filter">
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>
                            </template>
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

                    <q-toolbar-title style="margin-top: 20px; margin-left: 10px;">{{ userSelect.name }} {{ userSelect.lastName }} {{ userSelect.secondLastName }}</q-toolbar-title>

                    <q-btn flat round dense icon="close" v-close-popup />
                </q-toolbar>

                <q-card-section>
                    <section class="row">
                        <div class="col-12" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                            <label style="font-size:14px; font-weight:bold; ">Status Actual</label>
                            <q-badge v-if="userSelectStatus=='Hospitalario'" style="font-size: 12px; padding: 8px;" color="red" text-color="white" label="Hospitalario" />
                            <q-badge v-if="userSelectStatus=='Sospechoso'" style="font-size: 12px; padding: 8px;" color="orange" text-color="white" label="Sospechoso" />
                            <q-badge v-if="userSelectStatus=='Sin Riesgo'" style="font-size: 12px; padding: 8px;" color="green" text-color="white" label="Sin Riesgo" />
                            <label  style="font-size:14px; font-weight:bold; ">Resumen de ultimo diagnostico:</label>
                            <label style="text-align:left">Sintomas:</label>
                            <ul>
                                <li v-if="userSelectSymptoms['0']!=undefined">{{userSelectSymptoms['0']}}</li>
                                <li v-if="userSelectSymptoms['1']!=undefined">{{userSelectSymptoms['1']}}</li>
                                <li v-if="userSelectSymptoms['2']!=undefined">{{userSelectSymptoms['2']}}</li>
                                <li v-if="userSelectSymptoms['3']!=undefined">{{userSelectSymptoms['3']}}</li>
                                <li v-if="userSelectSymptoms['4']!=undefined">{{userSelectSymptoms['4']}}</li>
                                <li v-if="userSelectSymptoms['5']!=undefined">{{userSelectSymptoms['5']}}</li>
                                <li v-if="userSelectSymptoms['6']!=undefined">{{userSelectSymptoms['6']}}</li>
                                <li v-if="userSelectSymptoms['7']!=undefined">{{userSelectSymptoms['7']}}</li>
                                <li v-if="userSelectSymptoms['8']!=undefined">{{userSelectSymptoms['8']}}</li>
                            </ul>

                            <q-btn style="margin-top: 10px;" color="primary" @click="goToForm()" label="Seguimiento" />
                            
                            
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
            buscadorNombre:'',
            search: '',
            users: [],
            usersF: [],
            userSelect: '',
            id:'',
            userSelectStatus: '',
            userSelectSymptoms: '',

            bgImage: 'https://i.ibb.co/jfb3LCh/logo.png',
            
            filter: '',

            columns: [
                {
                    name: 'name',
                    required: true,
                    label: 'Nombre',
                    align: 'left',
                    field: row => row.generalData.name + ' '+ row.generalData.lastName+ ' '+ row.generalData.secondLastName,
                    format: val => `${val}`,
                    sortable: true
                },
                { name: 'folio', align: 'left', label: 'folio', field: row => row.generalData.numFolio, sortable: true },
                { name: 'diagnostico', align: 'left', label: 'Diagnostico', field: 'opinion', sortable: true },
                { name: 'telefono', align: 'left', label: 'Teléfono', field: row => row.generalData.telephone, sortable: true },
                { name: 'ultimaActualizacion', align: 'left', label: 'Ultima Actualización', field: row => row.generalData.fechaActual, sortable: true },
                { name: 'edad', align: 'left', label: 'Edad', field: row => row.generalData.age, sortable: true },
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
            this.usersF = [];
            this.users = [];
            let contador=0;
            let folios=[];
            try {
                let response = await db.collection('forms').orderBy('generalData.timestamp', 'desc')
                                                .get()
                                                .then((doc) => {
                                                    doc.forEach((res) => {

                                                        this.usersF.push(res.data());

                                                        if(folios.includes(this.usersF[contador].generalData.numFolio)){
                                                            
                                                        }else{
                                                        
                                                        this.users.push(res.data());}
                                                        folios[contador]=this.usersF[contador].generalData.numFolio;
                                                        contador++;
                                                        
                                                        
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
        async getSospechosos(){
            this.usersF = [];
            this.users = [];
            let contador=0;
            let folios=[];
            try {
                let response = await db.collection('forms').where("opinion", '==', 'Sospechoso')
                                                .get()
                                                .then((doc) => {
                                                    doc.forEach((res) => {
                                                        this.usersF.push(res.data());

                                                        if(folios.includes(this.usersF[contador].generalData.numFolio)){
                                                            
                                                        }else{
                                                        
                                                        this.users.push(res.data());}
                                                        folios[contador]=this.usersF[contador].generalData.numFolio;
                                                        contador++;
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
        async getHospitalarios(){
            this.usersF = [];
            this.users = [];
            let contador=0;
            let folios=[];
            try {
                let response = await db.collection('forms').where("opinion", '==', 'Hospitalario')
                                                .get()
                                                .then((doc) => {
                                                    doc.forEach((res) => {
                                                        this.usersF.push(res.data());

                                                        if(folios.includes(this.usersF[contador].generalData.numFolio)){
                                                            
                                                        }else{
                                                        
                                                        this.users.push(res.data());}
                                                        folios[contador]=this.usersF[contador].generalData.numFolio;
                                                        contador++;
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
        async getSinRiesgo(){
           this.usersF = [];
            this.users = [];
            let contador=0;
            let folios=[];
            try {
                let response = await db.collection('forms').where("opinion", '==', 'Sin riesgo')
                                                .get()
                                                .then((doc) => {
                                                    doc.forEach((res) => {
                                                        this.usersF.push(res.data());

                                                        if(folios.includes(this.usersF[contador].generalData.numFolio)){
                                                            
                                                        }else{
                                                        
                                                        this.users.push(res.data());}
                                                        folios[contador]=this.usersF[contador].generalData.numFolio;
                                                        contador++;
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
        async getNombre(){
            this.usersF = [];
            this.users = [];
            let contador=0;
            let folios=[];
            try {
                let response = await db.collection('forms').where("generalData.name", "==", this.buscadorNombre)
                                                .get()
                                                .then((doc) => {
                                                    doc.forEach((res) => {
                                                        this.usersF.push(res.data());

                                                        if(folios.includes(this.usersF[contador].generalData.numFolio)){
                                                            
                                                        }else{
                                                        
                                                        this.users.push(res.data());}
                                                        folios[contador]=this.usersF[contador].generalData.numFolio;
                                                        contador++;
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

        async getRegisters(args){
            this.users = []
            console.log(args)
            try {
                let response = await db.collection('forms')
                                        .where('opinion', '==', args)
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

        goToForm(){
            
            this.$router.push({
                path: 'form2/'+this.id,params:{
                    id:this.id,
                    }
            })
        },

        getUser(args, position){
            //console.log(index);
        
            this.id=args.row.generalData.numFolio;
            this.userSelect = args.row.generalData
            this.userSelectStatus = args.row.opinion
            this.userSelectSymptoms = args.row.symptoms

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