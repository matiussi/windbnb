<template>
   <li class="stay-item">
      <div class="stay-photo">
         <img :src="photo"/>
      </div>
      <div class="stay-info">
         <span v-if="superHost" class="superhost">
            SUPER HOST
         </span>
         <div class="stay-details">
            {{type}}<p v-if="beds >= 1">, {{beds}} beds</p>
         </div>
         <div class="stay-ratings">
           <span class="material-icons star">star</span>{{rating}}
         </div>
      </div>
      <h2 className="stay-title">{{title}}</h2>
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

