<template>
  <div class="container">
    <div class="current">
      <current-weather />
      <p v-if="!geo">
        Geolocation is not enabled, please enable it
      </p>
      <c-button @click="$store.dispatch('app/getWeather', { geo })">
        Get Data
      </c-button>
    </div>
    <forecast />
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
    }),
    geo () {
      return this.$geolocation.coords ? {
        lat: this.$geolocation.coords.latitude,
        lon: this.$geolocation.coords.longitude
      } : null
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
    min-height: 40vh;
    background-color: #2b2b2b;
    color: white;
    padding: 20px;
    border-radius: 0 0 25px 25px;

    > button {
      margin-top: auto;
    }
  }
}
</style>
