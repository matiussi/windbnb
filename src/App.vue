<template>
  <div class="content">
    <Header />
    <StayWrapper />
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import StayWrapper from './components/StayWrapper.vue';
import Footer from './components/Footer.vue';

/* Some notes about Vue 
  methods: 
  data:
  computed: 
*/
export default defineComponent({
  name: 'App',
  components: {
    Header,
    StayWrapper,
    Footer
  }
});
</script>

<style lang="scss" src="./styles/main.scss"></style>
