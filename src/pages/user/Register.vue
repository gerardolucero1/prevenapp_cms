<template>
    <q-page>
        <section class="row">
            <div class="col-4 offset-4">
                <section class="row" style="display: flex; justify-content: center;">
                    <p style="margin-top: 10px; font-size: 22px;">REGISTRO</p>
                </section>

                <section class="row">
                    <div class="col-12">
                        <q-input 
                            v-model="formulario.name" 
                            type="text" 
                            label="Nombre" 
                            bottom-slots
                            :error="this.$v.formulario.name.$anyError"
                            @blur="$v.formulario.name.$touch()"
                        >
                            <template v-slot:error>
                                {{ erroresName[0] }}
                            </template>
                        </q-input>
                    </div>
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
                        <q-btn style="margin-top: 10px; width: 100%;" color="dark" label="Registrarse" :disable="this.$v.formulario.$invalid" @click="createUser" />
                    </div>
                </section>

                <section class="row" style="display: flex; justify-content: center;">
                    <p style="margin-top: 10px;">O registrate con:</p>
                </section>

                <section class="row" style="display: flex; justify-content: center; flex-direction: column;">
                    <q-btn style="margin-top: 10px;" color="primary" label="Facebook" @click="createFacebook" />
                    <q-btn style="margin-top: 10px;" color="negative" label="Google" @click="createGoogle" />
                </section>

                <section class="row" style="display: flex; justify-content: center; flex-direction: column;">
                    <router-link style="margin-top: 10px; text-decoration: none;" to="/">¿Ya tienes una cuenta? Inicia sesion.</router-link>
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
    name: 'Register',

    data(){
        return{
            formulario: {
                name: '',
                email: '',
                password: '',
            },
        }
    },

    validations: {
        formulario: {
            name: {
                required,
            },
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20),
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
            if(!this.$v.formulario.password.minLength){
                errores.push('Ingresa un password de minimo 6 caracteres')
            }
            if(!this.$v.formulario.password.maxLength){
                errores.push('Ingresa un password de maximo 20 caracteres')
            }
            return errores
        }
    },

    methods: {
        ...mapActions([

        ]),

        async saveUser(uid){
            try {
                let response = await db.collection('users').doc(uid).get()
                
                if(!response.exists){
                    let user = {
                        uid: uid,
                        name: this.formulario.name,
                        email: this.formulario.email,
                        infection: false,
                        userType: 'user',
                        terms: false,
                    }

                    await db.collection('users')
                                .doc(user.uid)
                                .set(user)

                    this.$store.dispatch('user/getSesion', user.uid)
                }else{
                    this.$store.dispatch('user/getSesion', user.uid)
                }
            } catch (error) {
                console.log(error)
            }
        },

        //Register
        async createUser(){
            try{
                let response = await auth.createUserWithEmailAndPassword(this.formulario.email, this.formulario.password)

                if(response){
                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))
                    console.log(response.user.uid)

                    if(response.additionalUserInfo.isNewUser){

                        let user = {
                            uid: response.user.uid,
                            name: this.formulario.name,
                            email: this.formulario.email,
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
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        console.log('Ya se ha registrado esta direccion de email')
                        break;
                    default:
                        console.log('Ocurrio un error registrando tu cuenta')
                        break;
                }
            }
        },

        async createGoogle(){
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

        async createFacebook(){
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
    }
}
</script>

<style>

</style>