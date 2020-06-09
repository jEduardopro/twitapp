<template>
    <div>
        <div class="cover_image">
            <div class="avatar">
                <i class="fas text-muted fa-user-circle"></i>
            </div>
        </div>
        <div class="text-right px-3 pt-2">
            <button type="button" data-toggle="modal" data-target="#edit_profile" class="btn twit-btn font-weight-bold btn-primary">
                Editar perfil
            </button>
        </div>
        <div class="w-50 text-left pt-3 pl-3">
            <p class="font-weight-bold h5 mt-1 text-white">
                {{user.name}}
                <small class="text-muted d-block" v-text="`@${user.username}`"></small>
            </p>
            <p class="text-muted"><i class="fa fa-calendar-alt"></i> {{date_register}}</p>
            <span class="text-muted">
                <strong class="font-weight-bold text-white">10</strong> Siguiendo
            </span>
            <span class="text-muted ml-2">
                <strong class="font-weight-bold text-white">5</strong> Seguidores
            </span>
        </div>
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
                    <div class="mt-5 px-1 pt-4">
                        <div class="form-group">
                            <base-input v-model="user.name" @press="minChar($event)" :label="'Nombre'" :inputType="'text'"></base-input>
                            <span class="w-100 d-block text-muted text-right">{{user.name.length}}/50</span>
                        </div>
                        <div class="form-group">
                            <base-input v-model="user.username" @press="minChar($event)" :label="'Username'" :inputType="'text'"></base-input>
                            <span class="w-100 d-block text-muted text-right">{{user.username.length}}/50</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('user', ['user']),
        date_register(){
            let date = new Date(this.user.created_at)
            let month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
            return `Se unio el ${month} del ${date.getFullYear()}`;
        }
    },
}
</script>
