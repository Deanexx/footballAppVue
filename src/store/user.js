import { getAll, clearUser } from "../apis/userApi"

function getCookieValue(a) {
    let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

export default {
    namespaced: true,
    state: {
        user: null,
        allUsers: [],
        userVoted: ''
    },
    getters:{
      user: state => state.user,
      userVoted: state => state.userVoted,
      allUsers: state => state.allUsers,
      playerNameById: (state, getters) =>  id => getters.allUsers.find(el => el._id === id).name
    },
    mutations: {
        setUserId(state, user){
          state.user = user;
        },
        setAllUsers(state, users){
            state.allUsers = users;
        },
        setUserVoted(state, pollID){
            state.userVoted = pollID;
        }
    },
    actions: {
        async getAll({ commit }){
            let { data } = await getAll();
            commit("setAllUsers", data);
        },
        setVotedPollID({ commit }){
            let votedCookie = getCookieValue("voted");

            commit("setUserVoted", votedCookie);
        },
        setUserFromCookie({ commit, dispatch }){
            let res = getCookieValue("user");
            if(res.length){
                let user = JSON.parse(res.slice(2, res.length));
                commit("setUserId", user);
            }
            dispatch("setVotedPollID");
        },
        async signOut({ commit }){
            let { status } = await clearUser();
            if(status === "success")
                commit("setUserId", null);
        },
    },
}