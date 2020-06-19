<template>
    <div class="pb-5">
        <template v-if="!loading">
            <template v-if="!profile.id">
                <base-header></base-header>
                <h4 class="text-center py-4">
                    Esta pagina no existe.
                </h4>
            </template>
            <template v-else>
                <base-header>
                    {{ profile.name }}
                    <small class="text-muted p-0 m-0 d-block">
                        {{ profile.relationships.twits.length }} Tweets
                    </small>
                </base-header>
                <cover-avatar-image>
                    <template v-if="profile.cover_image" v-slot:cover_image>
                        <img
                            :src="profile.cover_image"
                            class="cover_image_preview"
                        />
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
                        v-if="user_auth.id == profile.id"
                        type="button"
                        @click="edit_profile"
                        class="btn twit-btn btn-primary"
                    >
                        Editar perfil
                    </button>
                    <BaseButtonFollow v-else :follow_id="profile.id" />
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
                        <i class="fa fa-calendar-alt"></i> Se unió
                        {{ profile.join_at }}
                    </p>
                    <div class="mb-3">
                        <router-link
                            :to="{
                                name: 'following',
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
                                name: 'followers',
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
                    <router-link
                        :to="{
                            name: 'twit-show',
                            params: {
                                username: twit.relationships.user.username,
                                twit_id: twit.id
                            }
                        }"
                        v-for="(twit, index) in twits"
                        :key="twit.id + '_' + index"
                        class="link-twit"
                    >
                        <BaseTwit :twit="twit" />
                    </router-link>
                    <infinite-loading
                        :identifier="user_twits_id"
                        spinner="waveDots"
                        @infinite="
                            get_twits_by_user({
                                $state: $event,
                                username: username
                            })
                        "
                    >
                        <div slot="no-more"></div>
                        <div slot="no-results">
                            <h1 class="text-center text-muted mb-0">
                                No hay twits
                            </h1>
                        </div>
                    </infinite-loading>
                </div>
            </template>
        </template>
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
            if (this.profile.username != to.params.username) {
                this.clean_twits();
            }
            this.show(to.params.username);
        }
    },
    components: { ModalEditProfile, CoverAvatarImage },
    computed: {
        ...mapState("user", [
            "user_auth",
            "profile",
            "twits",
            "user_twits_id",
            "loading"
        ])
    },
    methods: {
        ...mapActions("user", [
            "show",
            "edit_profile",
            "set_user_information",
            "get_twits_by_user",
            "clean_twits"
        ])
    },
    created() {
        this.show(this.username);
    },
    beforeDestroy() {
        this.clean_twits();
    }
};
</script>
