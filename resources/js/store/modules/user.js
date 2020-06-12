import router from '../../routes/index';
export default {
    namespaced: true,
    state: {
        user:{
            id: '',
            name: '',
            username: '',
            email: '',
            phone: '',
            image: '',
            cover: '',
            description: ''
        },
        profile_form: {}
    },
    getters: {

    },
    mutations: {
        SET_USER(state, user){
            state.user = user;
            state.user.email =  (user.email) ? user.email : '';
            state.user.phone =  (user.phone) ? user.phone : '';
            state.user.description =  (user.description) ? user.description : '';

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
        },
        update({state,commit,dispatch}){
            let data = {
                name: state.profile_form.name,
                username: state.profile_form.username,
                description: state.profile_form.description,
            }
            if (state.profile_form.email) {
                data.email = state.profile_form.email;
            }
            if (state.profile_form.phone) {
                data.phone = state.profile_form.phone;
            }
            axios.put(`users/${state.user.id}`,data)
            .then(res => {
                commit('SET_USER', res.data);
                if (router.history.current.params.username != res.data.username) {
                    router.push({name: 'perfil', params:{username: res.data.username}});
                }
            })
            .catch(err => {
                dispatch('catch_errors', err, {root: true});
            })
        }
    }
}
