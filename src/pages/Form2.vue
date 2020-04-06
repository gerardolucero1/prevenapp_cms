<style lang="sass" scoped>
    .row > div
        padding: 10px 15px
    
    .row + .row
        margin-top: 10px

    .search
        border: none
        background-color: #FAFAFA
        border-bottom: 1px solid #C2C2C2
        width: 100%
        font-size: 17px

    .box
        margin-top: 20px
        background-color: #FAFAFA
        border: 1px solid #C2C2C2

    button
        background-color: white

    .title
        font-size: 18px
        padding: 10px
        background-color: white
        border: 1px solid black
</style>

<template>
    <q-page>
        <section class="row" style="width: 90%; margin-left: 5%;">
           <div class="col-6">
                        <q-btn color="primary" style="width: 100%;"  label="Anterior"  @click="anterior()"/>
            </div>
            <div class="col-6">
                        <q-btn color="primary" style="width: 100%;"   label="Siguente" @click="siguiente()" />
            </div>
            
            <div class="col-12 box">
                <p id="fechaSeguimiento">Fecha de seguimiento Lunes 6 Abril 2020</p>
                <p class="title" style="background:#FAE586">Datos Generales <span style="width:100%; font-weight:bold; text-aling:right; position:absolute; left:800px">Folio: 0036</span></p>
                
                <section class="row">
                    <div class="col">
                        <q-input v-model="generalData.name" type="text" label="Nombre" />
                    </div>
                    <div class="col">
                        <q-input v-model="generalData.lastName" type="text" label="Apellido Paterno" />
                    </div>
                    <div class="col">
                        <q-input v-model="generalData.secondLastName" type="text" label="Apellido Materno" />
                    </div>
                </section>

                <section class="row">
                    <div class="col">
                        <q-input @blur="calcularEdad()" v-model="generalData.birthdate" type="date" label="Fecha Nacimiento" Outlined />
                    </div>
                    <div class="col-1">
                        <q-input v-model="generalData.age" type="number" label="Edad" />
                    </div>
                    <div class="col">
                        <q-select v-model="generalData.sex" :options="optionsSex" label="Sexo" Outlined />
                    </div>
                    <div class="col">
                        <q-input v-model="generalData.telephone" type="tel" label="Telefono" />
                    </div>
                    <div class="col">
                        <q-select v-model="generalData.civilState" :options="optionsCivilState" label="Estado Civil" Outlined />
                    </div>
                    <div class="col">
                        <q-input v-model="generalData.cellular" type="tel" label="Celular" />
                    </div>
                </section>

                <section class="row">
                    <div class="col-6" style="margin-top: 28px;">
                        <vue-google-autocomplete
                            class="search"
                            ref="address"
                            id="map"
                            classname="form-control"
                            placeholder="Dirección"
                            @placechanged="getAddressData"
                            country="mx"
                        >
                        </vue-google-autocomplete>
                    </div>
                    <div class="col-2">
                        <q-input v-model="generalData.number" type="number" label="Número" />
                    </div>
                    <div class="col-2">
                        <q-input v-model="generalData.cp" type="number" label="CP" />
                    </div>
                    <div class="col-2">
                        <q-select v-model="generalData.etnia" :options="optionsEtnia" label="Etnia" Outlined />
                    </div>
                    
                </section>

                <section class="row">
                    <div class="col-3">
                        <q-input v-model="generalData.familyNumbers" type="number" label="No. Personas en el hogar" />
                    </div>
                    <div class="col-3">
                        <q-select v-model="generalData.medicalSecure" :options="optionsMedicalSecure" label="Servicio Médico" Outlined />
                    </div>
                </section>
            </div>

            <div class="col-12 box">
                <p class="title" style="background:#FAE586">Sintomatologia</p>

                <section class="row">
                    <div class="col-5" style="display: flex; flex-direction: column;">
                        <q-checkbox right-label v-model="symptoms" val="Fiebre" label="Fiebre mayor a 38 grados" />
                        <q-checkbox right-label v-model="symptoms" val="Tos" label="Tos" />
                        <q-checkbox right-label v-model="symptoms" val="dolorCabeza" label="Dolor de cabeza" />
                        <q-checkbox right-label v-model="symptoms" val="dificultadRespiratoria" label="Dificultad respiratoria" />
                        <q-checkbox right-label v-model="symptoms" val="dolorArticulaciones" label="Dolor en articulaciones" />
                        <q-checkbox right-label v-model="symptoms" val="dolorMoscular" label="Dolor muscular" />
                        <q-checkbox right-label v-model="symptoms" val="conjuntivitis" label="Conjuntivitis" />
                        <q-checkbox right-label v-model="symptoms" val="dolorToraxico" label="Dolor torácico" />
                        <q-checkbox right-label v-model="symptoms" val="dolorFaringeo" label="Dolor faríngeo" />
                    </div>
                    <div class="col-md-7" style="padding-top:130px">
                        <p style="font-size:20px; font-weight:bold; width:100%; text-align:center">Dictamen Recomendado por el sistema:</p>
                        <p style="text-align:center; font-size:35px; width:100%; color:green" id="dictamenSistema">{{dictamenCalculoSistema}}</p>
                        <p style="text-align:center; font-size:13px; width:100%; color:gray; font-style:italic;">El dictamen recomendado por el sistema esta basado únicamente en el numero de síntomas seleccionados, es por esto que el dictamen final queda completamente a criterio del médico que completa la información de este formulario</p>
                        
                    </div>
                    <div class="col-12">
                        <q-input v-model="observations" type="textarea" label="Observaciones" filled />
                    </div>
                    <div class="col-4" style="display: flex; flex-direction: column;">
                        <q-checkbox right-label v-model="additionalFeatures" val="embarazada" label="Embarazada" />
                        <q-checkbox right-label v-model="additionalFeatures" val="diabetes" label="Diabetes" />
                    </div>
                    <div class="col-4" style="display: flex; flex-direction: column;">
                        <q-checkbox right-label v-model="additionalFeatures" val="cronicas" label="Crónicas" />
                        <q-checkbox right-label v-model="additionalFeatures" val="obesidad" label="Obesidad" />
                    </div>
                </section>
            </div>

            <div class="col-12 box">
                <p class="title" style="background:#FAE586">Dictamen</p>
                <section class="row">
                    <div class="col-4">
                        <q-select v-model="opinion" :options="optionsOpinion" label="Dictamen" Outlined />
                    </div>
                </section>
            </div>

            <div class="col-12 box">
                <section class="row">
                    <div class="col-4 offset-2">
                        <q-btn color="primary" style="width: 100%;" icon="check" label="Guardar Seguimiento" @click="saveInformation" />
                    </div>
                    <div class="col-4 offset-2">
                        <q-btn color="red" style="width: 100%;" icon="remove" label="Descartar Caso" @click="cleanForm" />
                    </div>
                </section>
            </div>
        </section>
    </q-page>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

