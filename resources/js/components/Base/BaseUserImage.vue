<template>
    <div class="user-image">
        <img v-if="image" :src="image" class="rounded-circle" />
        <i v-else class="fas text-muted fa-3x fa-user-circle"></i>
    </div>
</template>

<script>
export default {
    props: ["image"]
};
</script>
