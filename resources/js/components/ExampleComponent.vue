<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        <label for="">Name {{name}}</label>
                        <input-component v-model="name" :inputType="'text'"></input-component>
                        <label for="">Email {{email}}</label>
                        <input-component v-model="email" :inputType="'email'"></input-component>
                        <label for="">Contraseña {{password}}</label>
                        <input-component v-model="password" :inputType="'password'"></input-component>
                    </div>
                </div>
            </div>
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
        mounted() {
            console.log('Component mounted.')
        },
        methods: {},
    }
</script>
