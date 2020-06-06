<template>
    <div class="container">
        <div class="form-login">
            <div class="logo mb-4">
                <img src="images/twit-logo-b.png" class="mx-auto" alt="">
            </div>
            <h1 class="text-center">Inicia sesión en TwitApp</h1>
            <input-component v-model="name" :label="'Telefono, correo o usuario'" :inputType="'text'"></input-component>
            <input-component v-model="password" :label="'Contraseña'" :inputType="'password'"></input-component>
            <button type="button" class="btn btn-primary">Iniciar sesion</button>
        </div>
    </div>
</template>

<script>
    import InputComponent from './InputComponent.vue';
    export default {
        components: {InputComponent},
        data() {
            return {
                name:'',
                email:'',
                password:'',
            }
        },
        methods: {},
    }
</script>
