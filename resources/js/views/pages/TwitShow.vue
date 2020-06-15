<template>
    <div>
        <base-header>Twit</base-header>
        <p class="text-muted text-center py-5" v-if="loading">
            <i class="fas fa-circle-notch fa-2x fa-spin"></i>
        </p>
        <template v-else>
            <h4 v-if="!twit.id" class="text-center text-muted">
                Algo salío mal.
            </h4>
            <base-twit v-else :twit="twit">
                <BaseComment
                    :comment="comment"
                    v-for="(comment, i) in twit.relationships.comments"
                    :key="comment.id + '_' + i"
                />
            </base-twit>
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
