<template>
    <div>
        <nav class="d-flex mt-5 pt-3 nav-follows">
            <router-link
                :to="{
                    name: 'seguidores',
                    params: { username: user.username }
                }"
                class="w-50 p-3 text-center h5 border-bottom"
                active-class="active"
                exact
                >Seguidores
            </router-link>
            <router-link
                :to="{ name: 'siguiendo', params: { username: user.username } }"
                class="w-50 p-3 text-center h5 border-bottom"
                active-class="active"
                exact
                >Siguiendo
            </router-link>
        </nav>
        <template v-if="username != user.username">
            <h4 class="p-3 text-muted text-center">
                Algo salio mal
            </h4>
        </template>
        <router-view v-else></router-view>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["username"],
    computed: {
        ...mapState("user", ["user"])
    }
};
</script>
