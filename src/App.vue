<template>
  <div id="app">
    <h1 style="text-align:center;">Curency Converter</h1>
    <CurrencyConverter/>
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
body {
  background-color: #1f1f1f;
  color: white;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: sans-serif;
  margin: 32px;
}
</style>
