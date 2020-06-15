<template>
    <div class="twit-card px-3 py-2 border-bottom">
        <BaseUserImage :image="twit.relationships.user.image" class="mr-2" />
        <div class="body">
            <div class="header">
                <router-link
                    :to="{
                        name: 'perfil',
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
            </div>
            <div class="content-text py-1" v-text="twit.content"></div>
            <div class="footer" v-if="!hide_buttons">
                <div class="btn-comment mr-3">
                    <button
                        type="button"
                        class="btn btn-comment"
                        @click.prevent="show_modal(twit)"
                    >
                        <i class="far fa-comment"></i>
                    </button>
                    <span
                        v-if="twit.comments_count > 0"
                        v-text="twit.comments_count"
                    ></span>
                </div>
                <div class="btn-like">
                    <button type="button" class="btn btn-like">
                        <i class="far fa-heart"></i>
                    </button>
                    <span>12</span>
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: ["twit", "hide_buttons"],
    methods: {
        ...mapActions("comment", ["show_modal"])
    }
};
</script>
