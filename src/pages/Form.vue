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
                <p class="title">Datos Generales</p>
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
                        <q-input v-model="generalData.birthdate" type="date" label="Fecha Nacimiento" Outlined />
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
                    <div class="col" style="margin-top: 28px;">
                        <vue-google-autocomplete
                            class="search"
                            ref="address"
                            id="map"
                            classname="form-control"
                            placeholder="Direccion"
                            @placechanged="getAddressData"
                            country="mx"
                        >
                        </vue-google-autocomplete>
                    </div>
                    <div class="col-2">
                        <q-input v-model="generalData.number" type="number" label="Numero" />
                    </div>
                    <div class="col-2">
                        <q-input v-model="generalData.cp" type="number" label="CP" />
                    </div>
                    <div class="col-2">
                        <q-select v-model="generalData.etnia" :options="optionsEtnia" label="Etnia" Outlined />
                    </div>
                    <div class="col-2">
                        <q-input v-model="generalData.familyNumbers" type="number" label="Nº Integrantes de Familia" />
                    </div>
                </section>

                <section class="row">
                    <div class="col-3">
                        <q-select v-model="generalData.medicalSecure" :options="optionsMedicalSecure" label="Seguro Medico" Outlined />
                    </div>
                </section>
            </div>

            <div class="col-12 box">
                <p class="title">Sintomatologia</p>

                <section class="row">
                    <div class="col-12" style="display: flex; flex-direction: column;">
                        <q-checkbox right-label v-model="symptoms" val="Fiebre" label="Fiebre mayor a 38 grados" />
                        <q-checkbox right-label v-model="symptoms" val="Tos" label="Tos" />
                        <q-checkbox right-label v-model="symptoms" val="dolorCabeza" label="Dolor de cabeza" />
                        <q-checkbox right-label v-model="symptoms" val="dificultadRespiratoria" label="Dificultad respiratoria" />
                        <q-checkbox right-label v-model="symptoms" val="dolorArticulaciones" label="Dolor en articulaciones" />
                        <q-checkbox right-label v-model="symptoms" val="dolorMoscular" label="Dolor moscular" />
                        <q-checkbox right-label v-model="symptoms" val="conjuntivitis" label="Conjuntivitis" />
                        <q-checkbox right-label v-model="symptoms" val="dolorToraxico" label="Dolor toraxico" />
                        <q-checkbox right-label v-model="symptoms" val="dolorFaringeo" label="Dolor faringeo" />
                    </div>
                    <div class="col-12">
                        <q-input v-model="observations" type="textarea" label="Observaciones" filled />
                    </div>
                    <div class="col-4" style="display: flex; flex-direction: column;">
                        <q-checkbox right-label v-model="additionalFeatures" val="embarazada" label="Embarazada" />
                        <q-checkbox right-label v-model="additionalFeatures" val="diabetes" label="Diabetes" />
                    </div>
                    <div class="col-4" style="display: flex; flex-direction: column;">
                        <q-checkbox right-label v-model="additionalFeatures" val="cronicas" label="Cronicas" />
                        <q-checkbox right-label v-model="additionalFeatures" val="obesidad" label="Obesidad" />
                    </div>
                </section>
            </div>

            <div class="col-12 box">
                <p class="title">Dictamen</p>
                <section class="row">
                    <div class="col-4">
                        <q-select v-model="opinion" :options="optionsOpinion" label="Dictamen" Outlined />
                    </div>
                </section>
            </div>

            <div class="col-12 box">
                <section class="row">
                    <div class="col-4 offset-4">
                        <q-btn color="primary" style="width: 100%;" icon="check" label="Guardar registro" @click="saveInformation" />
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

                birthdate: '',
                age: '',

                sex: '',
                telephone: '',

                civilState: '',
                cellular: '',

                direction: '',
                number: '',
                cp: '',

                etnia: '',

                familyNumbers: '',
                medicalSecure: '',
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
                'Tarahumara',
                'Raramuri',
            ],

            optionsMedicalSecure: [
                'INSABI',
                'IMSS',
                'ISSSTE',
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
    },

    methods: {
        getAddressData(addressData, placeResultData, id) {
            console.log(placeResultData.formatted_address)
            this.address = addressData;
            this.generalData.number = this.address.street_number
            this.generalData.cp = this.address.postal_code
            this.generalData.direction = placeResultData.formatted_address
        },

        async saveInformation(){
            let setConfirm = confirm('La informacion es correcta')
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
            } catch (error) {
                console.log(error)
            }
            finally{
                alert('Registro guardado')
            }
        }
    }
}
</script>