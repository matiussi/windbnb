import {createApp} from "vue";
import {createStore} from "vuex";
const app = createApp({})

export const store = createStore({
   
   state:{
      counter: 0
   },
   mutations:{
      increment: state => state.counter--,
      decrement: state => state.counter++
   }
});

export default app