import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

store.dispatch("user/setUserFromCookie").then(()=>{
    store.dispatch("user/getAll").then(() => {
         store.dispatch("polls/all").then(()=> {
            createApp(App)
                .use(store)
                .use(router)
                .mount("#app");
        })
    })
})