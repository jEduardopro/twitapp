<template>
    <div class="comment-card">
        <BaseUserImage :image="comment.relationships.user.image" class="mr-2" />
        <div class="body">
            <div class="header">
                <router-link
                    :to="{
                        name: 'perfil',
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
                <div class="btn-like">
                    <button type="button" class="btn btn-like">
                        <i class="far fa-heart"></i>
                    </button>
                    <span>12</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["comment"]
};
</script>
