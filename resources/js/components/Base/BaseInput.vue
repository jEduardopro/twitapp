<template>
    <!-- definimos le valor con el prop value mediante el v-model del padre -->
    <div :class="['input-custom', focus_input ? 'focus-set':'']">
        <label class="m-0" v-text="label"></label>
        <input :type="inputType" @focus="onFocus(true)" @blur="onFocus(false)" v-bind:value="value" class="form-control bg-transparent" @keypress="$emit('press',$event)" @input="$emit('typing', $event.target.value)"/>
    </div>
</template>

<script>
export default {
    // pasamos el v-model del padre como un prop
    model: {
        prop: 'value',
        event: 'typing'
    },
    props:{
        value: String,
        inputType: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            focus_input: false
        }
    },
    methods: {
        onFocus(flag){
            this.focus_input = flag;
        }
    },
}
</script>
