<template>
    <div v-if="user.id" class="container-fluid">
        <BaseMenu />
        <div class="main">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
        <BaseSearch />
        <BaseModalComment />
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("user", ["user"])
    }
};
</script>
