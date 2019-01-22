import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import firebase from 'nativescript-plugin-firebase'

Vue.use(Vuex);

const state = {
  recipe: null
}

const mutations = {
  setRecipe: (state, recipe) => {
    state.recipe = recipe
  }
}

const getters = {
    recipe: state => {
      return state.recipe;
    }
}

const actions = {

  fetchRecipe({commit}, payload) {

    var onQueryEvent = function (result) {
      if (result.error) {
        console.log(result.error)
      } else {
        const obj = result.value;
        const recipe = Object.keys(obj || {}).map(key => ({
          id: key,
          name: obj[key].name
        }));
        commit('setRecipe', recipe);
      }
    };

    firebase.query(
        onQueryEvent,
        "/",
        {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'ingredient1'
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: payload
            },
            limit: {
                type: firebase.QueryLimitType.LAST,
                value: 1
            }
        }
    );
  }
}

const storeConf = {
  state,
  mutations,
  actions,
  getters
}

export default new Vuex.Store(storeConf)
