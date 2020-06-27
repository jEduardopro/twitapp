<template>
    <button
        v-if="user_auth.relationships.following.includes(follow_id)"
        type="button"
        @click="unfollow(follow_id)"
        class="btn twit-btn btn-sm btn-primary btn-unfollow"
    >
        <span class="following_text">Siguiendo</span>
        <span class="unfollow_text">Dejar de seguir</span>
    </button>
    <button
        v-else
        type="button"
        @click="follow(follow_id)"
        class="btn twit-btn btn-sm btn-primary btn-follow"
    >
        Seguir
    </button>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    props: ["follow_id"],
    computed: {
        ...mapState("user", ["user_auth"])
    },
    methods: {
        ...mapActions("user", ["unfollow", "follow"])
        // is_followed(follow_id) {
        //     let ids = [];
        //     this.user_auth.following.map(f => ids.push(f.id));
        //     return ids.includes(follow_id);
        // }
    }
};
</script>
