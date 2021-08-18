import {createApp} from "vue";
import {createStore} from "vuex";
const app = createApp({})

export const store = createStore({
   
   state:{
      city: '',
      country: '',
      guests:{
         adults: 0,
         children: 0,
      }
   },
   mutations:{
      setLocation(state, city, country){
         state.city = city
         state.country = country
      },
      setGuests(state, guests){
         state.guests= guests
      } 
   }
});

export default app