<template>
    <div class="twit-card px-3 py-2 border-bottom">
        <BaseUserImage :image="twit.relationships.user.image" class="mr-2" />
        <div class="twit-body">
            <div class="twit-header">
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
            <div class="twit-content py-1" v-text="twit.content"></div>
            <div class="twit-footer">
                <div class="btn-comment mr-3">
                    <button type="button" class="btn btn-comment">
                        <i class="far fa-comment"></i>
                    </button>
                    <span>1</span>
                </div>
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
    props: ["twit"]
};
</script>
