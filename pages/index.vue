<template>
  <div class="container">
    <div class="current">
      <current-weather />
      <c-button @click="getWeather">
        Get Data
      </c-button>
    </div>
    <div class="forecast">
      forecast
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CButton from '~/components/CButton'
import CurrentWeather from '~/components/CurrentWeather'

export default {
  components: { CurrentWeather, CButton },
  async fetch () {
    // load saved location weather
  },
  computed: {
    ...mapState({
      weatherData: state => state.app.weatherData,
      location: state => state.app.location,
      cityVariants: state => state.app.cityVariants
    })
  },
  methods: {
    ...mapActions({
      setLocation: 'app/setLocation'
    }),
    getGeo () {
      if (this.$geolocation.coords) {
        return {
          lat: this.$geolocation.coords.latitude,
          lon: this.$geolocation.coords.longitude
        }
      }
    },
    async getWeather () {
      const geo = await this.getGeo()
      await this.$store.dispatch('app/getWeather', { geo })
    }
  }
}
</script>

<style lang="scss">
.container {
  .current {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 60vh;
    background-color: #2b2b2b;
    color: white;
    padding: 20px;
    border-radius: 0 0 25px 25px;
  }

  .forecast {
    max-height: 40vh;
  }
}
</style>
