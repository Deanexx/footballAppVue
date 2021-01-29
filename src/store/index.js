import { createStore } from "vuex";
import polls from "./polls"
import user from "./user"

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    polls,
    user
  }
});
