<template>
    <div>
        <h3>Siguiendo</h3>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("user", ["profile", "users_following"])
    },
    methods: {
        ...mapActions("user", ["get_users_following"])
    },
    created() {
        this.get_users_following();
    }
};
</script>
