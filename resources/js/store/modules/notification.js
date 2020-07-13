export default {
    namespaced: true,
    state: {
        notifications: {
            page: 1,
            data: []
        }
    },
    getters: {
        unread_notifications: state => {
            return state.notifications.data.filter(n => n.read_at == null)
                .length;
        }
    },
    mutations: {
        SET_NOTIFICATIONS(state, data) {
            state.notifications.data = state.notifications.data.concat(data);
        },
        UPDATE_NOTIFICATIONS(state, data) {
            state.notifications.data = data;
        },
        ADD_NOTIFICATION(state, notification) {
            state.notifications.data.unshift(notification);
        }
    },
    actions: {
        get_notifications({ state, rootState, commit }, $state) {
            let page = state.notifications.page++;
            axios
                .get(
                    `users/${rootState.user.user_auth.id}/notifications/?page=${page}`
                )
                .then(res => {
                    if (res.data.data.length) {
                        commit("SET_NOTIFICATIONS", res.data.data);
                        if ($state) {
                            $state.loaded();
                        }
                    } else {
                        if ($state) {
                            $state.complete();
                        }
                    }
                });
        },
        mark_unread_notifications({ commit, rootState }) {
            axios
                .put(`users/${rootState.user.user_auth.id}/notifications`)
                .then(res => {
                    commit("UPDATE_NOTIFICATIONS", res.data);
                });
        }
    }
};
