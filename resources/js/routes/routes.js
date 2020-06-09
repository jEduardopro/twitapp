
// Views
import App from '../views/App.vue';
import Login from '../views/Login.vue';
// Pages
import Home from '../views/pages/Home.vue';
import Profile from '../views/pages/Profile.vue';

const routes = [
    {path: '/login', component: Login, name: 'login'},
    {
        path: '/home', component: App,
        children: [
            {path: '', component: Home, name: 'inicio'},
            {path: 'profile/:username', component: Profile, name: 'perfil', props: true}
        ]
    },
];

export default routes;
