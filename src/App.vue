<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <SearchFilter />
  <StayWrapper />
</template>

<script>
import { defineComponent } from 'vue';
import SearchFilter from './components/SearchFilter.vue';
import StayWrapper from './components/StayWrapper.vue';

export default defineComponent({
  name: 'App',
  components: {
    SearchFilter,
    StayWrapper
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
