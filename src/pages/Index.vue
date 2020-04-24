<style lang="sass" scoped>
    .row > div
        padding: 10px 15px
    
    .row + .row
        margin-top: 10px
</style>

<template>
    <q-page>
        <section v-if="user.user.userType == 'admin'">
            <section class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-6 offset-3">
                            <q-select v-model="select.state" :options="states" map-options emit-value option-label="name" option-value="name" label="Estado" filled />
                        </div>
                    </div>
                    
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-6 offset-3">
                            <q-select v-model="select.city" :options="cities" map-options emit-value option-label="name" option-value="name" label="Ciudad" filled />
                        </div>
                    </div>
                </div>
            </section>
            <section class="row flex justify-center">
                <h4>Informacion actual Chihuahua (Municipal)</h4>
            </section>
            <section class="row">
                <div class="col">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="text-h6">Confirmados</div>
                            <div class="text-subtitle2">Total de casos confirmados:</div>
                            <q-badge color="red" text-color="white" :label="casesM.confirmed" style="font-size: 18px; font-weight: bold; padding: 10px;" />
                            <q-popup-edit v-model="casesM.confirmed" content-class="bg-accent text-white">
                                <q-input @keyup.enter="updateCasesMunicipio" dark color="white" v-model="casesM.confirmed" dense autofocus counter>
                                    <template v-slot:append>
                                    <q-icon name="edit" />
                                    </template>
                                </q-input>
                            </q-popup-edit>
                        </q-card-section>
                        <q-card-section>
                            
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="text-h6">Sospechosos</div>
                            <div class="text-subtitle2">Total de casos sospechosos:</div>
                            <q-badge color="orange" text-color="white" :label="casesM.suspect" style="font-size: 18px; font-weight: bold; padding: 10px;" />
                            <q-popup-edit v-model="casesM.suspect" content-class="bg-accent text-white">
                                <q-input @keyup.enter="updateCasesMunicipio" dark color="white" v-model="casesM.suspect" dense autofocus counter>
                                    <template v-slot:append>
                                    <q-icon name="edit" />
                                    </template>
                                </q-input>
                            </q-popup-edit>
                        </q-card-section>
                        <q-card-section>
                            
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="text-h6">Recuperados</div>
                            <div class="text-subtitle2">Total de casos recuperados:</div>
                            <q-badge color="green" text-color="white" :label="casesM.recovered" style="font-size: 18px; font-weight: bold; padding: 10px;" />
                            <q-popup-edit v-model="casesM.recovered" content-class="bg-accent text-white">
                                <q-input @keyup.enter="updateCasesMunicipio" dark color="white" v-model="casesM.recovered" dense autofocus counter>
                                    <template v-slot:append>
                                    <q-icon name="edit" />
                                    </template>
                                </q-input>
                            </q-popup-edit>
                        </q-card-section>
                        <q-card-section>
                            
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="text-h6">Desesos</div>
                            <div class="text-subtitle2">Total de casos desesos:</div>
                            <q-badge color="black" text-color="white" :label="casesM.deaths" style="font-size: 18px; font-weight: bold; padding: 10px;" />
                            <q-popup-edit v-model="casesM.deaths" content-class="bg-accent text-white">
                                <q-input @keyup.enter="updateCasesMunicipio" dark color="white" v-model="casesM.deaths" dense autofocus counter>
                                    <template v-slot:append>
                                    <q-icon name="edit" />
                                    </template>
                                </q-input>
                            </q-popup-edit>
                        </q-card-section>
                        <q-card-section>
                            
                        </q-card-section>
                    </q-card>
                </div>
            </section>
            <section class="row flex justify-center">
                <h4>Informacion actual Chihuahua (Estatal)</h4>
            </section>
            <section class="row">
                <div class="col">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="text-h6">Confirmados</div>
                            <div class="text-subtitle2">Total de casos confirmados:</div>
                            <q-badge color="red" text-color="white" :label="cases.confirmed" style="font-size: 18px; font-weight: bold; padding: 10px;" />
                            <q-popup-edit v-model="cases.confirmed" content-class="bg-accent text-white">
                                <q-input @keyup.enter="updateCases" dark color="white" v-model="cases.confirmed" dense autofocus counter>
                                    <template v-slot:append>
                                    <q-icon name="edit" />
                                    </template>
                                </q-input>
                            </q-popup-edit>
                        </q-card-section>
                        <q-card-section>
                            
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col">
                    <q-card class="my-card">
                       <q-card-section>
                            <div class="text-h6">Sospechosos</div>
                            <div class="text-subtitle2">Total de casos sospechosos:</div>
                            <q-badge color="orange" text-color="white" :label="cases.suspect" style="font-size: 18px; font-weight: bold; padding: 10px;" />
                            <q-popup-edit v-model="cases.suspect" content-class="bg-accent text-white">
                                <q-input @keyup.enter="updateCases" dark color="white" v-model="cases.suspect" dense autofocus counter>
                                    <template v-slot:append>
                                    <q-icon name="edit" />
                                    </template>
                                </q-input>
                            </q-popup-edit>
                        </q-card-section>
                        <q-card-section>
                            
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col">
                    <q-card class="my-card">
                       <q-card-section>
                            <div class="text-h6">Recuperados</div>
                            <div class="text-subtitle2">Total de casos recuperados:</div>
                            <q-badge color="green" text-color="white" :label="cases.recovered" style="font-size: 18px; font-weight: bold; padding: 10px;" />
                            <q-popup-edit v-model="cases.recovered" content-class="bg-accent text-white">
                                <q-input @keyup.enter="updateCases" dark color="white" v-model="cases.recovered" dense autofocus counter>
                                    <template v-slot:append>
                                    <q-icon name="edit" />
                                    </template>
                                </q-input>
                            </q-popup-edit>
                        </q-card-section>
                        <q-card-section>
                            
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col">
                    <q-card class="my-card">
                       <q-card-section>
                            <div class="text-h6">Desesos</div>
                            <div class="text-subtitle2">Total de casos desesos:</div>
                            <q-badge color="black" text-color="white" :label="cases.deaths" style="font-size: 18px; font-weight: bold; padding: 10px;" />
                            <q-popup-edit v-model="cases.deaths" content-class="bg-accent text-white">
                                <q-input @keyup.enter="updateCases" dark color="white" v-model="cases.deaths" dense autofocus counter>
                                    <template v-slot:append>
                                    <q-icon name="edit" />
                                    </template>
                                </q-input>
                            </q-popup-edit>
                        </q-card-section>
                        <q-card-section>
                            
                        </q-card-section>
                    </q-card>
                </div>
            </section>
        </section>
        
        <section v-else>
            HOla Mundo
        </section>
    </q-page>
