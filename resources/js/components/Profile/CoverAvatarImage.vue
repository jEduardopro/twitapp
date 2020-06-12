<template>
    <div class="cover_image">
        <slot name="cover_image"></slot>
        <slot name="btn_cover"></slot>
        <div class="avatar">
            <slot name="avatar"></slot>
            <slot name="btn_avatar"></slot>
            <i class="fas text-muted fa-user-circle"></i>
        </div>
    </div>
</template>
