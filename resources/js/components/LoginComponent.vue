<template>
    <div class="container">
        <div class="form-login">
            <div class="logo mb-4">
                <img src="images/twit-logo-w.png" class="mx-auto" alt="">
            </div>
            <h1 class="text-center mb-4">Inicia sesión en TwitApp</h1>
            <input-component v-model="input_login" :label="'Telefono, correo o usuario'" :inputType="'text'"></input-component>
            <input-component v-model="password" :label="'Contraseña'" :inputType="'password'"></input-component>
            <button type="button"
                @click="(input_login && password) ? login() : null"
                :class="['btn h49 font-weight-bold btn-primary', (!input_login || !password) ? 'disabled':'']">
                    Iniciar sesíon
            </button>
        </div>
    </div>
</template>

<script>
    import InputComponent from './InputComponent.vue';
    export default {
        components: {InputComponent},
        data() {
            return {
                input_login:'',
                email:'',
                password:'',
            }
        },
        methods: {
            login(){
                axios.post('login',{
                    login: this.input_login,
                    password: this.password,
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.error(err);
                })
            }
        },
    }
</script>
