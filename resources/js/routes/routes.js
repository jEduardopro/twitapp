
// Views
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

const routes = [
    {path: '', component: Home, name: 'home'},
    {path: '/login', component: Login, name: 'login'},
];

export default routes;
