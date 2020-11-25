import axios from 'axios'

export default {
  state () {
    return {
      location: '',
      weatherData: null,
      forecast: null,
      showForecast: {
        value: 'daily',
        items: ['daily', 'hourly']
      },
      units: {
        value: 'metric',
        items: ['metric', 'imperial']
      }
    }
  },
  mutations: {
    SET_LOCATION (state, woeid) {
      state.location = woeid
    },
    SET_WEATHER_DATA (state, data) {
      state.weatherData = data
    },
    SET_FORECAST (state, data) {
      state.forecast = data
    }
  },
  actions: {
    async getWeather ({ state, commit, dispatch }, { geo }) {
      if (geo) {
        const current = axios.get('//api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: geo.lat,
            lon: geo.lon,
            units: state.units.value,
            appid: process.env.API_KEY
          }
        })
        const forecast = axios.get('//api.openweathermap.org/data/2.5/onecall', {
          params: {
            lat: geo.lat,
            lon: geo.lon,
            exclude: 'current',
            units: state.units.value,
            appid: process.env.API_KEY
          }
        })
        const res = await Promise.all([current, forecast])
        commit('SET_WEATHER_DATA', res[0].data)
        commit('SET_FORECAST', res[1].data)
      }
    }
  },
  getters: {
    units (state) {
      if (state.units.value === 'imperial') {
        return {
          speed: 'miles/hour',
          temp: 'F',
          pressure: 'hPa',
          humidity: '%'
        }
      } else {
        return {
          speed: 'meters/sec',
          temp: 'C',
          pressure: 'hPa',
          humidity: '%'
        }
      }
    },
    forecast (state) {
      return state.forecast ? state.forecast[state.showForecast.value].map((el) => {
        return {
          ...el,
          dt: new Date(el.dt * 1000)
        }
      }) : null
    }
  }
}
