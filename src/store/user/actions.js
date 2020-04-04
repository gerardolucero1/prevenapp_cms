import { auth, db } from '../../boot/firebase'

export async function getSesion ({ commit }, uid) {
    try {
        console.log('Entro al actions')
        let response = await db.collection('users')
                                .doc(uid)
                                .get()
        if(response.exists){
            let user = response.data()
            commit('updateUser', user)

            switch (this.$router.currentRoute.name) {
                case 'Login':
                    if(user.userType == 'admin'){
                        this.$router.push({ name: 'Home' })
                    }else if(user.userType == 'doctor'){
                        this.$router.push({ name: 'Form' })
                    }else if(user.userType == 'seguimiento'){
                        this.$router.push({ name: 'Tracing' })
                    }else{
                        this.$router.push({ name: 'Error' })
                    }
                    break;

                case 'Register':
                    if(user.userType == 'admin'){
                        this.$router.push({ name: 'Home' })
                    }else if(user.userType == 'doctor'){
                        this.$router.push({ name: 'Form' })
                    }else if(user.userType == 'seguimiento'){
                        this.$router.push({ name: 'Tracing' })
                    }else{
                        this.$router.push({ name: 'Error' })
                    }
                    break;
            
                default:
                    break;
            }
        }
    } catch (error) {
        console.log(error)
    }

}

export function closeSesion ({ commit }) {
    auth.signOut()
    commit('updateUser', null)
}

