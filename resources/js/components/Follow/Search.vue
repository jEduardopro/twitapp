<template>
    <div class="form-group search p-3">
        <input
            type="text"
            @focus="show_box_results(true)"
            @blur="show_box_results(false)"
            class="input-search"
            placeholder="Buscar personas"
        />
        <div v-if="show" class="box-results">
            <p class="text-center text-muted">Busca personas en TwitApp</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false
        };
    },
    methods: {
        show_box_results(flag) {
            this.show = flag;
        }
    }
};
</script>
