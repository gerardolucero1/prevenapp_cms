<template>
    <q-page>
        <section class="row">
            <div class="col-4 offset-4">
                <section class="row" style="display: flex; justify-content: center;">
                    <p style="margin-top: 10px; font-size: 22px;">Parece que no tienes un rol asignado, ponte en contacto con el administrador.</p>
                    <div>
                        <q-btn color="primary" icon="check" label="Cerrar Sesion" @click="exit" />
                    </div>
                </section>
            </div>
        </section>
    </q-page>
</template>

<script>
import { auth, firebase, db } from 'boot/firebase'
import { mapState, mapActions } from "vuex";

export default {
    name: 'Error',

    data(){
        return{
            
        }
    },

    computed: {
        ...mapState([ 'user' ])
    },

    methods: {
        ...mapActions([
            'closeSesion',
        ]),
        
        exit(){
            this.$store.dispatch('user/closeSesion')
            this.$router.push({ path: '/' })
        }
        
    }
}
</script>

<style>

</style>