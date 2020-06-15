export default {
    namespaced: true,
    state: {
        form: {
            comment: ""
        }
    },
    mutations: {
        CLEAN(state) {
            state.form.comment = "";
        }
    },
    actions: {
        show_modal({ commit }, twit) {
            commit("twit/SET_TWIT", twit, { root: true });
            $("#modal_comment").modal("show");
        },
        close_modal({ commit }) {
            commit("twit/SET_TWIT", {}, { root: true });
            $("#modal_comment").modal("hide");
        },
        create({ state, commit }, twit_id) {
            axios.post(`twits/${twit_id}/comments`, state.form).then(res => {
                commit("CLEAN");
                $("#modal_comment").modal("hide");
            });
        }
    }
};
