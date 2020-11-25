import axios from 'axios'

export default {
  state () {
    return {
      location: 0,
      weatherData: null,
      units: {
        value: 'metric',
        items: ['metric', 'imperial']
      },
      cityVariants: null
    }
  },
  mutations: {
    SET_LOCATION (state, woeid) {
      state.location = woeid
    },
    SET_WEATHER_DATA (state, data) {
      state.weatherData = data
    },
    SET_CITY_VARIANTS (state, data) {
      state.cityVariants = data
    }
  },
  actions: {
    async getWeather ({ state, commit }, { geo }) {
      if (geo) {
        const res = await axios.get('//api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: geo.lat,
            lon: geo.lon,
            units: state.units.value,
            appid: process.env.API_KEY
          }
        })
        commit('SET_WEATHER_DATA', res.data)
      }
    }
  },
  getters: {
    units (state) {
      if (state.units.value === 'imperial') {
        return {}
      } else {
        return {
          speed: 'm/s',
          temp: 'C',
          pressure: 'Pa',
          humidity: '%'
        }
      }
    }
  }
}
