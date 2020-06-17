<template>
    <div v-if="user.id">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("user", ["user"])
    },
    methods: {
        ...mapActions("user", ["set_user_information"])
    },
    created() {
        if (!this.user.id) {
            this.set_user_information();
        }
    }
};
</script>
