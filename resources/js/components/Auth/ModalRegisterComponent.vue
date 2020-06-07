<template>
    <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center w-100" id="exampleModalLabel">
                        <logo-component></logo-component>
                    </h5>
                </div>
                <div class="modal-body pb-5">
                    <h1 class="mb-4">Crea tu cuenta</h1>
                    <div class="form-group">
                        <input-component v-model="name" @press="minChar($event)" :label="'Nombre'" :inputType="'text'"></input-component>
                        <span class="w-100 d-block text-muted text-right">{{name.length}}/50</span>
                    </div>

                    <div class="form-group">
                        <input-component v-model="input_login" :label="useEmail ? 'Correo':'Telefono'" :inputType="useEmail ? 'email':'text'"></input-component>
                        <span v-if="errors.email || errors.phone" class="invalid-feedback d-block">
                            <template v-if="errors.username">
                                {{errors.username[0]}}
                            </template>
                            <template v-else>
                                {{errors.phone[0]}}
                            </template>
                        </span>
                        <button type="button" @click="useEmail = !useEmail, input_login = ''" class="btn p-0 m-0 btn-link">
                            {{useEmail ? 'Usar Telefono':'Usar Correo'}}
                        </button>
                    </div>
                    <div class="form-group">
                        <input-component v-model="password" :label="'Contraseña'" :inputType="'password'"></input-component>
                        <span v-if="errors.password" v-text="errors.password[0]" class="invalid-feedback d-block"></span>
                    </div>

                    <div class="form-group">
                        <input-component v-model="password_confirmation" :label="'Confirmar Contraseña'" :inputType="'password'"></input-component>
                    </div>

                    <button type="button"
                        @click="(name && input_login && password && password_confirmation) ? register() : null"
                        :class="['btn twit-btn h49 font-weight-bold btn-primary', (!name || !input_login || !password || !password_confirmation) ? 'disabled':'']">
                            Registrate
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputComponent from '../InputComponent.vue';
import LogoComponent from '../LogoComponent.vue';
export default {
    components:{InputComponent,LogoComponent},
    data() {
        return {
            input_login:'',
            name:'',
            password:'',
            password_confirmation:'',
            errors: {},
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
        register(){
            axios.post('register',{
                name: this.name,
                login: this.input_login,
                password: this.password,
                password_confirmation: this.password_confirmation,
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
