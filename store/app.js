import axios from 'axios'

export default {
  state () {
    return {
      location: 0, // woeid
      weatherData: null,
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
    async getWeatherData ({ state, commit }) {
      if (state.location) {
        const res = await axios.get('https://cors-anywhere.herokuapp.com/' +
          'https://www.metaweather.com/api/location/' + state.location)
        commit('SET_WEATHER_DATA', res.data)
      }
    },
    async getWeather ({ state, commit }, { geo }) {
      if (geo) {
        const res = await axios.get('https://cors-anywhere.herokuapp.com/' +
          'https://www.metaweather.com/api/location/search/', {
          params: {
            lattlong: geo.latt + ',' + geo.long
          },
          headers: {
            'Content-Type': 'application/jsonp'
          }
        })
        commit('SET_CITY_VARIANTS', res.data)
      }
    },
    setLocation ({ state, commit, dispatch }, { woeid }) {
      commit('SET_LOCATION', woeid)
      dispatch('getWeatherData')
    }
  }
}
