<template>
    <div class="search-sidebar pl-4 pr-5 pt-2">
        <div class="form-group search">
            <input
                type="text"
                v-model="search"
                @focus="show_box_results(true)"
                @blur="show_box_results(false)"
                @keyup="suggestions"
                class="input-search"
                placeholder="Buscar personas"
            />
            <div v-if="show" class="box-results">
                <p class="text-center text-muted">Busca personas en TwitApp</p>
                <router-link :to="{ name: 'home' }">Home</router-link>
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
            show: false
        };
    },
    methods: {
        show_box_results(flag) {
            this.show = flag;
        },
        suggestions: debounce(function() {
            if (this.search.length) {
                axios
                    .get(`suggestions/users?q=${this.search}`)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }, 250)
    }
};
</script>
