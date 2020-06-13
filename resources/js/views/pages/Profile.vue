<template>
    <div>
        <cover-avatar-image>
            <template v-if="user.cover_image" v-slot:cover_image>
                <img :src="user.cover_image" class="cover_image_preview" />
            </template>
            <template v-if="user.image" v-slot:avatar>
                <img
                    :src="user.image"
                    class="avatar_image_preview rounded-circle"
                />
            </template>
        </cover-avatar-image>
        <div class="text-right px-3 pt-2">
            <button
                type="button"
                @click="edit_profile"
                class="btn twit-btn font-weight-bold btn-primary"
            >
                Editar perfil
            </button>
        </div>
        <div class="text-left pt-3 pl-3">
            <p class="font-weight-bold w-50 h5 mt-1 text-white">
                {{ user.name }}
                <small
                    class="text-muted d-block"
                    v-text="`@${user.username}`"
                ></small>
            </p>
            <p v-if="user.description" class="p-0 mb-1 text-white">
                {{ user.description }}
            </p>
            <p class="text-muted p-0 mb-1 w-50">
                <i class="fa fa-calendar-alt"></i> {{ date_register }}
            </p>
            <div class="mb-3">
                <span class="text-muted">
                    <strong class="font-weight-bold text-white">10</strong>
                    Siguiendo
                </span>
                <span class="text-muted ml-2">
                    <strong class="font-weight-bold text-white">5</strong>
                    Seguidores
                </span>
            </div>
        </div>
        <div>
            <h3 v-if="loading" class="text-muted text-center w-100">
                Cargando Twits...
            </h3>
            <template v-else>
                <div v-if="twits.length" class="border-top">
                    <BaseTwit
                        v-for="twit in twits"
                        :twit="twit"
                        :key="twit.id"
                    />
                </div>
                <h1 v-else class="text-center text-white mb-0">
                    No tienes twits
                </h1>
            </template>
        </div>
        <modal-edit-profile></modal-edit-profile>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ModalEditProfile from "../../components/Profile/ModalEditProfile.vue";
import CoverAvatarImage from "../../components/Profile/CoverAvatarImage.vue";
export default {
    components: { ModalEditProfile, CoverAvatarImage },
    computed: {
        ...mapState("user", ["user", "twits", "loading"]),
        date_register() {
            let date = new Date(this.user.created_at);
            let month =
                date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
            return `Se unio el ${month} del ${date.getFullYear()}`;
        }
    },
    methods: {
        ...mapActions("user", ["get_twits", "edit_profile"])
    },
    created() {
        this.get_twits();
    }
};
</script>
