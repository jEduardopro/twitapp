<template>
    <div>
        <base-header>
            {{ profile.name }}
            <small class="text-muted p-0 m-0 d-block">
                @{{ profile.username }}
            </small>
        </base-header>
        <nav class="d-flex pt-2 nav-follows">
            <router-link
                :to="{ name: 'followers' }"
                class="w-50 p-3 text-center h5 border-bottom"
                active-class="active"
                exact
                >Seguidores
            </router-link>
            <router-link
                :to="{ name: 'following' }"
                class="w-50 p-3 text-center h5 border-bottom"
                active-class="active"
                exact
                >Siguiendo
            </router-link>
        </nav>
        <template v-if="!loading">
            <h4 v-if="!profile.id" class="p-3 text-muted text-center">
                Algo salio mal
            </h4>
            <router-view v-else></router-view>
        </template>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    props: ["username"],
    computed: {
        ...mapState("user", ["profile", "loading"])
    },
    methods: {
        ...mapActions("user", ["show", "edit_profile"])
    },
    created() {
        if (!this.profile.id) {
            this.show(this.username);
        }
    }
};
</script>
