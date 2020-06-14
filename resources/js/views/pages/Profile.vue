<template>
    <div v-if="!loading">
        <base-header>
            {{ profile.name }}
            <small class="text-muted p-0 m-0 d-block">
                {{ profile.relationships.twits.length }} Tweets
            </small>
        </base-header>
        <cover-avatar-image>
            <template v-if="profile.cover_image" v-slot:cover_image>
                <img :src="profile.cover_image" class="cover_image_preview" />
            </template>
            <template v-if="profile.image" v-slot:avatar>
                <img
                    :src="profile.image"
                    class="avatar_image_preview rounded-circle"
                />
            </template>
        </cover-avatar-image>
        <div class="text-right px-3 pt-2">
            <button
                v-if="user.id == profile.id"
                type="button"
                @click="edit_profile"
                class="btn twit-btn font-weight-bold btn-primary"
            >
                Editar perfil
            </button>
            <button
                v-else
                type="button"
                @click="
                    user.relationships.following.includes(profile.id)
                        ? unfollow(profile.id)
                        : follow(profile.id)
                "
                :class="[
                    'btn twit-btn font-weight-bold btn-primary',
                    user.relationships.following.includes(profile.id)
                        ? 'btn-unfollow'
                        : 'btn-follow'
                ]"
            >
                <template
                    v-if="user.relationships.following.includes(profile.id)"
                >
                    <span class="following_text">Siguiendo</span>
                    <span class="unfollow_text">Dejar de seguir</span>
                </template>
                <span v-else>Seguir</span>
            </button>
        </div>
        <div class="text-left pt-4 pl-3">
            <p class="font-weight-bold w-50 h5 mt-1 text-white">
                {{ profile.name }}
                <small
                    class="text-muted d-block"
                    v-text="`@${profile.username}`"
                ></small>
            </p>
            <p v-if="profile.description" class="p-0 mb-1 text-white">
                {{ profile.description }}
            </p>
            <p class="text-muted p-0 mb-1 w-50">
                <i class="fa fa-calendar-alt"></i> Se unió {{ profile.join_at }}
            </p>
            <div class="mb-3">
                <router-link
                    :to="{
                        name: 'siguiendo',
                        params: { username: profile.username }
                    }"
                    class="text-muted"
                >
                    <strong
                        class="font-weight-bold text-white"
                        v-text="profile.relationships.following.length"
                    ></strong>
                    Siguiendo
                </router-link>
                <router-link
                    :to="{
                        name: 'seguidores',
                        params: { username: profile.username }
                    }"
                    class="text-muted ml-2"
                >
                    <strong
                        class="font-weight-bold text-white"
                        v-text="profile.relationships.followers.length"
                    ></strong>
                    Seguidores
                </router-link>
            </div>
        </div>
        <div class="border-top">
            <div v-if="profile.relationships.twits.length">
                <BaseTwit
                    v-for="twit in profile.relationships.twits"
                    :twit="twit"
                    :key="twit.id"
                />
            </div>
            <h1 v-else class="text-center text-muted mb-0">
                No hay twits
            </h1>
        </div>
        <modal-edit-profile></modal-edit-profile>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ModalEditProfile from "../../components/Profile/ModalEditProfile.vue";
import CoverAvatarImage from "../../components/Profile/CoverAvatarImage.vue";
export default {
    props: ["username"],
    watch: {
        $route(to, from) {
            this.show(to.params.username);
        }
    },
    components: { ModalEditProfile, CoverAvatarImage },
    computed: {
        ...mapState("user", ["user", "profile", "loading"])
    },
    methods: {
        ...mapActions("user", ["show", "edit_profile", "unfollow", "follow"])
    },
    created() {
        this.show(this.username);
    }
};
</script>
