<template>
  <div class="forecast_container">
    <div
      v-show="forecast"
      class="forecast_container_type-select"
    >
      <label :class="{'checked': forecastType === values[0]}">
        {{ values[0] }}
        <input
          v-model="forecastType"
          type="radio"
          name="type"
          :value="values[0]"
        >
      </label>
      <label :class="{'checked': forecastType === values[1]}">
        {{ values[1] }}
        <input
          v-model="forecastType"
          type="radio"
          name="type"
          :value="values[1]"
        >
      </label>
    </div>
    <div class="forecast_container_items">
      <weather-item
        v-for="(f, i) in forecast"
        :key="f.dt + i + ''"
        type="forecast"
        forecast
        :data="f"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import WeatherItem from '@/components/WeatherItem'

export default {
  name: 'Forecast',
  components: { WeatherItem },
  computed: {
    ...mapState({
      values: state => state.app.showForecast.items
    }),
    ...mapGetters({
      units: 'app/units',
      forecast: 'app/forecast'
    }),
    forecastType: {
      get () {
        return this.$store.state.app.showForecast.value
      },
      set (newVal) {
        this.$store.commit('app/SET_FORECAST_TYPE', newVal)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.forecast_container {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  &_type-select {
    margin: 0 0 20px 0;

    label {
      text-transform: capitalize;
      border: 1px solid #2b2b2b;
      padding: 5px;
      font-size: 16px;

      &.checked {
        background-color: #727272;
        color: white;
      }

      &:not(.checked) {
        cursor: pointer;
      }

      &:first-of-type {
        border-radius: 5px 0 0 5px;
        transition: all .3s;
      }

      &:last-of-type {
        border-radius: 0 5px 5px 0;
      }

      input {
        display: none;
      }
    }
  }

  &_items {
    display: flex;
    overflow: auto;
    width: 100%;

    .weather-item {
      width: 100%;
      height: 100%;
      white-space: nowrap;
      margin-right: 10px;

      &:first-of-type {
        margin-left: 10px;
      }
    }
  }
}
</style>
