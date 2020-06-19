<template>
    <div class="sidebar">
        <BaseLogo />
        <ul class="menu">
            <router-link
                exact
                :to="{ name: 'home' }"
                active-class="active"
                class="mb-4"
            >
                <div>
                    <i class="fas fa-home"></i>
                    <span class="ml-3 font-weight-bold">Inicio</span>
                </div>
            </router-link>
            <router-link to="#" class="mb-4">
                <div>
                    <i class="far fa-bell"></i>
                    <span class="ml-3 font-weight-bold">Notificaciones</span>
                </div>
            </router-link>
            <router-link
                exact
                :to="{
                    name: 'profile',
                    params: { username: user_auth.username }
                }"
                active-class="active"
                class="mb-4"
            >
                <div>
                    <i class="far fa-user"></i>
                    <span class="ml-3 font-weight-bold">Perfil</span>
                </div>
            </router-link>
            <a
                href="#"
                onclick="event.preventDefault();
                document.getElementById('logout-form').submit();"
            >
                <div>
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="ml-3 font-weight-bold">Cerrar sesion</span>
                </div>
            </a>

            <form
                id="logout-form"
                action="/logout"
                method="POST"
                style="display: none;"
            >
                <input type="hidden" name="_token" :value="csrf" />
            </form>
        </ul>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: ["user_auth"],
    data() {
        return {
            csrf: $("meta[name='csrf-token']").attr("content")
        };
    },
    methods: {
        ...mapActions("user", ["set_user_auth"])
    },
    created() {
        this.set_user_auth(this.user_auth);
    }
};
</script>
