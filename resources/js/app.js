require('./bootstrap');

window.Vue = require('vue');
Vue.component('login-register-component', require('./components/Auth/LoginRegisterComponent.vue').default);

// Store vuex
import store from './store/index';

// Router
import router from './routes/index';

const app = new Vue({
    el: '#app',
    store,
    router
});
