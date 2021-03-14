import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


Vue.config.productionTip = false;

//importo il framework Bootstrap, installato via npm per poter accedere alle sue componenti di interfaccia e ad una gestione avanzata degli stili  

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);


//definisco una variabile globale, che sarà accessibile all'applicazione e richiamabile in ogni componente

Vue.prototype.$user = "Committente";



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

//'aggancio' la mia applicazione al div con id app nel file '.\esame\public\index.html'