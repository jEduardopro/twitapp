export default {
    namespaced: true,
    state: {
        form: {
            comment: ""
        },
        twit: {}
    },
    mutations: {
        SET_TWIT(state, twit) {
            state.twit = twit;
        },
        CLEAN(state) {
            state.form.comment = "";
        }
    },
    actions: {
        show_modal({ commit }, twit) {
            commit("SET_TWIT", twit);
            $("#modal_comment").modal("show");
        },
        close_modal({ commit }) {
            commit("SET_TWIT", {});
            $("#modal_comment").modal("hide");
        },
        create({ state, commit }, twit) {
            axios.post(`twits/${twit.id}/comments`, state.form).then(res => {
                commit("CLEAN");
                commit("twit/ADD_COMMENT", res.data.data, { root: true });
                twit.comments_count++;
                $("#modal_comment").modal("hide");
            });
        }
    }
};
