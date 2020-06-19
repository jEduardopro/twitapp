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
            </div>
            <div class="content-text py-1" v-text="comment.content"></div>
            <div class="footer">
                <BaseButtonLike :model="comment" url_base="comments" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["comment"]
};
</script>
