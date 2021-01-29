<template>
  <table class="table">
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Score</th>
    </tr>
    <tr v-for="user in res" :key="user._id">
      <td>{{ user.place }}</td>
      <td>{{ playerNameById(user._id) }}</td>
      <td>{{ user.cnt }}</td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
name: "tableWeek.vue",
  data(){
    return {
      res: []
    }
  },
  computed:{
    ...mapGetters("polls", ["sortedActiveInnerPoll"]),
    ...mapGetters("user", ["playerNameById"])
  },
  created(){
  let place = 1;
  this.res = [...this.sortedActiveInnerPoll];
  for(let i = 0; i < this.res.length; i++){
    if(i !== 0 && this.res[i].cnt !== this.res[i - 1].cnt)
      place += 1;
    this.res[i].place = place;
  }
}
}
</script>

<style lang="scss">
@import "@/assets/vars.scss";
@import "@/assets/base.scss";

  .table {
    border-collapse: collapse;
    margin: 30px auto 60px;
    font-size: 0.9em;
    width: 80%;
  }

  th {
    background: $pink;
    color: $dark;
    border: 1px solid $very-dark;
  }
  td{
    text-align: center;
    padding: 5px;
    border: 1px solid $pink;
  }
</style>