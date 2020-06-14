<template>
    <div class="user-card">
        <BaseUserImage :image="user_following.image" class="mr-2" />
        <div class="user-info">
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-column justify-content-start">
                    <router-link
                        :to="{
                            name: 'perfil',
                            params: { username: user_following.username }
                        }"
                        class="text-white font-weight-bold"
                        v-text="user_following.name"
                    ></router-link>
                    <p class="p-0 m-0 text-muted">
                        @{{ user_following.username }}
                    </p>
                </div>
                <div class="w-50 text-right">
                    <BaseButtonFollow
                        :user="user"
                        :follow_id="user_following.id"
                    />
                </div>
            </div>
            <p class="py-1" v-text="user_following.description"></p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["user_following"],
    computed: {
        ...mapState("user", ["user"])
    }
};
</script>
