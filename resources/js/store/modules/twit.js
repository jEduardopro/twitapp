export default {
    namespaced: true,
    state: {
        form: {
            twit: ""
        },
        twit: {},
        twits: [],
        page: 1,
        loading: false
    },
    mutations: {
        SET_TWIT(state, twit) {
            state.twit = twit;
        },
        ADD_COMMENT(state, comment) {
            if (state.twit.id) {
                state.twit.relationships.comments.unshift(comment);
            }
        },
        SET_TWITS(state, twits) {
            state.twits = state.twits.concat(twits);
        },
        SET_LOADING(state, status) {
            state.loading = status;
        },
        CLEAN_FORM(state) {
            state.form.twit = "";
        },
        CLEAN_TWITS(state) {
            state.page = 1;
            state.twits = [];
        }
    },
    actions: {
        get_twits({ state, commit }, $state) {
            let page = state.page++;
            axios.get("twits/?page=" + page).then(res => {
                if (res.data.data.length) {
                    commit("SET_TWITS", res.data.data);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
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
        },
        async show({ commit }, twit_id) {
            commit("SET_LOADING", true);
            const response = await axios.get(`twits/${twit_id}`);
            commit("SET_TWIT", response.data.data);
            commit("SET_LOADING", false);
        },
        clean_twits({ commit }) {
            commit("CLEAN_TWITS");
        }
    }
};
