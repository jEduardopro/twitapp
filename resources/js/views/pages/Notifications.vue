<template>
    <div>
        <base-header>
            Notificaciones
        </base-header>
        <div class="content-notifications">
            <div
                v-for="(notification, i) in notifications.data"
                :key="i"
                class="twit-card px-3 py-2 border-bottom"
            >
                <BaseUserImage
                    :image="notification.data.twit.relationships.user.image"
                    class="mr-2"
                />
                <div class="body">
                    <div class="header">
                        Twit reciente de
                        <router-link
                            :to="{
                                name: 'profile',
                                params: {
                                    username:
                                        notification.data.twit.relationships
                                            .user.username
                                }
                            }"
                            class="text-white"
                        >
                            <strong
                                v-text="
                                    notification.data.twit.relationships.user
                                        .name
                                "
                            ></strong>
                        </router-link>
                    </div>
                    <div
                        class="content-text py-1"
                        v-text="notification.data.twit.content"
                    ></div>
                </div>
            </div>
            <infinite-loading spinner="waveDots" @infinite="get_notifications">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    computed: {
        ...mapState("notification", ["notifications"])
    },
    methods: {
        ...mapActions("notification", [
            "get_notifications",
            "mark_unread_notifications"
        ])
    },
    created() {
        this.mark_unread_notifications();
    }
};
</script>
