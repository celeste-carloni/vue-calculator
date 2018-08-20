<template>
  <div id="app">
    <AppCalculator/>
  </div>
</template>

<script>
import '@/assets/style/main.css'

import AppCalculator from './assets/js/components/AppCalculator'

export default {
  name: 'App',
  components: {
    AppCalculator
  }
}
</script>
