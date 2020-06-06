<template>
    <div>
        <!-- definimos le valor con el prop value mediante el v-model del padre -->
        <input :type="inputType" v-bind:value="value" class="form-control" @input="$emit('typing', $event.target.value)"/>
    </div>
</template>

<script>
export default {
    // pasamos el v-model del padre como un prop
    model: {
        prop: 'value',
        event: 'typing'
    },
    props:[{
        value: String,
        inputType: {
            type: String,
            required: true
        }
    }]
}
</script>
