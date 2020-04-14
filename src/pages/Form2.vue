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
            <div class="col-12 box">
                <p class="title" style="background:#FAE586">Datos Generales<span style="width:100%; font-weight:bold; text-aling:right; position:absolute; left:800px">Folio: {{$route.params.id}}</span></p>
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
                        <q-label style="font-size:13px; color:gray; position:absolute">Fecha de Nacimiento</q-label>
                        <q-input @blur="calcularEdad()" v-model="generalData.birthdate" type="date" label="" Outlined />
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
                    <div class="col-4">
                        <q-select v-model="generalData.lugarResidencia" :options="optionsLugarResidencia" label="Lugar de residencia y trabajo"></q-select>
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
                        <q-checkbox right-label v-model="symptoms" val="dolorToracico" label="Dolor torácico" />
                        <q-checkbox right-label v-model="symptoms" val="dolorFaringeo" label="Dolor faríngeo" />
                        <q-checkbox right-label v-model="symptoms" val="diarrea" label="Diarrea" />
                        <q-checkbox right-label v-model="symptoms" val="malestarGeneral" label="Malestar General" />
                    </div>
                    <div class="col-md-7" style="padding-top:130px">
                        <p style="font-size:20px; font-weight:bold; width:100%; text-align:center">Dictamen Recomendado por el sistema:</p>
                        <p style="text-align:center; font-size:35px; width:100%; color:blue" id="dictamenSistema">{{calculoPuntosDictamen}}</p>
                        <p style="text-align:center; font-size:13px; width:100%; color:gray; font-style:italic;" id="textoDictamen">El dictamen recomendado por el sistema esta basado únicamente en el numero de síntomas seleccionados, es por esto que el dictamen final queda completamente a criterio del médico que completa la información de este formulario</p>
                        
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
                    <div class="col-6">
                        <q-label style="font-style:italic">{{cambioDictamen}}</q-label>
                    </div>
                </section>
            </div>

            <div class="col-12 box">
                <section class="row">
                    <div v-if="symptoms.length>0" class="col-4 ">
                        <q-btn color="primary" style="width: 100%;" icon="check" label="Guardar registro" @click="saveInformation" />
                    </div>
                    <div v-if="symptoms.length==0" class="col-4 ">
                        <q-btn color="primary" style="width: 100%;" icon="check" label="Consulta Psicologica" @click="saveInformationPsicologico" />
                    </div>
                    <div class="col-4 ">
                        <q-btn color="red" style="width: 100%;" icon="remove" label="Descartar Registro" @click="cleanForm" />
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
            formularios:[],
            address: '',
            generalData: {
                name: '',
                lastName: '',
                secondLastName: '',

                lugarResidencia:'',

                birthdate: '',
                age: '',
                folio:'',

                sex: '',
                telephone: '',

                civilState: '',
                cellular: '',
                fechaActual: '',

                direction: '',
                number: '',
                cp: '',

                etnia: '',
                numFolio:'',

                familyNumbers: '',
                medicalSecure: '',
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

            optionsLugarResidencia: [
                'Acilo Para Ancianos o Casa de Asistencia',
                'Trabajador en el Area de la Salud',
                'Casa Habitacion Familiar o Propia',
            ],

            optionsEtnia: [
                'Pimas',
                'Guarijo',
                'Tepehuanes',
                'Tarahumara',
            ],

            optionsMedicalSecure: [
                'INSABI',
                'IMSS',
                'ISSSTE',
                'PRIVADO',
                'IMPE',
                'ICHISAL',
                'PENSIONES',
                'SEDENA',
            ],

            symptoms: [],
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
        this.getForm();
        this.$refs.address.focus();
        //this.$router;
        if(this.$route.params.id=='0018'){
            this.generalData.name="Fausto";
                this.generalData.lastName="Cavazos";
                this.generalData.secondLastName="ordoñez";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="1942-09-07";
                this.generalData.age="77";
                this.generalData.folio="0018";
                this.generalData.numFfolio="0018";
                this.generalData.sex="Masculino";
                this.generalData.telephone="6141731423";
                this.generalData.civilState="Casado";
                this.generalData.cellular="";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="3112";
                this.generalData.cp="31203";
                this.generalData.etnia="";
                this.generalData.familyNumbers="2";
                this.generalData.medicalSecure="IMSS";
                this.observations="llama por información de a donde puede dirigirse en caso de tener alguna emergencia";
                this.opinion="Sin riesgo";
                this.symptoms=['malestarGeneral'];
                this.additionalFeatures=[];
        }
        },
   
   
   computed:{

       cambioDictamen(){
            switch(this.opinion){
                case 'Sin riesgo':
                    return '*Aislamiento de casa, medidas estándar';
                    break;
                case 'Sospechoso':
                    return 'Alta probabilidad de complicación, aislamiento estricto en casa (solo salir para acudir al medico) de ser posible la persona debe tener una habitación, baño y articulos personales exclusivos, no acudir al trabajo, escuela o áreas públicas en ninguna circunstancia, no usar transporte público ni compartir vehículo, acudir al servicio medico si los sintomas empeoran o presenta dificultad para respirar, dolor y/o presión en el pecho, síntomas de baja presión o cianosis peribucal y/o en lechos ungueales de las extremidades';
                    break;
                case 'Hospitalario':
                    return 'Referencia a segundo nivel de atención, de ser posible contacte a la unidad a la que se referirá el paciente por teléfono y notifique que se envia paciente grave con probable COVID-19.';
                    break;
            }
        },
        
        calculoPuntosDictamen(){
            let puntos = 0;
            if(this.generalData.age>35 && this.generalData.age<=64){
                puntos = puntos + 2;
            }else if(this.generalData.age>=65){
                puntos = puntos + 5;
            }else{
                puntos = puntos + 0;
            }

            if(this.generalData.lugarResidencia == 'Acilo Para Ancianos o Casa de Asistencia' || this.generalData.lugarResidencia == 'Trabajador en el Area de la Salud'){
                puntos = puntos + 5;
            }
            if(this.symptoms.includes('Fiebre')) {
                puntos = puntos + 3;
            }
            if(this.symptoms.includes('Tos')) {
                puntos = puntos + 3;
            }
            if(this.symptoms.includes('dolorCabeza')) {
                puntos = puntos + 3;
            }
            if(this.symptoms.includes('dificultadRespiratoria')) {
                puntos = puntos + 1;
            }
            if(this.symptoms.includes('dolorArticulaciones')) {
                puntos = puntos + 1;
            }
            if(this.symptoms.includes('dolorMuscular')) {
                puntos = puntos + 1;
            }
            if(this.symptoms.includes('conjuntivitis')) {
                puntos = puntos + 1;
            }
            if(this.symptoms.includes('dolorToracico')) {
                puntos = puntos + 1;
            }
            if(this.symptoms.includes('dolorFaringeo')) {
                puntos = puntos + 1;
            }
            if(this.symptoms.includes('diarrea')) {
                puntos = puntos + 1;
            }
            if(this.symptoms.includes('malestarGeneral')) {
                puntos = puntos + 1;
            }
            if(this.additionalFeatures.includes('embarazada')) {
                puntos = puntos + 5;
            }
            if(this.additionalFeatures.includes('diabetes')) {
                puntos = puntos + 5;
            }
            if(this.additionalFeatures.includes('cronicas')) {
                puntos = puntos + 5;
            }
            if(this.additionalFeatures.includes('obesidad')) {
                puntos = puntos + 5;
            }


            if(puntos<=20){
                return 'Bajo Riesgo (Sin Riesgo)'; 
                //document.getElementById('dictamenSistema').style.color="green";
            }
            if(puntos>20 && puntos<=35){
                return 'Riesgo Moderado (Sospechoso)';
                //document.getElementById('dictamenSistema').style.color="orange";
            }
            if(puntos>35){
                return 'Alto Riesgo (Hospitalario)';
                //document.getElementById('dictamenSistema').style.color="red";
            }
        },

        folio(){
            let numberFolio = (Math.floor(Math.random() * (10000 - 1000)) + 1000);
            this.generalData.folio=numberFolio;
            return numberFolio;
        }
    },

    methods: {

       async getForm(){
           
            this.formularios = []
            try {
                
                let response = await db.collection('forms').where('generalData.folio', '==', this.$route.params.id)
                                                .get()
                                                .then((doc) => {
                                                    doc.forEach((res) => {
                                                       
                                                        this.formularios.push(res.data())  
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
            //generar fecha
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var f=new Date();
this.generalData.fechaActual = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
            //fin obtención fecha
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
                    opinion: this.opinion,
                  
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
                alert('Seguimiento guardado correctamente');
                
                this.symptoms = '';
                this.additionalFeatures = []
                this.observations = ''
                this.opinion = ''
                this.direction = '';
                let numberFolio = (Math.floor(Math.random() * (10000 - 1000)) + 1000);
            this.generalData.folio=numberFolio;
                this.generalData = '';
                
                

            }
        },

        async saveInformationPsicologico(){
            //generar fecha
            var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var f=new Date();
this.generalData.fechaActual = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
            //fin obtención fecha
            let setConfirm = confirm('¿Guardar como consulta Psicologica?')
            if(!setConfirm){
                return
            }

            try {
                let info = {
                    generalData: this.generalData,
                    symptoms: ['none'],
                    
                    observations: this.observations,
                    opinion: this.opinion,
                  
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
                alert('Seguimineto guardado correctamente');
                
                this.symptoms = '';
                this.additionalFeatures = []
                this.observations = ''
                this.opinion = ''
                this.direction = '';
                let numberFolio = (Math.floor(Math.random() * (10000 - 1000)) + 1000);
            this.generalData.folio=numberFolio;
                this.generalData = '';
                
                

            }
        },

        async cleanForm(){
           
                
                this.symptoms = '';
                this.additionalFeatures = []
                this.observations = ''
                this.opinion = ''
                this.direction = '';
                let numberFolio = (Math.floor(Math.random() * (10000 - 1000)) + 1000);
            this.generalData.folio=numberFolio;
                this.generalData = '';
                
                alert('Seguimiento descartado');
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