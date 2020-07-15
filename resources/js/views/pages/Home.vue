<template>
    <div class="pb-5">
        <base-header>Home</base-header>
        <div class="twit-form px-3 pt-3">
            <BaseUserImage :image="user_auth.image" />
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
                :disabled="!form.twit || form.twit.length > 280 || loading"
                @click="create_twit"
                class="btn twit-btn font-weight-bold btn-primary"
            >
                Twittear
            </button>
        </div>
        <hr class="mt-2" />
        <div>
            <router-link
                :to="{
                    name: 'twit-show',
                    params: {
                        username: twit.relationships.user.username,
                        twit_id: twit.id
                    }
                }"
                v-for="(twit, index) in twits"
                :key="twit.id + '_' + index"
                class="link-twit"
            >
                <BaseTwit :twit="twit" />
            </router-link>
            <infinite-loading spinner="waveDots" @infinite="get_twits">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("user", ["user_auth"]),
        ...mapState("twit", ["form", "twits", "loading"])
    },
    methods: {
        ...mapActions("twit", ["get_twits", "create_twit", "clean_twits"]),
        ...mapActions("notification", ["get_notifications"])
    },
    created() {
        this.get_notifications();
    },
    beforeDestroy() {
        this.clean_twits();
    }
};
</script>
