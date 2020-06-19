export default {
    namespaced: true,
    state: {
        form: {
            twit: ""
        },
        comment_form: {
            comment: ""
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
            state.twit.relationships.comments.unshift(comment);
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
        CLEAN_COMMENT(state) {
            state.comment_form.comment = "";
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
        create_twit({ state, commit, dispatch }) {
            axios
                .post("twits", state.form)
                .then(res => {
                    commit("CLEAN_FORM");
                })
                .catch(err => {
                    dispatch("catch_errors", err, { root: true });
                });
        },
        show({ commit }, twit_id) {
            commit("SET_LOADING", true);
            axios
                .get(`twits/${twit_id}`)
                .then(res => {
                    commit("SET_TWIT", res.data.data);
                    commit("SET_LOADING", false);
                })
                .catch(err => {
                    commit("SET_LOADING", false);
                });
        },
        clean_twits({ commit }) {
            commit("CLEAN_TWITS");
        },

        // Agregar comments
        show_modal({ commit }, twit) {
            commit("SET_TWIT", twit);
            $("#modal_comment").modal("show");
        },
        close_modal({ commit }) {
            $("#modal_comment").modal("hide");
        },
        create_comment({ state, commit }, twit) {
            axios
                .post(`twits/${twit.id}/comments`, state.comment_form)
                .then(res => {
                    commit("CLEAN_COMMENT");
                    commit("ADD_COMMENT", res.data.data);
                    twit.comments_count++;
                    $("#modal_comment").modal("hide");
                });
        }
    }
};
