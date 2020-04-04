<style lang="sass" scoped>
    .row > div
        padding: 10px 15px
    
    .row + .row
        margin-top: 10px
</style>

<template>
    <q-page>
        <section v-if="user.user.userType == 'admin'">
            <section class="row flex justify-center">
                <h4>Informacion actual Chihuahua</h4>
            </section>
            <section class="row">
                <div class="col">
                    <q-card class="my-card">
                        <img src="https://www.infobae.com/new-resizer/gaZ9E1J1EeqB2_537nQAKUlPo50=/750x0/filters:quality(100)/arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/EQ5JDXJAO5CM3MJN2KORVLZWYY.jpg">
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
                        <img src="https://www.infobae.com/new-resizer/gaZ9E1J1EeqB2_537nQAKUlPo50=/750x0/filters:quality(100)/arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/EQ5JDXJAO5CM3MJN2KORVLZWYY.jpg">
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
                        <img src="https://www.infobae.com/new-resizer/gaZ9E1J1EeqB2_537nQAKUlPo50=/750x0/filters:quality(100)/arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/EQ5JDXJAO5CM3MJN2KORVLZWYY.jpg">
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
            cases: ''
        }
    },

    computed: {
        ...mapState([
            'user'
        ])
    },

    mounted(){
        this.getCases()
    },

    methods: {
        async updateCases(){
            try {
                let response = await db.collection('cases').doc('chihuahua')
                                                .update(this.cases)

            } catch (error) {
                console.log(error)
            }
        },

        async getCases(){
            try {
                let response = await db.collection('cases').doc('chihuahua').get()

                if(response.exists){
                    this.cases = response.data()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>