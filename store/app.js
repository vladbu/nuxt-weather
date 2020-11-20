import axios from 'axios'

export default {
  state () {
    return {
      location: 0, // woeid
      weatherData: null
    }
  },
  mutations: {
    SET_LOCATION (state, woeid) {
      state.location = woeid
    },
    SET_WEATHER_DATA (state, data) {
      state.weatherData = data
    }
  },
  actions: {
    getWeatherData ({ state, commit }) {
      if (state.location) {
        commit('SET_WEATHER_DATA', axios.get('https://www.metaweather.com/api/location/' + state.location))
      }
    },
    async getWeather ({ state, commit }, { geo }) {
      console.log(geo)
      if (geo) {
        const res = await axios({
          method: 'GET',
          url: 'https://www.metaweather.com/api/location/search/',
          params: {
            lattlong: geo.lat + ',' + geo.long
          }
        })
        console.log(res)
        commit('SET_WEATHER_DATA', res)
      }
    }
  }
}
