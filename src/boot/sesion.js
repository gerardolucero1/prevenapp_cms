// import something here
import store from "../store";
import { auth } from '../boot/firebase'

// "async" is optional
export default async ({ store }) => {
  auth.onAuthStateChanged(user => {
    if(user){
      store.dispatch('user/getSesion', user.uid)
    }else{
      store.dispatch('user/closeSesion')
    }
  })
}
