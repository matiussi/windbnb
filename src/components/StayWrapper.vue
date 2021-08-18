<template>
  <section class="stay-wrapper">
     <h1 class="stays-in">Stays in</h1>
     <p class="stays-amount"></p>
      <ul class="stay-list">
         <Stay v-for="stay in filteredCities" :key="stay"
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
import { mapState} from 'vuex';
import staysData from '../data/stays.json';
import Stay from './Stay.vue';

export default {
   name: 'StayWrapper',
   components:{
      Stay
   },
   data(){
      return{
         stays: staysData,
         // filteredCities: []
      }
   },
   computed:{
      ...mapState([
        'city',
        'country',
        'guests'
      ]),
      //Filtering the cities according the city name and number of guests defined on store
      filteredCities: function(){
         if(this.city){
            return this.stays.filter(data => {
               if (data.city.toLowerCase().includes(this.city.toLowerCase()) && data.maxGuests >= this.guests.adults + this.guests.children){
                  return data
               }
            });
         }
         return this.stays
      }

   }
}
</script>

