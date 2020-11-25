<template>
  <div class="container">
    <div>
      <h1 class="title">
        Weather
      </h1>
      <current-weather />
      <div>
        <c-button @click="getWeather">
          Get Geo
        </c-button>
      </div>
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
    // load save location weather
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

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
