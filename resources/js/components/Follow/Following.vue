<template>
    <div>
        <p class="text-muted text-center py-5" v-if="loading_following">
            <i class="fas fa-circle-notch fa-2x fa-spin"></i>
        </p>
        <base-user-card
            v-else
            :user="user_following"
            v-for="(user_following, i) in users_following"
            :key="user_following + '-' + i"
        ></base-user-card>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("user", ["profile", "users_following", "loading_following"])
    },
    methods: {
        ...mapActions("user", ["get_users_following"])
    },
    created() {
        this.get_users_following();
    }
};
</script>
