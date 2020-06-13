<template>
    <div class="twit-card">
        <div class="user-image mr-3">
            <img
                v-if="twit.relationships.user.image"
                :src="twit.relationships.user.image"
                class="rounded-circle"
            />
            <i v-else class="fas text-muted fa-3x fa-user-circle"></i>
        </div>
        <div class="twit-body">
            <div class="twit-header">
                <a href="#" class="text-white">
                    <strong v-text="twit.relationships.user.name"></strong>
                    <span class="ml-2">
                        @{{ twit.relationships.user.username }}
                    </span>
                    <span class="ml-2" v-text="twit.created_at"></span>
                </a>
            </div>
            <div class="twit-content py-1" v-text="twit.content"></div>
            <div class="twit-footer">
                <div class="btn-comment">
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
