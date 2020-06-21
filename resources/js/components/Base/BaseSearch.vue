<template>
    <div class="search-sidebar pl-4 pr-5 pt-2">
        <div class="form-group search">
            <input
                type="text"
                v-model="search"
                @keyup="search_users"
                class="input-search"
                placeholder="Buscar personas"
            />
            <div v-if="show" class="box-results">
                <p v-if="!search.length" class="text-center text-muted">
                    Busca personas en TwitApp
                </p>
                <template v-else>
                    <p class="text-muted text-center py-2" v-if="searching">
                        <i class="fas fa-circle-notch fa-2x fa-spin"></i>
                    </p>
                    <template v-else>
                        <p
                            v-if="!users_results.length"
                            class="text-white py-4 text-center"
                        >
                            No se encontraron resultados
                        </p>
                        <a
                            v-else
                            v-for="(user, i) in users_results"
                            :key="user.id + '_' + i"
                            href="#"
                            class="item-user py-2 px-3 border-bottom d-flex align-items-start"
                            @click.prevent="goto_user(user.username)"
                        >
                            <BaseUserImage :image="user.image" />
                            <p
                                class="p-0 m-0 ml-1 d-flex flex-column text-white"
                            >
                                {{ user.name }}
                                <small class="text-muted">
                                    @{{ user.username }}
                                </small>
                            </p>
                        </a>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import debounce from "lodash/debounce";
export default {
    data() {
        return {
            search: "",
            show: false,
            searching: false,
            users_results: []
        };
    },
    methods: {
        show_box_results(flag) {
            this.show = flag;
        },
        goto_user(username) {
            this.search = "";
            this.users_results = [];
            this.$router.push({ name: "profile", params: { username } });
        },
        search_users: debounce(function() {
            if (this.search.length) {
                this.searching = true;
                axios
                    .get(`search/users?q=${this.search}`)
                    .then(res => {
                        this.users_results = res.data;
                        this.searching = false;
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }, 250)
    },
    created() {
        document.querySelector("body,html").addEventListener("click", e => {
            if (
                e.target.classList.contains("box-results") ||
                e.target.classList.contains("input-search")
            ) {
                this.show_box_results(true);
            } else {
                this.show_box_results(false);
            }
        });
    }
};
</script>

<style lang="scss">
.item-user:hover {
    text-decoration: none;
    background: #192734;
}
</style>
