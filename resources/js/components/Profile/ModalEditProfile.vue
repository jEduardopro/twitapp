<template>
    <div class="modal fade" id="edit_profile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header p-1">
                    <h5 class="modal-title d-flex justify-content-between text-left w-100" id="exampleModalLabel">
                        <button type="button" class="close_modal" data-dismiss="modal">
                            <i class="fa fa-times"></i>
                        </button>
                        <span>Editar perfil</span>
                        <button type="button" @click="update" class="btn twit-btn font-weight-bold btn-sm btn-primary">
                            Guardar
                        </button>
                    </h5>
                </div>
                <div class="modal-body p-0 pb-5">
                    <cover-avatar-image>
                        <template v-if="user.cover_image" v-slot:cover_image>
                            <img :src="user.cover_image" class="cover_image_preview">
                        </template>
                        <template v-else v-slot:cover_image>
                            <template v-if="profile_form.cover_image">
                                <img src="" class="cover_image_preview">
                            </template>
                        </template>
                        <template v-slot:btn_cover>
                            <div class="btn_upload">
                                <label for="upload_cover_image">
                                    <i class="fas fa-camera"></i>
                                    <input type="file" @change="set_cover_image" id="upload_cover_image">
                                </label>
                            </div>
                        </template>
                        <template v-if="user.image" v-slot:avatar>
                            <img :src="user.image" class="avatar_image_preview rounded-circle">
                        </template>
                        <template v-else v-slot:avatar>
                            <template v-if="profile_form.image">
                                <img src="" class="avatar_image_preview rounded-circle">
                            </template>
                        </template>
                        <template v-slot:btn_avatar>
                            <div class="btn_upload">
                                <label for="upload_avatar">
                                    <i class="fas fa-camera"></i>
                                    <input type="file" @change="set_avatar" id="upload_avatar">
                                </label>
                            </div>
                        </template>
                    </cover-avatar-image>
                    <div v-if="Object.keys(profile_form).length > 0" class="mt-5 px-1 pt-4">
                        <div class="form-group">
                            <base-input v-model="profile_form.name" @press="minChar($event, 50)" :label="'Nombre'" :inputType="'text'"></base-input>
                            <span v-if="errors.name" class="invalid-feedback d-block" v-text="errors.name[0]"></span>
                            <span class="w-100 d-block text-muted text-right">{{profile_form.name.length}}/50</span>
                        </div>
                        <div class="form-group">
                            <base-input v-model="profile_form.username" @press="minChar($event, 50)" :label="'Username'" :inputType="'text'"></base-input>
                            <span v-if="errors.username" class="invalid-feedback d-block" v-text="errors.username[0]"></span>
                            <span class="w-100 d-block text-muted text-right">{{profile_form.username.length}}/50</span>
                        </div>
                        <div class="row p-0 m-0">
                            <div class="col-12 col-md-6 p-1">
                                <div class="form-group">
                                    <base-input v-model="profile_form.email" :label="'Correo'" :inputType="'email'"></base-input>
                                    <span v-if="errors.email" class="invalid-feedback d-block" v-text="errors.email[0]"></span>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 p-1">
                                <div class="form-group">
                                    <base-input v-model="profile_form.phone" :label="'Telefono'" :inputType="'text'"></base-input>
                                    <span v-if="errors.phone" class="invalid-feedback d-block" v-text="errors.phone[0]"></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div :class="['input-custom', focus_input ? 'focus-set':'']">
                                <label class="m-0">Biografía</label>
                                <textarea rows="3" @keypress="minChar($event, 159)" v-model="profile_form.description" @focus="onFocus(true)" @blur="onFocus(false)" class="form-control bg-transparent" placeholder="Agrega tu biografia"></textarea>
                            </div>
                            <span v-if="errors.description" class="invalid-feedback d-block" v-text="errors.description[0]"></span>
                            <span class="w-100 d-block text-muted text-right">{{profile_form.description.length}}/160</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CoverAvatarImage from './CoverAvatarImage.vue';
export default {
    components: {CoverAvatarImage},
    computed: {
        ...mapState('user', ['user','profile_form']),
        ...mapState(['errors'])
    },
    methods: {
        ...mapActions('user', ['set_cover_image','set_avatar','update']),
        minChar(evt, chars){
            if (evt.target.value.length <= chars) {
                return true;
            } else {
                evt.preventDefault();
            }
        },
        onFocus(flag){
            this.focus_input = flag;
        }
    },
    data() {
        return {
            focus_input: false
        }
    },
}
</script>
