require("./bootstrap");

window.Vue = require("vue");
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

// Registro Global de componentes base
const requireComponent = require.context(
    // La ruta relativa de la carpeta de componentes
    "./components/Base",
    // Si mirar o no en las subcarpetas
    false,
    /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
    // Obtener la configuración de los componentes
    const componentConfig = requireComponent(fileName);
    const componentName = upperFirst(
        camelCase(
            // Quitar el `./`en el comienzo y la extensión del nombre del archivo
            fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
        )
    );
    // Registrar el componente a nivel global
    Vue.component(
        componentName,
        // Busca las opciones de componentes en `.default`, que
        // existen si el componente fue exportado con `export default`,
        // de lo contrario volver a la raíz del módulo.
        componentConfig.default || componentConfig
    );
});
Vue.component(
    "login-register",
    require("./components/Auth/LoginRegister.vue").default
);

// Store vuex
import store from "./store/index";

// Router
import router from "./routes/index";

const app = new Vue({
    el: "#app",
    store,
    router,
    watch: {
        $route(to, from) {
            $("body, html").animate({ scrollTop: 0 });
            $("#modal_comment").modal("hide");
        }
    }
});
