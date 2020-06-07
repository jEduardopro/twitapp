<template>
    <div class="container">
        <div class="form-login">
            <logo-component></logo-component>
            <h1 class="text-center mb-4">Inicia sesión en TwitApp</h1>
            <div class="form-group">
                <input-component v-model="input_login" :label="'Telefono, correo o usuario'" :inputType="'text'"></input-component>
                <span v-if="errors.username || errors.email || errors.phone" class="invalid-feedback d-block">
                    <template v-if="errors.username">
                        {{errors.username[0]}}
                    </template>
                    <template v-else-if="errors.email">
                        {{errors.email[0]}}
                    </template>
                    <template v-else>
                        {{errors.phone[0]}}
                    </template>
                </span>
            </div>
            <div class="form-group">
                <input-component v-model="password" :label="'Contraseña'" :inputType="'password'"></input-component>
                <span v-if="errors.password" v-text="errors.password[0]" class="invalid-feedback d-block"></span>
            </div>

            <button type="button"
                @click="(input_login && password) ? login() : null"
                :class="['btn h49 twit-btn font-weight-bold btn-primary', (!input_login || !password) ? 'disabled':'']">
                    Iniciar sesíon
            </button>
            <button data-toggle="modal" data-target="#exampleModal" class="w-100 btn btn-link d-block text-center mt-4">Registrate en TwitApp</button>
        </div>
        <modal-register-component></modal-register-component>
    </div>
</template>

<script>
    import InputComponent from './InputComponent.vue';
    import LogoComponent from './LogoComponent.vue';
    import ModalRegisterComponent from './ModalRegisterComponent.vue';
    export default {
        components: {InputComponent, LogoComponent, ModalRegisterComponent},
        data() {
            return {
                input_login:'',
                email:'',
                password:'',
                errors: {}
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
                    if (err.response.data.errors) {
                        this.errors = err.response.data.errors;
                    }
                    setTimeout(() => {
                        this.errors = {};
                    }, 3000);
                    console.error(err);
                })
            }
        },
    }
</script>
