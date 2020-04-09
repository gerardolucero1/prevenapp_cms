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
        if(this.$route.params.id=='0017'){
            this.generalData.name="Santiago";
                this.generalData.lastName="Terrazas";
                this.generalData.secondLastName="Vargas";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="1969-07-19";
                this.generalData.age="50";
                this.generalData.folio="0017";
                this.generalData.numFfolio="0017";
                this.generalData.sex="Masculino";
                this.generalData.telephone="6142520427";
                this.generalData.civilState="Casado";
                this.generalData.cellular="";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="";
                this.generalData.cp="";
                this.generalData.etnia="";
                this.generalData.familyNumbers="";
                this.generalData.medicalSecure="";
                this.observations="Previamente revisada por médico, el cual diagnosticó faringoamigdalitis, tratada con antibiótico y mejorando sintomatología, posteriormente inició con gastroenteritis, la cual está en tratamiento con suero.";
                this.opinion="Sin riesgo";
                this.symptoms=['diarrea'];
                this.additionalFeatures=['diabetes'];
        }
        if(this.$route.params.id=='0016'){
            this.generalData.name="Martha";
                this.generalData.lastName="Portillo";
                this.generalData.secondLastName="";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="";
                this.generalData.age="0";
                this.generalData.folio="0016";
                this.generalData.numFfolio="0016";
                this.generalData.sex="";
                this.generalData.telephone="";
                this.generalData.civilState="";
                this.generalData.cellular="";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="";
                this.generalData.cp="";
                this.generalData.etnia="";
                this.generalData.familyNumbers="";
                this.generalData.medicalSecure="";
                this.observations="Paciente con antecedente de Ca de colon, sin sintomatología para Covid-19. Se comunica pidiendo información de bolsa de colostomía";
                this.opinion="Sin riesgo";
                this.symptoms=['malestarGeneral'];
                this.additionalFeatures=[];
        }
