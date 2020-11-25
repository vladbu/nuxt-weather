<template>
  <div class="current-weather">
    <div class="current-weather_city-name">
      📍{{ name }}
    </div>
    <div class="current-weather_data">
      <div
        v-if="temp"
        class="card current-weather_temp"
      >
        <div class="card_val">
          {{ temp.val }}
        </div>
        <div>
          Feels like:
          {{ temp.feels }}
        </div>
        <div>
          {{ temp.minmax }}
        </div>
      </div>
      <div
        v-if="humidity"
        class="card current-weather_humidity"
      >
        <div class="card_val">
          ️{{ humidity }}
        </div>
      </div>
      <div
        v-if="pressure"
        class="card current-weather_pressure"
      >
        <div class="card_val">
          {{ pressure }}
        </div>
      </div>
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
        val: `🌡${Math.round(this.weatherData.main.temp)}°${this.units.temp}`,
        feels: `${Math.round(this.weatherData.main.feels_like)}°${this.units.temp}`,
        minmax: `⬆ ${Math.round(this.weatherData.main.temp_max)}°${this.units.temp}️` + ' ' +
          `⬇ ️${Math.round(this.weatherData.main.temp_min)}°${this.units.temp} ${this.units.pressure}️`
      } : null
    },
    humidity () {
      return this.weatherData ? `☁️ ${this.weatherData.main.humidity} ${this.units.humidity}` : null
    },
    pressure () {
      return this.weatherData ? `➡️😫⬅️ ${this.weatherData.main.pressure} ${this.units.pressure}` : null
    }
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

    .card {
      border-radius: 5px;
      padding: 5px 10px;
      margin-top: 10px;
      color: white;
      width: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &_val {
        font-size: 40px;
      }

      &:not(&:last-of-type) {
        margin-right: 10px;
      }
    }

    &_data {
      padding: 0 15px;
      display: flex;
      flex-wrap: wrap;
    }

    &_temp {
      background-color: #6D47EF;
    }

    &_humidity {
      background-color: #526488;
    }

    &_pressure {
      background-color: #ea6534;
    }
  }
</style>
