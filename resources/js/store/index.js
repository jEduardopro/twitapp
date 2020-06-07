import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// import modules
import modules from './modules/modules';

const store = new Vuex.Store({
    state: {
        errors: {}
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules

});
export default store;
