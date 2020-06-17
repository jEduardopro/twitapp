// Views
import App from "../views/App.vue";
import Login from "../views/Login.vue";
// Pages
import Home from "../views/pages/Home.vue";
import Profile from "../views/pages/Profile.vue";
import Follows from "../views/pages/Follows.vue";
import Followers from "../components/Follow/Followers.vue";
import Following from "../components/Follow/Following.vue";
import TwitShow from "../views/pages/TwitShow.vue";

const routes = [
    { path: "/login", component: Login, name: "login" },
    {
        path: "/home",
        component: App,
        children: [{ path: "", component: Home, name: "inicio" }]
    },
    {
        path: "/@:username",
        component: Profile,
        name: "perfil",
        props: true
    },
    {
        path: "/@:username/status/:twit_id",
        component: TwitShow,
        name: "twit-show",
        props: true
    },
    {
        path: "/@:username",
        component: Follows,
        props: true,
        children: [
            {
                path: "followers",
                component: Followers,
                name: "seguidores"
            },
            {
                path: "following",
                component: Following,
                name: "siguiendo"
            }
        ]
    }
];

export default routes;
