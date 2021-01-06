<template>
  <div id="app">
    <div class="md-layout md-alignment-top-center">
      <div class="md-layout-item md-small-size-100 md-medium-size-80 md-large-size-50 md-xlarge-size-30">
        <h1 style="text-align:center;" class="md-display-4">Curency Converter</h1>
        <CurrencyConverter/>
      </div>
    </div>
  </div>
</template>

<script>
import CurrencyConverter from './components/CurrencyConverter.vue'

export default {
  name: 'App',
  components: {
    CurrencyConverter
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
