<template>
    <div class="btn-like">
        <button
            type="button"
            @click.prevent="
                model.relationships.likes.liked
                    ? unlike({ model, url_base })
                    : like({ model, url_base })
            "
            class="btn btn-like"
        >
            <i
                :class="[
                    'fa-heart',
                    model.relationships.likes.liked ? 'text-danger fas' : 'far'
                ]"
            ></i>
        </button>
        <span
            v-if="model.relationships.likes.likes_count > 0"
            v-text="model.relationships.likes.likes_count"
        ></span>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: ["model", "url_base"],
    methods: {
        ...mapActions("like", ["like", "unlike"])
    }
};
</script>
