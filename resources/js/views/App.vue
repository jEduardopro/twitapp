<template>
    <div class="container-fluid">
        <BaseMenu />
        <div class="main">
            <div class="header-static font-weight-bold">
                {{ $route.name.toUpperCase() }}
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
        <div class="border-right-fixed"></div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    props: ["user_authenticated"],
    computed: {
        ...mapState("user", ["user"])
    },
    methods: {
        ...mapActions("user", ["set_user_information"])
    },
    created() {
        this.set_user_information(this.user_authenticated);
    }
};
</script>
