<template>
    <q-page>
        <section class="row">
            <div class="col-4 offset-4">
                <section class="row" style="display: flex; justify-content: center;">
                    <p style="margin-top: 10px; font-size: 22px;">LOGIN</p>
                </section>

                <section class="row">
                    <div class="col-12">
                        <q-input v-model="formulario.email" type="email" label="Email" />
                    </div>
                    <div class="col-12">
                        <q-input v-model="formulario.password" type="password" label="Contraseña" />
                    </div>
                    <div class="col-12">
                        <q-btn style="margin-top: 10px; width: 100%;" color="primary" label="Ingresar" @click="ingresar('email')" />
                    </div>
                </section>

                <section class="row" style="display: flex; justify-content: center;">
                    <p style="margin-top: 10px;">O ingresa con:</p>
                </section>

                <section class="row" style="display: flex; justify-content: center; flex-direction: column;">
                    <q-btn style="margin-top: 10px;" color="primary" label="Facebook" @click="ingresar('facebook')" />
                    <q-btn style="margin-top: 10px;" color="primary" label="Google" @click="ingresar('google')" />
                </section>
            </div>
        </section>
    </q-page>
</template>

<script>
import { auth, firebase, db } from 'boot/firebase'

export default {
    name: 'Login',

    data(){
        return{
            formulario: {
                email: '',
                password: '',
            },
        }
    },

    methods: {
        ingresar(metodo){
            switch (metodo) {
                case 'email':
                    this.ingresarEmail()
                    break;
                case 'facebook':
                    this.ingresarFacebook()
                case 'google':
                    this.ingresarGoogle()
                default:
                    break;
            }
        },

        async ingresarFacebook(){
            let provider = new firebase.auth.FacebookAuthProvider()
            provider.setCustomParameters({
                'display': 'popup'
            })
            auth.languageCode = 'es_MX'
            try{
                await auth.signInWithPopup(provider)
                this.$router.push({ path: 'form' })
            }
            catch(error){
                console.log(error)
            }
        },

        async ingresarGoogle(){
            let provider = new firebase.auth.GoogleAuthProvider()
            provider.setCustomParameters({
                'display': 'popup'
            })
            auth.languageCode = 'es_MX'
            try{
                let response = await auth.signInWithPopup(provider)
                this.$router.push({ path: 'form' })
            }
            catch(error){
                console.log(error)
            }
        },

        async ingresarEmail(){
            try{
                await auth.signInWithEmailAndPassword(this.formulario.email, this.formulario.password)
                this.$router.push({ path: 'form' })
            }
            catch(error){
                console.log(error)
                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        console.log('Revisa tu email y contraseña')
                        break;
                    default:
                        console.log('Ocurrio un error al validar la informacion')
                        break;
                }
            }
        },
    }
}
</script>

<style>

</style>