//Firebase
import { db } from 'boot/firebase'

export default {
    components: { VueGoogleAutocomplete },

    data: function () {
        return {
            address: '',
            generalData: {
                name: 'Samuel',
                lastName: 'Acosta',
                secondLastName: 'Rivera',

                birthdate: '07/09/1995',
                age: '24',

                sex: 'Masculino',
                telephone: '6391061558',

                civilState: 'Soltero',
                cellular: '6391061558',

                direction: 'Calle aquiles serdan 607 Francisco Villa 33080 Delicias, Chih, Mexico',
                number: '607',
                cp: '33080',

                etnia: '',

                familyNumbers: '2',
                medicalSecure: 'IMSS',
            },

            direction: {
                name: '',
                placeId: '',
                origin: {
                    latitude: '',
                    longitude: '',
                },
            },

            optionsSex: [
                'Masculino',
                'Femenino'
            ],

            optionsCivilState: [
                'Casado',
                'Soltero',
                'Divorciado',
                'Viudo',
                'Union Libre'
            ],

            optionsEtnia: [
                '',
                'Pimas',
                'Guarijo',
                'Tepehuanes',
                'Tarahumara',
            ],

            optionsMedicalSecure: [
                'NINGUNO',
                'INSABI',
                'IMSS',
                'ISSSTE',
                'PRIVADO',
                'IMPE',
                'ICHISAL',
                'PENSIONES',
                'SEDENA',
            ],

            symptoms: ['Fiebre'],
            observations: '',
            additionalFeatures: [],

            opinion: '',

            optionsOpinion: [
                'Sin riesgo',
                'Sospechoso',
                'Hospitalario',
            ]
        }
    },

    mounted() {
        this.$refs.address.focus();

        //alert(this.$router.id);
    },
   
   
   
   computed:{
        dictamenCalculoSistema(){
if(this.symptoms.length>1){
     if(this.symptoms.length>4 && this.symptoms.length<7){
         document.getElementById('dictamenSistema').style.color="orange";
   return "Sospechoso";
   }
   if(this.symptoms.length<=4){
       document.getElementById('dictamenSistema').style.color="green";
   return "Sin Riesgo";
   }
   if(this.symptoms.length>=7){
       document.getElementById('dictamenSistema').style.color="red";
   return "Hospitalario";
   }
}else{
    return "Sin Riesgo";
}

        }
    },

    methods: {
        getAddressData(addressData, placeResultData, id) {
            console.log(placeResultData)
            this.address = addressData;
            this.generalData.number = this.address.street_number
            this.generalData.cp = this.address.postal_code
            this.generalData.direction = placeResultData.formatted_address

            this.direction.name = placeResultData.formatted_address
            this.direction.origin.latitude = this.address.latitude
            this.direction.origin.longitude = this.address.longitude
            this.direction.placeId = placeResultData.id
        },

    anterior(){
 document.getElementById('fechaSeguimiento').innerHTML="Fecha de seguimiento Domingo 5 Abril 2020";
 
    },
    siguiente(){
 document.getElementById('fechaSeguimiento').innerHTML="Fecha de seguimiento Lunes 6 Abril 2020";
  
    },

     calcularEdad() {
    var hoy = new Date();
    this.generalData.birthdate;
    var cumpleanos = new Date(this.generalData.birthdate);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    this.generalData.age=edad;
   
},

    

        async saveInformation(){
            let setConfirm = confirm('¿La información ingresada es correcta?')
            if(!setConfirm){
                return
            }

            try {
                let info = {
                    generalData: this.generalData,
                    symptoms: this.symptoms,
                    additionalFeatures: this.additionalFeatures,
                    observations: this.observations,
                    opinion: this.opinion
                }

                let response = await db.collection('forms').doc().set(info)

                this.saveUbication()
                this.generalData = '';
                this.symptoms = []
                this.additionalFeatures = []
                this.observations = ''
                this.opinion = ''
                this.direction = '';
            } catch (error) {
                console.log(error)
            }
            finally{
                alert('Solo puedes dar seguimiento minimo un dia despues del registro');


            }
        },

        async cleanForm(){
           
                this.generalData = '';
                this.symptoms = '';
                this.additionalFeatures = []
                this.observations = ''
                this.opinion = ''
                this.direction = '';
                alert('Registro de seguimiento descartado');
        },

        async saveUbication(){
            try {
                let response = await db.collection('call_locations')
                                            .doc(this.direction.placeId)
                                            .set(this.direction)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>