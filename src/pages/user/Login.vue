<template>
    <q-page>
        <section class="row">
            <div class="col-4 offset-4">
                <section class="row" style="display: flex; justify-content: center;">
                    <p style="margin-top: 10px; font-size: 22px;">LOGIN</p>
                </section>

                <section class="row" style="display:none">
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
                    <p style="margin-top: 10px;"> ingresa con:</p>
                </section>

                <section class="row" style="display: flex; justify-content: center; flex-direction: column;">
                    <q-btn style="margin-top: 10px; display:none" color="primary" label="Facebook" @click="ingresar('facebook')" />
                    <q-btn style="margin-top: 10px;" color="primary" id="accesoGoogle" label="Google" @click="ingresar('google')" />

                    <q-btn style="margin-top: 10px; display:none" color="green" id="btnAccesar" label="Acceder" @click="accesar()" />
                </section>
            </div>
        </section>
    </q-page>
</template>

<script>
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

    computed: {
        ...mapState([ 'user' ])
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
                //console.log(response.user.uid)
                this.getUser(response.user.uid)
                document.getElementById('accesoGoogle').style.display="none";
                document.getElementById('btnAccesar').style.display="block";
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
                        console.log('Revisa tu email y contraseña')
                        break;
                    default:
                        console.log('Ocurrio un error al validar la informacion')
                        break;
                }
            }
        },

        async getUser(uid){
            try {
                let response = await db.collection('users')
                                        .doc(uid)
                                        .get()

                if(response.exists){
                    this.$store.commit('user/updateUser', response.data())

                    switch (this.user.user.userType) {
                        case 'doctor':
                            this.$router.push({ path: 'form' }).catch(e => {})
                            break;
                        case 'seguimiento':
                            this.$router.push({ path: 'tracing' }).catch(e => {})
                            break;
                        case 'admin':
                            this.$router.push({ path: 'home' }).catch(e => {})
                            break;
                    
                        default:
                            this.$router.push({ path: '/' }).catch(e => {})
                            break;
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>

</style>