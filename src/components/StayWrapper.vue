<template>
  <section class="stay-wrapper">
     <h1 class="stays-in">Stays in</h1>
     <p class="stays-amount"></p>
      <ul class="stay-list">
         <Stay v-for="stay in stays" :key="stay"
            v-bind:city="stay.city"
            v-bind:country="stay.country"
            v-bind:superHost="stay.superHost"
            v-bind:title="stay.title"
            v-bind:rating="stay.rating"
            v-bind:maxGuests="stay.maxGuests"
            v-bind:type="stay.type"
            v-bind:beds="stay.beds"
            v-bind:photo="stay.photo"
         />
      </ul>
  </section>
</template>

<script>
import { mapMutations, mapState} from 'vuex';
import staysData from '../data/stays.json';
import Stay from './Stay.vue';

export default {
   name: 'StayWrapper',
   components:{
      Stay
   },
   computed:{
      ...mapState([
         'counter'
      ])
   },
   methods:{
      ...mapMutations([
         'decrement',
         'increment'
      ])
   },
   data(){
      return{
         stays: staysData
      }
   }
}
</script>

<style>

</style>