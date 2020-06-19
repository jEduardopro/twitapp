<template>
    <div>
        <base-header>Twit</base-header>
        <p class="text-muted text-center py-5" v-if="loading">
            <i class="fas fa-circle-notch fa-2x fa-spin"></i>
        </p>
        <template v-else>
            <base-twit v-if="twit.id" :twit="twit">
                <BaseComment
                    :comment="comment"
                    v-for="(comment, i) in twit.relationships.comments"
                    :key="comment.id + '_' + i"
                />
            </base-twit>
            <h4 v-else class="text-center py-4">
                Esta pagina no existe.
            </h4>
        </template>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    props: ["twit_id"],
    computed: {
        ...mapState("twit", ["twit", "loading"])
    },
    methods: {
        ...mapActions("twit", ["show"])
    },
    created() {
        this.show(this.twit_id);
    }
};
</script>
