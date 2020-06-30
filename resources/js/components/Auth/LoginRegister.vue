<template>
    <div class="container">
        <div v-if="!isOpenRegister" class="form-login">
            <BaseLogo />
            <h1 class="text-center mb-4">
                Inicia sesión Cambios hooks automated en TwitApp
            </h1>
            <div class="form-group">
                <base-input
                    v-model="form.input_login"
                    :label="'Telefono, correo o usuario'"
                    :inputType="'text'"
                ></base-input>
                <span
                    v-if="errors.username || errors.email || errors.phone"
                    class="invalid-feedback d-block"
                >
                    <template v-if="errors.username">
                        {{ errors.username[0] }}
                    </template>
                    <template v-else-if="errors.email">
                        {{ errors.email[0] }}
                    </template>
                    <template v-else>
                        {{ errors.phone[0] }}
                    </template>
                </span>
            </div>
            <div class="form-group">
                <base-input
                    v-model="form.password"
                    :label="'Contraseña'"
                    :inputType="'password'"
                ></base-input>
                <span
                    v-if="errors.password"
                    v-text="errors.password[0]"
                    class="invalid-feedback d-block"
                ></span>
            </div>

            <button
                type="button"
                @click="form.input_login && form.password ? login() : null"
                :class="[
                    'btn h49 twit-btn btn-block btn-primary',
                    !form.input_login || !form.password ? 'disabled' : ''
                ]"
            >
                Iniciar sesíon
            </button>
            <button
                @click="open_register"
                class="w-100 btn btn-link d-block text-center mt-4"
            >
                Registrate en TwitApp
            </button>
        </div>
        <modal-register :form="form"></modal-register>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ModalRegister from "./ModalRegister.vue";
export default {
    components: { ModalRegister },
    computed: {
        ...mapState(["errors"]),
        ...mapState("auth", ["form"])
    },
    data() {
        return {
            isOpenRegister: false
        };
    },
    methods: {
        ...mapActions("auth", ["login"]),
        open_register() {
            this.isOpenRegister = true;
            $("#modal_register").modal("show");
        },
        close_register() {
            this.isOpenRegister = false;
        }
    },
    mounted() {
        let closeFn = this.close_register;
        $("#modal_register").on("hidden.bs.modal", function(e) {
            closeFn();
        });
    }
};
</script>
