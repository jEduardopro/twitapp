
// Views
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';

const routes = [
    {path: '/login', component: Login, name: 'login'},
    {
        path: '/home', component: Home, name: 'home',
        children: [
            {path: ':username', component: Profile, name: 'profile', props: true}
        ]
    },
];

export default routes;
