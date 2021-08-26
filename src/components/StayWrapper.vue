<template>
  <section class="stay-wrapper">
     <div class="stay-wrapper-top">
      <h2 class="stays-in">Stays in {{city ? city : 'Finland'}}</h2>
      <p class="stays-amount" 
         v-if="filteredCities">
         {{filteredCities.length > 12 ? '12+' : filteredCities.length}} 
         stays
      </p>
     </div>
      <ul class="stay-list" v-if="filteredCities">
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
      <div class="no-stay" v-if="filteredCities.length < 1">
         <h2>No stays were found!</h2>
      </div>
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
      }
   },
   computed:{
      ...mapState([
        'city',
        'country',
        'guests'
      ]),
      //Filtering the cities according the name and number of guests defined on store
      filteredCities: function(){
         if(this.city){
            const splitCity = this.city.split(',');
            return this.stays.filter(data => {
               if (data.city.toLowerCase().includes(splitCity[0].toLowerCase()) && data.maxGuests >= this.guests.adults + this.guests.children){
                  return data;
               }
            });
         }
         return this.stays;
      }

   }
}
</script>

