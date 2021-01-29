<template>
  <div class="vote__component">
    <div class="vote__component__title">{{ playerNameById(id)}}</div>
    <div class="vote__component__inner">
      <div v-for="num in max" :key="num">
        <label class="vote__component__label" :for="num">{{ num }}</label>
        <input @change="inputChange" type="radio" :id="num" :value="num" v-model="cnt">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "userVoteFor.vue",
  props: {
      id: {
        type: String,
        required: true
      },
     hmLeft: {
        type: Number,
        required: true
      },
    restart:{
        type: Boolean
      }
    },
  emits: ["cntCount"],
  data() {
    return {
      defaultMax: 10,
      cnt: 0,
    }
  },
  computed: {
    ...mapGetters("user", ["playerNameById"]),
    max(){
      return Math.min(this.defaultMax, this.cnt + this.hmLeft)
    }
  },
  methods: {
    inputChange(){
      this.selected = true;
      this.$emit("cntCount", this.id, this.cnt);
    }
  },
  watch: {
    restart(){
      this.cnt = 0;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/vars.scss";
@import "@/assets/base.scss";

  .vote__component{
    width: 80%;
    margin: 10px auto;
    padding: 10px 0;
    font-size: 15px;
    border: 3px solid $pink;
    border-radius: 2px;
    &__inner{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__title{
      text-align: center;
      color: $red;
    }
  }

input[type="radio"]:checked + label {
  background: yellow;
}
</style>