<template>
  <div class="search-wrapper" :class="{selected}">
    <div class="search-top" v-if="selected">
      <h3>Edit your search</h3>
      <span class="material-icons close-button" @click="selected = false">close</span>
    </div>
    <div class="search-filter" >
      <div class="input-location">
        <label v-if="selected">LOCATION</label>

        <!-- For some reason v-model doens't work properly on mobile devices, fortunatelly I found a fix for this issue:

          https://stackoverflow.com/questions/51546833/vue-js-keyup-events-and-v-model-length-on-android-not-working-as-expected

         -->
        <input 
          :value='query' 
          @input='event => query = event.target.value'
          v-on:keyup="onChange()"

          placeholder="Add location" 
          @click="selected = true; 
          guestSelected = false; 
          locationSelected=true"
        />
        <span v-if="selected && query" 
          @click="
          query = '';
          selectedCity = '';
          queryResults = cities " 
          class="clear-input">
          <span class="material-icons">close</span>
        </span>
      </div>
      <div class="input-guests">
        <label v-if="selected">GUESTS</label>
        <input 
          placeholder="Add guests" 
          v-model="guests" 
          @click="selected = true; 
            guestSelected = true; 
            locationSelected=false"
            readonly />
        <span 
          v-if="selected && guests" 
          @click="guests = '' 
            adults = 0;
            children = 0" 
          class="clear-input">
          <span class="material-icons">close</span>
        </span>
      </div>
      <button 
        class=" desktop" 
        
      > 
        <span class="material-icons search">search</span>
      </button>
    </div>
    <div class="search-details" v-if="selected">
      <div class="guests-wrapper" :class="{guestSelected}" v-if="guestSelected">
        <div class="guests">
          <div class="guests-info">
            <p class="guest-type">Adults</p>
            <p class="guest-type-info">Ages 13 or above</p>
          </div>
          <div class="buttons">
            <button 
              @click="adults > 0 ? adults-- : adults; 
              calcGuests()">
              -
            </button>
            <span>{{adults}}</span>
            <button
               @click="adults++; 
              calcGuests()">
              +
            </button>
          </div>
        </div>
        <div class="guests">
          <div class="guests-info">
            <p class="guest-type">Children</p>
            <p class="guest-type-info">Ages 2-12</p>
          </div>
          <div class="buttons">
            <button 
              @click="children > 0 ? children-- : children; 
              calcGuests()">
              -
            </button>
            <span>{{children}}</span>
            <button 
              @click="children++; 
              calcGuests()">
              +
            </button>
          </div>
        </div>
      </div>
      <ul v-if="locationSelected">
        <li 
          class="search-item" 
          v-for="city in queryResults" :key="city" 
          @click="query = city;
            queryResults = []; 
            selectedCity = city">
          <span class="material-icons">location_on</span>
          {{city}}
        </li>
      </ul>  
    </div>
    <span 
      class="search-button" 
      v-if="selected" 
      @click="
        setLocation(selectedCity, country); 
        setGuests({adults, children});"> 
        <span class="material-icons search">search</span>
      Search
    </span>
    <div v-if="selected" class="gray-bg"></div>
  </div>
</template>

<script>
import { mapMutations} from 'vuex';
import staysData from '../data/stays.json';

  export default{
    name: 'SearchFilter',
   
    data(){
      return{
        staysData,
        cities: ['Helsinki, Finland', 'Turku, Finland', 'Vaasa, Finland', 'Oulu, Finland'], 
        query: '', 
        queryResults: ['Helsinki, Finland', 'Turku, Finland', 'Vaasa, Finland', 'Oulu, Finland'],
        selectedCity: '',
        guests: '',
        adults: 0,
        children: 0,
        selected: false,
        locationSelected: false,
        guestSelected: false,
        
      }
    },
   
    methods:{
      onChange: function(){
        //Filtering the locations to be displayed below the searchbar
        return this.queryResults = this.cities.filter(query => query.toLowerCase().includes(this.query.toLowerCase()));
      },
      ...mapMutations([
        'setLocation',
        'setGuests'
      ]),
      calcGuests: function(){
        //Total of guests to be displayed on input
        this.guests = this.adults + this.children + ' guests';
      }
   },
  }
</script>


