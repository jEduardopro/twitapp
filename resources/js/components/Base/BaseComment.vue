<template>
    <div class="comment-card">
        <BaseUserImage :image="comment.relationships.user.image" class="mr-2" />
        <div class="body">
            <div class="header">
                <router-link
                    :to="{
                        name: 'profile',
                        params: {
                            username: comment.relationships.user.username
                        }
                    }"
                    class="text-white"
                >
                    <strong v-text="comment.relationships.user.name"></strong>
                    <span class="ml-2">
                        @{{ comment.relationships.user.username }}
                    </span>
                    <span class="ml-2" v-text="comment.created_at"></span>
                </router-link>
                <div v-if="comment.user_id == user_auth.id" class="btn-destroy">
                    <button
                        type="button"
                        class="btn"
                        @click.prevent="destroy_comment(comment)"
                    >
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div class="content-text py-1" v-text="comment.content"></div>
            <div class="footer">
                <BaseButtonLike :model="comment" url_base="comments" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    props: ["comment"],
    computed: {
        ...mapState("user", ["user_auth"])
    },
    methods: {
        ...mapActions("twit", ["destroy_comment"])
    }
};
</script>
