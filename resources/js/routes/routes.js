// Views
import Home from "../views/pages/Home.vue";
import Profile from "../views/pages/Profile.vue";
import Follows from "../views/pages/Follows.vue";
import Followers from "../components/Follow/Followers.vue";
import Following from "../components/Follow/Following.vue";
import TwitShow from "../views/pages/TwitShow.vue";

const routes = [
    // { path: "/login", component: Login, name: "login" },
    {
        path: "/home",
        component: Home,
        name: "home"
    },
    {
        path: "/@:username",
        component: Profile,
        name: "profile",
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
                name: "followers"
            },
            {
                path: "following",
                component: Following,
                name: "following"
            }
        ]
    }
];

export default routes;
