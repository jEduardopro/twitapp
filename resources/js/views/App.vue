<template>
    <div v-if="user.id" class="container-fluid">
        <BaseMenu />
        <div class="main">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
        <BaseSearch />
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    watch: {
        $route(to, from) {
            $("body, html").animate({ scrollTop: 0 });
        }
    },
    computed: {
        ...mapState("user", ["user"])
    },
    methods: {
        ...mapActions("user", ["set_user_information"])
    },
    created() {
        this.set_user_information();
    }
};
</script>