if(this.$route.params.id=='0015'){
            this.generalData.name="Oscar Alan";
                this.generalData.lastName="Montes";
                this.generalData.secondLastName="Pérez";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="1993-09-15";
                this.generalData.age="26";
                this.generalData.folio="0015";
                this.generalData.numFfolio="0015";
                this.generalData.sex="Masculino";
                this.generalData.telephone="6141707478";
                this.generalData.civilState="";
                this.generalData.cellular="";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="19904";
                this.generalData.cp="31183";
                this.generalData.etnia="";
                this.generalData.familyNumbers="4";
                this.generalData.medicalSecure="";
                this.observations="Paciente con sintomatología de faringitis viral hace dos días; acude a su médico quien indica Antifludes y Naproxeno. Actualmente el paciente se encuentra asintomático, marca por dudas sobre si se puede llevar a cabo la prueba de confirmación de Covid-19 en medio público.";
                this.opinion="Sin riesgo";
                this.symptoms=['Fiebre', 'dolorFaringeo', 'malestarGeneral'];
                this.additionalFeatures=[];
        }
        if(this.$route.params.id=='0014'){
            this.generalData.name="Ramon";
                this.generalData.lastName="Orozco";
                this.generalData.secondLastName="Quintana";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="1940-05-11";
                this.generalData.age="79";
                this.generalData.folio="0014";
                this.generalData.numFfolio="0014";
                this.generalData.sex="Femenino";
                this.generalData.telephone="6144011720";
                this.generalData.civilState="Casado";
                this.generalData.cellular="";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="";
                this.generalData.cp="31100";
                this.generalData.etnia="";
                this.generalData.familyNumbers="2";
                this.generalData.medicalSecure="";
                this.observations="HIPERTENSION ARTERIAL SIN APEGO A TRATAMIENTO ";
                this.opinion="Sin riesgo";
                this.symptoms=['Fiebre', 'dolorArticulaciones', 'dolorMuscular', 'malestarGeneral'];
                this.additionalFeatures=['cronicas'];
        }
        if(this.$route.params.id=='0013'){
            this.generalData.name="KEVIN";
                this.generalData.lastName="ACOSTA";
                this.generalData.secondLastName="ORTEGA";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="1995-09-24";
                this.generalData.age="24";
                this.generalData.folio="0013";
                this.generalData.numFfolio="0013";
                this.generalData.sex="Masculino";
                this.generalData.telephone="0000000";
                this.generalData.civilState="Soltero";
                this.generalData.cellular="6145221617";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="65";
                this.generalData.cp="31375";
                this.generalData.etnia="";
                this.generalData.familyNumbers="3";
                this.generalData.medicalSecure="INSABI";
                this.observations="";
                this.opinion="Sin Riesgo";
                this.symptoms=['Tos'];
                this.additionalFeatures=[];
        }

        if(this.$route.params.id=='0012'){
            this.generalData.name="ANA MARIA";
                this.generalData.lastName="JIMENEZ";
                this.generalData.secondLastName="LARA";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="1959-04-03";
                this.generalData.age="61";
                this.generalData.folio="0012";
                this.generalData.numFfolio="0012";
                this.generalData.sex="Femenino";
                this.generalData.telephone="4141985";
                this.generalData.civilState="Divorciado";
                this.generalData.cellular="";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="1511";
                this.generalData.cp="31200";
                this.generalData.etnia="";
                this.generalData.familyNumbers="0";
                this.generalData.medicalSecure="ISSSTE";
                this.observations="HIPERTENSION ARTERIAL DOLOR FARINGEO LEVE SE RECOMIENDA PARACETAMOL, LA PACIENTE ESTA EN BUSCA DE FAMILIAR O VECINO QUE LE PUEDA COMPRAR O PROPORCIONAR EL MEDICAMENTO";
                this.opinion="Sin riesgo";
                this.symptoms=['dolorCabeza', 'malestarGeneral', 'dolorFaringeo'];
                this.additionalFeatures=['cronicas'];
        }
        if(this.$route.params.id=='0011'){
            this.generalData.name="carlos aduardo";
                this.generalData.lastName="garza";
                this.generalData.secondLastName="rubio";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="1957-07-03";
                this.generalData.age="62";
                this.generalData.folio="0011";
                this.generalData.numFfolio="0011";
                this.generalData.sex="Masculino";
                this.generalData.telephone="";
                this.generalData.civilState="";
                this.generalData.cellular="6141753148";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="1507";
                this.generalData.cp="31203";
                this.generalData.etnia="";
                this.generalData.familyNumbers="3";
                this.generalData.medicalSecure="IMSS";
                this.observations="paciente masculino 62 años antes comentado se refiere con dolor torácico(esternón), niega alguna otra sintomatologia asociada a infección de vías respiratorias, por lo que se le explica que actualmente no cumple con criterios de sospecha y no es candidato a realizar prueba diagnostica(por la cual pregunto). se indica continuar con medidas de prevención y que el síntoma referido deberá ser valorado por su medico.";
                this.opinion="Sin Riesgo";
                this.symptoms=['dolorToracico'];
                this.additionalFeatures=['cronicas'];
        }
        if(this.$route.params.id=='0010'){
            this.generalData.name="GONZALO";
                this.generalData.lastName="ARANDA";
                this.generalData.secondLastName="";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="1944-01-10";
                this.generalData.age="76";
                this.generalData.folio="0010";
                this.generalData.numFfolio="0010";
                this.generalData.sex="Masculino";
                this.generalData.lugarResidencia="Casa Habitacion Familiar o Propia";
                this.generalData.telephone="6145873154";
                this.generalData.civilState="Casado";
                this.generalData.cellular="6145873154";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="4109";
                this.generalData.cp="31110";
                this.generalData.etnia="";
                this.generalData.familyNumbers="5";
                this.generalData.medicalSecure="IMSS";
                this.observations="TOS PRODUCTIVA DE 4 MESES DE EVOLUCIÓN PACIENTE PORTADOR DE MARCAPASOS";
                this.opinion="Sin riesgo";
                this.symptoms=['Tos'];
                this.additionalFeatures=[];
        }
        if(this.$route.params.id=='0009'){
            this.generalData.name="Cesar Isidro";
                this.generalData.lastName="Ayala";
                this.generalData.secondLastName="Pinales";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="1987-03-16";
                this.generalData.age="33";
                this.generalData.folio="0009";
                this.generalData.numFfolio="0009";
                this.generalData.sex="Masculino";
                this.generalData.telephone="6142286840";
                this.generalData.civilState="Casado";
                this.generalData.cellular="";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="4032";
                this.generalData.cp="31124";
                this.generalData.etnia="";
                this.generalData.familyNumbers="5";
                this.generalData.medicalSecure="";
                this.observations="Asmático desde hace 6 años en tratamiento con salbutamol y rinitis alérgica en tratamiento con loratadina y dexametasona IM cada 6 meses. Se le explica que no presenta síntomas de alarma, que es época de polinización y exacerbación de enfermedades alérgicas, el paciente refiere que el y su familia han seguido las medidas higienicas debidas tales como uso de gel antibacterial constante, lavado de manos, aseo de ropa antes de entrar a casa, etc. Se refuerzan medidas de prevención.";
                this.opinion="";
                this.symptoms=['dolorCabeza'];
                this.additionalFeatures=['cronicas', 'obesidad'];
        }
       if(this.$route.params.id=='0008'){
            this.generalData.name="";
                this.generalData.lastName="";
                this.generalData.secondLastName="";
                this.generalData.lugarResidencia="";
                this.generalData.birthdate="";
                this.generalData.age="";
                this.generalData.folio="0008";
                this.generalData.numFfolio="0008";
                this.generalData.sex="";
                this.generalData.telephone="";
                this.generalData.civilState="";
                this.generalData.cellular="";
                this.generalData.fechaActual="";
                this.generalData.direction="";
                this.generalData.number="";
                this.generalData.cp="";
                this.generalData.etnia="";
                this.generalData.familyNumbers="";
                this.generalData.medicalSecure="";
                this.observations="";
                this.opinion="";
                this.symptoms=[];
                this.additionalFeatures=[];
        }
        if(this.$route.params.id=='0007'){
            
            this.generalData.name="Carmen";
                this.generalData.lastName="Loya";
                this.generalData.secondLastName="Miranda";

                this.generalData.lugarResidencia="";

                this.generalData.birthdate="1958-05-31";
                this.generalData.age="61";
                this.generalData.folio="0007";
                this.generalData.numFfolio="0007";

                this.generalData.sex="Femenino";
                this.generalData.telephone="";

                this.generalData.civilState="Soltero";
                this.generalData.cellular="6145132883";
                this.generalData.fechaActual="";

                this.generalData.direction="";
                this.generalData.number="7012";
                this.generalData.cp="31460";

                this.generalData.etnia="";

                this.generalData.familyNumbers="7";
                this.generalData.medicalSecure="IMSS";
                this.observations="sin enfermedades";
                this.opinion="Sin riesgo";
                this.symptoms=['dolorCabeza', 'dolorMuscular', 'conjuntivitis', 'dolorFaringeo'];
                this.additionalFeatures=[];
        }
        if(this.$route.params.id=='0006'){
            this.generalData.name="jesus alberto";
                this.generalData.lastName="villa";
                this.generalData.secondLastName="Estupiñon";

                this.generalData.lugarResidencia="";

                this.generalData.birthdate="1961-08-01";
                this.generalData.age="58";
                this.generalData.folio="0006";
                this.generalData.numFolio="0006";

                this.generalData.sex="Masculino";
                this.generalData.telephone="";

                this.generalData.civilState="Casado";
                this.generalData.cellular="6141039027";
                this.generalData.fechaActual="";

                this.generalData.direction="";
                this.generalData.number="3741";
                this.generalData.cp="31136";

                this.generalData.etnia="";
          

                this.generalData.familyNumbers="2";
                this.generalData.medicalSecure="IMSS";
                this.observations="paciente masculino de 58 años de edad con antecedente hipertension arterial, niega alguna otro antecedente de importancia, refiere acudio el dia 05/04/20 a valoracion a su servicio medico por presentar tos seca, fiebre mayor 38c, dolor muscular y articular, cefalea, astenia y adinamia. el cual se egresa a domicilio con tratamiento sintomatico, reposo y aislamiento. el día refiere no hay mejoria de la sintomatologia antes mencionada , y menciona presento datos de dificultad respiratoria el día 06/abr/20, por lo que se recomienda acuda a revaloracion medica en la unidad medica correspondiente a su servicio medico de forma inmediata. 8/04/2020 8:44 am, se da seguimiento, el paciente no fue llevado a hospital ya que no quiso, el paciente es hipertenso, traía descontrolada la presión, refiere la hija Noemi villa que el paciente no vive con ella, ahorita hablara con su mama para ver como siguió, esperaremos la respuesta de la señora y de no tener respuesta en una hora se volverá a contactar con ella. 08/04/2020 9:18 am, se habla con la esposa del paciente ( gloria Martínez) quien refiere que el paciente toma amlodipino y losartan cada 12 horas, el paciente ha tenido antecedentes de comer tamales y desde entonces comenzó con malestar general, hipertermia, malestar abdominal, vomito, actualmente el paciente se encuentra estable, tranquilo, la esposa de la paciente refiere que ha tomado las medidas de higiene necesarias, asi como el auto confinamiento. seguiremos en contacto con ella. 8/04/2020 17:56: paciente llama nuevamente por referir hipertermia 38.7, tos productiva de predominio matutino, refiere que hace dos horas comenzó a sentirse mal nuevamente, mialgias, artralgias, se le recomienda reposo en cama y se evaluara mañana por la mañana, se hace hincapié en signos de alarma respiratoria y se deja inicacion de acudir a hospital en caso de que los síntomas se agraven.";
                this.opinion="Hospitalario";
                this.symptoms=["dolorArticulaciones","dolorMoscular","Fiebre","Tos","dolorCabeza","dolorToracico","dolorFaringeo","dificultadRespiratoria","malestarGeneral"];
                this.additionalFeatures=['cronicas'];
            

        }
        if(this.$route.params.id=='0005'){
            this.generalData.name="Monica";
                this.generalData.lastName="Sanchez";
                this.generalData.secondLastName="Salazar";

                this.generalData.lugarResidencia="";

                this.generalData.birthdate="1993-01-23";
                this.generalData.age="27";
                this.generalData.folio="0005";
                this.generalData.numFolio="0005";

                this.generalData.sex="Femenino";
                this.generalData.telephone="4200889";

                this.generalData.civilState="Soltero";
                this.generalData.cellular="";
                this.generalData.fechaActual="";

                this.generalData.direction="";
                this.generalData.number="405";
                this.generalData.cp="31050";

                this.generalData.etnia="";
        

                this.generalData.familyNumbers="3";
                this.generalData.medicalSecure="";
                this.observations="";
                this.opinion="Sin riesgo";
                this.symptoms=["Tos","dolorMoscular","malestarGeneral"];
                this.additionalFeatures=[''];
            

        }
        if(this.$route.params.id=='0004'){
            this.generalData.name="angelica";
                this.generalData.lastName="alvarez";
                this.generalData.secondLastName="riva";

                this.generalData.lugarResidencia="";

                this.generalData.birthdate="1971-08-02";
                this.generalData.age="48";
                this.generalData.folio="0004";
                this.generalData.numFolio="0004";

                this.generalData.sex="Femenino";
                this.generalData.telephone="6141049843";

                this.generalData.civilState="Casado";
                this.generalData.cellular="";
                this.generalData.fechaActual="";

                this.generalData.direction="";
                this.generalData.number="";
                this.generalData.cp="";

                this.generalData.etnia="";
       

                this.generalData.familyNumbers="4";
                this.generalData.medicalSecure="PENSIONES";
                this.observations="tos productiva nocturna, dificultad respiratoria leve nocturna, bajo tratamiento que le dieron en pensiones antecedentes: asmática tuvo contacto con hija que viene de juarez ";
                this.opinion="Sospechoso";
                this.symptoms=["Tos","dolorCabeza","dificultadRespiratoria"];
                this.additionalFeatures=[''];
            

        }
        if(this.$route.params.id=='0003'){
            this.generalData.name="hector";
                this.generalData.lastName="saenz";
                this.generalData.secondLastName="lara";

                this.generalData.lugarResidencia="";

                this.generalData.birthdate="1993-10-21";
                this.generalData.age="26";
                this.generalData.folio="0003";
                this.generalData.numFolio="0003";

                this.generalData.sex="Masculino";
                this.generalData.telephone="";

                this.generalData.civilState="";
                this.generalData.cellular="";
                this.generalData.fechaActual="";

                this.generalData.direction="";
                this.generalData.number="";
                this.generalData.cp="";

                this.generalData.etnia="";
    

                this.generalData.familyNumbers="";
                this.generalData.medicalSecure="";
                this.observations="";
                this.opinion="Sin Riesgo";
                this.symptoms=[];
                this.additionalFeatures=[''];
            

        }
        if(this.$route.params.id=='0002'){
            this.generalData.name="Gerardo Antonio";
                this.generalData.lastName="Muñoz";
                this.generalData.secondLastName="Lujan";

                this.generalData.lugarResidencia="";

                this.generalData.birthdate="1994-07-14";
                this.generalData.age="25";
                this.generalData.folio="0002";
                this.generalData.numFolio="0002";

                this.generalData.sex="Masculino";
                this.generalData.telephone="6142353576";

                this.generalData.civilState="Soltero";
                this.generalData.cellular="6142353576";
                this.generalData.fechaActual="";

                this.generalData.direction="";
                this.generalData.number="700";
                this.generalData.cp="31137";

                this.generalData.etnia="";
                this.generalData.numFolio="";

                this.generalData.familyNumbers="4";
                this.generalData.medicalSecure="IMSS";
                this.observations="Realiza llamada por probable crisis de ansiedad. Al interrogatorio refiere dislalia, sensación de salir corriendo, cefalea frontal y taquicardia de 20 minutos de evolución. Ya había presentado anteriormente dicha sintomatología, por lo que se sugiere realizar cita con medico familiar de su servicio médico (IMSS).";
                this.opinion="";
                this.symptoms=['dolorCabeza'];
                this.additionalFeatures=[''];
            

        }
        if(this.$route.params.id=='0001'){
            this.generalData.name="AIDA";
                this.generalData.lastName="REZA";
                this.generalData.secondLastName="CARRILLO";

                this.generalData.lugarResidencia="";

                this.generalData.birthdate="1950-02-20";
                this.generalData.age="70";
                this.generalData.folio="0001";
                this.generalData.numFolio="0001";

                this.generalData.sex="Femenino";
                this.generalData.telephone="6142411391";

                this.generalData.civilState="Viudo";
                this.generalData.cellular="6142411391";
                this.generalData.fechaActual="";

                this.generalData.direction="";
                this.generalData.number="1308";
                this.generalData.cp="64470";

                this.generalData.etnia="";
                this.generalData.numFolio="";

                this.generalData.familyNumbers="1";
                this.generalData.medicalSecure="IMSS";
                this.observations="NO PRESENTA SINTOMATOLOGÍA RESPIRATORIA ÚNICAMENTE DUDAS ACERCA DE LAS MEDIDAS SIN RIESGO";
                this.opinion="";
                this.symptoms=[];
                this.additionalFeatures=[''];
            

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