</template>

<script>
import { db } from 'boot/firebase'
import { mapState } from "vuex";

export default {
    name: 'Home',

    data(){
        return{
            cases: '',
            casesM: '',
            select: {
                state: '',
                city: '',
            },
            states: [],
            cities: [],
        }
    },

    computed: {
        ...mapState([
            'user'
        ])
    },

    watch: {
        'select.state'(){
            this.getCities()
            this.getCases();
        },

        'select.city'(){
            this.getCasesMunicipio();
        }
    },

    mounted(){
        // this.getCases();
        // this.getCasesMunicipio();
        this.getStates();
    },

    methods: {
        async getStates(){
            try {
                let response = await db.collection('cases')
                                            .get()
                                            .then((query) => {
                                                query.forEach((doc) => {
                                                    this.states.push(doc.data())
                                                })
                                            })
            } catch (error) {
                console.log(error)
            }
        },

        async getCities(){
            this.cities = []
            try {
                let response = await db.collection('cases')
                                            .doc(this.select.state)
                                            .collection('cities')
                                            .get()
                                            .then((query) => {
                                                query.forEach((doc) => {
                                                    this.cities.push(doc.data())
                                                })
                                            })
            } catch (error) {
                console.log(error)
            }
        },

        async updateCases(){
            try {
                this.cases.date = new Date()
                let response = await db.collection('cases')
                                                .doc(this.select.state)
                                                .update(this.cases)

            } catch (error) {
                console.log(error)
            }
        },
        async updateCasesMunicipio(){
            try {
                this.casesM.date = new Date()
                let response = await db.collection('cases')
                                        .doc(this.select.state)
                                        .collection('cities')
                                        .doc(this.select.city)
                                        .update(this.casesM)

            } catch (error) {
                console.log(error)
            }
        },

        async getCases(){
            try {
                let response = await db.collection('cases').doc(this.select.state).get()

                if(response.exists){
                    this.cases = response.data()
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getCasesMunicipio(){
            try {
                let response = await db.collection('cases')
                                        .doc(this.select.state)
                                        .collection('cities')
                                        .doc(this.select.city)
                                        .get()

                if(response.exists){
                    this.casesM = response.data()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>