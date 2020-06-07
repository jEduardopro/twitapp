<template>
    <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center w-100" id="exampleModalLabel">
                        <BaseLogo/>
                    </h5>
                </div>
                <div class="modal-body pb-5">
                    <h1 class="mb-4">Crea tu cuenta</h1>
                    <div class="form-group">
                        <base-input v-model="form.name" @press="minChar($event)" :label="'Nombre'" :inputType="'text'"></base-input>
                        <span class="w-100 d-block text-muted text-right">{{form.name.length}}/50</span>
                    </div>

                    <div class="form-group">
                        <base-input v-model="form.input_login" :label="useEmail ? 'Correo':'Telefono'" :inputType="useEmail ? 'email':'text'"></base-input>
                        <span v-if="errors.email || errors.phone" class="invalid-feedback d-block">
                            <template v-if="errors.username">
                                {{errors.username[0]}}
                            </template>
                            <template v-else>
                                {{errors.phone[0]}}
                            </template>
                        </span>
                        <button type="button" @click="useEmail = !useEmail, form.input_login = ''" class="btn p-0 m-0 btn-link">
                            {{useEmail ? 'Usar Telefono':'Usar Correo'}}
                        </button>
                    </div>
                    <div class="form-group">
                        <base-input v-model="form.password" :label="'Contraseña'" :inputType="'password'"></base-input>
                        <span v-if="errors.password" v-text="errors.password[0]" class="invalid-feedback d-block"></span>
                    </div>

                    <div class="form-group">
                        <base-input v-model="form.password_confirmation" :label="'Confirmar Contraseña'" :inputType="'password'"></base-input>
                    </div>

                    <button type="button"
                        @click="(form.name && form.input_login && form.password && form.password_confirmation) ? register() : null"
                        :class="['btn twit-btn h49 font-weight-bold btn-primary', (!form.name || !form.input_login || !form.password || !form.password_confirmation) ? 'disabled':'']">
                            Registrate
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props: ['form'],
    computed: {
        ...mapState(['errors']),
    },
    data() {
        return {
            useEmail: false
        }
    },
    methods: {
        minChar(evt){
            if (evt.target.value.length <= 49) {
                return true;
            } else {
                evt.preventDefault();
            }
        },
    },
}
</script>
