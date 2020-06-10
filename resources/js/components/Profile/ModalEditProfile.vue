<template>
    <div class="modal" id="edit_profile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header p-1">
                    <h5 class="modal-title d-flex justify-content-between text-left w-100" id="exampleModalLabel">
                        <button type="button" class="close_modal" data-dismiss="modal">
                            <i class="fa fa-times"></i>
                        </button>
                        <span>Editar perfil</span>
                        <button type="button" class="btn twit-btn font-weight-bold btn-sm btn-primary">
                            Guardar
                        </button>
                    </h5>
                </div>
                <div class="modal-body p-0 pb-5">
                    <div class="cover_image">
                        <div class="btn_upload">
                            <label for="upload_cover">
                                <i class="fas fa-camera"></i>
                                <input type="file" id="upload_cover">
                            </label>
                        </div>
                        <div class="avatar">
                            <div class="btn_upload">
                                <label for="upload_avatar">
                                    <i class="fas fa-camera"></i>
                                    <input type="file" id="upload_avatar">
                                </label>
                            </div>
                            <i class="fas text-muted fa-user-circle"></i>
                        </div>
                    </div>
                    <div v-if="Object.keys(profile_form).length > 0" class="mt-5 px-1 pt-4">
                        <div class="form-group">
                            <base-input v-model="profile_form.name" @press="minChar($event)" :label="'Nombre'" :inputType="'text'"></base-input>
                            <span class="w-100 d-block text-muted text-right">{{profile_form.name.length}}/50</span>
                        </div>
                        <div class="form-group">
                            <base-input v-model="profile_form.username" @press="minChar($event)" :label="'Username'" :inputType="'text'"></base-input>
                            <span class="w-100 d-block text-muted text-right">{{profile_form.username.length}}/50</span>
                        </div>
                        <div class="form-group">
                            <div :class="['input-custom', focus_input ? 'focus-set':'']">
                                <label class="m-0">Biografía</label>
                                <textarea row="3" v-model="profile_form.description" @focus="onFocus(true)" @blur="onFocus(false)" class="form-control bg-transparent" placeholder="Agrega tu biografia"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState('user', ['user','profile_form'])
    },
    methods: {
        minChar(evt){
            if (evt.target.value.length <= 49) {
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
