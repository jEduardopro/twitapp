export default {
    namespaced: true,
    state: {
        form: {
            input_login: "",
            input_register: "",
            name: "",
            password: "",
            password_register: "",
            password_confirmation: "",
        },
    },
    actions: {
        login({ state, dispatch }) {
            axios
                .post("login", {
                    login: state.form.input_login,
                    password: state.form.password,
                })
                .then((res) => {
                    location.href = "http://twitapp.test/";
                })
                .catch((err) => {
                    dispatch("catch_errors", err, { root: true });
                });
        },
        register({ state, dispatch }) {
            axios
                .post("register", {
                    name: state.form.name,
                    login: state.form.input_register,
                    password: state.form.password_register,
                    password_confirmation: state.form.password_confirmation,
                })
                .then((res) => {
                    location.href = "http://twitapp.test/";
                })
                .catch((err) => {
                    dispatch("catch_errors", err, { root: true });
                });
        },
    },
};
