<template>
  <div class="search-details" :class="{selected}">
    <div class="search-top" v-if="selected">
      <h3>Edit your search</h3>
      <span class="material-icons close-button"  @click="selected = false">close</span>
    </div>
    <div class="search-filter" >
      <div class="input-location">
        <label v-if="selected">LOCATION</label>
        <input placeholder="Add location" @click="selected = !seleted"/>
      </div>
      <div class="input-guests">
        <label v-if="selected">GUESTS</label>
        <input placeholder="Add guests" @click="selected = !seleted"/>
      </div>
      <button class="search-button" v-if="!selected"> <span class="material-icons search">search</span></button>
    </div>
    <ul class="search-results" v-if="selected">
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
      <li class="search-item"><span class="material-icons">location_on</span>Helsinki, Finland</li>
    </ul>
    <span class="search-button" v-if="selected"> <span class="material-icons search">search</span>Search</span>

  </div>
</template>

<script>
  export default{
    name: 'SearchFilter',
    data(){
      return{
        selected: false
      }
    }
  }
</script>


