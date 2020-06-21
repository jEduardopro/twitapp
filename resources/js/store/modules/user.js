import router from "../../routes/index";
export default {
    namespaced: true,
    state: {
        user_auth: {},
        profile: {},
        profile_form: {},
        user_twits_id: +new Date(),
        page: 1,
        twits: [],
        users_following: [],
        followers: [],
        loading: false,
        loading_following: false,
        updating: false
    },
    mutations: {
        SET_USER_AUTH(state, user) {
            state.user_auth = user;
            let ids = [];
            user.following.map(f => ids.push(f.id));
            state.user_auth.following = ids;
        },
        SET_PROFILE(state, profile) {
            state.profile = profile;
            state.profile.src_cover_image = profile.cover_image;
            state.profile.src_avatar = profile.image;

            state.user_auth = state.profile;
            state.user_twits_id += 1;
        },
        SET_PROFILE_FORM(state) {
            state.profile_form = { ...state.profile };
        },
        SET_COVER_IMAGE(state, payload) {
            state.profile_form.cover_image = payload.file;
            state.profile_form.src_cover_image = payload.src;
        },
        SET_AVATAR(state, payload) {
            state.profile_form.image = payload.file;
            state.profile_form.src_avatar = payload.src;
        },
        SET_TWITS(state, twits) {
            state.twits = state.twits.concat(twits);
        },
        CLEAN_TWITS(state) {
            state.page = 1;
            state.twits = [];
        },
        SET_USERS_FOLLOWING(state, users) {
            state.users_following = users;
        },
        SET_FOLLOWERS(state, users) {
            state.followers = users;
        },
        ADD_FOLLOW(state, follow_id) {
            state.user_auth.following.push(follow_id);
            state.profile.relationships.followers.push(follow_id);
        },
        REMOVE_FOLLOW(state, follow_id) {
            state.user_auth.following.splice(
                state.user_auth.following.indexOf(follow_id),
                1
            );
            state.profile.relationships.followers.splice(
                state.profile.relationships.followers.indexOf(follow_id),
                1
            );
        },
        SET_LOADING(state, payload) {
            state[payload.loader] = payload.status;
        }
    },
    actions: {
        set_user_auth({ commit }, user) {
            commit("SET_USER_AUTH", user);
        },
        show({ commit }, username) {
            commit("SET_LOADING", { loader: "loading", status: true });
            axios
                .get(`users/${username}`)
                .then(res => {
                    commit("SET_PROFILE", res.data.data);
                    commit("SET_LOADING", { loader: "loading", status: false });
                })
                .catch(err => {
                    commit("SET_LOADING", { loader: "loading", status: false });
                });
        },
        edit_profile({ commit }) {
            commit("SET_PROFILE_FORM");
            $("#edit_profile").modal("show");
        },
        set_image_preview({ commit }, { evt, mutation_type }) {
            let files = evt.target.files;
            if (files.length > 0) {
                let reader = new FileReader();
                reader.onload = function() {
                    commit(mutation_type, {
                        file: files[0],
                        src: reader.result
                    });
                };
                reader.readAsDataURL(files[0]);
            }
        },
        create_form_data({ state }) {
            let form_data = new FormData();
            if (state.profile_form.email) {
                form_data.append("email", state.profile_form.email);
            }
            if (state.profile_form.phone) {
                form_data.append("phone", state.profile_form.phone);
            }
            if (typeof state.profile_form.cover_image == "object") {
                form_data.append(
                    "cover_image",
                    state.profile_form.cover_image,
                    state.profile_form.cover_image.name
                );
            }
            if (typeof state.profile_form.image == "object") {
                form_data.append(
                    "image",
                    state.profile_form.image,
                    state.profile_form.image.name
                );
            }
            form_data.append("name", state.profile_form.name);
            form_data.append("username", state.profile_form.username);
            form_data.append("description", state.profile_form.description);
            form_data.append("_method", "PUT");
            return form_data;
        },
        async update({ state, commit, dispatch }) {
            let data, method;
            commit("SET_LOADING", { loader: "updating", status: true });
            if (
                typeof state.profile_form.cover_image == "object" ||
                typeof state.profile_form.image == "object"
            ) {
                data = await dispatch("create_form_data");
                method = "POST";
            } else {
                data = {
                    name: state.profile_form.name,
                    username: state.profile_form.username,
                    description: state.profile_form.description
                };
                if (state.profile_form.email) {
                    data.email = state.profile_form.email;
                }
                if (state.profile_form.phone) {
                    data.phone = state.profile_form.phone;
                }
                method = "PUT";
            }

            axios({
                method: method,
                url: `users/${state.profile.id}`,
                data: data
            })
                .then(res => {
                    commit("CLEAN_TWITS");
                    commit("SET_PROFILE", res.data.data);
                    if (
                        router.history.current.params.username !=
                        res.data.data.username
                    ) {
                        router.push({
                            name: "profile",
                            params: { username: res.data.data.username }
                        });
                    }
                    commit("SET_LOADING", {
                        loader: "updating",
                        status: false
                    });
                    $("#edit_profile").modal("hide");
                })
                .catch(err => {
                    dispatch("catch_errors", err, { root: true });
                });
        },
        get_twits_by_user({ state, commit }, { $state, username }) {
            let page = state.page++;
            axios.get(`users/${username}/twits/?page=${page}`).then(res => {
                if (res.data.data.length) {
                    commit("SET_TWITS", res.data.data);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        },
        async get_users_following({ state, commit }) {
            commit("SET_LOADING", {
                loader: "loading_following",
                status: true
            });
            const response = await axios.get(
                `users/${state.profile.id}/following`
            );
            commit("SET_USERS_FOLLOWING", response.data.data);
            commit("SET_LOADING", {
                loader: "loading_following",
                status: false
            });
        },
        async get_followers({ state, commit }) {
            commit("SET_LOADING", {
                loader: "loading_following",
                status: true
            });
            const response = await axios.get(
                `users/${state.profile.id}/followers`
            );
            commit("SET_FOLLOWERS", response.data.data);
            commit("SET_LOADING", {
                loader: "loading_following",
                status: false
            });
        },
        follow({ commit }, follow_id) {
            axios.post(`users/${follow_id}/follows`).then(res => {
                commit("ADD_FOLLOW", follow_id);
            });
        },
        unfollow({ commit }, follow_id) {
            axios.delete(`users/${follow_id}/follows`).then(res => {
                commit("REMOVE_FOLLOW", follow_id);
            });
        },
        clean_twits({ commit }) {
            commit("CLEAN_TWITS");
        }
    }
};
