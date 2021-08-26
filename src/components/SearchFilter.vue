<template>
   <div class="search-wrapper">
      <div class="search-filter">
         <div
            class="input-location"
            @click="
               searchFilterActive = true;
               guestsInputSelected = false;
               locationInputSelected = true;
               setFocus();
            "
         >
            <input :value="locationQuery" placeholder="Add location" />
         </div>
         <div
            class="input-guests"
            @click="
               searchFilterActive = true;
               guestsInputSelected = true;
               locationInputSelected = false;
            "
         >
            <input placeholder="Add guests" v-model="guests" readonly />
         </div>

         <button
            class="search-button-primary"
            @click="
               setLocation(selectedCity, country);
               setGuests({ adults, children });
            "
         >
            <span class="material-icons search">search</span>
         </button>
      </div>
   </div>
   <transition name="search-wrapper-animation">
      <div
         class="search-wrapper"
         :class="searchFilterActive ? 'search-filter-active' : ''"
         v-if="searchFilterActive"
      >
         <div class="search-wrapper-selected">
            <div class="search-top">
               <h3>Edit your search</h3>
               <span
                  class="material-icons close-button"
                  @click="searchFilterActive = false"
                  >close</span
               >
            </div>
            <div class="search-filter">
               <div
                  class="input-location"
                  :class="locationInputSelected ? 'input-focus' : ''"
                  @click="
                     searchFilterActive = true;
                     guestsInputSelected = false;
                     locationInputSelected = true;
                     setFocus();
                  "
               >
                  <label>LOCATION</label>
                  <input
                     :value="locationQuery"
                     @input="(event) => (locationQuery = event.target.value)"
                     v-on:keyup="onChange()"
                     placeholder="Add location"
                     ref="locationQuery"
                  />
                  <span
                     v-if="locationQuery && locationInputSelected"
                     @click="
                        locationQuery = '';
                        selectedCity = '';
                        queryResults = cities;
                     "
                     class="clear-input"
                  >
                     <span class="material-icons">close</span>
                  </span>
               </div>
               <div
                  class="input-guests"
                  :class="guestsInputSelected ? 'input-focus' : ''"
                  @click="
                     searchFilterActive = true;
                     guestsInputSelected = true;
                     locationInputSelected = false;
                  "
               >
                  <label>GUESTS</label>
                  <input placeholder="Add guests" v-model="guests" readonly />
                  <span
                     v-if="guests && guestsInputSelected"
                     @click="
                        guests = '';
                        adults = 0;
                        children = 0;
                     "
                     class="clear-input"
                  >
                     <span class="material-icons">close</span>
                  </span>
               </div>
               <div class="button-wrapper">
                  <button
                     class="search-button desktop"
                     @click="
                        setLocation(selectedCity, country);
                        setGuests({ adults, children });
                     "
                  >
                     <span class="material-icons search">search</span>
                     Search
                  </button>
               </div>
               <button class="search-button-primary" v-if="!searchFilterActive">
                  <span class="material-icons search">search</span>
               </button>
            </div>

            <div class="search-details">
               <ul class="search-list" v-if="locationInputSelected">
                  <li
                     class="search-item"
                     v-for="city in queryResults"
                     :key="city"
                     @click="
                        locationQuery = city;
                        queryResults = [];
                        selectedCity = city;
                     "
                  >
                     <span class="material-icons">location_on</span>
                     {{ city }}
                  </li>
               </ul>
               <div
                  class="guests-wrapper"
                  :class="{ guestsInputSelected }"
                  v-if="guestsInputSelected"
               >
                  <div class="guests">
                     <div class="guests-info">
                        <p class="guest-type">Adults</p>
                        <p class="guest-type-info">Ages 13 or above</p>
                     </div>
                     <div class="buttons">
                        <button
                           @click="
                              adults > 0 ? adults-- : adults;
                              adults < 1 && children > 0 ? (children = 0) : '';
                              calcGuests();
                           "
                        >
                           -
                        </button>
                        <span>{{ adults }}</span>
                        <button
                           @click="
                              adults++;
                              calcGuests();
                           "
                        >
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
                           @click="
                              children > 0 ? children-- : children;
                              calcGuests();
                           "
                        >
                           -
                        </button>
                        <span>{{ children }}</span>
                        <button
                           @click="
                              children++;
                              adults < 1 && children > 0 ? adults++ : adults;
                              calcGuests();
                           "
                        >
                           +
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <span
               class="search-button"
               @click="
                  setLocation(selectedCity, country);
                  setGuests({ adults, children });
               "
            >
               <span class="material-icons search">search</span>
               Search
            </span>
         </div>
      </div>
   </transition>
   <div v-if="searchFilterActive" class="gray-bg"></div>
</template>

<script>
import { mapMutations } from "vuex";
import staysData from "../data/stays.json";

export default {
   name: "SearchFilter",

   data() {
      return {
         staysData,
         cities: [
            "Helsinki, Finland",
            "Turku, Finland",
            "Vaasa, Finland",
            "Oulu, Finland",
         ],
         //Stores the values typed in the input
         locationQuery: "", 

         //Display all the cities when locationQuery is empty, otherwise will display a location according the value typed on locationQuery
         queryResults: [
            "Helsinki, Finland",
            "Turku, Finland",
            "Vaasa, Finland",
            "Oulu, Finland",
         ], 
         //Receives a value from queryResults that will be sent to the vuex store
         selectedCity: "",
          
         guests: "",
         adults: 0,
         children: 0,

         //Controls when the search filter should open or close
         searchFilterActive: false, 

         /*Controls which input field is currently selected, applying focus,
         and displaying the content according the selected input  */
         locationInputSelected: false,
         guestsInputSelected: false,
      };
   },

   methods: {
      onChange: function () {
         //Filtering the locations to be displayed below the searchbar
         return (this.queryResults = this.cities.filter((query) =>
            query.toLowerCase().includes(this.locationQuery.toLowerCase())
         ));
      },
      ...mapMutations(["setLocation", "setGuests"]),
      //Total of guests to be displayed on input
      calcGuests: function () {
         const guestsSum = this.adults + this.children;
         this.adults + this.children < 1
            ? (this.guests = "")
            : (this.guests = guestsSum + " guests");
      },
      setFocus: function () {
         this.$nextTick(() => this.$refs.locationQuery.focus());
      },
   },
};
</script>


