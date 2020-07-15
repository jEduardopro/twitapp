import router from "../../routes";
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
        loading: false,
        loading_comment: false
    },
    mutations: {
        SET_TWIT(state, twit) {
            state.twit = twit;
        },
        ADD_TWIT(state, twit) {
            state.twits.unshift(twit);
        },
        REMOVE_TWIT(state, twit) {
            if (state.twits.length > 0) {
                state.twits = state.twits.filter(t => t.id != twit.id);
            }
        },
        ADD_COMMENT(state, comment) {
            state.twit.relationships.comments.unshift(comment);
        },
        REMOVE_COMMENT(state, comment) {
            state.twit.relationships.comments = state.twit.relationships.comments.filter(
                c => c.id != comment.id
            );
            state.twit.comments_count--;
        },
        SET_TWITS(state, twits) {
            state.twits = state.twits.concat(twits);
        },
        SET_LOADING(state, status) {
            state.loading = status;
        },
        SET_LOADING_COMMENT(state, status) {
            state.loading_comment = status;
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
            commit("SET_LOADING", true);
            axios
                .post("twits", state.form)
                .then(res => {
                    commit("CLEAN_FORM");
                    commit("ADD_TWIT", res.data.data);
                    commit("SET_LOADING", false);
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
        async destroy({ commit, rootState }, twit) {
            commit("REMOVE_TWIT", twit);
            if (rootState.user.twits.length > 0) {
                rootState.user.twits = rootState.user.twits.filter(
                    t => t.id != twit.id
                );
            }
            if (router.history.current.name == "twit-show") {
                router.push({ name: "home" });
            }
            await axios.delete(`twits/${twit.id}`);
        },
        clean_twits({ commit }) {
            commit("CLEAN_TWITS");
        },

        // Agregar comments
        show_modal({ commit }, twit) {
            commit("SET_TWIT", twit);
            $("#modal_comment").modal("show");
        },
        close_modal({}) {
            $("#modal_comment").modal("hide");
        },
        create_comment({ state, commit }, twit) {
            commit("SET_LOADING_COMMENT", true);
            axios
                .post(`twits/${twit.id}/comments`, state.comment_form)
                .then(res => {
                    commit("CLEAN_COMMENT");
                    commit("ADD_COMMENT", res.data.data);
                    twit.comments_count++;
                    $("#modal_comment").modal("hide");
                    commit("SET_LOADING_COMMENT", false);
                });
        },
        async destroy_comment({ commit }, comment) {
            commit("REMOVE_COMMENT", comment);
            await axios.delete(
                `twits/${comment.twit_id}/comments/${comment.id}`
            );
        }
    }
};
