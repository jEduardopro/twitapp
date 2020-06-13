<template>
    <div>
        <div class="twit-form px-3 pt-3">
            <i class="fas text-muted fa-3x fa-user-circle"></i>
            <div class="content-twit">
                <textarea
                    autofocus
                    v-model="form.twit"
                    class="d-inline-block border-0 bg-transparent"
                    placeholder="¿Que esta pasando?"
                ></textarea>
            </div>
        </div>
        <div
            class="text-right d-flex align-items-center justify-content-end px-3"
        >
            <span
                :class="[
                    'font-weight-bold mr-2 lead',
                    form.twit.length > 280 ? 'text-danger' : 'text-muted'
                ]"
                v-if="form.twit.length > 0"
                >{{ form.twit.length }}/280</span
            >
            <button
                type="button"
                :disabled="!form.twit || form.twit.length > 280"
                @click="create"
                class="btn twit-btn font-weight-bold btn-primary"
            >
                Twittear
            </button>
        </div>
        <hr class="mt-2" />
        <div>
            <h1 class="text-center text-white mb-0">Bienvenido a TwitApp</h1>
            <p class="text-muted p-0 m-0 text-center">
                Comienza a twittear sin limites.
            </p>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("twit", ["form"])
    },
    methods: {
        ...mapActions("twit", ["create"])
    }
};
</script>
