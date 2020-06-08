<template>
    <div class="container-fluid">
        <BaseMenu/>
        <div class="main">
            <div class="header-static font-weight-bold">
                Inicio
            </div>
            <div class="content">
                <div class="twit-form px-3 pt-3">
                    <i class="fas text-muted fa-3x fa-user-circle"></i>
                    <div class="content-twit">
                        <textarea autofocus class="d-inline-block border-0 bg-transparent" placeholder="¿Que esta pasando?"></textarea>
                    </div>
                </div>
                <div class="text-right px-3">
                    <button type="button" class="btn twit-btn font-weight-bold btn-primary">
                        Twittear
                    </button>
                </div>
                <hr class="mt-2">
                <div>
                    <h1 class="text-center text-white mb-0">Bienvenido a TwitApp</h1>
                    <p class="text-muted p-0 m-0 text-center">Comienza a twittear sin limites.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    props: ['user_authenticated'],
    computed: {
        ...mapState('user', ['user'])
    },
    methods: {
        ...mapActions('user', ['set_user_information'])
    },
    created() {
        this.set_user_information(this.user_authenticated)
    },
}
</script>
