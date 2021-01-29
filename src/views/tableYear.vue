<template>
  <table style="margin: 15px auto 60px">
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Points</th>
    </tr>
    <tr v-for="user in res" :key="user._id">
      <td>{{ user.place }}</td>
      <td>{{ playerNameById(user.id) }}</td>
      <td>{{ user.cnt }}</td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "tableYear.vue",
data(){
  return {
    res: []
  }
},
  computed:{
    ...mapGetters("polls", ["sortTotalPoints"]),
    ...mapGetters("user", ["playerNameById"])
  },
  created(){
    let place = 1;
    this.res = [...this.sortTotalPoints];
    for(let i = 0; i < this.res.length; i++){
      if(i !== 0 && this.res[i].cnt !== this.res[i - 1].cnt)
        place += 1;
      this.res[i].place = place;
    }
    console.log(this.res);
  }
}
</script>

<style scoped>
  table{
    width: 80% !important;
  }
</style>