<template>
    <div
        class="modal fade"
        id="modal_comment"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header p-2">
                    <button
                        type="button"
                        class="close_modal"
                        @click="close_modal"
                    >
                        <i class="fa fa-times fa-2x"></i>
                    </button>
                </div>
                <div class="modal-body py-2">
                    <BaseTwit
                        v-if="twit.id"
                        :twit="twit"
                        :hide_buttons="true"
                    />
                    <div class="twit-form mt-1 mb-4 pb-4">
                        <BaseUserImage :image="user_auth.image" />
                        <div class="content-twit">
                            <textarea
                                v-model="comment_form.comment"
                                class="d-inline-block border-0 bg-transparent"
                                placeholder="Agrega tu respuesta"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 p-1">
                    <span
                        :class="[
                            'font-weight-bold mr-2 lead',
                            comment_form.comment.length > 280
                                ? 'text-danger'
                                : 'text-muted'
                        ]"
                        v-if="comment_form.comment.length > 0"
                        >{{ comment_form.comment.length }}/280</span
                    >
                    <button
                        type="button"
                        :disabled="
                            !comment_form.comment ||
                                comment_form.comment.length > 280 ||
                                loading_comment
                        "
                        @click="create_comment(twit)"
                        class="btn twit-btn btn-primary"
                    >
                        Responder
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("user", ["user_auth"]),
        ...mapState("twit", ["twit", "comment_form", "loading_comment"])
    },
    methods: {
        ...mapActions("twit", ["create_comment", "close_modal"])
    }
};
</script>
