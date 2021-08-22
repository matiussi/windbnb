<template>
   <div class="search-wrapper">
      <div class="search-filter">
         <div
            class="input-location"
            @click="
               selected = true;
               guestSelected = false;
               locationSelected = true;
            "
         >
            <input :value="query" placeholder="Add location" ref="query" />
         </div>
         <div
            class="input-guests"
            @click="
               selected = true;
               guestSelected = true;
               locationSelected = false;
            "
         >
            <input placeholder="Add guests" v-model="guests" readonly />
         </div>

         <button class="search-button-primary"
            @click="
               setLocation(selectedCity, country);
               setGuests({ adults, children });
            "
         >
            <span class="material-icons search">search</span>
         </button>
      </div>
   </div>
   <transition name="selectedanimation">
      <div class="search-wrapper" :class="{ selected }" v-if="selected">
         <div class="search-top">
            <h3>Edit your search</h3>
            <span class="material-icons close-button" @click="selected = false"
               >close</span
            >
         </div>
         <div class="search-filter">
            <div
               class="input-location"
               @click="
                  selected = true;
                  guestSelected = false;
                  locationSelected = true;
                  setFocus();
               "
            >
               <label>LOCATION</label>
               <input
                  :value="query"
                  @input="(event) => (query = event.target.value)"
                  v-on:keyup="onChange()"
                  placeholder="Add location"
                  ref="query"
               />
               <span
                  v-if="query"
                  @click="
                     query = '';
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
               @click="
                  selected = true;
                  guestSelected = true;
                  locationSelected = false;
               "
            >
               <label>GUESTS</label>
               <input placeholder="Add guests" v-model="guests" readonly />
               <span
                  v-if="guests"
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
            <button class="search-button-primary" v-if="!selected">
               <span class="material-icons search">search</span>
            </button>
         </div>

         <div class="search-details">
            <div
               class="guests-wrapper"
               :class="{ guestSelected }"
               v-if="guestSelected"
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
                           calcGuests();
                        "
                     >
                        +
                     </button>
                  </div>
               </div>
            </div>

            <ul class="search-list" v-if="locationSelected">
               <li
                  class="search-item"
                  v-for="city in queryResults"
                  :key="city"
                  @click="
                     query = city;
                     queryResults = [];
                     selectedCity = city;
                  "
               >
                  <span class="material-icons">location_on</span>
                  {{ city }}
               </li>
            </ul>
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
   </transition>
   <div v-if="selected" class="gray-bg"></div>
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
         query: "",
         queryResults: [
            "Helsinki, Finland",
            "Turku, Finland",
            "Vaasa, Finland",
            "Oulu, Finland",
         ],
         selectedCity: "",
         guests: "",
         adults: 0,
         children: 0,
         selected: false,
         locationSelected: false,
         guestSelected: false,
         selectedanimation: true,
      };
   },

   methods: {
      onChange: function () {
         //Filtering the locations to be displayed below the searchbar
         return (this.queryResults = this.cities.filter((query) =>
            query.toLowerCase().includes(this.query.toLowerCase())
         ));
      },
      ...mapMutations(["setLocation", "setGuests"]),
      calcGuests: function () {
         //Total of guests to be displayed on input
         this.guests = this.adults + this.children + " guests";
      },
      setFocus: function () {
         this.$refs.query.focus();
      },
   },
};
</script>


