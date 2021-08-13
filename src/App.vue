<template>
  <Header />
  <StayWrapper />
</template>

<script>
import { defineComponent } from 'vue';
import StayWrapper from './components/StayWrapper.vue';
import Header from './components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    StayWrapper
  }
});
</script>

<style lang="scss" src="./styles/main.scss"></style>
