<template>
    <div>
        <cover-avatar-image></cover-avatar-image>
        <div class="text-right px-3 pt-2">
            <button type="button" @click="edit_profile" class="btn twit-btn font-weight-bold btn-primary">
                Editar perfil
            </button>
        </div>
        <div class="w-50 text-left pt-3 pl-3">
            <p class="font-weight-bold h5 mt-1 text-white">
                {{user.name}}
                <small class="text-muted d-block" v-text="`@${user.username}`"></small>
            </p>
            <p class="text-muted"><i class="fa fa-calendar-alt"></i> {{date_register}}</p>
            <span class="text-muted">
                <strong class="font-weight-bold text-white">10</strong> Siguiendo
            </span>
            <span class="text-muted ml-2">
                <strong class="font-weight-bold text-white">5</strong> Seguidores
            </span>
        </div>
        <modal-edit-profile></modal-edit-profile>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModalEditProfile from '../../components/Profile/ModalEditProfile.vue';
import CoverAvatarImage from '../../components/Profile/CoverAvatarImage.vue';
export default {
    components: {ModalEditProfile, CoverAvatarImage},
    computed: {
        ...mapState('user', ['user']),
        date_register(){
            let date = new Date(this.user.created_at)
            let month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
            return `Se unio el ${month} del ${date.getFullYear()}`;
        }
    },
    methods: {
        ...mapActions('user', ['edit_profile'])
    },
}
</script>
