<template>
  <div
    class="weather-item"
    :class="type"
  >
    <template v-if="main || forecast">
      {{ data.dt }}
      <img
        :title="data.main"
        :src="(`http://openweathermap.org/img/wn/${data.icon}@2x.png`)"
        :alt="data.description + ' image'"
        class="weather-item_val"
      >
      <span>{{ data.description }}</span>
    </template>
    <template v-else>
      <div class="weather-item_val">
        <span :title="data.title">{{ data.val }}</span>
      </div>
      <div
        v-for="(el, i) in data.desc"
        :key="i"
      >
        {{ el }}
      </div>
    </template>
    <div
      v-if="forecast"
      class="weather-item_forecast"
    >
      <template v-for="(item, i) in data.detail">
        <div
          :key="i + '_icon'"
          :title="item.title"
        >
          {{ item.icon }}
        </div>
        <div :key="i + '_value'">
          {{ item.val }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherItem',
  props: {
    type: {
      type: String,
      default: 'main',
      validator (value) {
        return [
          'main',
          'temp',
          'humidity',
          'pressure',
          'wind',
          'forecast',
          'sunset',
          'sunrise',
          'visibility',
          'dew',
          'pop'
        ].includes(value)
      }
    },
    data: {
      type: [Array, Object],
      required: true
    }
  },
  computed: {
    main () {
      return this.type === 'main'
    },
    forecast () {
      return this.type === 'forecast'
    }
  }
}
</script>

<style lang="scss" scoped>
  .weather-item {
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &_val {
      font-size: 40px;
      cursor: pointer;
    }

    &.main {
      background-color: lightslategray;
    }

    &.temp {
      background-color: #6D47EF;
    }

    &.humidity {
      background-color: #526488;
    }

    &.pressure {
      background-color: #ea6534;
    }

    &.wind {
      background-color: palevioletred;
    }

    &.forecast {
      background-color: #232323;
    }

    &.sunrise {
      background-color: skyblue;
    }

    &.sunset {
      background-color: midnightblue;
    }

    &.visibility {
      background-color: mediumvioletred;
    }

    &.dew {
      background-color: olivedrab;
    }

    &.pop {
      background-color: royalblue;
    }

    &_forecast {
      margin-top: 20px;
      padding: 10px 20px;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 0 40px;
      align-items: center;

    > div:nth-of-type(2n - 1) {
      font-size: 24px;
    }

      > div:nth-of-type(2n) {
        justify-self: end;
      }
    }
  }
</style>
