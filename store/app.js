import axios from 'axios'
import { format, isToday, isTomorrow } from 'date-fns'

export default {
  state () {
    return {
      loading: false,
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
    SET_LOADING (state, data) {
      state.loading = data
    },
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
        commit('SET_LOADING', true)
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
        commit('SET_LOADING', false)
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
    current (state, getters) {
      const arrows = {
        360: {
          icon: '⬇️',
          text: 'North'
        },
        45: {
          icon: '↙️',
          text: 'North East'
        },
        90: {
          icon: '⬅️',
          text: 'South'
        },
        135: {
          icon: '↖️',
          text: 'South East'
        },
        180: {
          icon: '⬆️',
          text: 'South'
        },
        225: {
          icon: '↗️',
          text: 'South West'
        },
        270: {
          icon: '➡️',
          text: 'West'
        },
        315: {
          icon: '↘️',
          text: 'North West'
        }
      }
      const goal = state.weatherData ? state.weatherData.wind.deg : 0
      const closest = Object.keys(arrows).reduce((curr, prev) => {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
      })
      const speed = state.weatherData ? state.weatherData.wind.speed : 0
      const timestamp = state.weatherData ? new Date(state.weatherData.dt * 1000) : 0
      return state.weatherData ? {
        name: state.weatherData.name + ', ' + state.weatherData.sys.country,
        time: (isToday(timestamp) ? 'Today, '
          : format(timestamp, 'MMM do yyyy, ')) + format(timestamp, 'HH:mm:ss'),
        weather: state.weatherData.weather,
        temp: {
          val: `🌡 ${Math.round(state.weatherData.main.temp)}°${getters.units.temp}`,
          title: 'Air temperature',
          desc: [`Feels like: ${Math.round(state.weatherData.main.feels_like)}°${getters.units.temp}`,
            `⬆ ${Math.round(state.weatherData.main.temp_max)}°${getters.units.temp}️` + ' ' +
            `⬇ ️${Math.round(state.weatherData.main.temp_min)}°${getters.units.temp}️`
          ]
        },
        humidity: {
          val: `☁️ ${state.weatherData.main.humidity}${getters.units.humidity}`,
          title: 'Humidity',
          desc: []
        },
        pressure: {
          val: `➡️😫⬅️ ${state.weatherData.main.pressure} ${getters.units.pressure}`,
          title: 'Atmospheric pressure',
          desc: []
        },
        wind: {
          val: `💨 ${arrows[closest].icon}`,
          title: 'Wind speed & direction',
          desc: [`${speed} ${getters.units.speed}, ${arrows[closest].text}`]
        }
      } : null
    },
    forecast (state, getters) {
      return state.forecast ? state.forecast[state.showForecast.value].map((el) => {
        const timestamp = new Date(el.dt * 1000)
        return {
          ...el.weather[0],
          dt: isToday(timestamp) ? 'Today'
            : isTomorrow(timestamp) ? 'Tomorrow'
              : format(timestamp, 'MMM do yyyy'),
          detail: {
            maxTemp: {
              icon: '⬆️🌡',
              val: `${Math.round(el.temp.max)}°${getters.units.temp}`,
              title: 'Max temperature'
            },
            minTemp: {
              icon: '⬇️🌡',
              val: `${Math.round(el.temp.min)}°${getters.units.temp}`,
              title: 'Min temperature'
            },
            sunrise: {
              icon: '🌞',
              title: 'Sunrise',
              val: format(new Date(el.sunrise * 1000), 'HH:mm:ss')
            },
            humidity: el.humidity,
            pressure: el.pressure,
            sunset: {
              icon: '🌚',
              title: 'Sunset',
              val: format(new Date(el.sunset * 1000), 'HH:mm:ss')
            }
          }
        }
      }) : null
    }
  }
}
