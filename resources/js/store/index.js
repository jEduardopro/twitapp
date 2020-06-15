import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// import modules
import modules from "./modules/modules";

const store = new Vuex.Store({
    state: {
        errors: {}
    },
    mutations: {
        SET_ERRORS(state, errors) {
            state.errors = errors;
        },
        CLEAN_ERRORS(state) {
            setTimeout(() => {
                state.errors = {};
            }, 3000);
        }
    },
    actions: {
        catch_errors({ state, commit }, err) {
            const data = err.response.data;
            const status = err.response.status;
            switch (status) {
                case 422:
                    commit("SET_ERRORS", data.errors);
                    commit("CLEAN_ERRORS");
                    break;
            }
        }
    },
    modules
});
export default store;
