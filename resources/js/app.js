require('./bootstrap');

window.Vue = require('vue');
Vue.component('login-component', require('./components/LoginComponent.vue').default);

const app = new Vue({
    el: '#app',
});
