<template>
   <header>
      <Logo/>
      <SearchFilter />
   </header>
</template>

<script>
import Logo from './Logo.vue';
import SearchFilter from './SearchFilter.vue';

export default {
   name: 'Header',
   components:{
      Logo,
      SearchFilter
   }
}
</script>

