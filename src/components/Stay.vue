<template>
   <li class="stay-item">
      <div class="stay-photo">
         <img :src="photo"/>
      </div>
      <div class="stay-info">
         <span v-if="superHost" class="superhost">
            SUPER HOST
         </span>
         <div class="details">
            {{type}}, {{beds}}
         </div>
         <div class="rating">
           <span class="material-icons">star</span>{{rating}}
         </div>
      </div>
      <h2>{{title}}</h2>
   </li>
</template>

<script>

export default{
   name: 'Stay',
   props:{
      city: String,
      country: String,
      superHost: Boolean,
      title: String,
      rating: Number,
      maxGuests: Number,
      type: String,
      beds: Number,
      photo: String
   },
   data(){
      return{
        
      }
   }
}
</script>

