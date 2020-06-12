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
            cover_image: '',
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
        },
        SET_COVER_IMAGE(state, file){
            state.profile_form.cover_image = file;
        },
        SET_AVATAR(state, file){
            state.profile_form.image = file;
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
        set_cover_image({commit}, evt){
            let files = evt.target.files;
            if(files.length > 0){
                commit('SET_COVER_IMAGE', evt.target.files[0])
                let reader = new FileReader();
                reader.onloadend = function () {
                    $(".modal-body .cover_image img.cover_image_preview").attr('src', reader.result)
                }
                reader.readAsDataURL(evt.target.files[0])
            } else {
                commit('SET_COVER_IMAGE', '')
                $(".modal-body .cover_image img.cover_image_preview").attr('src', '')
            };
        },
        set_avatar({commit}, evt){
            let files = evt.target.files;
            if(files.length > 0){
                commit('SET_AVATAR', evt.target.files[0])
                let reader = new FileReader();
                reader.onloadend = function () {
                    $(".modal-body .cover_image img.avatar_image_preview").attr('src', reader.result)
                }
                reader.readAsDataURL(evt.target.files[0])
            } else {
                commit('SET_AVATAR', '')
                $(".modal-body .cover_image img.avatar_image_preview").attr('src', '')
            };
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
