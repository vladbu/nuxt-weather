<template>
  <div class="container">
    <div class="current">
      <current-weather />
      <c-button @click="getWeather">
        Get Data
      </c-button>
    </div>
    <div class="forecast">
      <forecast />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CButton from '~/components/CButton'
import CurrentWeather from '~/components/CurrentWeather'
import Forecast from '~/components/Forecast'

export default {
  components: { Forecast, CurrentWeather, CButton },
  async fetch () {
    // load saved location weather
  },
  computed: {
    ...mapState({
      location: state => state.app.location
    })
  },
  methods: {
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
    min-height: 60vh;
    background-color: #2b2b2b;
    color: white;
    padding: 20px;
    border-radius: 0 0 25px 25px;

    > button {
      margin-top: auto;
    }
  }

  .forecast {
    min-height: 40vh;
  }
}
</style>
