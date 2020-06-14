<template>
    <div>
        <p class="text-muted text-center py-5" v-if="loading_following">
            <i class="fas fa-circle-notch fa-2x fa-spin"></i>
        </p>
        <base-user-card
            v-else
            :user_follow="follower"
            v-for="(follower, i) in followers"
            :key="follower.id + '-' + i"
        ></base-user-card>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("user", ["profile", "followers", "loading_following"])
    },
    methods: {
        ...mapActions("user", ["get_followers"])
    },
    created() {
        this.get_followers();
    }
};
</script>
