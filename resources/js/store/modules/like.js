export default {
    namespaced: true,
    actions: {
        like({}, { model, url_base }) {
            axios
                .post(`${url_base}/${model.id}/likes`)
                .then(res => {
                    model.relationships.likes.liked = true;
                    model.relationships.likes.likes_count++;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        unlike({}, { model, url_base }) {
            axios
                .delete(`${url_base}/${model.id}/likes`)
                .then(res => {
                    model.relationships.likes.liked = false;
                    model.relationships.likes.likes_count--;
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
};
