<template>
  <div>
    <div
      v-for="(f, i) in forecast"
      :key="f.dt + i"
    >
      {{ f.dt }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Forecast',
  computed: {
    ...mapGetters({
      units: 'app/units',
      forecast: 'app/forecast'
    })
  }
}
</script>

<style scoped>

</style>
