<template>
  <div class="logo">
     <img :src="logo">
  </div>
</template>

<script>
import logo from '../../public/img/logo.svg';

export default {
   name: 'Logo',

   data(){
      return {
         logo
      }
   }
}
</script>

