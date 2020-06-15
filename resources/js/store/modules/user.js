import router from "../../routes/index";
export default {
    namespaced: true,
    state: {
        user: {
            id: "",
            name: "",
            username: "",
            phone: "",
            email: "",
            description: "",
            image: "",
            cover_image: "",
            join_at: "",
            relationships: {}
        },
        users_following: [],
        followers: [],
        page: 1,
        twits: [],
        profile: {},
        profile_form: {},
        loading: false,
        loading_following: false
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            state.user.email = user.email ? user.email : "";
            state.user.phone = user.phone ? user.phone : "";
            state.user.description = user.description ? user.description : "";
            state.user.cover_image = user.cover_image
                ? `/storage/users/cover_images/${user.cover_image}`
                : "";
            state.user.image = user.image
                ? `/storage/users/avatars/${user.image}`
                : "";
        },
        SET_PROFILE_FORM(state) {
            state.profile_form = { ...state.user };
            state.profile_form.cover_image = "";
            state.profile_form.image = "";
        },
        SET_COVER_IMAGE(state, file) {
            state.profile_form.cover_image = file;
        },
        SET_AVATAR(state, file) {
            state.profile_form.image = file;
        },
        SET_PROFILE(state, profile) {
            state.profile = profile;
            state.profile.cover_image = profile.cover_image
                ? `/storage/users/cover_images/${profile.cover_image}`
                : "";
            state.profile.image = profile.image
                ? `/storage/users/avatars/${profile.image}`
                : "";
        },
        SET_USERS_FOLLOWING(state, users) {
            state.users_following = users;
        },
        SET_FOLLOWERS(state, users) {
            state.followers = users;
        },
        SET_TWITS(state, twits) {
            state.twits = state.twits.concat(twits);
        },
        ADD_FOLLOW(state, follow_id) {
            state.user.relationships.following.push(follow_id);
            state.profile.relationships.followers.push(follow_id);
        },
        REMOVE_FOLLOW(state, follow_id) {
            state.user.relationships.following.splice(
                state.user.relationships.following.indexOf(follow_id),
                1
            );
            state.profile.relationships.followers.splice(
                state.profile.relationships.followers.indexOf(follow_id),
                1
            );
        },
        SET_LOADING(state, status) {
            state.loading = status;
        },
        SET_LOADING_FOLLOWING(state, status) {
            state.loading_following = status;
        }
    },
    actions: {
        async set_user_information({ commit }) {
            commit("SET_LOADING", true);
            const response = await axios.get(`me`);
            commit("SET_USER", response.data.data);
            commit("SET_LOADING", false);
        },
        async show({ state, commit }, username) {
            commit("SET_LOADING", true);
            const response = await axios.get(`users/${username}`);
            commit("SET_PROFILE", response.data.data);
            commit("SET_LOADING", false);
        },
        get_twits({ state, commit }, { $state, username }) {
            let page = state.page++;
            axios.get(`users/${username}/twits?page=${page}`).then(res => {
                if (res.data.data.length) {
                    commit("SET_TWITS", res.data.data);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        },
        edit_profile({ commit }) {
            commit("SET_PROFILE_FORM");
            $("#edit_profile").modal("show");
        },
        set_cover_image({ commit }, evt) {
            let files = evt.target.files;
            if (files.length > 0) {
                commit("SET_COVER_IMAGE", evt.target.files[0]);
                let reader = new FileReader();
                reader.onloadend = function() {
                    $(".modal-body .cover_image img.cover_image_preview").attr(
                        "src",
                        reader.result
                    );
                };
                reader.readAsDataURL(evt.target.files[0]);
            }
        },
        set_avatar({ commit }, evt) {
            let files = evt.target.files;
            if (files.length > 0) {
                commit("SET_AVATAR", evt.target.files[0]);
                let reader = new FileReader();
                reader.onloadend = function() {
                    $(".modal-body .cover_image img.avatar_image_preview").attr(
                        "src",
                        reader.result
                    );
                };
                reader.readAsDataURL(evt.target.files[0]);
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
            if (state.profile_form.cover_image) {
                form_data.append(
                    "cover_image",
                    state.profile_form.cover_image,
                    state.profile_form.cover_image.name
                );
            }
            if (state.profile_form.image) {
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
            if (state.profile_form.cover_image || state.profile_form.image) {
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
                url: `users/${state.user.id}`,
                data: data
            })
                .then(res => {
                    console.log(res.data);
                    commit("SET_USER", res.data);
                    if (
                        router.history.current.params.username !=
                        res.data.username
                    ) {
                        router.push({
                            name: "perfil",
                            params: { username: res.data.username }
                        });
                    }
                })
                .catch(err => {
                    dispatch("catch_errors", err, { root: true });
                });
        },
        async get_users_following({ state, commit }) {
            commit("SET_LOADING_FOLLOWING", true);
            const response = await axios.get(
                `users/${state.profile.id}/following`
            );
            commit("SET_USERS_FOLLOWING", response.data.data);
            commit("SET_LOADING_FOLLOWING", false);
        },
        async get_followers({ state, commit }) {
            commit("SET_LOADING_FOLLOWING", true);
            const response = await axios.get(
                `users/${state.profile.id}/followers`
            );
            commit("SET_FOLLOWERS", response.data.data);
            commit("SET_LOADING_FOLLOWING", false);
        },
        follow({ state, commit }, follow_id) {
            axios
                .post(`users/${state.user.id}/follows`, { follow_id })
                .then(res => {
                    commit("ADD_FOLLOW", follow_id);
                });
        },
        unfollow({ state, commit }, follow_id) {
            axios
                .delete(`users/${state.user.id}/follows/${follow_id}`)
                .then(res => {
                    commit("REMOVE_FOLLOW", follow_id);
                });
        }
    }
};
