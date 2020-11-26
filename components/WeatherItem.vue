<template>
  <div
    class="weather-item"
    :class="type"
  >
    <template v-if="main">
      {{ data.dt }}
      <img
        :title="data.main"
        :src="`http://openweathermap.org/img/wn/${data.icon}@2x.png`"
        :alt="data.description + ' image'"
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
        return ['main', 'temp', 'humidity', 'pressure', 'wind', 'forecast'].includes(value)
      }
    },
    data: {
      type: [Array, Object],
      required: true
    },
    forecast: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    main () {
      return this.type === 'main'
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

    &_forecast {
      margin-top: 20px;
      display: grid;
      grid-template-columns: auto 1fr;
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
