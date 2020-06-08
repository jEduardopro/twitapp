export default {
    namespaced: true,
    state: {
        user:{
            name: '',
            username: '',
            email: '',
            phone: '',
            iamge: ''
        }
    },
    getters: {

    },
    mutations: {
        SET_USER(state, user){
            state.user = user;
        }
    },
    actions: {
        set_user_information({commit}, user){
            commit('SET_USER', user);
        }
    }
}
