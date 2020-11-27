<template>
  <div class="current-weather">
    <div class="current-weather_city-name">
      <span title="Location">📍</span>{{ weatherData ? weatherData.name : 'Unknown' }}
    </div>
    <div v-if="weatherData && weatherData.time" class="current-weather_time">
      <span title="Time generated">🕰</span>{{ weatherData.time }}
    </div>
    <progress v-if="loading" />
    <div v-else-if="!loading && weatherData" class="current-weather_data">
      <weather-item
        v-for="(w, i) in weatherData.weather"
        :key="i"
        type="main"
        :data="w"
      />
      <weather-item
        v-for="(el, key) in weatherData.data"
        :key="key"
        :type="key"
        :data="el"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import WeatherItem from '@/components/WeatherItem'

export default {
  name: 'CurrentWeather',
  components: { WeatherItem },
  computed: {
    ...mapState({
      loading: state => state.app.loading
    }),
    ...mapGetters({
      units: 'app/units',
      weatherData: 'app/current'
    })
  }
}
</script>

<style lang="scss" scoped>
  .current-weather {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 10px 5px;

    &_city-name {
      font-size: 50px;
    }

    &_time {
      margin-left: 15px;
      font-size: 18px;
    }

    progress {
      width: 100%;
    }

    .weather-item {
      margin-top: 10px;

      :not(&:last-of-type) {
        margin-right: 10px;
      }
    }

    &_data {
      padding: 0 15px;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
