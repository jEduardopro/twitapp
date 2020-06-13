export default {
    namespaced: true,
    state: {
        form: {
            twit: ""
        }
    },
    getters: {},
    mutations: {},
    actions: {
        create({ state, commit, dispatch }) {
            axios
                .post("/twits", state.form)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    dispatch("catch_errors", err, { root: true });
                });
        }
    }
};
