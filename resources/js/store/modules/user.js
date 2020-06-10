export default {
    namespaced: true,
    state: {
        user:{
            name: '',
            username: '',
            email: '',
            phone: '',
            image: '',
            description: ''
        },
        profile_form: {}
    },
    getters: {

    },
    mutations: {
        SET_USER(state, user){
            state.user = user;
        },
        SET_PROFILE_FORM(state){
            state.profile_form = {...state.user};
        }
    },
    actions: {
        set_user_information({commit}, user){
            commit('SET_USER', user);
        },
        edit_profile({commit}){
            commit('SET_PROFILE_FORM');
            $("#edit_profile").modal("show");
        }
    }
}
