require('./bootstrap');

window.Vue = require('vue');
Vue.component('login-register-component', require('./components/Auth/LoginRegisterComponent.vue').default);

const app = new Vue({
    el: '#app',
});
