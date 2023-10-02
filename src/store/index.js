import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
    state () {
      return {
        savedLocations: [],
        coords: {},
      }
    },
    mutations: {
      setSavedLocations (state, payload) {
        state.savedLocations = payload
      },
      setCoords (state, payload) {
        state.coords = payload
      }
    },
    plugins: [createPersistedState()],
  })