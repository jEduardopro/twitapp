<template>
    <div class="container">
        <div class="form-login">
            <BaseLogo/>
            <h1 class="text-center mb-4">Inicia sesión en TwitApp</h1>
            <div class="form-group">
                <base-input v-model="input_login" :label="'Telefono, correo o usuario'" :inputType="'text'"></base-input>
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
                <base-input v-model="password" :label="'Contraseña'" :inputType="'password'"></base-input>
                <span v-if="errors.password" v-text="errors.password[0]" class="invalid-feedback d-block"></span>
            </div>

            <button type="button"
                @click="(input_login && password) ? login() : null"
                :class="['btn h49 twit-btn font-weight-bold btn-primary', (!input_login || !password) ? 'disabled':'']">
                    Iniciar sesíon
            </button>
            <button data-toggle="modal" data-target="#exampleModal" class="w-100 btn btn-link d-block text-center mt-4">Registrate en TwitApp</button>
        </div>
        <modal-register></modal-register>
    </div>
</template>

<script>
    import ModalRegister from './ModalRegister.vue';
    export default {
        components: {ModalRegister},
        methods: {
        },
    }
</script>
