<template>
  <div class="current-weather">
    <div class="current-weather_city-name">
      {{ name }}
    </div>
    <div class="current-weather_temp">
      <span class="current-weather_temp_val">{{ temp.val }}</span>
      <span class="current-weather_temp_feels">
        Feels like:
        {{ temp.feels }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CurrentWeather',
  computed: {
    ...mapState({
      weatherData: state => state.app.weatherData
    }),
    ...mapGetters({
      units: 'app/units'
    }),
    name () {
      return this.weatherData ? this.weatherData.name + ', ' + this.weatherData.sys.country : 'Unknown'
    },
    temp () {
      return this.weatherData ? {
        val: Math.round(this.weatherData.main.temp) + '°' + this.units.temp,
        feels: Math.round(this.weatherData.main.feels_like) + '°' + this.units.temp
      } : 'Unknown'
    }
  }
}
</script>

<style lang="scss" scoped>
  .current-weather {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px 5px;

    &_city-name {
      font-size: 50px;
    }

    &_temp {
      display: inline-flex;
      align-items: flex-end;

      &_val {
        font-size: 40px;
      }

      &_feels {

      }
    }
  }
</style>
