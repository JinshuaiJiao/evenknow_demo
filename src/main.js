import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import JinsButton from "jins-button";
import "jins-button/jins-button.css";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(JinsButton);
app.use(ElementPlus);

app.mount("#app");
