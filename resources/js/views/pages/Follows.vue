<template>
    <div v-if="!loading">
        <base-header>{{ profile.name }}</base-header>
        <nav class="d-flex pt-2 nav-follows">
            <router-link
                :to="{
                    name: 'seguidores',
                    params: { username: profile.username }
                }"
                class="w-50 p-3 text-center h5 border-bottom"
                active-class="active"
                exact
                >Seguidores
            </router-link>
            <router-link
                :to="{
                    name: 'siguiendo',
                    params: { username: profile.username }
                }"
                class="w-50 p-3 text-center h5 border-bottom"
                active-class="active"
                exact
                >Siguiendo
            </router-link>
        </nav>
        <template v-if="!profile.id">
            <h4 class="p-3 text-muted text-center">
                Algo salio mal
            </h4>
        </template>
        <router-view v-else></router-view>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    props: ["username"],
    watch: {
        $route(to, from) {
            this.show(to.params.username);
        }
    },
    computed: {
        ...mapState("user", ["user", "profile", "loading"])
    },
    methods: {
        ...mapActions("user", ["show", "edit_profile", "unfollow", "follow"])
    },
    created() {
        this.show(this.username);
    }
};
</script>
