<template>
    <q-page>
        <section class="row">
            <div class="col-4 offset-4">
                <section class="row" style="display: flex; justify-content: center;">
                    <p style="margin-top: 10px; font-size: 22px;">LOGIN</p>
                </section>

                <section class="row">
                    <div class="col-12">
                        <q-input 
                            v-model="formulario.email" 
                            type="email" 
                            label="Email"
                            :error="this.$v.formulario.email.$anyError"
                            @blur="$v.formulario.email.$touch()"
                        >
                            <template v-slot:error>
                                {{ erroresEmail[0] }}
                            </template>
                        </q-input>
                    </div>
                    <div class="col-12">
                        <q-input 
                            v-model="formulario.password" 
                            type="password" 
                            label="Contraseña"
                            :error="this.$v.formulario.password.$anyError"
                            @blur="$v.formulario.password.$touch()"
                        >
                            <template v-slot:error>
                                {{ erroresPassword[0] }}
                            </template>
                        </q-input>
                    </div>

                    <div class="col-12">
                        <q-btn style="margin-top: 10px; width: 100%;" color="dark" label="Ingresar" :disable="this.$v.formulario.$invalid" @click="ingresarEmail" />
                    </div>
                </section>

                <section class="row" style="display: flex; justify-content: center;">
                    <p style="margin-top: 10px;"> ingresa con:</p>
                </section>

                <section class="row" style="display: flex; justify-content: center; flex-direction: column;">
                    <q-btn style="margin-top: 10px;" color="primary" label="Facebook" @click="ingresarFacebook" />
                    <q-btn style="margin-top: 10px;" color="negative" label="Google" @click="ingresarGoogle" />
                </section>

                <section class="row" style="display: flex; justify-content: center; flex-direction: column;">
                    <router-link style="margin-top: 10px; text-decoration: none;" to="/register">¿No tienes una cuenta? Registrate.</router-link>
                </section>
            </div>
        </section>
    </q-page>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { auth, firebase, db } from 'boot/firebase'
import { mapActions, mapMutations, mapState } from "vuex";

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

    validations: {
        formulario: {
            email: {
                required,
                email,
            },
            password: {
                required,
            }
        }
    },

    computed: {
        ...mapState([ 'user' ]),

        erroresName: function(){
            let errores = []
            if(!this.$v.formulario.name.$dirty){
                return errores
            }
            if(!this.$v.formulario.name.required){
                errores.push('Ingresa tu nombre')
            }

            return errores
        },

        erroresEmail: function(){
            let errores = []
            if(!this.$v.formulario.email.$dirty){
                return errores
            }
            if(!this.$v.formulario.email.required){
                errores.push('Ingresa tu email')
            }
            if(!this.$v.formulario.email.email){
                errores.push('Ingresa un email valido')
            }
            return errores
        },

        erroresPassword: function(){
            let errores = []
            if(!this.$v.formulario.password.$dirty){
                return errores
            }
            if(!this.$v.formulario.password.required){
                errores.push('Ingresa tu password')
            }
            return errores
        }
    },

    methods: {

        async ingresarFacebook(){
            let provider = new firebase.auth.FacebookAuthProvider()
            provider.setCustomParameters({
                'display': 'popup'
            })
            auth.languageCode = 'es_MX'

            try{
                let response = await auth.signInWithPopup(provider)

                if(response){
                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))
                    console.log(response.user.uid)

                    if(response.additionalUserInfo.isNewUser){

                        let user = {
                            uid: response.user.uid,
                            name: response.user.displayName,
                            email: response.additionalUserInfo.profile.email,
                            infection: false,
                            userType: 'user',
                            terms: false,
                        }

                        await db.collection('users').doc(user.uid).set(user)
                    }

                    this.$store.dispatch('user/getSesion', response.user.uid)

                }

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

                if(response){
                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))
                    console.log(response.user.uid)

                    if(response.additionalUserInfo.isNewUser){

                        let user = {
                            uid: response.user.uid,
                            name: response.user.displayName,
                            email: response.additionalUserInfo.profile.email,
                            infection: false,
                            userType: 'user',
                            terms: false,
                        }

                        await db.collection('users').doc(user.uid).set(user)
                    }

                    this.$store.dispatch('user/getSesion', response.user.uid)

                }

            }
            catch(error){
                console.log(error)
            }
        },
        accesar(){
             window.location.replace("https://prevenapp-cms.now.sh/#/form");
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
                        this.getNotify('Revisa tu email y contraseña', 'orange', 'warning')
                        break;
                    default:
                        this.getNotify('Ocurrio un error al validar la informacion', 'red', 'error')
                        break;
                }
            }
        },

        getNotify(message, color, icon){
            this.$q.notify({
                message: message,
                color: color,
                icon: icon
            })
        }
    }
}
</script>

<style>

</style>