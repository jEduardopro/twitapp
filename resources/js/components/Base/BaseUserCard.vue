<template>
    <div class="user-card">
        <BaseUserImage :image="user_follow.image" class="mr-2" />
        <div class="user-info">
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-column justify-content-start">
                    <router-link
                        :to="{
                            name: 'perfil',
                            params: { username: user_follow.username }
                        }"
                        class="text-white font-weight-bold"
                        v-text="user_follow.name"
                    ></router-link>
                    <p class="p-0 m-0 text-muted">
                        @{{ user_follow.username }}
                    </p>
                </div>
                <div class="w-50 text-right">
                    <BaseButtonFollow :follow_id="user_follow.id" />
                </div>
            </div>
            <p class="py-1" v-text="user_follow.description"></p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["user_follow"]
};
</script>
