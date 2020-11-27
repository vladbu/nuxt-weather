<template>
  <div class="forecast_container">
    <weather-item
      v-for="(f, i) in forecast"
      :key="f.dt + i + ''"
      type="forecast"
      forecast
      :data="f"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WeatherItem from '@/components/WeatherItem'

export default {
  name: 'Forecast',
  components: { WeatherItem },
  computed: {
    ...mapGetters({
      units: 'app/units',
      forecast: 'app/forecast'
    })
  }
}
</script>

<style scoped lang="scss">
.forecast_container {
  padding: 20px;
  display: flex;
  grid-gap: 10px;
  justify-items: center;
  overflow: auto;

  .weather-item {
    width: 100%;
    height: 100%;
    white-space: nowrap;
  }
}
</style>
