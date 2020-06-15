<template>
    <div>
        <base-header>Home</base-header>
        <div class="twit-form px-3 pt-3">
            <BaseUserImage :image="user.image" />
            <div class="content-twit">
                <textarea
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
                class="btn twit-btn "
            >
                Twittear
            </button>
        </div>
        <hr class="mt-2" />
        <div>
            <p class="text-muted text-center py-5" v-if="loading">
                <i class="fas fa-circle-notch fa-2x fa-spin"></i>
            </p>
            <div v-else>
                <template v-if="twits.length">
                    <BaseTwit
                        v-for="(twit, index) in twits"
                        :twit="twit"
                        :key="twit.id + '_' + index"
                    />
                </template>
                <template v-else>
                    <h1 class="text-center text-white mb-0">
                        Bienvenido a TwitApp
                    </h1>
                    <p class="text-muted p-0 m-0 text-center">
                        Comienza a twittear sin limites.
                    </p>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("user", ["user"]),
        ...mapState("twit", ["form", "twits", "loading"])
    },
    methods: {
        ...mapActions("twit", ["get_twits", "create"])
    },
    created() {
        this.get_twits();
    }
};
</script>
