<template>
  <div class="vote">
    <div class="vote__title">Left: <span>{{ hmLeft }}</span> votes</div>
    <div class="vote__body">
      <div v-for="user in activeInnerPoll" :key="user._id">
        <userVoteFor @cntCount="cntCount" :restart="restart" :id="user._id" :hmLeft="hmLeft"/>
      </div>
    </div>
  </div>
  <div class="btns">
    <div class="btn__send" @click="sendVote">Send</div>
    <div class="btn__reset" @click="reset">Reset</div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex"
import userVoteFor from "@/components/userVoteFor.vue"

export default {
  name: "Vote.vue",
  components:{
     userVoteFor
  },
  data(){
    return {
      loading: false,
      votes: 42,
      restart: false,
      objRes: {}
    }
  },
  computed: {
    ...mapGetters("polls", ["activeInnerPoll", "activePollID"]),
    ...mapGetters("user", ["playerNameById", "userVoted"]),
    hmLeft(){
      let sum = 0;

      for(let key in this.objRes){
        sum += this.objRes[key];
      }

      return this.votes - sum;
    }
  },
  methods: {
    ...mapActions("polls", ["setScore", "all"]),
    ...mapActions("user", ["setVotedPollID"]),
    cntCount(id, cnt){
      this.objRes[id] = parseInt(cnt);
    },
    async sendVote(){
      this.loading = true;
      let objReady = { activePollID: this.activePollID, scores: {...this.objRes} };
      let status = await this.setScore(objReady);
      if(status === "success"){
          await this.all;
          this.setVotedPollID(this.activePollID);
          this.loading = false;
      }
    },
    reset(){
      for(let id in this.objRes){
        this.objRes[id] = 0;
      }
      this.restart = !this.restart;
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/vars.scss";
@import "@/assets/base.scss";

.vote{
    &__title{
      @include center;
      margin-top: 15px;
      span{
        font-size: 20px;
        margin: 0 5px;
        color: $pink;
      }
  }
}

.btns{
  display: flex;
  justify-content: space-around;
}

.btn__send{
  @include btn($pink);
  border-radius: 20px;
  margin-bottom: 60px;
  width: 100px;
}

.btn__reset{
  width: 100px;
  @include btn($yellow);
  border-radius: 20px;
  margin-bottom: 60px;
}


</style>