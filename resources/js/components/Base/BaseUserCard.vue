<template>
    <div class="user-card">
        <BaseUserImage :image="user.image" class="mr-2" />
        <div class="user-info">
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-column justify-content-start">
                    <router-link
                        :to="{
                            name: 'perfil',
                            params: { username: user.username }
                        }"
                        class="text-white font-weight-bold"
                        v-text="user.name"
                    ></router-link>
                    <p class="p-0 m-0 text-muted">@{{ user.username }}</p>
                </div>
                <div class="w-50 text-right">
                    <button
                        type="button"
                        @click="
                            profile.relationships.following.includes(user.id)
                                ? unfollow(user.id)
                                : follow(user.id)
                        "
                        :class="[
                            'btn twit-btn btn-sm font-weight-bold btn-primary',
                            profile.relationships.following.includes(user.id)
                                ? 'btn-following'
                                : ''
                        ]"
                    >
                        <template
                            v-if="
                                profile.relationships.following.includes(
                                    user.id
                                )
                            "
                        >
                            <span class="following_text">Siguiendo</span>
                            <span class="unfollow_text">Dejar de seguir</span>
                        </template>
                        <span v-else>Seguir</span>
                    </button>
                </div>
            </div>
            <p class="py-1" v-text="user.description"></p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["user"],
    computed: {
        ...mapState("user", ["profile"])
    }
};
</script>
