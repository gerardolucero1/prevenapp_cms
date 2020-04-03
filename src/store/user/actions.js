import { auth, db } from '../../boot/firebase'

// export async function getSesion ({ commit }, uid) {
//     try {
//         let user = null

//         let response = await db.collection('users')
//                                 .doc(uid)
//                                 .get()
        
        // if(response.exists){
        //     user = response.data()
        //     commit('updateUser', user)

        //     switch (user.userType) {
        //         case 'doctor':
        //             this.$router.push({ path: 'form' })
        //             break;
        //         case 'seguimiento':
        //             this.$router.push({ path: 'tracing' })
        //             break;
        //         case 'admin':
        //             this.$router.push({ path: 'home' })
        //             break;
            
        //         default:
        //             this.$router.push({ path: '/' })
        //             break;
        //     }
            
        // }
//     } catch (error) {
//         console.log(error)
//     }

// }

export function closeSesion ({ commit }) {
    auth.signOut()
    commit('updateUser', null)
}

