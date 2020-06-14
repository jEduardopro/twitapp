<template>
    <button
        type="button"
        @click="
            user.relationships.following.includes(follow_id)
                ? unfollow(follow_id)
                : follow(follow_id)
        "
        :class="[
            'btn twit-btn btn-sm font-weight-bold btn-primary',
            user.relationships.following.includes(follow_id)
                ? 'btn-unfollow'
                : 'btn-follow'
        ]"
    >
        <template v-if="user.relationships.following.includes(follow_id)">
            <span class="following_text">Siguiendo</span>
            <span class="unfollow_text">Dejar de seguir</span>
        </template>
        <span v-else>Seguir</span>
    </button>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: ["user", "follow_id"],
    methods: {
        ...mapActions("user", ["unfollow", "follow"])
    }
};
</script>
