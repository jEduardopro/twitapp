<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10">
                <div class="row">
                    <div class="col-12 col-md-3 p-0">
                        <BaseLogo/>
                        <ul class="menu">
                            <a href="#" class="d-block">Inicio</a>
                            <a href="#" class="d-block">Notificaciones</a>
                            <a href="#" class="d-block">Perfil</a>
                            <a href="#" class="d-block">Jesus Eduardo</a>
                            <a class="d-block" href="#"
                                onclick="event.preventDefault();
                                                document.getElementById('logout-form').submit();">
                                Cerrar sesion
                            </a>

                            <form id="logout-form" action="logout" method="POST" style="display: none;">
                                <input type="hidden" name="_token" :value="csrf">
                            </form>
                        </ul>
                    </div>
                    <div class="col-12 col-md-9 p-0 border-left">
                        Twits
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            csrf: $("meta[name='csrf-token']").attr('content')
        }
    },
    methods: {
        ...mapActions('auth', ['logout'])
    },
}
</script>
