import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVueNext from "bootstrap-vue-next";
import VueApexCharts from "vue3-apexcharts";
import VueFeather from 'vue-feather';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

import "./assets/custom.scss";

const app = createApp(App).use(router);
app.use(VueApexCharts);
app.use(BootstrapVueNext);
app.component(VueFeather.name, VueFeather);
app.mount("#app");
