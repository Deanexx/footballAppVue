import { allPolls, setScore } from "../apis/pollsApi";

export default {
    namespaced: true,
    state: {
        polls: []
    },
    getters: {
        user: (state, getters, rootState, rootGetters) => rootGetters["user/user"],
        all: state => state.polls,
        totalPoints: (stata, getters) => {
            let res = {};

            getters.all.forEach(el => {
               let { poll } = el;

               poll.forEach(el => {
                   if(!(el._id in res)) res[el._id] = el.cnt
                   else res[el._id] = res[el._id] + el.cnt
               })
            })
            return res;
        },
        sortTotalPoints: (state, getters)=> {
            let sortable = [];

            for (let id in getters.totalPoints) {
                sortable.push({
                    id,
                    cnt: getters.totalPoints[id]
                });
            }

            return sortable.sort(function(a, b) {
                return b.cnt - a.cnt;
            });
        },
        activePoll: state => state.polls.find(el => el.active),
        activeInnerPoll: (state, getters) => getters.activePoll["poll"],
        sortedActiveInnerPoll: (state, getters) => getters.activeInnerPoll.sort((a,b) => b.cnt - a.cnt),
        activePollID: (state, getters) => getters.activePoll["_id"],
        amountPlayers: (state, getters) => {
            return getters.activeInnerPoll.reduce((sum, curVal) => {
                return sum + 1 + curVal.additionalPlayers;
            },0)
        },
        isInList: (state, getters, rootState, rootGetters) => {
           let user = rootGetters["user/user"];

           if(user == null) return false;
           return -1 !== getters.activeInnerPoll.findIndex(el => {
               return el._id === user._id
           })
        }
    },
    mutations: {
        allPolls(state, polls){
            state.polls = polls;
        }
    },
    actions: {
        async all({ commit }){
            let { all } = await allPolls();
            commit("allPolls", all);
        },
        async setScore({ state}, objRes){
            console.log(state.polls, "polls");
            let { status } = await setScore(objRes)
            return status;
        }
    },
}