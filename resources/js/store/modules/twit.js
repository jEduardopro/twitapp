export default {
    namespaced: true,
    state: {
        form: {
            twit: ""
        },
        twit: {},
        twits: [],
        loading: false
    },
    mutations: {
        SET_TWIT(state, twit) {
            state.twit = twit;
        },
        SET_TWITS(state, twits) {
            state.twits = twits;
        },
        SET_LOADING(state, status) {
            state.loading = status;
        },
        CLEAN_FORM(state) {
            state.form.twit = "";
        }
    },
    actions: {
        async get_twits({ commit }) {
            commit("SET_LOADING", true);
            const twits = await axios.get("twits");
            commit("SET_TWITS", twits.data.data);
            commit("SET_LOADING", false);
        },
        create({ state, commit, dispatch }) {
            axios
                .post("twits", state.form)
                .then(res => {
                    commit("CLEAN_FORM");
                })
                .catch(err => {
                    dispatch("catch_errors", err, { root: true });
                });
        }
    }
};
