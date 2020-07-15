<template>
    <div class="twit-card px-3 py-2 border-bottom">
        <BaseUserImage :image="twit.relationships.user.image" class="mr-2" />
        <div class="body">
            <div class="header">
                <router-link
                    :to="{
                        name: 'profile',
                        params: { username: twit.relationships.user.username }
                    }"
                    class="text-white"
                >
                    <strong v-text="twit.relationships.user.name"></strong>
                    <span class="ml-2">
                        @{{ twit.relationships.user.username }}
                    </span>
                    <span class="ml-2" v-text="twit.created_at"></span>
                </router-link>
                <template v-if="!hide_buttons">
                    <div
                        v-if="twit.user_id == user_auth.id"
                        class="btn-destroy"
                    >
                        <button
                            type="button"
                            class="btn"
                            @click.prevent="destroy(twit)"
                        >
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                </template>
            </div>
            <div class="content-text py-1" v-text="twit.content"></div>
            <div class="footer" v-if="!hide_buttons">
                <div class="btn-comment mr-3">
                    <button
                        type="button"
                        class="btn"
                        @click.prevent="show_modal(twit)"
                    >
                        <i class="far fa-comment"></i>
                    </button>
                    <span
                        v-if="twit.comments_count > 0"
                        v-text="twit.comments_count"
                    ></span>
                </div>
                <BaseButtonLike :model="twit" url_base="twits" />
            </div>
            <!-- Slot para mostrar comentarios aqui -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    props: ["twit", "hide_buttons"],
    computed: {
        ...mapState("user", ["user_auth"])
    },
    methods: {
        ...mapActions("twit", ["show_modal", "destroy"])
    },
    mounted() {
        Echo.channel(`twits-${this.twit.id}-likes`).listen(
            "ModelIsLiked",
            e => {
                this.twit.relationships.likes.likes_count++;
            }
        );
        Echo.channel(`twits-${this.twit.id}-likes`).listen(
            "ModelIsUnLiked",
            e => {
                this.twit.relationships.likes.likes_count--;
            }
        );

        Echo.channel(`new-comment-${this.twit.id}`).listen(
            "TwitHasNewComment",
            e => {
                this.twit.comments_count++;
            }
        );
    }
};
</script>
