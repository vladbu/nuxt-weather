<template>
  <div class="container">
    <div>
      <h1 class="title">
        Weather
      </h1>
      <div>
        {{ location }}
        {{ weatherData }}
      </div>
      <div>
        <button @click="getVariants">
          get geo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch () {
    await this.$store.dispatch('app/getWeatherData')
  },
  data () {
    return {
      variants: ['astro', 'civil', 'civillight', 'meteo', 'two'],
      variant: 1
    }
  },
  computed: {
    ...mapState({
      weatherData: state => state.app.weatherData,
      location: state => state.app.location
    })
  },
  methods: {
    getGeo () {
      return this.$geolocation.coords
        ? {
          latt: this.$geolocation.coords.latitude,
          long: this.$geolocation.coords.longitude
        } : null
    },
    async getVariants () {
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
